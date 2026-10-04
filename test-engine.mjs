// Automated engine validation suite for Greenova Matrix
import { PACKAGING_MATERIALS } from './src/data/materialsData.ts';
import { PRESET_FOOD_PROFILES } from './src/data/foodPresets.ts';
import { derivePackagingRequirements } from './src/engine/requirementEngine.ts';
import { evaluateSafetyGate } from './src/engine/safetyGate.ts';
import { estimateShelfLife } from './src/engine/shelfLifeModel.ts';
import { runRecommendationEngine } from './src/engine/rankingEngine.ts';

console.log('========================================================');
console.log('🌿 GREENOVA MATRIX — ENGINE TEST SUITE');
console.log('========================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`❌ FAIL: ${testName}`);
    process.exitCode = 1;
  }
}

// TEST 1: Preset Food Profiles & Materials Loaded
assert(PACKAGING_MATERIALS.length === 14, `Materials dataset has 14 materials (found ${PACKAGING_MATERIALS.length})`);
assert(PRESET_FOOD_PROFILES.length === 6, `Food presets dataset has 6 presets (found ${PRESET_FOOD_PROFILES.length})`);

// TEST 2: High Acid Mango Pickle (pH 3.2) Deterministic Gate
const pickle = PRESET_FOOD_PROFILES.find(p => p.id === 'preset_mango_pickle');
const pickleReqs = derivePackagingRequirements(pickle);
const pickleGate = evaluateSafetyGate(PACKAGING_MATERIALS, pickleReqs, pickle);

assert(pickleReqs.acidResistanceRequired === true, 'Pickle (pH 3.2) triggers acidResistanceRequired');
const glassResult = pickleGate.find(r => r.materialId === 'glass_jar');
assert(glassResult && glassResult.eligible === true, 'Glass jar is eligible for high acid pickle');

// TEST 3: Retort RTE Dal (121°C) Deterministic Gate
const rteDal = PRESET_FOOD_PROFILES.find(p => p.id === 'preset_rte_dal');
const dalReqs = derivePackagingRequirements(rteDal);
const dalGate = evaluateSafetyGate(PACKAGING_MATERIALS, dalReqs, rteDal);

assert(dalReqs.maxOperatingTempC >= 121, 'RTE Dal requires >= 121°C maxOperatingTempC');

const plaResult = dalGate.find(r => r.materialId === 'pla_film');
assert(plaResult && plaResult.eligible === false, 'PLA (max 50°C) is deterministically rejected for 121°C retort');
assert(plaResult.rejectionReasons.some(r => r.includes('Thermal limit exceeded')), 'PLA has explicit THERMAL_LIMIT_EXCEEDED failure reason');

const aluResult = dalGate.find(r => r.materialId === 'alu_foil_lam');
assert(aluResult && aluResult.eligible === true, 'Aluminium foil laminate is eligible for 121°C retort');

// TEST 4: Roasted Makhana Arrhenius Shelf-Life Modeling & Q10
const makhana = PRESET_FOOD_PROFILES.find(p => p.id === 'preset_makhana');
const bopp = PACKAGING_MATERIALS.find(m => m.id === 'bopp_metal_lam');

const makhana20C = { ...makhana, storageTemperatureC: 20 };
const makhana30C = { ...makhana, storageTemperatureC: 30 };

const shelf20 = estimateShelfLife(bopp, makhana20C);
const shelf30 = estimateShelfLife(bopp, makhana30C);

assert(shelf30.estimatedDays < shelf20.estimatedDays, `Elevated temperature decreases shelf life (20°C: ${shelf20.estimatedDays}d vs 30°C: ${shelf30.estimatedDays}d)`);
const ratio = shelf20.estimatedDays / shelf30.estimatedDays;
assert(ratio >= 1.8 && ratio <= 2.3, `Arrhenius Q10 ratio is approximately 2.05 (got ${ratio.toFixed(2)})`);

// TEST 5: Transparent Multi-Criteria Ranking & Top-3
const makhanaReqs = derivePackagingRequirements(makhana);
const makhanaGate = evaluateSafetyGate(PACKAGING_MATERIALS, makhanaReqs, makhana);
const makhanaRanking = runRecommendationEngine(PACKAGING_MATERIALS, makhanaGate, makhanaReqs, makhana);

assert(makhanaRanking.recommendations.length === 3, 'Ranking engine returns exactly Top 3 recommendations');
assert(makhanaRanking.recommendations[0].rank === 1, 'First item has rank 1');
assert(makhanaRanking.recommendations[0].scores.compositeScore >= makhanaRanking.recommendations[1].scores.compositeScore, 'Recommendations are sorted by compositeScore descending');

// Verify all Top 3 are from eligible set
const eligibleIds = new Set(makhanaGate.filter(g => g.eligible).map(g => g.materialId));
const allTopEligible = makhanaRanking.recommendations.every(r => eligibleIds.has(r.material.id));
assert(allTopEligible, 'CRITICAL: Ineligible materials NEVER enter ranking stage');

console.log('\n========================================================');
console.log(`RESULTS: ${passedTests} / ${totalTests} TESTS PASSED CLEANLY! 🎯`);
console.log('========================================================');
