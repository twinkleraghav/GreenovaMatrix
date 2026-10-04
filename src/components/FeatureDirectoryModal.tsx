import React from 'react';
import { 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Award, 
  Sliders, 
  Scale, 
  FileCheck2, 
  Recycle, 
  X, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface FeatureDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStep: number;
  onSelectStep: (step: number) => void;
}

export const MODULES_DIRECTORY = [
  {
    step: 1,
    title: 'Home & Formulation Overview',
    phase: 'Phase 1: Getting Started',
    badge: 'Overview',
    icon: Sparkles,
    color: '#173B2A',
    bg: '#EBF2EC',
    summary: 'Persona calibration (MSME, Farmer, Cloud Kitchen, ESG) and quick-start Indian food templates.',
    features: ['Persona-weighted rankings', 'Food science presets (Makhana, Achar, Mangoes)', 'System architecture breakdown'],
  },
  {
    step: 2,
    title: 'Smart Product Profiler',
    phase: 'Phase 1: Food Science',
    badge: 'Formulation',
    icon: Layers,
    color: '#2B5C43',
    bg: '#EBF2EC',
    summary: 'Configure chemical properties: water activity (aw), pH acidity, lipid %, moisture, and retort requirements.',
    features: ['Precision chemical sliders', 'Thermal retort (121°C) toggle', 'Photo-to-pack visual assistant'],
  },
  {
    step: 3,
    title: 'Deterministic Safety Gate',
    phase: 'Phase 2: Strict Gating',
    badge: 'Safety First',
    icon: ShieldCheck,
    color: '#397A55',
    bg: '#E3F1E7',
    summary: '14 packaging materials filtered deterministically. Incompatible materials eliminated with diagnostic rejection codes.',
    features: ['Zero safety trade-off rule', 'Acid, fat & thermal gate checks', 'Diagnostic audit failure codes'],
  },
  {
    step: 4,
    title: 'Top-3 Ranked Recommendations',
    phase: 'Phase 3: AI Ranking',
    badge: 'Core Results',
    icon: Award,
    color: '#173B2A',
    bg: '#FAF7F0',
    summary: 'Top-3 optimal packaging solutions scored across Protection, Shelf Life, Cost, Sustainability, and Availability.',
    features: ['Arrhenius shelf-life estimates', 'Statutory evidence badges', '"Why this packaging?" drawer'],
  },
  {
    step: 5,
    title: 'What-If Stress Simulator',
    phase: 'Phase 4: Decision Tool',
    badge: 'Sensitivity Lab',
    icon: Sliders,
    color: '#B27A2A',
    bg: '#FDF3E3',
    summary: 'Simulate heatwaves (+10°C), monsoon humidity (90% RH), and budget squeezes with live recalculation.',
    features: ['Arrhenius Q10 kinetic modeling', 'Live delta impact vs baseline', 'Dynamic priority re-weighting'],
  },
  {
    step: 6,
    title: 'FSSAI & EPR Compliance Hub',
    phase: 'Phase 4: Regulatory',
    badge: 'Statutory Audit',
    icon: Scale,
    color: '#587A83',
    bg: '#E6EFF2',
    summary: 'Verify FSSAI 2018 migration limits (IS 9845), CPCB EPR categories I–IV, and statutory Q&A assistant.',
    features: ['Overall migration checklist (<60 mg/kg)', 'Heavy metal concentration limits', 'Interactive Indian regulatory Q&A'],
  },
  {
    step: 7,
    title: 'Digital Packaging Passport & QR',
    phase: 'Phase 4: Verification',
    badge: 'Certification',
    icon: FileCheck2,
    color: '#173B2A',
    bg: '#FAF7F0',
    summary: 'Tamper-evident verifiable passport with dynamic real QR code and simulated retail shelf scanner view.',
    features: ['Real dynamic QR canvas', 'Export & printable certificate', 'Retail shelf shopper preview'],
  },
  {
    step: 8,
    title: 'Circular End-of-Life & Food Salvage',
    phase: 'Phase 4: Circularity',
    badge: 'Circularity',
    icon: Recycle,
    color: '#397A55',
    bg: '#EBF2EC',
    summary: 'Post-use guidance for composting, municipal mechanical recycling, and near-expiry food salvage triage.',
    features: ['Home vs industrial composting guide', 'Mechanical recycling segregation', 'Food-waste prevention triage matrix'],
  },
];

export const FeatureDirectoryModal: React.FC<FeatureDirectoryModalProps> = ({
  isOpen,
  onClose,
  currentStep,
  onSelectStep,
}) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(23, 59, 42, 0.72)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '1.5rem',
    }}>
      <div 
        className="card-surface animate-fade-in"
        style={{
          maxWidth: '1100px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: 'var(--radius-xl)',
          padding: '2.25rem',
          border: '2px solid var(--forest-900)',
          boxShadow: 'var(--shadow-modal)',
          background: '#FAF7F0',
        }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--paper-300)', paddingBottom: '1.25rem', marginBottom: '1.75rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--olive-600)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              <Sparkles size={14} />
              <span>Full System Map • 8 Integrated Modules</span>
            </div>
            <h2 style={{ fontSize: '1.85rem', color: 'var(--forest-900)', marginTop: '0.2rem' }}>
              Greenova Matrix Feature Directory
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--charcoal-600)', marginTop: '0.25rem' }}>
              All 8 capabilities are available at any time. Jump directly to any module to explore its specific tools.
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'var(--ivory-100)',
              border: '1px solid var(--paper-300)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--charcoal-800)',
            }}
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* 8 Features Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {MODULES_DIRECTORY.map((mod) => {
            const Icon = mod.icon;
            const isCurrent = currentStep === mod.step;

            return (
              <div
                key={mod.step}
                onClick={() => {
                  onSelectStep(mod.step);
                  onClose();
                }}
                className="card-surface"
                style={{
                  cursor: 'pointer',
                  background: isCurrent ? 'var(--sage-50)' : '#FFFFFF',
                  borderColor: isCurrent ? 'var(--forest-900)' : 'var(--paper-200)',
                  borderWidth: isCurrent ? '2px' : '1px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.25rem',
                  boxShadow: isCurrent ? 'var(--shadow-card)' : 'var(--shadow-subtle)',
                  transition: 'all var(--dur-fast) var(--ease-out)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: 'var(--radius-sm)',
                        background: mod.bg,
                        color: mod.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Icon size={18} />
                      </div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--charcoal-600)' }}>
                        Step 0{mod.step}
                      </span>
                    </div>

                    <span className="badge badge-brand" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>
                      {mod.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1rem', color: 'var(--forest-900)', marginBottom: '0.35rem' }}>
                    {mod.title}
                  </h3>

                  <p style={{ fontSize: '0.78rem', color: 'var(--charcoal-700)', lineHeight: '1.45', marginBottom: '0.75rem' }}>
                    {mod.summary}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--paper-200)', paddingTop: '0.65rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: isCurrent ? 'var(--forest-900)' : 'var(--forest-700)' }}>
                    {isCurrent ? '● Active Module' : 'Open Module →'}
                  </span>
                  {isCurrent && <CheckCircle2 size={16} color="var(--forest-900)" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--paper-300)', paddingTop: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--charcoal-600)' }}>
            Tip: You can move step-by-step through the pipeline or jump straight into What-If, Compliance, or Passport.
          </div>
          <button className="btn-secondary" onClick={onClose} style={{ fontSize: '0.85rem' }}>
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
