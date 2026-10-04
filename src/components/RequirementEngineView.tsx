import React from 'react';
import { PackagingRequirement, MaterialSafetyResult, FoodProfile } from '../types';
import { 
  ShieldCheck, 
  ShieldAlert, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  HelpCircle,
  Thermometer,
  Droplets,
  Wind,
  Sun
} from 'lucide-react';

interface RequirementEngineViewProps {
  profile: FoodProfile;
  requirements: PackagingRequirement;
  safetyResults: MaterialSafetyResult[];
  onProceedToRecommendations: () => void;
  onBackToProfiler: () => void;
}

export const RequirementEngineView: React.FC<RequirementEngineViewProps> = ({
  profile,
  requirements,
  safetyResults,
  onProceedToRecommendations,
  onBackToProfiler,
}) => {
  const eligibleMaterials = safetyResults.filter((r) => r.eligible);
  const rejectedMaterials = safetyResults.filter((r) => !r.eligible);

  return (
    <div className="animate-fade-in" style={{ paddingTop: '1.5rem', maxWidth: '1060px', margin: '0 auto' }}>
      {/* Stage Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--olive-600)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
          <Layers size={14} />
          <span>Phase 02: Requirement Derivation & Deterministic Safety Gate</span>
        </div>
        <h1 style={{ fontSize: '2.1rem', marginTop: '0.2rem' }}>Barrier Derivation & Safety Gating</h1>
        <p style={{ fontSize: '0.92rem', color: 'var(--charcoal-600)', marginTop: '0.25rem' }}>
          Translating {profile.name} ({profile.category.replace('_', ' ')}) into technical packaging specifications, followed by strict deterministic compatibility filtering.
        </p>
      </div>

      {/* Derived Requirements Grid */}
      <div className="card-surface" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layers size={18} color="var(--forest-900)" />
          <span>Derived Packaging Barrier Requirements</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {/* Oxygen Barrier */}
          <div style={{ background: 'var(--ivory-100)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--paper-200)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--forest-700)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              <Wind size={15} />
              <span>Oxygen Barrier</span>
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--forest-900)', textTransform: 'capitalize' }}>
              {requirements.oxygenBarrier.replace('_', ' ')}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--charcoal-600)', marginTop: '0.2rem' }}>
              OTR requirement calibrated for {profile.fatPercentage}% fat
            </div>
          </div>

          {/* Moisture Barrier */}
          <div style={{ background: 'var(--ivory-100)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--paper-200)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--forest-700)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              <Droplets size={15} />
              <span>Moisture Vapor Barrier</span>
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--forest-900)', textTransform: 'capitalize' }}>
              {requirements.moistureBarrier.replace('_', ' ')}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--charcoal-600)', marginTop: '0.2rem' }}>
              WVTR limit for aw {profile.waterActivityAw.toFixed(2)} in {profile.relativeHumidityPct}% RH
            </div>
          </div>

          {/* Light Protection */}
          <div style={{ background: 'var(--ivory-100)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--paper-200)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--forest-700)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              <Sun size={15} />
              <span>Light & UV Protection</span>
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--forest-900)', textTransform: 'capitalize' }}>
              {requirements.lightProtection.replace('_', ' ')}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--charcoal-600)', marginTop: '0.2rem' }}>
              {profile.lightSensitivity} sensitivity rating
            </div>
          </div>

          {/* Thermal Tolerance */}
          <div style={{ background: 'var(--ivory-100)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--paper-200)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--forest-700)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              <Thermometer size={15} />
              <span>Thermal Tolerance Range</span>
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--forest-900)' }}>
              {requirements.minOperatingTempC}°C to {requirements.maxOperatingTempC}°C
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--charcoal-600)', marginTop: '0.2rem' }}>
              {profile.requiresHeatProcessing ? 'Thermal retort processing threshold' : 'Ambient distribution margin'}
            </div>
          </div>
        </div>

        {/* Scientific Derivation Reasons */}
        <div style={{ background: 'var(--sage-50)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--sage-300)' }}>
          <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--forest-900)', marginBottom: '0.45rem' }}>
            Scientific Rationale Behind Derivation:
          </div>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.82rem', color: 'var(--charcoal-700)', lineHeight: '1.5' }}>
            {requirements.reasons.map((reason, i) => (
              <li key={i} style={{ marginBottom: '0.35rem' }}>{reason}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Safety Gate Architecture Statement */}
      <div style={{
        background: 'linear-gradient(135deg, #FAF7F0 0%, #F3EEE2 100%)',
        border: '1px solid var(--paper-300)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.5rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem'
      }}>
        <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', background: 'var(--forest-900)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <ShieldCheck size={22} />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--forest-900)' }}>
            Strict Architectural Separation: Safety = Gate | Ranking = Optimization
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--charcoal-700)', marginTop: '0.25rem', lineHeight: '1.5' }}>
            In accordance with system specifications, AI ranking optimization occurs <em>only</em> among materials that pass all deterministic safety rules. 
            An unsafe material (e.g. acidic corrosion risk or thermal deformation) is eliminated at this gate and is NEVER allowed to compensate with a low price or high eco-score.
          </p>
        </div>
      </div>

      {/* Safety Gate Outcome Matrix */}
      <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '2.5rem' }}>
        
        {/* Column 1: Eligible Materials (Passing) */}
        <div className="card-surface" style={{ borderColor: 'var(--success-600)', background: 'rgba(57, 122, 85, 0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={20} color="var(--success-600)" />
              <h3 style={{ fontSize: '1.15rem', color: 'var(--success-600)' }}>
                Eligible Materials ({eligibleMaterials.length})
              </h3>
            </div>
            <span className="badge badge-success">Passed All Gates</span>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-600)', marginBottom: '1rem' }}>
            These materials satisfied food contact, thermal limits, acidity compatibility, and target barrier requirements. They proceed to AI Ranking.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {eligibleMaterials.map((res) => (
              <div 
                key={res.materialId}
                style={{ 
                  background: '#FFFFFF', 
                  border: '1px solid var(--sage-300)', 
                  borderRadius: 'var(--radius-md)', 
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--forest-900)' }}>
                    {res.materialName}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--charcoal-600)' }}>
                    Verified across {res.checks.length} deterministic rules
                  </div>
                </div>
                <CheckCircle2 size={16} color="var(--success-600)" />
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Ineligible Materials (Rejected with Diagnostic Codes) */}
        <div className="card-surface" style={{ borderColor: 'var(--error-600)', background: 'rgba(183, 91, 82, 0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <XCircle size={20} color="var(--error-600)" />
              <h3 style={{ fontSize: '1.15rem', color: 'var(--error-600)' }}>
                Ineligible Materials ({rejectedMaterials.length})
              </h3>
            </div>
            <span className="badge badge-error">Disqualified</span>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-600)', marginBottom: '1rem' }}>
            Disqualified deterministically. The exact scientific failure reasons are preserved below for full auditability.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {rejectedMaterials.map((res) => (
              <div 
                key={res.materialId}
                style={{ 
                  background: '#FFFFFF', 
                  border: '1px solid var(--paper-300)', 
                  borderRadius: 'var(--radius-md)', 
                  padding: '0.75rem 1rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--charcoal-900)' }}>
                    {res.materialName}
                  </div>
                  <span className="badge badge-error" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
                    Failed
                  </span>
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--error-600)', lineHeight: '1.4' }}>
                  {res.rejectionReasons.map((reason, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.35rem', marginTop: '0.2rem' }}>
                      <span>•</span>
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--paper-200)' }}>
        <button className="btn-secondary" onClick={onBackToProfiler}>
          <span>Modify Food Parameters</span>
        </button>

        <button className="btn-primary" onClick={onProceedToRecommendations} style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}>
          <span>View Top-3 AI Recommendations</span>
          <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
};
