import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Leaf, 
  Layers, 
  Scale,
  Cpu,
  Activity,
  QrCode
} from 'lucide-react';

interface AnimatedOpeningIntroProps {
  onComplete: () => void;
}

interface Scene {
  id: number;
  tag: string;
  headline: string;
  subheadline: string;
  image: string;
  badgeIcon: React.ElementType;
  badgeText: string;
  statLabel: string;
  statValue: string;
}

export const AnimatedOpeningIntro: React.FC<AnimatedOpeningIntroProps> = ({ onComplete }) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const scenes: Scene[] = [
    {
      id: 1,
      tag: 'ACT I • THE FOOD SCIENCE',
      headline: 'Every Food Has Unique Chemistry',
      subheadline: 'Moisture, water activity (aw), pH acidity, and lipid rancidity define precise preservation boundaries.',
      image: '/assets/makhana_snack_pack.jpg',
      badgeIcon: Layers,
      badgeText: 'Chemical Profiler Active',
      statLabel: 'Intrinsic Parameters',
      statValue: 'aw 0.28 • 18% Lipids • pH 6.2',
    },
    {
      id: 2,
      tag: 'ACT II • THE SAFETY GATE',
      headline: 'Deterministic Barrier Protection',
      subheadline: 'Strict algorithmic gating filters out incompatible materials before AI ranking. Zero safety trade-offs.',
      image: '/assets/greenova_matrix_visual.jpg',
      badgeIcon: ShieldCheck,
      badgeText: 'Safety First Gate',
      statLabel: 'Compatibility Audit',
      statValue: '14 Materials Evaluated • Retort Safe',
    },
    {
      id: 3,
      tag: 'ACT III • THE CIRCULAR FUTURE',
      headline: 'Extended Shelf Life. Zero Landfill.',
      subheadline: 'Optimized across carbon, cost, and FSSAI compliance, generating verified digital Packaging Passports.',
      image: '/assets/greenova_hero_banner.jpg',
      badgeIcon: Leaf,
      badgeText: 'Circular Lifecycle',
      statLabel: 'Passport & Circularity',
      statValue: 'IS 9845 Verified • QR Enabled',
    },
  ];

  // Timeline driver: Scene 1 (0-1.4s), Scene 2 (1.4-2.8s), Scene 3 (2.8-4.2s), Auto-Exit (4.2-4.8s)
  useEffect(() => {
    const t1 = setTimeout(() => {
      setActiveSceneIndex(1);
    }, 1400);

    const t2 = setTimeout(() => {
      setActiveSceneIndex(2);
    }, 2800);

    const t3 = setTimeout(() => {
      setIsExiting(true);
    }, 4200);

    const t4 = setTimeout(() => {
      onComplete();
    }, 4800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  const currentScene = scenes[activeSceneIndex];
  const CurrentIcon = currentScene.badgeIcon;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background: '#091A12',
        color: '#FAF7F0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '2.5rem',
        overflow: 'hidden',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'scale(1.05)' : 'scale(1)',
        filter: isExiting ? 'blur(8px)' : 'none',
        transition: 'opacity 550ms cubic-bezier(0.16, 1, 0.3, 1), transform 550ms cubic-bezier(0.16, 1, 0.3, 1), filter 550ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Background Animated Cross-Fading Hero Imagery with Ken Burns Motion */}
      {scenes.map((scene, idx) => (
        <div
          key={scene.id}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${scene.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: activeSceneIndex === idx ? 0.32 : 0,
            transform: activeSceneIndex === idx ? 'scale(1.08)' : 'scale(1.0)',
            filter: 'brightness(0.7) contrast(1.15)',
            transition: 'opacity 900ms ease-in-out, transform 4000ms ease-out',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      ))}

      {/* Atmospheric Vignette & Radial Glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(ellipse at center, rgba(9, 26, 18, 0.5) 0%, rgba(9, 26, 18, 0.95) 80%, #091A12 100%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Top Header Bar */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {/* Brand Monogram */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #FAF7F0 0%, #C8D8C7 100%)',
            color: '#173B2A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-serif)',
            fontSize: '1.35rem',
            fontWeight: 700,
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
          }}>
            G
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 700, letterSpacing: '-0.01em', color: '#FAF7F0' }}>
              Greenova Matrix
            </div>
            <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--sage-300)' }}>
              Intelligent Packaging Architecture
            </div>
          </div>
        </div>

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'rgba(250, 247, 240, 0.85)',
            borderRadius: 'var(--radius-pill)',
            padding: '0.4rem 1rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'all 160ms ease-out',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
            e.currentTarget.style.color = '#FAF7F0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.color = 'rgba(250, 247, 240, 0.85)';
          }}
        >
          Skip Intro ✕
        </button>
      </div>

      {/* Main Kinetic Center Stage */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Kinetic Phase Badge */}
        <div 
          key={`tag-${currentScene.id}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(23, 59, 42, 0.85)',
            border: '1px solid rgba(143, 174, 148, 0.4)',
            padding: '0.4rem 1rem',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.74rem',
            fontWeight: 700,
            color: 'var(--sage-300)',
            marginBottom: '1.25rem',
            boxShadow: '0 0 20px rgba(143, 174, 148, 0.25)',
            animation: 'fadeInUp 400ms ease-out',
          }}
        >
          <CurrentIcon size={14} color="#8FAE94" />
          <span>{currentScene.tag}</span>
        </div>

        {/* Dynamic Scene Headline */}
        <h1 
          key={`h1-${currentScene.id}`}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '3.6rem',
            lineHeight: 1.1,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
            color: '#FAF7F0',
            textShadow: '0 4px 24px rgba(0, 0, 0, 0.7)',
            animation: 'fadeInUp 450ms ease-out',
          }}
        >
          {currentScene.headline}
        </h1>

        {/* Dynamic Scene Subheadline */}
        <p 
          key={`p-${currentScene.id}`}
          style={{
            fontSize: '1.2rem',
            color: 'rgba(250, 247, 240, 0.9)',
            lineHeight: 1.6,
            maxWidth: '650px',
            marginBottom: '2rem',
            textShadow: '0 2px 12px rgba(0, 0, 0, 0.6)',
            animation: 'fadeInUp 500ms ease-out',
          }}
        >
          {currentScene.subheadline}
        </p>

        {/* Dynamic Scientific Live Metric Badge */}
        <div 
          key={`stat-${currentScene.id}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1rem',
            background: 'rgba(15, 40, 28, 0.85)',
            border: '1px solid rgba(143, 174, 148, 0.35)',
            backdropFilter: 'blur(12px)',
            borderRadius: 'var(--radius-pill)',
            padding: '0.55rem 1.4rem',
            fontSize: '0.82rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            animation: 'fadeInUp 550ms ease-out',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--sage-300)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#397A55', boxShadow: '0 0 8px #397A55' }} />
            <span style={{ fontWeight: 600 }}>{currentScene.statLabel}:</span>
          </div>
          <div style={{ fontWeight: 700, color: '#FAF7F0', letterSpacing: '0.02em' }}>
            {currentScene.statValue}
          </div>
        </div>
      </div>

      {/* Bottom Scene Timeline Progress Indicators */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '700px',
        width: '100%',
        margin: '0 auto',
      }}>
        {/* 3 Scene Progress Segments */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.75rem',
          marginBottom: '0.65rem',
        }}>
          {scenes.map((scene, idx) => {
            const isCompleted = activeSceneIndex > idx;
            const isCurrent = activeSceneIndex === idx;

            return (
              <div
                key={scene.id}
                style={{
                  height: '4px',
                  background: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: 'var(--radius-pill)',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    background: isCompleted || isCurrent 
                      ? 'linear-gradient(90deg, #397A55 0%, #8FAE94 100%)' 
                      : 'transparent',
                    width: isCompleted ? '100%' : isCurrent ? '100%' : '0%',
                    boxShadow: isCurrent ? '0 0 8px #8FAE94' : 'none',
                    transition: isCurrent ? 'width 1400ms linear' : 'none',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Timeline Captions */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.72rem',
          color: 'var(--sage-300)',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}>
          <span style={{ color: activeSceneIndex === 0 ? '#FAF7F0' : 'rgba(255,255,255,0.4)' }}>
            1. Food Chemistry
          </span>
          <span style={{ color: activeSceneIndex === 1 ? '#FAF7F0' : 'rgba(255,255,255,0.4)' }}>
            2. Safety Gate
          </span>
          <span style={{ color: activeSceneIndex === 2 ? '#FAF7F0' : 'rgba(255,255,255,0.4)' }}>
            3. Circular Platform
          </span>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
