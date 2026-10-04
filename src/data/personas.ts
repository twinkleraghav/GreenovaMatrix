import { UserPersona } from '../types';

export interface PersonaConfig {
  id: UserPersona;
  title: string;
  tagline: string;
  badge: string;
  primaryPriorities: {
    cost: number;
    shelfLife: number;
    sustainability: number;
    protection: number;
    availability: number;
  };
  recommendedPresets: string[];
  focusDescription: string;
}

export const USER_PERSONAS: Record<UserPersona, PersonaConfig> = {
  msme_manufacturer: {
    id: 'msme_manufacturer',
    title: 'MSME Food Manufacturer',
    tagline: 'Balance cost, shelf-life integrity, and compliant scale',
    badge: 'MSME Growth',
    primaryPriorities: {
      cost: 4,
      shelfLife: 5,
      sustainability: 3,
      protection: 5,
      availability: 4,
    },
    recommendedPresets: ['preset_makhana', 'preset_rte_dal', 'preset_millet_cookies'],
    focusDescription: 'Prioritizes robust shelf life protection, economical unit economics (₹/pack), and verified FSSAI migration compliance for inter-state distribution.'
  },
  farmer_fpo: {
    id: 'farmer_fpo',
    title: 'Farmer / FPO Producer',
    tagline: 'Direct-from-farm produce preservation and local biodegradable packaging',
    badge: 'Agri Producer',
    primaryPriorities: {
      cost: 4,
      shelfLife: 4,
      sustainability: 5,
      protection: 4,
      availability: 4,
    },
    recommendedPresets: ['preset_fresh_mangoes', 'preset_millet_cookies'],
    focusDescription: 'Focuses on minimizing post-harvest transit losses, breathable moisture-balanced containers, and circular agricultural biomass solutions like bagasse or areca leaf.'
  },
  small_business_cloud_kitchen: {
    id: 'small_business_cloud_kitchen',
    title: 'Cloud Kitchen & Artisanal Maker',
    tagline: 'Fresh delivery, tamper-evidence, and premium consumer unboxing',
    badge: 'Artisanal / Cloud',
    primaryPriorities: {
      cost: 4,
      shelfLife: 3,
      sustainability: 4,
      protection: 4,
      availability: 5,
    },
    recommendedPresets: ['preset_fresh_paneer', 'preset_mango_pickle'],
    focusDescription: 'Demands leak-proof thermal protection, oil/grease resistance for gravies, fast local supplier availability, and low MOQs.'
  },
  sustainability_officer: {
    id: 'sustainability_officer',
    title: 'Corporate Sustainability Officer',
    tagline: 'Lifecycle carbon reduction, EPR compliance, and zero landfill waste',
    badge: 'ESG & Circularity',
    primaryPriorities: {
      cost: 2,
      shelfLife: 4,
      sustainability: 5,
      protection: 4,
      availability: 3,
    },
    recommendedPresets: ['preset_makhana', 'preset_fresh_mangoes'],
    focusDescription: 'Analyzes lifecycle gCO2e impact, recyclability rates in Indian municipal streams, home vs industrial compostability, and EPR Category III liability minimization.'
  },
  packaging_specialist: {
    id: 'packaging_specialist',
    title: 'Packaging Specialist & Food Technologist',
    tagline: 'Scientific barrier engineering, WVTR/OTR calculations, and Arrhenius modeling',
    badge: 'R&D / Science',
    primaryPriorities: {
      cost: 3,
      shelfLife: 5,
      sustainability: 4,
      protection: 5,
      availability: 4,
    },
    recommendedPresets: ['preset_rte_dal', 'preset_mango_pickle', 'preset_makhana'],
    focusDescription: 'Inspects exact barrier transmission rates, deterministic safety rule outcomes, thermal sterilization tolerances, and evidence levels.'
  }
};
