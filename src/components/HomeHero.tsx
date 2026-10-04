import React from 'react';
import { UserPersona, FoodProfile } from '../types';
import { USER_PERSONAS } from '../data/personas';
import { PRESET_FOOD_PROFILES } from '../data/foodPresets';
import { MODULES_DIRECTORY } from './FeatureDirectoryModal';
import { 
  ArrowRight, 
  ShieldCheck, 
  Leaf, 
  QrCode, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  BarChart3,
  Scale,
  LayoutGrid,
  Play
} from 'lucide-react';

interface HomeHeroProps {
  onStartAnalysis: () => void;
  onSelectPreset: (preset: FoodProfile) => void;
  activePersona: UserPersona;
  setActivePersona: (persona: UserPersona) => void;
  onNavigateToStep: (step: number) => void;
  onReplayIntro?: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  onStartAnalysis,
  onSelectPreset,
  activePersona,
  setActivePersona,
  onNavigateToStep,
  onReplayIntro,
}) => {
  const currentPersona = USER_PERSONAS[activePersona];

  return (
    <div className="animate-fade-in" style={{ paddingTop: '2rem' }}>
      {/* Hero Section with Editorial Image Integration */}
      <div style={{
        background: 'linear-gradient(135deg, #173B2A 0%, #1F4A35 60%, #2B5C43 100%)',
        borderRadius: 'var(--radius-xl)',
        padding: '3rem',
        color: '#FAF7F0',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-elevated)',
        marginBottom: '2.5rem'
      }}>
        {/* Decorative ambient blur */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(143, 174, 148, 0.18) 0%, rgba(23, 59, 42, 0) 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 1.35fr) minmax(280px, 1fr)',
          gap: '2.5rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* Left Text Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.12)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-pill)', fontSize: '0.78rem', fontWeight: 600, color: 'var(--sage-300)' }}>
                <Sparkles size={14} />
                <span>FSSAI 2018 • Arrhenius Kinetic Modeling • EPR</span>
              </div>

              {onReplayIntro && (
                <button
                  onClick={onReplayIntro}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    background: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    color: '#FAF7F0',
                    padding: '0.3rem 0.75rem',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 160ms ease-out',
                  }}
                  title="Replay cinematic brand introduction"
                >
                  <Play size={12} fill="#FAF7F0" />
                  <span>Replay Intro</span>
                </button>
              )}
            </div>

            <h1 style={{ color: '#FAF7F0', fontSize: '2.8rem', fontWeight: 700, marginBottom: '1.15rem', lineHeight: 1.15 }}>
              Choose the right packaging for your food, backed by science.
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'rgba(250, 247, 240, 0.88)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              Greenova Matrix translates your product’s moisture, water activity, lipid content, and storage temperature into precise barrier requirements. Filter out unsafe materials deterministically, optimize across shelf life and carbon footprint, and generate verified digital Packaging Passports.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button 
                className="btn-primary" 
                onClick={onStartAnalysis}
                style={{ background: '#FAF7F0', color: '#173B2A', borderColor: '#FAF7F0', padding: '0.85rem 1.6rem', fontSize: '1rem' }}
              >
                <span>Begin Packaging Analysis</span>
                <ArrowRight size={18} />
              </button>

              <button 
                className="btn-secondary"
                onClick={() => {
                  const sample = PRESET_FOOD_PROFILES[0];
                  onSelectPreset(sample);
                }}
                style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#FAF7F0', borderColor: 'rgba(255, 255, 255, 0.25)', padding: '0.8rem 1.4rem' }}
              >
                <span>Try Roasted Makhana Demo</span>
              </button>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: '0 16px 36px rgba(0, 0, 0, 0.35)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              position: 'relative',
            }}>
              <img
                src="/assets/greenova_hero_banner.jpg"
                alt="Modern sustainable food packaging solutions"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(23, 59, 42, 0.85) 0%, transparent 100%)',
                padding: '1rem',
                fontSize: '0.78rem',
                color: '#FAF7F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}>
                <div>
                  <strong>Sustainable Material Matrix</strong>
                  <div style={{ fontSize: '0.7rem', color: 'var(--sage-300)' }}>Kraft Bio-barrier • Moulded Bagasse • Soda-lime Glass</div>
                </div>
                <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>IS 9845 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HIGH-ATTENTION SECTION: All 8 Platform Modules Showcase */}
      <div style={{
        background: '#FFFFFF',
        border: '2px solid var(--forest-900)',
        borderRadius: 'var(--radius-xl)',
        padding: '2.25rem',
        boxShadow: 'var(--shadow-card)',
        marginBottom: '3rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--olive-600)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              <LayoutGrid size={15} />
              <span>Complete System Architecture</span>
            </div>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--forest-900)', marginTop: '0.2rem' }}>
              All 8 Decision & Science Modules
            </h2>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--charcoal-600)' }}>
            Click on any module below to jump directly to that feature with zero side-scrolling
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.15rem' }}>
          {MODULES_DIRECTORY.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.step}
                onClick={() => onNavigateToStep(mod.step)}
                style={{
                  background: 'var(--ivory-50)',
                  border: '1px solid var(--paper-300)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all var(--dur-fast) var(--ease-out)',
                  boxShadow: 'var(--shadow-subtle)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--forest-900)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--paper-300)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-subtle)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', background: mod.bg, color: mod.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={18} />
                    </div>
                    <span className="badge badge-brand" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>
                      Step 0{mod.step}
                    </span>
                  </div>

                  <div style={{ fontWeight: 700, fontSize: '0.96rem', color: 'var(--forest-900)', marginBottom: '0.35rem' }}>
                    {mod.title}
                  </div>

                  <p style={{ fontSize: '0.78rem', color: 'var(--charcoal-700)', lineHeight: '1.45', marginBottom: '0.85rem' }}>
                    {mod.summary}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--paper-200)', paddingTop: '0.65rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.76rem', fontWeight: 700, color: 'var(--forest-800)' }}>
                  <span>Open Feature</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Persona Customization Strip */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--olive-600)', fontWeight: 700 }}>
              Tailored Decision Perspective
            </div>
            <h2 style={{ fontSize: '1.65rem' }}>Select Your Operational Persona</h2>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--charcoal-600)' }}>
            Each persona automatically calibrates multi-criteria ranking weights
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {Object.values(USER_PERSONAS).map((persona) => {
            const isSelected = activePersona === persona.id;
            return (
              <div
                key={persona.id}
                onClick={() => setActivePersona(persona.id)}
                className="card-surface"
                style={{
                  cursor: 'pointer',
                  borderColor: isSelected ? 'var(--forest-900)' : 'var(--paper-200)',
                  background: isSelected ? 'var(--sage-50)' : '#FFFFFF',
                  transform: isSelected ? 'translateY(-2px)' : 'none',
                  boxShadow: isSelected ? 'var(--shadow-card)' : 'var(--shadow-subtle)',
                  padding: '1.25rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                  <span className={`badge ${isSelected ? 'badge-brand' : 'badge-info'}`} style={{ fontSize: '0.7rem' }}>
                    {persona.badge}
                  </span>
                  {isSelected && <CheckCircle2 size={16} color="var(--forest-900)" />}
                </div>

                <div style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--forest-900)', marginBottom: '0.35rem' }}>
                  {persona.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-600)', lineHeight: '1.4' }}>
                  {persona.tagline}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '1rem', background: 'var(--ivory-100)', padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-md)', fontSize: '0.82rem', color: 'var(--charcoal-700)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Sparkles size={16} color="var(--forest-700)" />
          <span>
            <strong>Active Strategy for {currentPersona.title}: </strong> {currentPersona.focusDescription}
          </span>
        </div>
      </div>

      {/* Quick-Start Preset Foods Grid with Realistic Food Images */}
      <div style={{ marginBottom: '3.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--olive-600)', fontWeight: 700 }}>
              Food Science Templates
            </div>
            <h2 style={{ fontSize: '1.65rem' }}>Quick-Start Food Profiles</h2>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--charcoal-600)' }}>
            Pre-loaded with accurate water activity, pH, fat %, and oxygen sensitivity
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {PRESET_FOOD_PROFILES.map((preset) => (
            <div 
              key={preset.id}
              className="card-surface"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '0',
                overflow: 'hidden',
              }}
            >
              {/* Food Image Thumbnail */}
              {preset.optionalImageUrl && (
                <div style={{ height: '145px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={preset.optionalImageUrl}
                    alt={preset.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    background: 'rgba(23, 59, 42, 0.85)',
                    backdropFilter: 'blur(4px)',
                    color: '#FAF7F0',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-pill)',
                    textTransform: 'capitalize',
                  }}>
                    {preset.category.replace('_', ' ')}
                  </div>
                </div>
              )}

              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--charcoal-600)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={13} /> {preset.targetShelfLifeDays}d target
                  </span>
                </div>

                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.65rem' }}>{preset.name}</h3>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                  gap: '0.4rem', 
                  background: 'var(--ivory-100)', 
                  padding: '0.55rem', 
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.74rem',
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}>
                  <div>
                    <div style={{ color: 'var(--charcoal-600)' }}>aw</div>
                    <div style={{ fontWeight: 700, color: 'var(--forest-900)' }}>{preset.waterActivityAw.toFixed(2)}</div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--charcoal-600)' }}>Fat</div>
                    <div style={{ fontWeight: 700, color: 'var(--forest-900)' }}>{preset.fatPercentage}%</div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--charcoal-600)' }}>pH</div>
                    <div style={{ fontWeight: 700, color: 'var(--forest-900)' }}>{preset.pH.toFixed(1)}</div>
                  </div>
                </div>

                <button
                  className="btn-secondary"
                  style={{ width: '100%', fontSize: '0.82rem', padding: '0.5rem' }}
                  onClick={() => onSelectPreset(preset)}
                >
                  <span>Analyze this Product</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Architectural Pillars */}
      <div>
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 2rem' }}>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--olive-600)', fontWeight: 700 }}>
            Core Scientific Differentiators
          </div>
          <h2 style={{ fontSize: '1.75rem' }}>Built on Deterministic Food Science</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--charcoal-600)', marginTop: '0.35rem' }}>
            We do not use unregulated generative AI to invent safety rules. Our architecture separates safety gates from optimization.
          </p>
        </div>

        <div className="grid-2" style={{ gap: '1.5rem' }}>
          <div className="card-surface" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--sage-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck size={24} color="var(--forest-900)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.35rem' }}>Safety Is an Absolute Gate</h3>
              <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                A material cannot trade off safety with a high sustainability score or cheap cost. If a biopolymer softens at 50°C, it is rejected deterministically from hot-fill or retort foods with explicit reason codes.
              </p>
            </div>
          </div>

          <div className="card-surface" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--sage-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <BarChart3 size={24} color="var(--forest-900)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.35rem' }}>Arrhenius & Q10 Shelf-Life Kinetics</h3>
              <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                Estimated shelf life is modeled mathematically from transmission rates (WVTR, OTR), lipid oxidation vectors, and storage temperature, always labelled with clear evidence levels.
              </p>
            </div>
          </div>

          <div className="card-surface" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--sage-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Scale size={24} color="var(--forest-900)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.35rem' }}>India-First Regulatory Intelligence</h3>
              <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                Pre-indexed with FSSAI (Packaging) Regulations 2018, IS 9845 migration thresholds, and CPCB Plastic Waste Management EPR Categories I through IV.
              </p>
            </div>
          </div>

          <div className="card-surface" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--sage-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <QrCode size={24} color="var(--forest-900)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.35rem' }}>Digital Packaging Passport & QR</h3>
              <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                Transform your packaging decision into an immutable digital specification passport with a scannable QR code for consumer shelf engagement and composting instructions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
