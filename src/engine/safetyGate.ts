import { PackagingMaterial, PackagingRequirement, FoodProfile, MaterialSafetyResult, GateRuleCheck } from '../types';

export function evaluateSafetyGate(
  materials: PackagingMaterial[],
  requirements: PackagingRequirement,
  profile: FoodProfile
): MaterialSafetyResult[] {
  return materials.map((material) => {
    const checks: GateRuleCheck[] = [];
    const rejectionReasons: string[] = [];

    // Rule 1: Food Contact Certification
    const foodContactPass = material.foodContactApproved;
    checks.push({
      ruleId: 'RULE_FOOD_CONTACT',
      ruleName: 'Food-Contact Grade Certification (FSSAI/IS)',
      passed: foodContactPass,
      reasonCode: foodContactPass ? undefined : 'FAIL_NO_FOOD_CONTACT_CERT',
      diagnosticDetail: foodContactPass
        ? `Passed: Certified under ${material.fssaiStandardCode}`
        : 'Failed: Lacks verified food contact migration certification under FSSAI 2018 regulations.',
    });
    if (!foodContactPass) {
      rejectionReasons.push('Lacks statutory food-contact compliance certification.');
    }

    // Rule 2: High Temperature & Heat Processing Gate
    const targetMaxTemp = requirements.maxOperatingTempC;
    const tempPass = material.maxSafeTempC >= targetMaxTemp;
    checks.push({
      ruleId: 'RULE_THERMAL_MAX',
      ruleName: 'Maximum Thermal Processing & Operating Limit',
      passed: tempPass,
      reasonCode: tempPass ? undefined : 'FAIL_THERMAL_LIMIT_EXCEEDED',
      diagnosticDetail: tempPass
        ? `Passed: Max safe limit ${material.maxSafeTempC}°C meets operating requirement of ${targetMaxTemp}°C.`
        : `Failed: Material softening temperature (${material.maxSafeTempC}°C) is lower than required thermal threshold (${targetMaxTemp}°C). Risk of thermal deformation and harmful plasticizer leaching.`,
    });
    if (!tempPass) {
      rejectionReasons.push(`Thermal limit exceeded: rated up to ${material.maxSafeTempC}°C, but process requires ${targetMaxTemp}°C.`);
    }

    // Rule 3: Low Temperature / Freezing Tolerance
    const targetMinTemp = requirements.minOperatingTempC;
    const minTempPass = material.minSafeTempC <= targetMinTemp;
    checks.push({
      ruleId: 'RULE_THERMAL_MIN',
      ruleName: 'Low-Temperature & Cold-Chain Integrity',
      passed: minTempPass,
      reasonCode: minTempPass ? undefined : 'FAIL_COLD_EMBRITTLEMENT',
      diagnosticDetail: minTempPass
        ? `Passed: Tolerant down to ${material.minSafeTempC}°C.`
        : `Failed: Polymer becomes brittle and cracks at ${targetMinTemp}°C (safe down to ${material.minSafeTempC}°C).`,
    });
    if (!minTempPass) {
      rejectionReasons.push(`Cold embrittlement risk: fails below ${material.minSafeTempC}°C.`);
    }

    // Rule 4: Acid & Corrosive Chemical Compatibility
    let acidPass = true;
    if (requirements.acidResistanceRequired) {
      acidPass = material.acidToleranceLevel === 'good' || material.acidToleranceLevel === 'inert';
      checks.push({
        ruleId: 'RULE_ACID_COMPATIBILITY',
        ruleName: 'Acidic Medium & Chemical Migration Resistance',
        passed: acidPass,
        reasonCode: acidPass ? undefined : 'FAIL_ACID_CORROSION_RISK',
        diagnosticDetail: acidPass
          ? `Passed: Acid tolerance rated as "${material.acidToleranceLevel}" (compatible with pH ${profile.pH.toFixed(1)}).`
          : `Failed: Material has insufficient acid tolerance ("${material.acidToleranceLevel}"). Acidic breakdown causes heavy metal migration or pinhole pitting at pH ${profile.pH.toFixed(1)}.`,
      });
      if (!acidPass) {
        rejectionReasons.push(`Incompatible with acidic pH ${profile.pH.toFixed(1)}: risk of chemical leaching and wall erosion.`);
      }
    }

    // Rule 5: Lipid & Oil/Fat Penetration
    let fatPass = true;
    if (requirements.oilFatResistanceRequired) {
      fatPass = material.fatOilResistance !== 'poor';
      checks.push({
        ruleId: 'RULE_FAT_OIL_RESISTANCE',
        ruleName: 'Lipid Barrier & Grease-Proof Integrity',
        passed: fatPass,
        reasonCode: fatPass ? undefined : 'FAIL_OIL_GREASE_DELAMINATION',
        diagnosticDetail: fatPass
          ? `Passed: Fat/oil resistance rated "${material.fatOilResistance}" protects against fat softening.`
          : `Failed: Porous structure absorbs oil from food (${profile.fatPercentage}% fat), resulting in greasy exterior, structural collapse, and rancidity.`,
      });
      if (!fatPass) {
        rejectionReasons.push(`Cannot contain ${profile.fatPercentage}% fat: oil will soak through matrix.`);
      }
    }

    // Rule 6: Barrier Feasibility for Long Shelf-Life
    let barrierShelfLifePass = true;
    if (profile.targetShelfLifeDays > 60) {
      // Natural open or porous materials cannot preserve food for months
      const isHighlyPorous = material.wvtr > 35 || material.otr > 150;
      if (isHighlyPorous) {
        barrierShelfLifePass = false;
        checks.push({
          ruleId: 'RULE_BARRIER_SHELF_LIFE',
          ruleName: 'Physical Barrier Feasibility for Long Shelf-Life',
          passed: false,
          reasonCode: 'FAIL_BARRIER_INSUFFICIENT_FOR_TARGET_DURATION',
          diagnosticDetail: `Failed: Water vapor transmission (${material.wvtr} g/m²/day) and oxygen transmission (${material.otr} cc/m²/day) are too porous for a ${profile.targetShelfLifeDays}-day shelf life.`,
        });
        rejectionReasons.push(`Physically unable to deliver ${profile.targetShelfLifeDays} days of preservation due to high vapor/gas transmission.`);
      }
    }

    // Rule 7: Liquid / High-Moisture Structural Integrity
    let liquidIntegrityPass = true;
    if (profile.moisturePercentage > 60 && profile.targetShelfLifeDays > 5) {
      if (material.id === 'areca_palm_tray' || material.id === 'bagasse_clamshell') {
        liquidIntegrityPass = false;
        checks.push({
          ruleId: 'RULE_MOISTURE_STRUCTURAL',
          ruleName: 'Liquid Containment Structural Stability',
          passed: false,
          reasonCode: 'FAIL_FIBER_SATURATION_LEAK',
          diagnosticDetail: 'Failed: Unlaminated natural fiber absorbs free liquid over extended storage, resulting in sogginess and microbial leakage.',
        });
        rejectionReasons.push('Cannot store high-moisture/liquid food for extended periods without structural leakage.');
      }
    }

    const eligible = checks.every((c) => c.passed);

    return {
      materialId: material.id,
      materialName: material.name,
      eligible,
      checks,
      rejectionReasons,
    };
  });
}
