import { FoodProfile, PackagingRequirement } from '../types';

export function derivePackagingRequirements(profile: FoodProfile): PackagingRequirement {
  const reasons: string[] = [];

  // 1. Oxygen Barrier derivation
  let oxygenBarrier: 'low' | 'medium' | 'high' | 'ultra_barrier' = 'medium';
  if (profile.oxygenSensitivity === 'high' || (profile.fatPercentage > 15 && profile.targetShelfLifeDays > 60)) {
    oxygenBarrier = profile.targetShelfLifeDays > 120 ? 'ultra_barrier' : 'high';
    reasons.push(
      `High fat content (${profile.fatPercentage}%) and high oxygen sensitivity necessitate a ${oxygenBarrier.replace('_', ' ')} to prevent lipid peroxidation and oxidative off-flavors.`
    );
  } else if (profile.oxygenSensitivity === 'low' && profile.targetShelfLifeDays < 30) {
    oxygenBarrier = 'low';
    reasons.push('Low oxygen sensitivity and short target duration allow breathable or moderate gas-permeable materials.');
  } else {
    oxygenBarrier = 'medium';
    reasons.push('Moderate oxygen barrier sufficient to preserve fresh sensory notes over target distribution window.');
  }

  // 2. Moisture Barrier derivation
  let moistureBarrier: 'low' | 'medium' | 'high' | 'ultra_barrier' = 'medium';
  if (profile.waterActivityAw < 0.40 && profile.relativeHumidityPct > 60) {
    // Crisp dry foods in humid ambient
    moistureBarrier = profile.targetShelfLifeDays > 90 ? 'ultra_barrier' : 'high';
    reasons.push(
      `Low water activity (aw = ${profile.waterActivityAw.toFixed(2)}) in ${profile.relativeHumidityPct}% ambient humidity requires a high moisture-vapor barrier (WVTR < 3 g/m²/day) to prevent soggy texture and loss of crispness.`
    );
  } else if (profile.waterActivityAw > 0.90 && profile.category === 'fresh_produce') {
    // Fresh fruits/vegetables need slight breathability to avoid condensation & anaerobic rotting
    moistureBarrier = 'low';
    reasons.push('Living produce requires moisture equilibrium to prevent moisture condensation fogging and mold sporulation.');
  } else if (profile.waterActivityAw > 0.85 && profile.targetShelfLifeDays > 60) {
    moistureBarrier = 'high';
    reasons.push('High water activity liquid or semi-solid food requires leak-proof moisture retention and desiccation prevention.');
  }

  // 3. Light Protection derivation
  let lightProtection: 'low' | 'medium' | 'high' | 'total_opacity' = 'low';
  if (profile.lightSensitivity === 'high' || (profile.fatPercentage > 12 && profile.targetShelfLifeDays > 60)) {
    lightProtection = profile.targetShelfLifeDays > 120 ? 'total_opacity' : 'high';
    reasons.push(
      'Photo-oxidation sensitivity mandates opaque or high UV-blocking packaging to protect delicate micronutrients and prevent rancidity.'
    );
  } else if (profile.lightSensitivity === 'medium') {
    lightProtection = 'medium';
  }

  // 4. Operating Temperature & Heat Processing
  const operatingMax = profile.requiresHeatProcessing
    ? Math.max(profile.storageTemperatureC, profile.heatProcessingTempC || 121)
    : Math.max(profile.storageTemperatureC, 45); // India summer ambient margin

  const operatingMin = Math.min(profile.storageTemperatureC, 0);

  if (profile.requiresHeatProcessing) {
    reasons.push(
      `Thermal processing specified (${profile.heatProcessingTempC || 121}°C): Material must be certified retort/sterilization-tolerant without migration.`
    );
  }

  // 5. Chemical tolerances
  const acidResistanceRequired = profile.pH < 4.0;
  if (acidResistanceRequired) {
    reasons.push(
      `High acidity detected (pH ${profile.pH.toFixed(1)}): Demands inert lining or glass to prevent metal ion leaching and polymer breakdown.`
    );
  }

  const oilFatResistanceRequired = profile.fatPercentage >= 10;
  if (oilFatResistanceRequired) {
    reasons.push(
      `Elevated fat content (${profile.fatPercentage}%): Requires grease-proof boundary to avoid delamination, pinhole softening, and oil staining.`
    );
  }

  return {
    oxygenBarrier,
    moistureBarrier,
    lightProtection,
    maxOperatingTempC: operatingMax,
    minOperatingTempC: operatingMin,
    acidResistanceRequired,
    oilFatResistanceRequired,
    foodContactCertifiedRequired: true,
    requiredShelfLifeDays: profile.targetShelfLifeDays,
    reasons,
  };
}
