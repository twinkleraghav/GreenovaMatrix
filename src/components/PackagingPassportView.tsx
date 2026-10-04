import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { RecommendationItem, FoodProfile, UserPersona } from '../types';
import { USER_PERSONAS } from '../data/personas';
import { 
  FileCheck2, 
  QrCode, 
  Download, 
  Printer, 
  ShieldCheck, 
  Leaf, 
  Sparkles, 
  Clock, 
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Share2,
  Smartphone
} from 'lucide-react';

interface PackagingPassportViewProps {
  selectedRecommendation: RecommendationItem;
  profile: FoodProfile;
  activePersona: UserPersona;
  onProceedToEOL: () => void;
  onBackToResults: () => void;
}

export const PackagingPassportView: React.FC<PackagingPassportViewProps> = ({
  selectedRecommendation,
  profile,
  activePersona,
  onProceedToEOL,
  onBackToResults,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [passportId] = useState(`GNM-2026-IN-${Math.floor(100000 + Math.random() * 900000)}`);
  const [showConsumerModal, setShowConsumerModal] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const material = selectedRecommendation.material;
  const persona = USER_PERSONAS[activePersona];

  // Generate QR Code
  useEffect(() => {
    if (canvasRef.current) {
      const qrData = JSON.stringify({
        passportId,
        product: profile.name,
        category: profile.category,
        material: material.name,
        shelfLife: `${selectedRecommendation.estimatedShelfLifeDays} days`,
        fssai: material.fssaiStandardCode,
        epr: material.eprCategory,
        compost: material.compostability,
        carbonG: material.carbonFactorGCo2e,
        issuedBy: 'Greenova Matrix Decision Support Engine',
      });

      QRCode.toCanvas(
        canvasRef.current,
        qrData,
        {
          width: 180,
          margin: 1.5,
          color: {
            dark: '#173B2A',
            light: '#FAF7F0',
          },
        },
        (error) => {
          if (error) console.error('QR code generation error:', error);
        }
      );
    }
  }, [passportId, profile, material, selectedRecommendation]);

  // Trigger export celebration
  const handleExportPassport = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#173B2A', '#8FAE94', '#397A55', '#C8D8C7'],
    });
    setDownloadSuccess(true);
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <div className="animate-fade-in" style={{ paddingTop: '1.5rem', maxWidth: '1060px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--olive-600)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
            <FileCheck2 size={14} />
            <span>Phase 06: Circular Product Identity & Verification</span>
          </div>
          <h1 style={{ fontSize: '2.1rem', marginTop: '0.2rem' }}>Digital Packaging Passport & QR</h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--charcoal-600)', marginTop: '0.25rem' }}>
            A verified digital certificate uniting food properties, barrier specifications, FSSAI compliance, and consumer disposal instructions.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            className="btn-secondary" 
            onClick={() => setShowConsumerModal(true)}
            style={{ fontSize: '0.85rem' }}
          >
            <Smartphone size={16} />
            <span>Simulate Retail Shelf Scan</span>
          </button>

          <button 
            className="btn-primary" 
            onClick={handleExportPassport}
            style={{ fontSize: '0.85rem' }}
          >
            <Download size={16} />
            <span>Export & Print Certificate</span>
          </button>
        </div>
      </div>

      {/* Main Digital Passport Certificate Container */}
      <div 
        id="passport-certificate"
        style={{
          background: '#FFFFFF',
          border: '2px solid var(--forest-900)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-elevated)',
          position: 'relative',
          marginBottom: '2.5rem',
          overflow: 'hidden',
        }}
      >
        {/* Certificate Decorative Border */}
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          right: '8px',
          bottom: '8px',
          border: '1px solid var(--paper-200)',
          borderRadius: 'calc(var(--radius-xl) - 4px)',
          pointerEvents: 'none',
        }} />

        {/* Certificate Header Banner */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--paper-300)', paddingBottom: '1.5rem', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
              <div style={{ width: '32px', height: '32px', background: 'var(--forest-900)', color: '#FAF7F0', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontFamily: 'var(--font-serif)' }}>
                G
              </div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--forest-900)' }}>
                Greenova Matrix
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--olive-600)', fontWeight: 600 }}>
              Official Circular Packaging Passport Certificate
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'monospace', fontSize: '1.05rem', fontWeight: 700, color: 'var(--forest-900)' }}>
              {passportId}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--charcoal-600)', marginTop: '2px' }}>
              Issued: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
            </div>
          </div>
        </div>

        {/* Certificate Body Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1.8fr) minmax(220px, 1fr)', gap: '2rem', marginBottom: '2rem' }}>
          
          {/* Left Details Column */}
          <div>
            {/* Food & Packaging Overview */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--charcoal-600)', fontWeight: 600 }}>
                Certified Product & Packaging Combination
              </div>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--forest-900)', marginTop: '0.2rem', marginBottom: '0.25rem' }}>
                {profile.name}
              </h2>
              <div style={{ fontSize: '0.86rem', color: 'var(--forest-700)', fontWeight: 600 }}>
                Selected Medium: {material.name} ({material.materialType})
              </div>
            </div>

            {/* Technical Specifications Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '1rem', 
              background: 'var(--ivory-50)', 
              padding: '1.25rem', 
              borderRadius: 'var(--radius-md)', 
              border: '1px solid var(--paper-200)',
              marginBottom: '1.5rem',
              fontSize: '0.82rem'
            }}>
              <div>
                <span style={{ color: 'var(--charcoal-600)' }}>Water Vapor Rate (WVTR):</span>
                <div style={{ fontWeight: 700, color: 'var(--forest-900)' }}>{material.wvtr} g/m²/day</div>
              </div>

              <div>
                <span style={{ color: 'var(--charcoal-600)' }}>Oxygen Transmission (OTR):</span>
                <div style={{ fontWeight: 700, color: 'var(--forest-900)' }}>{material.otr} cc/m²/day</div>
              </div>

              <div>
                <span style={{ color: 'var(--charcoal-600)' }}>Operating Temp Envelope:</span>
                <div style={{ fontWeight: 700, color: 'var(--forest-900)' }}>{material.minSafeTempC}°C to {material.maxSafeTempC}°C</div>
              </div>

              <div>
                <span style={{ color: 'var(--charcoal-600)' }}>Estimated Shelf Life:</span>
                <div style={{ fontWeight: 700, color: 'var(--forest-900)' }}>~{selectedRecommendation.estimatedShelfLifeDays} Days ({selectedRecommendation.shelfLifeEvidenceStatus})</div>
              </div>
            </div>

            {/* Regulatory & Environmental Compliance Seals */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div style={{ background: '#FFFFFF', border: '1px solid var(--sage-300)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--forest-900)', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                  <ShieldCheck size={16} color="var(--success-600)" />
                  <span>FSSAI Migration Seal</span>
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--charcoal-700)' }}>
                  Certified to {material.fssaiStandardCode}. Overall migration &lt; 60 mg/kg under IS 9845.
                </div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid var(--sage-300)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--forest-900)', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                  <Leaf size={16} color="var(--forest-700)" />
                  <span>Circular EPR Rating</span>
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--charcoal-700)' }}>
                  {material.eprCategory}. Carbon: {material.carbonFactorGCo2e}g CO2e/pack.
                </div>
              </div>
            </div>
          </div>

          {/* Right QR Column */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: 'var(--ivory-50)', 
            padding: '1.5rem', 
            borderRadius: 'var(--radius-lg)', 
            border: '1px solid var(--paper-200)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--forest-900)', marginBottom: '0.75rem' }}>
              Scan to Verify Packaging
            </div>

            {/* Dynamic Real QR Code Canvas */}
            <div style={{ background: '#FAF7F0', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--paper-300)', boxShadow: 'var(--shadow-subtle)', marginBottom: '0.75rem' }}>
              <canvas ref={canvasRef} style={{ display: 'block' }} />
            </div>

            <div style={{ fontSize: '0.72rem', color: 'var(--charcoal-600)', maxWidth: '200px', lineHeight: '1.4' }}>
              On-pack dynamic QR connects consumers directly to recyclability guidance and farm/batch provenance.
            </div>

            <button
              onClick={() => setShowConsumerModal(true)}
              className="btn-subtle"
              style={{ marginTop: '0.75rem', fontSize: '0.75rem' }}
            >
              <span>Preview Consumer View</span>
              <Smartphone size={13} />
            </button>
          </div>

        </div>

        {/* End of Life Consumer Action Stamp */}
        <div style={{ 
          background: 'var(--sage-50)', 
          border: '1px solid var(--sage-300)', 
          borderRadius: 'var(--radius-md)', 
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--forest-900)' }}>
              Consumer On-Pack Disposal Guidance:
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-700)' }}>
              {material.endOfLifeDisposalAdvice}
            </div>
          </div>

          <span className="badge badge-brand">
            Compostability: {material.compostability.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Simulated Retail Consumer Shelf Scanner Modal */}
      {showConsumerModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(23, 59, 42, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem',
        }}>
          <div className="card-surface animate-fade-in" style={{ maxWidth: '420px', width: '100%', borderRadius: 'var(--radius-xl)', padding: '2rem', border: '2px solid var(--forest-900)', boxShadow: 'var(--shadow-modal)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--forest-900)', fontWeight: 700 }}>
                <Smartphone size={18} />
                <span>Consumer Shelf Scan View</span>
              </div>
              <button 
                onClick={() => setShowConsumerModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--charcoal-600)' }}
              >
                ✕
              </button>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--sage-100)', color: 'var(--forest-900)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
                <Leaf size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem' }}>{profile.name}</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-600)' }}>
                Packaging Passport: <code>{passportId}</code>
              </div>
            </div>

            <div style={{ background: 'var(--ivory-50)', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              <div>📦 <strong>Material: </strong>{material.name}</div>
              <div>🌱 <strong>Disposal: </strong>{material.endOfLifeDisposalAdvice}</div>
              <div>🌍 <strong>Carbon Impact: </strong>{material.carbonFactorGCo2e}g CO2e per pack</div>
              <div>✅ <strong>Safety: </strong>FSSAI IS 9845 migration compliant</div>
            </div>

            <button 
              className="btn-primary" 
              style={{ width: '100%', fontSize: '0.88rem' }}
              onClick={() => setShowConsumerModal(false)}
            >
              <span>Close Shelf Preview</span>
            </button>
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--paper-200)' }}>
        <button className="btn-secondary" onClick={onBackToResults}>
          <span>Back to Recommendation Results</span>
        </button>

        <button className="btn-primary" onClick={onProceedToEOL} style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}>
          <span>Inspect Circular End-of-Life Guidance</span>
          <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
};
