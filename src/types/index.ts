// Greenova Matrix — Core Type Definitions

export type EvidenceStatus = 
  | 'validated_measured'
  | 'published_case_validated'
  | 'model_estimate'
  | 'physics_simulation';

export type UserPersona = 
  | 'msme_manufacturer'
  | 'farmer_fpo'
  | 'small_business_cloud_kitchen'
  | 'sustainability_officer'
  | 'packaging_specialist';

export type FoodCategory =
  | 'dry_snacks'
  | 'fresh_produce'
  | 'bakery'
  | 'dairy'
  | 'pickles_sauces'
  | 'ready_to_eat'
  | 'frozen'
  | 'beverages';

export type SensitivityLevel = 'low' | 'medium' | 'high';

export interface FoodProfile {
  id: string;
  name: string;
  category: FoodCategory;
  moisturePercentage: number; // 0 - 100%
  waterActivityAw: number; // 0.0 - 1.0
  fatPercentage: number; // 0 - 100%
  pH: number; // 1.0 - 14.0
  oxygenSensitivity: SensitivityLevel;
  lightSensitivity: SensitivityLevel;
  heatSensitivity: SensitivityLevel;
  storageTemperatureC: number; // -20 to 50 °C
  relativeHumidityPct: number; // 20 - 95%
  targetShelfLifeDays: number; // 1 - 730 days
  distributionRoute: 'local_intracity' | 'regional_coldchain' | 'national_ambient' | 'export_sea_air';
  transportDurationDays: number;
  budgetPerPackInr: number; // ₹ per pack
  requiresHeatProcessing: boolean; // e.g. retort 121°C or hot fill > 85°C
  heatProcessingTempC?: number;
  priorities: {
    cost: number; // 1 - 5 weight
    shelfLife: number; // 1 - 5 weight
    sustainability: number; // 1 - 5 weight
    protection: number; // 1 - 5 weight
    availability: number; // 1 - 5 weight
  };
  sourceTemplateId?: string;
  optionalImageUrl?: string;
  createdAt: string;
}

export interface PackagingRequirement {
  oxygenBarrier: 'low' | 'medium' | 'high' | 'ultra_barrier';
  moistureBarrier: 'low' | 'medium' | 'high' | 'ultra_barrier';
  lightProtection: 'low' | 'medium' | 'high' | 'total_opacity';
  maxOperatingTempC: number;
  minOperatingTempC: number;
  acidResistanceRequired: boolean; // for pH < 4.0
  oilFatResistanceRequired: boolean; // for fat > 10%
  foodContactCertifiedRequired: boolean;
  requiredShelfLifeDays: number;
  reasons: string[];
}

export type MaterialCategory = 
  | 'bio_based'
  | 'paper_board'
  | 'mono_polymer'
  | 'multi_polymer'
  | 'metal'
  | 'glass'
  | 'laminate';

export interface PackagingMaterial {
  id: string;
  name: string;
  category: MaterialCategory;
  materialType: string;
  description: string;
  imageUrl?: string;
  
  // Technical Barrier Metrics
  wvtr: number; // g / m² / day (at 38°C, 90% RH) - lower is better
  otr: number; // cc / m² / day (at 23°C, 0% RH) - lower is better
  lightBarrierLevel: 'low' | 'medium' | 'high' | 'total';
  
  // Physical & Chemical Tolerance
  maxSafeTempC: number;
  minSafeTempC: number;
  acidToleranceLevel: 'poor' | 'moderate' | 'good' | 'inert'; // for acidic foods
  fatOilResistance: 'poor' | 'fair' | 'good' | 'excellent';
  punctureStrength: 'low' | 'medium' | 'high' | 'very_high';
  
  // Regulatory & Sustainability
  foodContactApproved: boolean;
  fssaiStandardCode: string; // e.g., IS 9845, IS 10146
  eprCategory: 'Category I (Rigid Plastic)' | 'Category II (Flexible Monolayer)' | 'Category III (Multilayer Plastic)' | 'Category IV (Compostable)' | 'Non-Plastic / Recyclable';
  recyclabilityRate: 'high' | 'medium' | 'low' | 'none';
  compostability: 'home' | 'industrial' | 'none';
  carbonFactorGCo2e: number; // g CO2e per 250g standard pack
  
  // Economic & Supply
  costPerUnitInr: number; // ₹ per standard retail pack unit
  availabilityInIndia: 'abundant' | 'moderate' | 'niche_specialized';
  minimumOrderQuantityUnits: number;
  
  // Qualitative
  strengths: string[];
  limitations: string[];
  endOfLifeDisposalAdvice: string;
  evidenceStatus: EvidenceStatus;
}

export interface GateRuleCheck {
  ruleId: string;
  ruleName: string;
  passed: boolean;
  reasonCode?: string;
  diagnosticDetail: string;
}

export interface MaterialSafetyResult {
  materialId: string;
  materialName: string;
  eligible: boolean;
  checks: GateRuleCheck[];
  rejectionReasons: string[];
}

export interface MaterialScoreBreakdown {
  protectionScore: number; // 0 - 100
  shelfLifeScore: number; // 0 - 100
  sustainabilityScore: number; // 0 - 100
  costScore: number; // 0 - 100
  availabilityScore: number; // 0 - 100
  compositeScore: number; // 0 - 100
}

export interface RecommendationItem {
  rank: number;
  material: PackagingMaterial;
  scores: MaterialScoreBreakdown;
  estimatedShelfLifeDays: number;
  shelfLifeEvidenceStatus: EvidenceStatus;
  shelfLifeDeltaVsTargetDays: number;
  costEstimateInr: number;
  carbonGCo2e: number;
  explainabilitySummary: string;
  tradeOffNotes: string[];
}

export interface RecommendationResponse {
  requestId: string;
  profileId: string;
  datasetVersion: string;
  ruleSetVersion: string;
  rankingVersion: string;
  timestamp: string;
  totalMaterialsEvaluated: number;
  eligibleCount: number;
  rejectedCount: number;
  safetyResults: MaterialSafetyResult[];
  requirements: PackagingRequirement;
  recommendations: RecommendationItem[]; // Top 3
}

export interface WhatIfAdjustments {
  storageTemperatureC: number;
  relativeHumidityPct: number;
  targetShelfLifeDays: number;
  budgetPerPackInr: number;
  priorities: {
    cost: number;
    shelfLife: number;
    sustainability: number;
    protection: number;
    availability: number;
  };
}

export interface PackagingPassportData {
  passportId: string;
  issueDate: string;
  validUntil: string;
  productName: string;
  category: string;
  manufacturerPersona: string;
  selectedMaterial: PackagingMaterial;
  barrierSpecs: {
    wvtr: string;
    otr: string;
    lightBarrier: string;
    tempRange: string;
  };
  metrics: {
    shelfLifeDays: number;
    shelfLifeEvidence: string;
    costInr: number;
    carbonGCo2e: number;
    recyclability: string;
    compostability: string;
    eprCategory: string;
  };
  complianceStamp: {
    fssaiStatus: string;
    fssaiClause: string;
    isStandard: string;
    heavyMetalsTested: boolean;
    migrationCompliance: string;
  };
  endOfLifeGuidance: {
    consumerAction: string;
    municipalPathway: string;
    compostGuidance?: string;
  };
  qrPayload: string;
}
