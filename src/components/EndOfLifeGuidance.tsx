import React from 'react';
import { RecommendationItem, FoodProfile } from '../types';
import { 
  Recycle, 
  Leaf, 
  RotateCcw, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Apple,
  TrendingDown,
  Layers
} from 'lucide-react';

interface EndOfLifeGuidanceProps {
  selectedRecommendation: RecommendationItem | null;
  profile: FoodProfile;
  onRestartAnalysis: () => void;
  onBackToPassport: () => void;
}

export const EndOfLifeGuidance: React.FC<EndOfLifeGuidanceProps> = ({
  selectedRecommendation,
  profile,
  onRestartAnalysis,
  onBackToPassport,
}) => {
  const material = selectedRecommendation?.material;

  return (
    <div className="animate-fade-in" style={{ paddingTop: '1.5rem', maxWidth: '1060px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--olive-600)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
            <Recycle size={14} />
            <span>Phase 07: Circular Economy & Food Waste Prevention</span>
          </div>
          <h1 style={{ fontSize: '2.1rem', marginTop: '0.2rem' }}>Circular End-of-Life Guidance</h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--charcoal-600)', marginTop: '0.25rem' }}>
            Responsible post-use pathways for {material?.name || 'selected packaging'} and inventory triage to eliminate food waste.
          </p>
        </div>

        <button className="btn-primary" onClick={onRestartAnalysis} style={{ fontSize: '0.88rem' }}>
          <RotateCcw size={15} />
          <span>Start New Packaging Analysis</span>
        </button>
      </div>

      {/* Selected Material Disposal Strategy Banner */}
      {material && (
        <div className="card-surface" style={{ background: 'var(--ivory-100)', borderColor: 'var(--paper-300)', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', background: 'var(--forest-900)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Leaf size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--olive-600)', fontWeight: 700 }}>
                  Tailored Disposal Pathway
                </div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--forest-900)' }}>{material.name}</h3>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span className="badge badge-brand">
                Compostability: {material.compostability.toUpperCase()}
              </span>
              <span className="badge badge-success">
                Recyclability: {material.recyclabilityRate.toUpperCase()}
              </span>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--paper-200)', fontSize: '0.86rem', color: 'var(--charcoal-800)', lineHeight: '1.6' }}>
            <strong>Municipal & Consumer Segregation Instruction: </strong>
            {material.endOfLifeDisposalAdvice}
          </div>
        </div>
      )}

      {/* 4 Circular Pathways Grid */}
      <h2 style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>4 Responsible End-of-Life Pathways</h2>

      <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '2.5rem' }}>
        
        {/* Pathway 1: Composting */}
        <div className="card-surface">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', background: 'var(--sage-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Leaf size={20} color="var(--forest-900)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem' }}>Nutrient Cycle & Composting</h3>
              <div style={{ fontSize: '0.74rem', color: 'var(--olive-600)', fontWeight: 600 }}>Home & Industrial Soil Return</div>
            </div>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--charcoal-700)', lineHeight: '1.5', marginBottom: '1rem' }}>
            Applicable for naturally shed Areca leaf, unlaminated Bagasse, and certified IS/ISO 17088 biopolymers. Converts post-consumer fiber into nutrient-rich soil humus.
          </p>

          <div style={{ background: 'var(--ivory-50)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', lineHeight: '1.5' }}>
            <div>• <strong>Home Compost: </strong>Shred material into &lt; 2-inch pieces. Mix with brown dry leaves (Carbon) and wet food waste (Nitrogen) at 2:1 ratio. Maintains moisture at 50%.</div>
            <div style={{ marginTop: '0.4rem' }}>• <strong>Timeline: </strong>Areca/Bagasse degrades within 6–10 weeks in Indian warm weather; industrial biopolymers require municipal aerated composting at &gt;58°C.</div>
          </div>
        </div>

        {/* Pathway 2: Mechanical Recycling */}
        <div className="card-surface">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', background: 'var(--sage-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Recycle size={20} color="var(--forest-900)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem' }}>Mechanical Reprocessing</h3>
              <div style={{ fontSize: '0.74rem', color: 'var(--olive-600)', fontWeight: 600 }}>Dry Segregated Stream</div>
            </div>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--charcoal-700)', lineHeight: '1.5', marginBottom: '1rem' }}>
            Applicable for rigid PET bottles, HDPE jars, PP containers, and repulpable barrier paper. High economic value in the Indian kabadiwala scrap network.
          </p>

          <div style={{ background: 'var(--ivory-50)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', lineHeight: '1.5' }}>
            <div>• <strong>Consumer Action: </strong>Rinse food residue to prevent mold contamination. Remove shrink sleeves and adhesive seals. Keep dry.</div>
            <div style={{ marginTop: '0.4rem' }}>• <strong>EPR Destination: </strong>Pelletized into recycled granules for secondary non-food applications (textiles, crates, pipes).</div>
          </div>
        </div>

        {/* Pathway 3: Refill & Secondary Life */}
        <div className="card-surface">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', background: 'var(--sage-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RotateCcw size={20} color="var(--forest-900)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem' }}>Refill & Closed-Loop Reuse</h3>
              <div style={{ fontSize: '0.74rem', color: 'var(--olive-600)', fontWeight: 600 }}>Zero Waste Reusability</div>
            </div>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--charcoal-700)', lineHeight: '1.5', marginBottom: '1rem' }}>
            Applicable for heavy flint glass jars, steel cans, and heavy rigid containers. Eliminates single-use waste entirely by returning containers through deposit-return systems.
          </p>

          <div style={{ background: 'var(--ivory-50)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', lineHeight: '1.5' }}>
            <div>• <strong>Sterilization: </strong>Hot water wash at 85°C with food-grade sanitization.</div>
            <div style={{ marginTop: '0.4rem' }}>• <strong>Circularity: </strong>Reusing a glass container 10 times slashes life-cycle greenhouse emissions by over 78%.</div>
          </div>
        </div>

        {/* Pathway 4: Energy Co-Processing */}
        <div className="card-surface">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', background: 'var(--sage-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Trash2 size={20} color="var(--forest-900)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem' }}>Cement Kiln Co-Processing</h3>
              <div style={{ fontSize: '0.74rem', color: 'var(--olive-600)', fontWeight: 600 }}>EPR Category III Multi-Layers</div>
            </div>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--charcoal-700)', lineHeight: '1.5', marginBottom: '1rem' }}>
            For unrecyclable metallised laminates (BOPP/Met or PET/Alu/PE). Must never go to open dumps or burning pits.
          </p>

          <div style={{ background: 'var(--ivory-50)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', lineHeight: '1.5' }}>
            <div>• <strong>Thermal Energy Recovery: </strong>High calorific value flexible plastics are co-processed inside cement kilns at &gt;1400°C without toxic dioxin ash.</div>
            <div style={{ marginTop: '0.4rem' }}>• <strong>EPR Mandate: </strong>Brand owners purchase Category III certificates to fund this safe diversion.</div>
          </div>
        </div>

      </div>

      {/* Near-Expiry Food Waste Salvage Matrix (Mandatory PRD Requirement) */}
      <div className="card-surface" style={{ border: '2px solid var(--sage-500)', background: 'var(--sage-50)', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', background: 'var(--forest-900)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Apple size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--forest-900)' }}>
              Food-Waste Prevention & Shelf-Life Salvage Protocol
            </h3>
            <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-700)' }}>
              The highest greenhouse gas impact of food packaging is when food is allowed to spoil and rot.
            </div>
          </div>
        </div>

        <p style={{ fontSize: '0.84rem', color: 'var(--charcoal-800)', lineHeight: '1.55', marginBottom: '1.25rem' }}>
          Distinguish food that is still safe for consumption from spoiled food. Implement proactive inventory triage before expiry:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {/* Triage 1: 75% Shelf Life */}
          <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--paper-300)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>75% Shelf Life Elapsed</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--forest-900)', marginBottom: '0.25rem' }}>
              Secondary Clearance & Flash Sales
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-700)', lineHeight: '1.45' }}>
              Food remains 100% microbiologically safe. Route to quick-commerce clearance or discounted bulk institutional catering before sensory staling begins.
            </div>
          </div>

          {/* Triage 2: Repurposing & Dehydration */}
          <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--paper-300)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>Near Softening Point</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--forest-900)', marginBottom: '0.25rem' }}>
              Culinary Re-Processing
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-700)', lineHeight: '1.45' }}>
              Convert surplus produce into purees, chutneys, dehydrated fruit crisps, or pickled condiments to reset the shelf-life clock by 6–12 months.
            </div>
          </div>

          {/* Triage 3: Spoiled Food Segregation */}
          <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--paper-300)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <span className="badge badge-error" style={{ fontSize: '0.7rem' }}>Microbial Spoilage</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--error-600)', marginBottom: '0.25rem' }}>
              Biogas & Composting Diversion
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-700)', lineHeight: '1.45' }}>
              Never consume spoiled food. Depackage organic contents into municipal biomethanation (biogas) or wet organic compost. Clean packaging for recycling.
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--paper-200)' }}>
        <button className="btn-secondary" onClick={onBackToPassport}>
          <span>Back to Packaging Passport</span>
        </button>

        <button className="btn-primary" onClick={onRestartAnalysis} style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}>
          <span>Restart Analysis with New Food</span>
          <RotateCcw size={18} />
        </button>
      </div>

    </div>
  );
};
