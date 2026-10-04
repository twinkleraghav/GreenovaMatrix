import {
  FoodProfile,
  PackagingMaterial,
  PackagingRequirement,
  MaterialSafetyResult,
  RecommendationItem,
  RecommendationResponse,
  MaterialScoreBreakdown,
} from '../types';
import { estimateShelfLife } from './shelfLifeModel';
import { MATERIALS_DATASET_VERSION, RULE_SET_VERSION } from '../data/materialsData';

export const RANKING_ENGINE_VERSION = 'RankEngine-TOPSIS-v2.1';

export function runRecommendationEngine(
  allMaterials: PackagingMaterial[],
  safetyResults: MaterialSafetyResult[],
  requirements: PackagingRequirement,
  profile: FoodProfile
): RecommendationResponse {
  // 1. Filter: ONLY eligible materials enter ranking (Strict safety gate)
  const eligibleSafetyResults = safetyResults.filter((sr) => sr.eligible);
  const eligibleIds = new Set(eligibleSafetyResults.map((sr) => sr.materialId));
  const eligibleMaterials = allMaterials.filter((m) => eligibleIds.has(m.id));

  // 2. Normalize priority weights
  const priorities = profile.priorities;
  const rawSum =
    (priorities.cost || 3) +
    (priorities.shelfLife || 3) +
    (priorities.sustainability || 3) +
    (priorities.protection || 3) +
    (priorities.availability || 3);

  const wCost = (priorities.cost || 3) / rawSum;
  const wShelfLife = (priorities.shelfLife || 3) / rawSum;
  const wSust = (priorities.sustainability || 3) / rawSum;
  const wProt = (priorities.protection || 3) / rawSum;
  const wAvail = (priorities.availability || 3) / rawSum;

  // 3. Compute dimension scores for each eligible material
  const scoredItems = eligibleMaterials.map((material) => {
    const shelfLifeData = estimateShelfLife(material, profile);

    // Protection Score (0-100): Lower WVTR & OTR = Higher Score
    // WVTR 0 => 100, WVTR 30 => 20
    const wvtrScore = Math.max(10, 100 - material.wvtr * 2.8);
    // OTR 0 => 100, OTR 150 => 15
    const otrScore = Math.max(10, 100 - material.otr * 0.55);
    const lightScore =
      material.lightBarrierLevel === 'total'
        ? 100
        : material.lightBarrierLevel === 'high'
        ? 80
        : material.lightBarrierLevel === 'medium'
        ? 55
        : 30;
    const punctureScore =
      material.punctureStrength === 'very_high'
        ? 100
        : material.punctureStrength === 'high'
        ? 80
        : material.punctureStrength === 'medium'
        ? 60
        : 40;

    const protectionScore = Math.round(
      wvtrScore * 0.35 + otrScore * 0.35 + lightScore * 0.15 + punctureScore * 0.15
    );

    // Shelf Life Score (0-100): Compares estimated shelf life against user target
    const targetDays = Math.max(1, profile.targetShelfLifeDays);
    const estDays = shelfLifeData.estimatedDays;
    let shelfLifeScore = 70;
    if (estDays >= targetDays) {
      // Exceeds target: high score up to 100
      const ratio = estDays / targetDays;
      shelfLifeScore = Math.min(100, Math.round(85 + (ratio - 1) * 15));
    } else {
      // Below target: penalty
      const ratio = estDays / targetDays;
      shelfLifeScore = Math.max(10, Math.round(ratio * 80));
    }

    // Sustainability Score (0-100):
    // Based on carbon footprint, recyclability, compostability, and EPR liability
    let carbonScore = Math.max(10, Math.round(100 - (material.carbonFactorGCo2e / 200) * 80));
    let recyclabilityScore = material.recyclabilityRate === 'high' ? 95 : material.recyclabilityRate === 'medium' ? 65 : 25;
    let compostScore = material.compostability === 'home' ? 100 : material.compostability === 'industrial' ? 80 : 20;
    let eprScore =
      material.eprCategory === 'Non-Plastic / Recyclable'
        ? 95
        : material.eprCategory === 'Category IV (Compostable)'
        ? 90
        : material.eprCategory === 'Category I (Rigid Plastic)'
        ? 75
        : material.eprCategory === 'Category II (Flexible Monolayer)'
        ? 65
        : 45; // Category III Multilayer pays highest EPR fee

    const sustainabilityScore = Math.round(
      carbonScore * 0.35 + Math.max(recyclabilityScore, compostScore) * 0.40 + eprScore * 0.25
    );

    // Cost Score (0-100):
    // Lower cost relative to user budget = higher score
    const budget = Math.max(1, profile.budgetPerPackInr);
    let costScore = 60;
    if (material.costPerUnitInr <= budget) {
      const savingsPct = (budget - material.costPerUnitInr) / budget;
      costScore = Math.min(100, Math.round(75 + savingsPct * 25));
    } else {
      const overspendPct = (material.costPerUnitInr - budget) / budget;
      costScore = Math.max(10, Math.round(70 - overspendPct * 60));
    }

    // Availability Score (0-100):
    const availabilityScore =
      material.availabilityInIndia === 'abundant'
        ? 95
        : material.availabilityInIndia === 'moderate'
        ? 75
        : 45;

    // Composite Weighted Score
    const compositeScore = Math.round(
      protectionScore * wProt +
      shelfLifeScore * wShelfLife +
      sustainabilityScore * wSust +
      costScore * wCost +
      availabilityScore * wAvail
    );

    const scores: MaterialScoreBreakdown = {
      protectionScore,
      shelfLifeScore,
      sustainabilityScore,
      costScore,
      availabilityScore,
      compositeScore,
    };

    // Explainability generation
    const shelfLifeDelta = estDays - targetDays;
    let deltaNote = '';
    if (shelfLifeDelta >= 0) {
      deltaNote = `Exceeds target by +${shelfLifeDelta} days`;
    } else {
      deltaNote = `Falls short of target by ${Math.abs(shelfLifeDelta)} days`;
    }

    const tradeOffNotes: string[] = [];
    if (material.costPerUnitInr > budget) {
      tradeOffNotes.push(`Cost of ₹${material.costPerUnitInr.toFixed(2)} exceeds pack budget of ₹${budget.toFixed(2)}.`);
    } else {
      tradeOffNotes.push(`Cost of ₹${material.costPerUnitInr.toFixed(2)} fits comfortably within ₹${budget.toFixed(2)} budget.`);
    }

    if (material.carbonFactorGCo2e < 50) {
      tradeOffNotes.push(`Low carbon footprint (${material.carbonFactorGCo2e}g CO2e/pack).`);
    } else if (material.carbonFactorGCo2e > 120) {
      tradeOffNotes.push(`Higher carbon footprint (${material.carbonFactorGCo2e}g CO2e/pack) due to energy-intensive barrier materials.`);
    }

    if (material.eprCategory === 'Category III (Multilayer Plastic)') {
      tradeOffNotes.push('Requires Category III EPR registration and fee contribution in India.');
    } else if (material.compostability === 'home') {
      tradeOffNotes.push('Certified home compostable in Indian soil conditions.');
    }

    const explainabilitySummary = `${material.name} achieves a composite score of ${compositeScore}/100. It provides ${shelfLifeData.barrierLimitingFactor} yielding an estimated shelf life of ~${estDays} days (${deltaNote}) under ${profile.storageTemperatureC}°C ambient storage.`;

    return {
      material,
      scores,
      estimatedShelfLifeDays: estDays,
      shelfLifeEvidenceStatus: shelfLifeData.evidenceStatus,
      shelfLifeDeltaVsTargetDays: shelfLifeDelta,
      costEstimateInr: material.costPerUnitInr,
      carbonGCo2e: material.carbonFactorGCo2e,
      explainabilitySummary,
      tradeOffNotes,
    };
  });

  // Sort descending by compositeScore
  scoredItems.sort((a, b) => b.scores.compositeScore - a.scores.compositeScore);

  // Take Top 3
  const recommendations: RecommendationItem[] = scoredItems.slice(0, 3).map((item, index) => ({
    rank: index + 1,
    ...item,
  }));

  return {
    requestId: `REQ-${Date.now().toString(36).toUpperCase()}`,
    profileId: profile.id,
    datasetVersion: MATERIALS_DATASET_VERSION,
    ruleSetVersion: RULE_SET_VERSION,
    rankingVersion: RANKING_ENGINE_VERSION,
    timestamp: new Date().toISOString(),
    totalMaterialsEvaluated: allMaterials.length,
    eligibleCount: eligibleMaterials.length,
    rejectedCount: allMaterials.length - eligibleMaterials.length,
    safetyResults,
    requirements,
    recommendations,
  };
}
