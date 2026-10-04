import React, { useState } from 'react';
import { UserPersona } from '../types';
import { USER_PERSONAS } from '../data/personas';
import { FeatureDirectoryModal, MODULES_DIRECTORY } from './FeatureDirectoryModal';
import { 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Award, 
  Sliders, 
  Scale, 
  FileCheck2, 
  Recycle,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  LayoutGrid
} from 'lucide-react';

interface NavbarProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  activePersona: UserPersona;
  setActivePersona: (persona: UserPersona) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStep,
  setCurrentStep,
  activePersona,
  setActivePersona,
}) => {
  const [isFeatureDirectoryOpen, setIsFeatureDirectoryOpen] = useState(false);

  const steps = [
    { id: 1, label: 'Overview', fullLabel: 'Home & Presets', icon: Sparkles },
    { id: 2, label: 'Profiler', fullLabel: 'Product Profiler', icon: Layers },
    { id: 3, label: 'Safety Gate', fullLabel: 'Safety Gate (14 Materials)', icon: ShieldCheck },
    { id: 4, label: 'Recommendations', fullLabel: 'Top-3 Recommendations', icon: Award },
    { id: 5, label: 'What-If', fullLabel: 'What-If Simulator', icon: Sliders },
    { id: 6, label: 'Compliance', fullLabel: 'FSSAI / EPR Hub', icon: Scale },
    { id: 7, label: 'Passport & QR', fullLabel: 'Digital Passport & QR', icon: FileCheck2 },
    { id: 8, label: 'Circular EOL', fullLabel: 'Circular End-of-Life', icon: Recycle },
  ];

  const currentStepObj = steps.find((s) => s.id === currentStep) || steps[0];

  return (
    <>
      <header className="header-glass">
        {/* Tier 1: Brand, Persona & Feature Directory Trigger */}
        <div className="header-inner">
          {/* Brand Identity */}
          <div className="brand-badge" onClick={() => setCurrentStep(1)} title="Return to Overview">
            <div className="brand-icon">G</div>
            <div>
              <div className="brand-title">Greenova Matrix</div>
              <div className="brand-subtitle">Packaging Intelligence & Decision System</div>
            </div>
          </div>

          {/* Right Action Group */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* Persona Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#FFFFFF', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-pill)', border: '1px solid var(--paper-300)' }}>
              <UserCheck size={14} color="var(--forest-700)" />
              <select
                value={activePersona}
                onChange={(e) => setActivePersona(e.target.value as UserPersona)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'var(--forest-900)',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {Object.values(USER_PERSONAS).map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            {/* HIGH-ATTENTION: Explore All 8 Modules Button */}
            <button
              onClick={() => setIsFeatureDirectoryOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: 'linear-gradient(135deg, var(--forest-900) 0%, var(--forest-800) 100%)',
                color: '#FAF7F0',
                padding: '0.45rem 0.95rem',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--forest-900)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(23, 59, 42, 0.2)',
                transition: 'all var(--dur-fast) var(--ease-out)',
              }}
              title="Click to view all 8 modules and capabilities"
            >
              <LayoutGrid size={15} color="var(--sage-300)" />
              <span>All 8 Modules</span>
              <span style={{ background: 'rgba(255, 255, 255, 0.22)', padding: '0.1rem 0.4rem', borderRadius: 'var(--radius-pill)', fontSize: '0.7rem' }}>
                Step {currentStep}/8
              </span>
            </button>

            {/* Quick Prev / Next Controls */}
            <div style={{ display: 'flex', alignItems: 'center', background: '#FFFFFF', border: '1px solid var(--paper-300)', borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
              <button
                disabled={currentStep <= 1}
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '0.4rem 0.6rem',
                  cursor: currentStep <= 1 ? 'not-allowed' : 'pointer',
                  opacity: currentStep <= 1 ? 0.35 : 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
                title="Previous Step"
              >
                <ChevronLeft size={16} />
              </button>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, padding: '0 0.2rem', color: 'var(--charcoal-700)' }}>
                {currentStep}/8
              </span>
              <button
                disabled={currentStep >= 8}
                onClick={() => setCurrentStep(Math.min(8, currentStep + 1))}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '0.4rem 0.6rem',
                  cursor: currentStep >= 8 ? 'not-allowed' : 'pointer',
                  opacity: currentStep >= 8 ? 0.35 : 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
                title="Next Step"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Tier 2: Dedicated Full-Width Pipeline Bar (No horizontal scrolling!) */}
        <div style={{ maxWidth: '1240px', margin: '0.65rem auto 0', borderTop: '1px solid var(--paper-200)', paddingTop: '0.6rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gap: '0.35rem',
            alignItems: 'center',
          }}>
            {steps.map((s) => {
              const Icon = s.icon;
              const isActive = currentStep === s.id;
              const isPast = currentStep > s.id;

              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentStep(s.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.45rem 0.25rem',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    background: isActive ? 'var(--forest-900)' : isPast ? 'var(--sage-100)' : '#FFFFFF',
                    color: isActive ? '#FAF7F0' : isPast ? 'var(--forest-800)' : 'var(--charcoal-600)',
                    cursor: 'pointer',
                    transition: 'all var(--dur-fast) var(--ease-out)',
                    borderBottom: isActive ? '3px solid var(--sage-500)' : '3px solid transparent',
                    boxShadow: isActive ? '0 2px 6px rgba(23, 59, 42, 0.2)' : 'none',
                  }}
                  title={`Go to Step ${s.id}: ${s.fullLabel}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '2px' }}>
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {s.id}
                    </span>
                    <Icon size={13} />
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Feature Directory Modal */}
      <FeatureDirectoryModal
        isOpen={isFeatureDirectoryOpen}
        onClose={() => setIsFeatureDirectoryOpen(false)}
        currentStep={currentStep}
        onSelectStep={setCurrentStep}
      />
    </>
  );
};
