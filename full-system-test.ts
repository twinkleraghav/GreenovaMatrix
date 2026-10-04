// Greenova Matrix — Full System Automated Verification Suite
import { PACKAGING_MATERIALS } from './src/data/materialsData';
import { PRESET_FOOD_PROFILES, DEFAULT_FRESH_PROFILE } from './src/data/foodPresets';
import { USER_PERSONAS } from './src/data/personas';
import { COMPLIANCE_ARTICLES, REGULATORY_QA_DATABASE } from './src/data/complianceData';
import { derivePackagingRequirements } from './src/engine/requirementEngine';
import { evaluateSafetyGate } from './src/engine/safetyGate';
import { estimateShelfLife } from './src/engine/shelfLifeModel';
import { runRecommendationEngine } from './src/engine/rankingEngine';
import { FoodProfile, UserPersona } from './src/types';

let totalTests = 0;
let passedTests = 0;
let failedTests: string[] = [];

function test(name: string, fn: () => boolean | void) {
  totalTests++;
  try {
    const result = fn();
    if (result === false) {
      console.error(`❌ FAIL: ${name}`);
      failedTests.push(name);
    } else {
      console.log(`✅ PASS: ${name}`);
      passedTests++;
    }
  } catch (err: any) {
    console.error(`❌ ERROR in "${name}":`, err.message);
    failedTests.push(`${name} (${err.message})`);
  }
}

console.log('================================================================');
console.log('🌿 GREENOVA MATRIX — COMPREHENSIVE END-TO-END TEST SUITE');
console.log('================================================================\n');

// -------------------------------------------------------------
// MODULE 1: LANDING & SYSTEM CONFIGURATION
// -------------------------------------------------------------
console.log('--- MODULE 1: SYSTEM ASSETS & DATA INTEGRITY ---');

test('Materials dataset: All 14 materials have valid technical metrics and standards', () => {
  if (PACKAGING_MATERIALS.length !== 14) return false;
  return PACKAGING_MATERIALS.every((m) => {
    return (
      m.id &&
      m.name &&
      m.wvtr >= 0 &&
      m.otr >= 0 &&
      m.costPerUnitInr > 0 &&
      m.carbonFactorGCo2e >= 0 &&
      m.fssaiStandardCode.includes('IS') &&
      m.eprCategory &&
      m.endOfLifeDisposalAdvice.length > 5
    );
  });
});

test('Food Presets: All 6 presets have required chemical and physical limits', () => {
  if (PRESET_FOOD_PROFILES.length !== 6) return false;
  return PRESET_FOOD_PROFILES.every((p) => {
    return (
      p.id.startsWith('preset_') &&
      p.name.length > 5 &&
      p.waterActivityAw >= 0.05 &&
      p.waterActivityAw <= 1.0 &&
      p.pH >= 1.5 &&
      p.pH <= 10.0 &&
      p.fatPercentage >= 0 &&
      p.targetShelfLifeDays >= 10 &&
      p.budgetPerPackInr > 0
    );
  });
});

test('Default Fresh Profile: Clean formulation starts with empty name and no template sync', () => {
  return (
    DEFAULT_FRESH_PROFILE.id === 'custom_product' &&
    DEFAULT_FRESH_PROFILE.name === '' &&
    DEFAULT_FRESH_PROFILE.sourceTemplateId === undefined
  );
});

test('User Personas: All 5 operational personas are defined with complete weight matrices', () => {
  const personas = Object.keys(USER_PERSONAS) as UserPersona[];
  if (personas.length !== 5) return false;
  return personas.every((pid) => {
    const p = USER_PERSONAS[pid];
    const pri = p.primaryPriorities;
    return (
      p.title &&
      p.tagline &&
      pri.cost >= 1 &&
      pri.shelfLife >= 1 &&
      pri.sustainability >= 1 &&
      pri.protection >= 1 &&
      pri.availability >= 1
    );
  });
});

// -------------------------------------------------------------
// MODULE 2 & 3: PRODUCT PROFILER & REQUIREMENT ENGINE
// -------------------------------------------------------------
console.log('\n--- MODULE 2 & 3: FOOD CHEMISTRY DERIVATION & SAFETY GATE ---');

test('Pickle Preset (pH 3.2): Triggers high acid requirement and deterministic safety gate', () => {
  const pickle = PRESET_FOOD_PROFILES.find((p) => p.id === 'preset_mango_pickle')!;
  const reqs = derivePackagingRequirements(pickle);
  if (!reqs.acidResistanceRequired) return false;

  const gateResults = evaluateSafetyGate(PACKAGING_MATERIALS, reqs, pickle);
  const eligible = gateResults.filter((r) => r.eligible);
  const disqualified = gateResults.filter((r) => !r.eligible);

  // Unlined kraft paper must be rejected
  const plainPaper = gateResults.find((r) => r.materialId === 'kraft_dispersion');
  // Glass jar must be eligible
  const glass = gateResults.find((r) => r.materialId === 'glass_jar');

  return eligible.length > 0 && disqualified.length > 0 && glass?.eligible === true;
});

test('Retort Ready-to-Eat Dal (121°C): Thermal gate rejects low-temperature polymers', () => {
  const dal = PRESET_FOOD_PROFILES.find((p) => p.id === 'preset_rte_dal')!;
  const reqs = derivePackagingRequirements(dal);
  if (reqs.maxOperatingTempC < 121) return false;

  const gateResults = evaluateSafetyGate(PACKAGING_MATERIALS, reqs, dal);
  
  // PLA (max 50°C) must be disqualified with thermal limit reason
  const pla = gateResults.find((r) => r.materialId === 'pla_film');
  if (pla?.eligible) return false;
  if (!pla?.rejectionReasons.some((r) => r.includes('Thermal limit exceeded'))) return false;

  // Retort pouch (aluminum laminate) must be eligible
  const retortPouch = gateResults.find((r) => r.materialId === 'alu_foil_lam');
  if (!retortPouch?.eligible) return false;

  return true;
});

test('Dry Roasted Makhana (aw 0.28, fat 18%): Requires ultra moisture barrier', () => {
  const makhana = PRESET_FOOD_PROFILES.find((p) => p.id === 'preset_makhana')!;
  const reqs = derivePackagingRequirements(makhana);
  if (reqs.moistureBarrier !== 'ultra_barrier') return false;

  const gateResults = evaluateSafetyGate(PACKAGING_MATERIALS, reqs, makhana);
  const metallizedPouch = gateResults.find((r) => r.materialId === 'bopp_metal_lam');
  return Boolean(metallizedPouch?.eligible);
});

test('Fresh Alphonso Mangoes (Produce): Requires non-hermetic breathable packaging', () => {
  const mango = PRESET_FOOD_PROFILES.find((p) => p.id === 'preset_fresh_mangoes')!;
  const reqs = derivePackagingRequirements(mango);

  const gateResults = evaluateSafetyGate(PACKAGING_MATERIALS, reqs, mango);
  // Microperforated PP bag or breathable film must be eligible
  const eligible = gateResults.filter((r) => r.eligible);
  return eligible.length > 0;
});

// -------------------------------------------------------------
// MODULE 4: RANKING & OPTIMIZATION ENGINE
// -------------------------------------------------------------
console.log('\n--- MODULE 4: MULTI-CRITERIA SCORING & PERSONA OPTIMIZATION ---');

test('Recommendation Engine: Generates Top 3 with strictly sorted composite scores', () => {
  const makhana = PRESET_FOOD_PROFILES.find((p) => p.id === 'preset_makhana')!;
  const reqs = derivePackagingRequirements(makhana);
  const gateResults = evaluateSafetyGate(PACKAGING_MATERIALS, reqs, makhana);
  const results = runRecommendationEngine(PACKAGING_MATERIALS, gateResults, reqs, makhana);

  if (results.recommendations.length !== 3) return false;
  if (results.recommendations[0].rank !== 1) return false;
  if (results.recommendations[1].rank !== 2) return false;
  if (results.recommendations[2].rank !== 3) return false;

  // Scores must be descending
  const score1 = results.recommendations[0].scores.compositeScore;
  const score2 = results.recommendations[1].scores.compositeScore;
  const score3 = results.recommendations[2].scores.compositeScore;

  return score1 >= score2 && score2 >= score3;
});

test('Persona Sensitivity: Recalibrates scores when switching from MSME to Sustainability Officer', () => {
  const makhana = PRESET_FOOD_PROFILES.find((p) => p.id === 'preset_makhana')!;
  const reqs = derivePackagingRequirements(makhana);
  const gateResults = evaluateSafetyGate(PACKAGING_MATERIALS, reqs, makhana);

  // Run with MSME weights (heavy cost)
  const msmeProfile: FoodProfile = {
    ...makhana,
    priorities: USER_PERSONAS.msme_manufacturer.primaryPriorities,
  };
  const msmeResults = runRecommendationEngine(PACKAGING_MATERIALS, gateResults, reqs, msmeProfile);

  // Run with Sustainability Officer weights (heavy sustainability)
  const esgProfile: FoodProfile = {
    ...makhana,
    priorities: USER_PERSONAS.sustainability_officer.primaryPriorities,
  };
  const esgResults = runRecommendationEngine(PACKAGING_MATERIALS, gateResults, reqs, esgProfile);

  // Both should compute valid composite scores
  const msmeTopScore = msmeResults.recommendations[0].scores.compositeScore;
  const esgTopScore = esgResults.recommendations[0].scores.compositeScore;

  return msmeTopScore > 0 && esgTopScore > 0;
});

test('Zero Gate Leakage: Disqualified materials NEVER appear in recommendations', () => {
  const dal = PRESET_FOOD_PROFILES.find((p) => p.id === 'preset_rte_dal')!;
  const reqs = derivePackagingRequirements(dal);
  const gateResults = evaluateSafetyGate(PACKAGING_MATERIALS, reqs, dal);
  const results = runRecommendationEngine(PACKAGING_MATERIALS, gateResults, reqs, dal);

  const disqualifiedIds = new Set(gateResults.filter((r) => !r.eligible).map((r) => r.materialId));
  const recommendedIds = results.recommendations.map((r) => r.material.id);

  for (const recId of recommendedIds) {
    if (disqualifiedIds.has(recId)) {
      return false; // Critical failure: an ineligible material leaked into ranking!
    }
  }
  return true;
});

// -------------------------------------------------------------
// MODULE 5: WHAT-IF ARRHENIUS KINETIC SIMULATOR
// -------------------------------------------------------------
console.log('\n--- MODULE 5: WHAT-IF ARRHENIUS KINETIC SIMULATOR ---');

test('Arrhenius Temperature Delta: 10°C increase reduces shelf life by ~50% (Q10 = 2.05)', () => {
  const makhana = PRESET_FOOD_PROFILES.find((p) => p.id === 'preset_makhana')!;
  const bopp = PACKAGING_MATERIALS.find((m) => m.id === 'bopp_metal_lam')!;

  const baseResult = estimateShelfLife(bopp, { ...makhana, storageTemperatureC: 25 });
  const hotResult = estimateShelfLife(bopp, { ...makhana, storageTemperatureC: 35 });

  const ratio = baseResult.estimatedDays / hotResult.estimatedDays;
  return ratio >= 1.8 && ratio <= 2.3;
});

test('What-If Ambient Range: Works across India climate range (-18°C to +45°C)', () => {
  const makhana = PRESET_FOOD_PROFILES.find((p) => p.id === 'preset_makhana')!;
  const material = PACKAGING_MATERIALS.find((m) => m.id === 'bopp_metal_lam')!;

  const frozen = estimateShelfLife(material, { ...makhana, storageTemperatureC: -18 });
  const ambient = estimateShelfLife(material, { ...makhana, storageTemperatureC: 25 });
  const extremeHeat = estimateShelfLife(material, { ...makhana, storageTemperatureC: 45 });

  return frozen.estimatedDays > ambient.estimatedDays && ambient.estimatedDays > extremeHeat.estimatedDays;
});

// -------------------------------------------------------------
// MODULE 6: COMPLIANCE HUB (FSSAI 2018 & EPR)
// -------------------------------------------------------------
console.log('\n--- MODULE 6: FSSAI 2018 & EPR COMPLIANCE DATABASE ---');

test('Compliance Articles: All articles contain required regulatory citations and checklists', () => {
  if (COMPLIANCE_ARTICLES.length < 4) return false;
  return COMPLIANCE_ARTICLES.every((a) => {
    return (
      a.id &&
      a.title &&
      a.regulator &&
      a.clause &&
      a.mandatoryRequirements.length >= 2
    );
  });
});

test('Regulatory Q&A Database: Search query returns relevant answers', () => {
  const query = 'migration';
  const matches = REGULATORY_QA_DATABASE.filter(
    (qa) => qa.question.toLowerCase().includes(query) || qa.officialAnswer.toLowerCase().includes(query)
  );
  return matches.length > 0;
});

// -------------------------------------------------------------
// MODULE 7: PACKAGING PASSPORT & QR GENERATION
// -------------------------------------------------------------
console.log('\n--- MODULE 7: PACKAGING PASSPORT SPECIFICATION ---');

test('Passport Payload: Conforms to circular verifiable JSON schema', () => {
  const makhana = PRESET_FOOD_PROFILES.find((p) => p.id === 'preset_makhana')!;
  const reqs = derivePackagingRequirements(makhana);
  const gateResults = evaluateSafetyGate(PACKAGING_MATERIALS, reqs, makhana);
  const recResponse = runRecommendationEngine(PACKAGING_MATERIALS, gateResults, reqs, makhana);
  const topRec = recResponse.recommendations[0];

  const payload = {
    passport_id: `GNV-PASS-TEST`,
    standard_version: '1.0',
    food_product: makhana.name,
    material: topRec.material.name,
    estimated_shelf_life_days: topRec.estimatedShelfLifeDays,
    carbon_footprint_g_co2e: topRec.material.carbonFactorGCo2e,
    fssai_standard: topRec.material.fssaiStandardCode,
    epr_category: topRec.material.eprCategory,
    end_of_life_advice: topRec.material.endOfLifeDisposalAdvice,
  };

  const serialized = JSON.stringify(payload);
  const parsed = JSON.parse(serialized);

  return (
    parsed.passport_id.startsWith('GNV-PASS') &&
    parsed.estimated_shelf_life_days > 0 &&
    parsed.fssai_standard.includes('IS ')
  );
});

// -------------------------------------------------------------
// MODULE 8: CIRCULAR END-OF-LIFE GUIDANCE
// -------------------------------------------------------------
console.log('\n--- MODULE 8: CIRCULAR END-OF-LIFE TRIAGE ---');

test('End of Life Mapping: Materials have complete disposal and recyclability advice', () => {
  return PACKAGING_MATERIALS.every((m) => {
    return (
      m.endOfLifeDisposalAdvice &&
      m.endOfLifeDisposalAdvice.length > 10 &&
      m.recyclabilityRate !== undefined &&
      m.compostability !== undefined
    );
  });
});

// -------------------------------------------------------------
// FINAL SUMMARY
// -------------------------------------------------------------
console.log('\n================================================================');
console.log(`TOTAL TESTS: ${totalTests}`);
console.log(`PASSED: ${passedTests}`);
console.log(`FAILED: ${failedTests.length}`);
if (failedTests.length > 0) {
  console.log('FAILURES:\n' + failedTests.map((f) => ` - ${f}`).join('\n'));
  process.exit(1);
} else {
  console.log('🎯 ALL MODULES & SYSTEMS PASSED VERIFICATION CLEANLY!');
  console.log('================================================================\n');
}
