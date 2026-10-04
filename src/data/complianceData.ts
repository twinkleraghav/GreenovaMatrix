export interface ComplianceArticle {
  id: string;
  regulator: 'FSSAI' | 'CPCB_EPR' | 'BIS';
  title: string;
  clause: string;
  summary: string;
  mandatoryRequirements: string[];
  applicability: string;
  penaltyOrRisk: string;
}

export interface RegulatoryQaItem {
  id: string;
  question: string;
  category: 'fssai' | 'epr' | 'safety' | 'compostable';
  officialAnswer: string;
  statutoryReference: string;
}

export const COMPLIANCE_ARTICLES: ComplianceArticle[] = [
  {
    id: 'fssai_packaging_2018_gen',
    regulator: 'FSSAI',
    title: 'General Requirements for Food Contact Packaging (2018 Regulations)',
    clause: 'Regulation 4(1) - (7) of Food Safety & Standards (Packaging) Regulations, 2018',
    summary: 'Mandates that packaging materials must not leach substances in concentrations harmful to human health, alter food organoleptic quality, or contaminate food with heavy metals or plasticizers.',
    mandatoryRequirements: [
      'Material must comply with overall migration limit <= 60 mg/kg or 10 mg/dm² under IS 9845 testing conditions',
      'Cumulative concentration of Lead (Pb), Cadmium (Cd), Mercury (Hg), and Hexavalent Chromium (Cr VI) must not exceed 100 mg/kg',
      'No printing inks or dyes may come in direct contact with food unless specifically approved non-toxic pigments are formulated'
    ],
    applicability: 'All food business operators (FBOs) manufacturing, packing, or distributing food in India',
    penaltyOrRisk: 'Seizure of product batch under Section 38 of FSS Act, 2006 and penalties up to ₹2,00,000 for sub-standard packaging'
  },
  {
    id: 'fssai_acidic_foods',
    regulator: 'FSSAI',
    title: 'Specific Protection for Acidic & Pickled Foods',
    clause: 'Schedule I & Regulation 4(4) - Metal and Plastic Containers',
    summary: 'Foods having pH < 4.0 (pickles, chutneys, sauces, citrus juices) must never be packed in unlined tinplate, zinc, copper, or uncertified reactive polymers due to severe heavy metal ionization and polymer degradation.',
    mandatoryRequirements: [
      'Tinplate cans must have an unbroken epoxy-phenolic food grade lacquer lining tested to IS 5807',
      'Glass containers must conform to IS 11984 soda-lime food grade standards',
      'Plastics used for acidic foods must demonstrate zero plasticizer migration in 3% acetic acid simulant at 40°C for 10 days'
    ],
    applicability: 'Pickles, fermented foods, vinegar preserves, fruit pulps, tomato pastes',
    penaltyOrRisk: 'Corrosion contamination creates chemical poisoning hazard (Schedule I violation)'
  },
  {
    id: 'cpcb_epr_guidelines',
    regulator: 'CPCB_EPR',
    title: 'Plastic Waste Management Rules & EPR Categorization (2022 Amendment)',
    clause: 'Fourth Amendment Rules, Schedule II - EPR Obligations',
    summary: 'Categorizes plastic packaging into 4 distinct classes with statutory collection, recycling, and minimum recycled content mandates for Brand Owners and Producers.',
    mandatoryRequirements: [
      'Category I: Rigid plastic packaging (Must fulfill 50%-80% recycling targets)',
      'Category II: Flexible plastic of single layer or multilayer with same polymer (>50 microns)',
      'Category III: Multilayer plastic packaging (plastic + paper/foil, highest EPR fee tier)',
      'Category IV: Certified compostable plastics (Must bear CPCB registration number and QR code conforming to IS/ISO 17088)'
    ],
    applicability: 'Every brand owner, importer, and producer putting packaged plastic goods into Indian commerce',
    penaltyOrRisk: 'Environmental compensation fine levied by CPCB under polluter-pays principle'
  },
  {
    id: 'bis_compostable_plastics',
    regulator: 'BIS',
    title: 'Standard Specification for Compostable Plastics (IS/ISO 17088)',
    clause: 'Bureau of Indian Standards IS/ISO 17088:2021',
    summary: 'Establishes rigorous criteria for packaging materials claiming biodegradability and compostability without leaving toxic residues or eco-toxic ecotoxicity.',
    mandatoryRequirements: [
      '>90% biodegradation within 180 days in an industrial composting environment',
      'Disintegration so that <= 10% of original dry weight remains on a 2mm sieve after 12 weeks',
      'Must pass plant germination and terrestrial toxicity assays (must not harm soil fertility)',
      'Mandatory CPCB manufacturer registration number printed on each commercial unit'
    ],
    applicability: 'All biopolymer, PLA, PBAT, and starch-blend packaging claiming compostability',
    penaltyOrRisk: 'Ban on commercial sale and forfeiture under Single-Use Plastic prohibition notifications'
  }
];

export const REGULATORY_QA_DATABASE: RegulatoryQaItem[] = [
  {
    id: 'qa-1',
    question: 'Can I pack hot cooked gravies or dal directly into PET containers?',
    category: 'safety',
    officialAnswer: 'No. Standard PET containers soften and deform around 60°C–65°C. Filling hot gravies (>70°C) causes container deformation, structural seal failure, and elevated antimony catalyst migration into food. Use food-grade heat-stabilized Polypropylene (PP, safe up to 120°C) or thermal retort foil laminates conforming to IS 10142.',
    statutoryReference: 'FSSAI Packaging Regulations 2018, Cl. 4(2) & IS 12252 thermal limitations'
  },
  {
    id: 'qa-2',
    question: 'What is required on the label if I use certified compostable packaging in India?',
    category: 'compostable',
    officialAnswer: 'Every compostable plastic carry bag or packaging unit must clearly print: (1) "COMPOSTABLE", (2) "Conforms to IS/ISO 17088:2021", (3) Name of the certified manufacturer, and (4) The unique CPCB Registration Certificate Number with barcode/QR verification. Without this number, it is treated as illegal single-use plastic.',
    statutoryReference: 'PWM Rules 2016 (Amended 2022) Rule 11 & CPCB Notification B-17011/7/PWM'
  },
  {
    id: 'qa-3',
    question: 'Are newspapers or recycled paper allowed to wrap bakery or fried food?',
    category: 'fssai',
    officialAnswer: 'Strictly prohibited. FSSAI Regulation 4(3) explicitly prohibits the use of newspaper or any recycled uncertified paper for packaging or wrapping food. Newspaper printing inks contain aromatic amines, lead, and mineral oils that dissolve immediately into oily foods and cause serious long-term carcinogenic health risks.',
    statutoryReference: 'FSSAI Notification F.No. 1-95/Std/SP(L&C/A)/FSSAI-2015 Regulation 4(3)'
  },
  {
    id: 'qa-4',
    question: 'What is the migration limit test required for plastic packaging before commercial sale?',
    category: 'fssai',
    officialAnswer: 'All food contact plastics must be tested by an NABL-accredited laboratory for Overall Migration in accordance with IS 9845. The overall migration limit must not exceed 60 mg/kg of food or 10 mg/dm² of packaging surface when exposed to appropriate food simulants (Distilled water, 3% Acetic acid, 10% Ethanol, and n-Heptane / Rectified olive oil).',
    statutoryReference: 'Bureau of Indian Standards IS 9845:1998 & FSSAI 2018 Schedule I'
  },
  {
    id: 'qa-5',
    question: 'How does EPR (Extended Producer Responsibility) affect an MSME food brand using multilayer pouches?',
    category: 'epr',
    officialAnswer: 'Multilayer plastic packaging (such as BOPP+Met+PE or PET+Alu+PE) falls under EPR Category III. Brand owners must register on the National CPCB Centralized EPR Portal, declare total metric tonnes of packaging used annually, and purchase EPR recycling credits or partner with registered PROs to fund equivalent waste processing. Monomaterials like PE or bio-coated paper face significantly lower compliance hurdles.',
    statutoryReference: 'CPCB EPR Guidelines 2022, Guidelines on Extended Producer Responsibility for Plastic Packaging'
  }
];
