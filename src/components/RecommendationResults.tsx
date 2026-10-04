import React, { useState } from 'react';
import { RecommendationResponse, RecommendationItem, PackagingMaterial } from '../types';
import { 
  Award, 
  Clock, 
  IndianRupee, 
  Leaf, 
  ShieldCheck, 
  Sliders, 
  Scale, 
  FileCheck2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface RecommendationResultsProps {
  recommendationData: RecommendationResponse;
  selectedRecommendation: RecommendationItem | null;
  setSelectedRecommendation: (item: RecommendationItem) => void;
  onNavigateToWhatIf: () => void;
  onNavigateToCompliance: () => void;
  onNavigateToPassport: () => void;
  onNavigateToEOL: () => void;
}

export const RecommendationResults: React.FC<RecommendationResultsProps> = ({
  recommendationData,
  selectedRecommendation,
  setSelectedRecommendation,
  onNavigateToWhatIf,
  onNavigateToCompliance,
  onNavigateToPassport,
  onNavigateToEOL,
}) => {
  const [expandedWhy, setExpandedWhy] = useState<number | null>(1); // default rank 1 expanded
  const [showComparisonMatrix, setShowComparisonMatrix] = useState(false);

  const top3 = recommendationData.recommendations;

  if (top3.length === 0) {
    return (
      <div className="card-surface" style={{ textAlign: 'center', padding: '3rem', margin: '2rem auto', maxWidth: '700px' }}>
        <AlertTriangle size={48} color="var(--error-600)" style={{ margin: '0 auto 1rem' }} />
        <h2>No Eligible Materials Found</h2>
        <p style={{ marginTop: '0.5rem', color: 'var(--charcoal-600)' }}>
          All evaluated materials were disqualified by the deterministic safety gate based on the current food properties. 
          Please adjust thermal processing, pH, or shelf-life targets in the Product Profiler.
        </p>
      </div>
    );
  }

  // Format evidence label
  const renderEvidenceBadge = (status: string) => {
    switch (status) {
      case 'validated_measured':
        return <span className="badge badge-success" title="Measured under NABL / ASTM conditions"><CheckCircle2 size={12} /> Validated / Measured</span>;
      case 'published_case_validated':
        return <span className="badge badge-brand" title="Backed by peer-reviewed published food packaging cases"><Sparkles size={12} /> Published-Case Validated</span>;
      case 'model_estimate':
        return <span className="badge badge-info" title="Kinetic Arrhenius simulation based on WVTR/OTR"><Info size={12} /> Model Estimate (Arrhenius)</span>;
      case 'physics_simulation':
        return <span className="badge badge-warning" title="Stress temperature accelerated calculation"><Clock size={12} /> Physics-Based Simulation</span>;
      default:
        return <span className="badge badge-info">Technical Estimate</span>;
    }
  };

  return (
    <div className="animate-fade-in" style={{ paddingTop: '1.5rem', maxWidth: '1160px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--olive-600)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
            <Award size={14} />
            <span>Phase 03: Multi-Criteria Ranked Results</span>
          </div>
          <h1 style={{ fontSize: '2.1rem', marginTop: '0.2rem' }}>Top-3 Recommended Packaging Solutions</h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--charcoal-600)', marginTop: '0.25rem' }}>
            Filtered from {recommendationData.totalMaterialsEvaluated} materials through the deterministic safety gate. Ranked transparently using weighted multi-criteria optimization.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            className="btn-secondary"
            onClick={() => setShowComparisonMatrix(!showComparisonMatrix)}
            style={{ fontSize: '0.85rem' }}
          >
            {showComparisonMatrix ? 'Hide Trade-Off Matrix' : 'Compare Dimension Scores'}
          </button>
          
          <button 
            className="btn-primary" 
            onClick={onNavigateToWhatIf}
            style={{ fontSize: '0.85rem' }}
          >
            <Sliders size={16} />
            <span>Simulate What-If Scenarios</span>
          </button>
        </div>
      </div>

      {/* Comparison Matrix Table if toggled */}
      {showComparisonMatrix && (
        <div className="card-surface animate-fade-in" style={{ marginBottom: '2.5rem', overflowX: 'auto' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Multi-Attribute Decision Comparison Matrix</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--paper-300)', color: 'var(--forest-900)' }}>
                <th style={{ padding: '0.75rem' }}>Metric / Dimension</th>
                {top3.map((rec) => (
                  <th key={rec.rank} style={{ padding: '0.75rem' }}>
                    Rank {rec.rank}: {rec.material.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--paper-200)' }}>
                <td style={{ padding: '0.65rem', fontWeight: 600 }}>Overall Composite Score</td>
                {top3.map((rec) => (
                  <td key={rec.rank} style={{ padding: '0.65rem', fontWeight: 700, color: 'var(--forest-900)' }}>
                    {rec.scores.compositeScore}/100
                  </td>
                ))}
              </tr>
              <tr style={{ borderBottom: '1px solid var(--paper-200)' }}>
                <td style={{ padding: '0.65rem' }}>Estimated Shelf Life</td>
                {top3.map((rec) => (
                  <td key={rec.rank} style={{ padding: '0.65rem' }}>
                    ~{rec.estimatedShelfLifeDays} days
                  </td>
                ))}
              </tr>
              <tr style={{ borderBottom: '1px solid var(--paper-200)' }}>
                <td style={{ padding: '0.65rem' }}>Barrier Protection Score</td>
                {top3.map((rec) => (
                  <td key={rec.rank} style={{ padding: '0.65rem' }}>
                    {rec.scores.protectionScore}/100 (WVTR: {rec.material.wvtr})
                  </td>
                ))}
              </tr>
              <tr style={{ borderBottom: '1px solid var(--paper-200)' }}>
                <td style={{ padding: '0.65rem' }}>Sustainability Score</td>
                {top3.map((rec) => (
                  <td key={rec.rank} style={{ padding: '0.65rem' }}>
                    {rec.scores.sustainabilityScore}/100 ({rec.carbonGCo2e}g CO2e)
                  </td>
                ))}
              </tr>
              <tr style={{ borderBottom: '1px solid var(--paper-200)' }}>
                <td style={{ padding: '0.65rem' }}>Unit Cost Score</td>
                {top3.map((rec) => (
                  <td key={rec.rank} style={{ padding: '0.65rem' }}>
                    ₹{rec.costEstimateInr.toFixed(2)}/pack
                  </td>
                ))}
              </tr>
              <tr style={{ borderBottom: '1px solid var(--paper-200)' }}>
                <td style={{ padding: '0.65rem' }}>EPR Classification</td>
                {top3.map((rec) => (
                  <td key={rec.rank} style={{ padding: '0.65rem', fontSize: '0.78rem' }}>
                    {rec.material.eprCategory}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Top 3 Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {top3.map((rec) => {
          const isSelected = selectedRecommendation?.material.id === rec.material.id;
          const isExpanded = expandedWhy === rec.rank;

          return (
            <div
              key={rec.rank}
              className="card-surface"
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderColor: rec.rank === 1 ? 'var(--forest-900)' : isSelected ? 'var(--sage-500)' : 'var(--paper-200)',
                boxShadow: rec.rank === 1 ? 'var(--shadow-elevated)' : 'var(--shadow-card)',
                padding: '1.75rem',
                borderWidth: rec.rank === 1 ? '2px' : '1px',
              }}
            >
              <div>
                {/* Rank Badge and Title */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <span 
                      style={{ 
                        background: rec.rank === 1 ? 'var(--forest-900)' : 'var(--sage-300)', 
                        color: rec.rank === 1 ? '#FFFFFF' : 'var(--forest-900)',
                        borderRadius: '50%',
                        width: '26px',
                        height: '26px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.85rem'
                      }}
                    >
                      {rec.rank}
                    </span>
                    <span className={`badge ${rec.rank === 1 ? 'badge-brand' : 'badge-info'}`} style={{ fontSize: '0.72rem' }}>
                      {rec.rank === 1 ? 'Best Overall Match' : rec.rank === 2 ? 'Sustainable Alternative' : 'High-Barrier Alternative'}
                    </span>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--forest-900)' }}>
                      {rec.scores.compositeScore}
                      <span style={{ fontSize: '0.78rem', color: 'var(--charcoal-600)', fontWeight: 400 }}>/100</span>
                    </div>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.35rem', minHeight: '3.2rem', display: 'flex', alignItems: 'center' }}>
                  {rec.material.name}
                </h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-600)', marginBottom: '1.25rem', minHeight: '2.5rem', lineHeight: '1.35', display: 'flex', alignItems: 'flex-start' }}>
                  {rec.material.materialType}
                </div>

                {/* Primary Metrics Strip (Evenly Aligned Across All Cards) */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                  gap: '0.5rem', 
                  background: 'var(--ivory-100)', 
                  padding: '0.85rem 0.65rem', 
                  borderRadius: 'var(--radius-md)', 
                  marginBottom: '1.25rem',
                  textAlign: 'center',
                  minHeight: '84px',
                  alignItems: 'stretch'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--charcoal-600)', minHeight: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: '1.2' }}>
                      Estimated Shelf Life
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--forest-900)', marginTop: '0.25rem' }}>
                      ~{rec.estimatedShelfLifeDays}d
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--charcoal-600)', minHeight: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: '1.2' }}>
                      Unit Cost
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--forest-900)', marginTop: '0.25rem' }}>
                      ₹{rec.costEstimateInr.toFixed(2)}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--charcoal-600)', minHeight: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: '1.2' }}>
                      Carbon Footprint
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--forest-900)', marginTop: '0.25rem' }}>
                      {rec.carbonGCo2e}g
                    </div>
                  </div>
                </div>

                {/* Evidence Status Label (Mandatory PRD requirement) */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--charcoal-600)', marginBottom: '0.3rem' }}>
                    Shelf-Life Evidence Classification:
                  </div>
                  {renderEvidenceBadge(rec.shelfLifeEvidenceStatus)}
                </div>

                {/* Technical Barrier Specifications */}
                <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-700)', marginBottom: '1.25rem', background: '#FFFFFF', border: '1px solid var(--paper-200)', borderRadius: 'var(--radius-sm)', padding: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span>WVTR (Water Vapor):</span>
                    <strong>{rec.material.wvtr} g/m²/day</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span>OTR (Oxygen Transmission):</span>
                    <strong>{rec.material.otr} cc/m²/day</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>FSSAI Specification:</span>
                    <strong>{rec.material.fssaiStandardCode}</strong>
                  </div>
                </div>

                {/* Strengths & Limitations */}
                <div style={{ marginBottom: '1.25rem', minHeight: '145px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--success-600)', marginBottom: '0.35rem' }}>
                    Key Advantages:
                  </div>
                  <ul style={{ paddingLeft: '1.1rem', fontSize: '0.76rem', color: 'var(--charcoal-700)', marginBottom: '0.65rem' }}>
                    {rec.material.strengths.slice(0, 2).map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>

                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--warning-600)', marginBottom: '0.35rem' }}>
                    Key Trade-Offs / Considerations:
                  </div>
                  <ul style={{ paddingLeft: '1.1rem', fontSize: '0.76rem', color: 'var(--charcoal-700)' }}>
                    {rec.material.limitations.slice(0, 2).map((l, i) => (
                      <li key={i}>{l}</li>
                    ))}
                  </ul>
                </div>

                {/* "Why This Packaging?" Expandable Explainability Drawer */}
                <div style={{ borderTop: '1px solid var(--paper-200)', paddingTop: '0.75rem', marginBottom: '1.25rem' }}>
                  <button
                    onClick={() => setExpandedWhy(isExpanded ? null : rec.rank)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--forest-700)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      cursor: 'pointer',
                      padding: '0.3rem 0',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <HelpCircle size={14} />
                      <span>Why this packaging?</span>
                    </span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {isExpanded && (
                    <div className="animate-fade-in" style={{ marginTop: '0.5rem', background: 'var(--sage-50)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', color: 'var(--charcoal-700)', lineHeight: '1.45' }}>
                      <p>{rec.explainabilitySummary}</p>
                      <div style={{ marginTop: '0.5rem', fontWeight: 600, fontSize: '0.72rem', color: 'var(--forest-900)' }}>
                        EPR & Circularity Note:
                      </div>
                      <div style={{ fontSize: '0.72rem' }}>{rec.material.endOfLifeDisposalAdvice}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action: Select for Packaging Passport */}
              <button
                className={isSelected ? 'btn-primary' : 'btn-secondary'}
                style={{ width: '100%', fontSize: '0.85rem' }}
                onClick={() => {
                  setSelectedRecommendation(rec);
                  onNavigateToPassport();
                }}
              >
                <span>Select for Packaging Passport</span>
                <ArrowRight size={14} />
              </button>
            </div>
          );
        })}
      </div>

      {/* HIGH-ATTENTION: 4 Advanced Decision & Circular Tools Suite */}
      <div style={{ marginTop: '2rem', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--olive-600)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              <Sparkles size={14} />
              <span>Next Steps in the Decision Workflow</span>
            </div>
            <h2 style={{ fontSize: '1.65rem', color: 'var(--forest-900)' }}>
              Advanced Decision & Circular Tools (Steps 05 to 08)
            </h2>
          </div>
          <span style={{ fontSize: '0.84rem', color: 'var(--charcoal-600)' }}>
            Explore each specialized capability below to finalize your packaging decision
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
          {/* Tool 1: What-If */}
          <div 
            onClick={onNavigateToWhatIf}
            className="card-surface" 
            style={{ 
              cursor: 'pointer', 
              border: '1.5px solid var(--paper-300)',
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              padding: '1.4rem',
              transition: 'all var(--dur-fast) var(--ease-out)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--forest-900)';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-card)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--paper-300)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-subtle)';
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', background: '#FDF3E3', color: '#B27A2A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sliders size={20} />
                </div>
                <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>Step 05</span>
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.35rem' }}>What-If Stress Simulator</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-700)', lineHeight: '1.45', marginBottom: '1rem' }}>
                Simulate heatwaves (+10°C), monsoon humidity (90% RH), and budget cuts. Observe instant Arrhenius kinetics and re-ranking deltas.
              </p>
            </div>
            <button className="btn-secondary" style={{ width: '100%', fontSize: '0.82rem', padding: '0.5rem' }}>
              <span>Launch Simulator</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Tool 2: Compliance Hub */}
          <div 
            onClick={onNavigateToCompliance}
            className="card-surface" 
            style={{ 
              cursor: 'pointer', 
              border: '1.5px solid var(--paper-300)',
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              padding: '1.4rem',
              transition: 'all var(--dur-fast) var(--ease-out)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--forest-900)';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-card)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--paper-300)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-subtle)';
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', background: '#E6EFF2', color: '#587A83', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Scale size={20} />
                </div>
                <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>Step 06</span>
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.35rem' }}>FSSAI & EPR Compliance</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-700)', lineHeight: '1.45', marginBottom: '1rem' }}>
                Audit overall migration limits (&lt;60 mg/kg under IS 9845), CPCB plastic waste EPR obligations, and access the statutory Q&A assistant.
              </p>
            </div>
            <button className="btn-secondary" style={{ width: '100%', fontSize: '0.82rem', padding: '0.5rem' }}>
              <span>Inspect Regulations</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Tool 3: Packaging Passport */}
          <div 
            onClick={onNavigateToPassport}
            className="card-surface" 
            style={{ 
              cursor: 'pointer', 
              border: '1.5px solid var(--forest-900)',
              background: '#FAF7F0',
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              padding: '1.4rem',
              transition: 'all var(--dur-fast) var(--ease-out)',
              boxShadow: 'var(--shadow-card)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-elevated)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-card)';
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', background: 'var(--forest-900)', color: '#FAF7F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileCheck2 size={20} />
                </div>
                <span className="badge badge-brand" style={{ fontSize: '0.7rem' }}>Step 07</span>
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.35rem' }}>Packaging Passport & QR</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-700)', lineHeight: '1.45', marginBottom: '1rem' }}>
                Generate official verifiable digital certificate with real dynamic QR code and test the simulated retail consumer shelf scanner.
              </p>
            </div>
            <button className="btn-primary" style={{ width: '100%', fontSize: '0.82rem', padding: '0.5rem' }}>
              <span>Generate Certificate</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Tool 4: Circular EOL */}
          <div 
            onClick={onNavigateToEOL}
            className="card-surface" 
            style={{ 
              cursor: 'pointer', 
              border: '1.5px solid var(--paper-300)',
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              padding: '1.4rem',
              transition: 'all var(--dur-fast) var(--ease-out)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--forest-900)';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-card)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--paper-300)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-subtle)';
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', background: '#E3F1E7', color: '#397A55', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Leaf size={20} />
                </div>
                <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>Step 08</span>
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.35rem' }}>Circular EOL & Salvage</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-700)', lineHeight: '1.45', marginBottom: '1rem' }}>
                Post-use composting instructions (home vs industrial), mechanical recycling segregation, and near-expiry food salvage triage protocol.
              </p>
            </div>
            <button className="btn-secondary" style={{ width: '100%', fontSize: '0.82rem', padding: '0.5rem' }}>
              <span>View EOL Protocol</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
