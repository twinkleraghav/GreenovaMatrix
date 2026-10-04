import { PackagingMaterial, FoodProfile, EvidenceStatus } from '../types';

export interface ShelfLifeEstimationResult {
  estimatedDays: number;
  evidenceStatus: EvidenceStatus;
  primaryDegradationMode: string;
  temperatureAccelerationFactor: number;
  barrierLimitingFactor: string;
}

/**
 * Calculates estimated food shelf life based on barrier kinetics (WVTR, OTR),
 * food characteristics (aw, fat, moisture), and storage temperature using Arrhenius Q10 modeling.
 */
export function estimateShelfLife(
  material: PackagingMaterial,
  profile: FoodProfile
): ShelfLifeEstimationResult {
  // 1. Temperature Acceleration (Arrhenius Q10 model)
  // Baseline standard ambient reference = 20°C
  const q10 = 2.05; // Standard deterioration acceleration factor for food kinetics
  const deltaT = (profile.storageTemperatureC - 20) / 10;
  const tempAccelFactor = Math.pow(q10, deltaT);

  // 2. Base degradation timelines per food category
  let baselineDays = 90;
  let primaryDegradationMode = 'Sensory deterioration';

  switch (profile.category) {
    case 'dry_snacks':
      baselineDays = 180;
      primaryDegradationMode = profile.fatPercentage > 15 ? 'Lipid rancidity & staleness' : 'Moisture absorption & crispness loss';
      break;
    case 'fresh_produce':
      baselineDays = 14;
      primaryDegradationMode = 'Senescence, respiration decay & fungal spoilage';
      break;
    case 'bakery':
      baselineDays = 60;
      primaryDegradationMode = 'Staling & mold growth';
      break;
    case 'dairy':
      baselineDays = 25;
      primaryDegradationMode = 'Microbial spoilage & enzymatic breakdown';
      break;
    case 'pickles_sauces':
      baselineDays = 365;
      primaryDegradationMode = 'Oxidative discoloration & flavor loss';
      break;
    case 'ready_to_eat':
      baselineDays = profile.requiresHeatProcessing ? 365 : 45;
      primaryDegradationMode = profile.requiresHeatProcessing ? 'Chemical oxidative aging' : 'Microbial germination';
      break;
    case 'frozen':
      baselineDays = 270;
      primaryDegradationMode = 'Freezer burn & desiccation';
      break;
    case 'beverages':
      baselineDays = 180;
      primaryDegradationMode = 'Flavor fading & oxygen ingress';
      break;
  }

  // 3. Barrier Retention Multipliers based on material WVTR and OTR
  // Ideal barrier: WVTR < 0.5, OTR < 1.0 (Alu foil, Glass, Can) -> Retention factor 1.2 to 2.0
  // Good barrier: WVTR < 3.0, OTR < 30.0 (BOPP metal, PET) -> Retention factor 0.9 to 1.3
  // Moderate barrier: WVTR < 15, OTR < 100 (Kraft, PBAT/PLA, PP) -> Retention factor 0.6 to 1.0
  // Open / Porous: WVTR > 30, OTR > 150 (Bagasse, Areca) -> Retention factor 0.1 to 0.4

  let barrierMultiplier = 1.0;
  let barrierLimitingFactor = 'Balanced barrier performance';

  if (profile.fatPercentage > 15 || profile.oxygenSensitivity === 'high') {
    // Oxygen transmission is the primary determinant
    if (material.otr <= 0.5) {
      barrierMultiplier = 1.5;
      barrierLimitingFactor = 'Hermetic gas barrier (near zero O2 ingress)';
    } else if (material.otr <= 25) {
      barrierMultiplier = 1.15;
      barrierLimitingFactor = 'High barrier metallised/polymer gas defense';
    } else if (material.otr <= 90) {
      barrierMultiplier = 0.85;
      barrierLimitingFactor = 'Moderate oxygen permeability';
    } else {
      barrierMultiplier = 0.45;
      barrierLimitingFactor = 'Rapid oxygen ingress accelerates lipid oxidation';
    }
  } else if (profile.waterActivityAw < 0.40) {
    // Moisture vapor ingress is the primary determinant
    if (material.wvtr <= 0.1) {
      barrierMultiplier = 1.4;
      barrierLimitingFactor = 'Zero moisture vapor transmission';
    } else if (material.wvtr <= 2.5) {
      barrierMultiplier = 1.15;
      barrierLimitingFactor = 'Low WVTR (<3 g/m²/day) maintains crispness';
    } else if (material.wvtr <= 15) {
      barrierMultiplier = 0.80;
      barrierLimitingFactor = 'Slight moisture transmission over time';
    } else {
      barrierMultiplier = 0.35;
      barrierLimitingFactor = 'High moisture permeability causes sogginess';
    }
  }

  // Additional bonus for complete light barrier if food is light-sensitive
  if (profile.lightSensitivity === 'high' && material.lightBarrierLevel === 'total') {
    barrierMultiplier *= 1.1;
  }

  // 4. Calculate final shelf life in days
  const unroundedDays = (baselineDays * barrierMultiplier) / Math.max(0.3, tempAccelFactor);
  const estimatedDays = Math.max(1, Math.round(unroundedDays));

  // 5. Evidence status mapping
  let evidenceStatus: EvidenceStatus = material.evidenceStatus;
  // If extreme temperature or custom conditions applied, mark as model estimate
  if (profile.storageTemperatureC > 35 || profile.storageTemperatureC < 5) {
    evidenceStatus = 'physics_simulation';
  }

  return {
    estimatedDays,
    evidenceStatus,
    primaryDegradationMode,
    temperatureAccelerationFactor: Number(tempAccelFactor.toFixed(2)),
    barrierLimitingFactor,
  };
}
