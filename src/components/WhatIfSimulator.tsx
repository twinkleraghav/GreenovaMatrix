import React, { useState, useEffect } from 'react';
import { FoodProfile, PackagingMaterial } from '../types';
import { PACKAGING_MATERIALS } from '../data/materialsData';
import { derivePackagingRequirements } from '../engine/requirementEngine';
import { evaluateSafetyGate } from '../engine/safetyGate';
import { runRecommendationEngine } from '../engine/rankingEngine';
import { 
  Sliders, 
  RotateCcw, 
  ArrowRight, 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  Thermometer,
  Droplets,
  Calendar,
  IndianRupee,
  Sparkles
} from 'lucide-react';

interface WhatIfSimulatorProps {
  originalProfile: FoodProfile;
  onApplyWhatIfToMain: (updatedProfile: FoodProfile) => void;
  onBackToResults: () => void;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({
  originalProfile,
  onApplyWhatIfToMain,
  onBackToResults,
}) => {
  // Local state for what-if operating parameters
  const [simTemp, setSimTemp] = useState<number>(originalProfile.storageTemperatureC);
  const [simHumidity, setSimHumidity] = useState<number>(originalProfile.relativeHumidityPct);
  const [simShelfLife, setSimShelfLife] = useState<number>(originalProfile.targetShelfLifeDays);
  const [simBudget, setSimBudget] = useState<number>(originalProfile.budgetPerPackInr);
  
  // Weights
  const [wCost, setWCost] = useState<number>(originalProfile.priorities.cost);
  const [wShelf, setWShelf] = useState<number>(originalProfile.priorities.shelfLife);
  const [wSust, setWSust] = useState<number>(originalProfile.priorities.sustainability);

  // Recalculated state
  const [simulatedProfile, setSimulatedProfile] = useState<FoodProfile>(originalProfile);
  const [simulatedResult, setSimulatedResult] = useState(() => {
    const reqs = derivePackagingRequirements(originalProfile);
    const gate = evaluateSafetyGate(PACKAGING_MATERIALS, reqs, originalProfile);
    return runRecommendationEngine(PACKAGING_MATERIALS, gate, reqs, originalProfile);
  });

  // Original baseline results for delta comparison
  const baselineResult = React.useMemo(() => {
    const reqs = derivePackagingRequirements(originalProfile);
    const gate = evaluateSafetyGate(PACKAGING_MATERIALS, reqs, originalProfile);
    return runRecommendationEngine(PACKAGING_MATERIALS, gate, reqs, originalProfile);
  }, [originalProfile]);

  // Recalculate on any slider change
  useEffect(() => {
    const updated: FoodProfile = {
      ...originalProfile,
      storageTemperatureC: simTemp,
      relativeHumidityPct: simHumidity,
      targetShelfLifeDays: simShelfLife,
      budgetPerPackInr: simBudget,
      priorities: {
        ...originalProfile.priorities,
        cost: wCost,
        shelfLife: wShelf,
        sustainability: wSust,
      },
    };

    setSimulatedProfile(updated);
    const reqs = derivePackagingRequirements(updated);
    const gate = evaluateSafetyGate(PACKAGING_MATERIALS, reqs, updated);
    const result = runRecommendationEngine(PACKAGING_MATERIALS, gate, reqs, updated);
    setSimulatedResult(result);
  }, [simTemp, simHumidity, simShelfLife, simBudget, wCost, wShelf, wSust, originalProfile]);

  // Reset to original
  const handleReset = () => {
    setSimTemp(originalProfile.storageTemperatureC);
    setSimHumidity(originalProfile.relativeHumidityPct);
    setSimShelfLife(originalProfile.targetShelfLifeDays);
    setSimBudget(originalProfile.budgetPerPackInr);
    setWCost(originalProfile.priorities.cost);
    setWShelf(originalProfile.priorities.shelfLife);
    setWSust(originalProfile.priorities.sustainability);
  };

  const baselineTop = baselineResult.recommendations[0];
  const simulatedTop = simulatedResult.recommendations[0];

  const tempDelta = simTemp - originalProfile.storageTemperatureC;
  const humidityDelta = simHumidity - originalProfile.relativeHumidityPct;

  return (
    <div className="animate-fade-in" style={{ paddingTop: '1.5rem', maxWidth: '1160px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--olive-600)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
            <Sliders size={14} />
            <span>Phase 04: What-If Stress Testing & Sensitivity Analysis</span>
          </div>
          <h1 style={{ fontSize: '2.1rem', marginTop: '0.2rem' }}>What-If Operating Simulator</h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--charcoal-600)', marginTop: '0.25rem' }}>
            Simulate real-world Indian distribution challenges: heat waves, monsoon humidity spikes, and budget squeezes. See how shelf life and safety gates adapt instantly.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn-secondary" onClick={handleReset} style={{ fontSize: '0.85rem' }}>
            <RotateCcw size={15} />
            <span>Reset to Baseline</span>
          </button>
          
          <button 
            className="btn-primary" 
            onClick={() => onApplyWhatIfToMain(simulatedProfile)}
            style={{ fontSize: '0.85rem' }}
          >
            <span>Apply This Scenario</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Simulator Layout: Controls on Left, Live Outcome on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 1fr) minmax(420px, 1.3fr)', gap: '1.75rem', marginBottom: '3rem' }}>
        
        {/* Left Column: Interactive Sliders */}
        <div className="card-surface" style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--forest-900)', borderBottom: '1px solid var(--paper-200)', paddingBottom: '0.75rem' }}>
            Operating Stress Variables
          </div>

          {/* Temperature Slider */}
          <div className="slider-container">
            <div className="form-label">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Thermometer size={16} color="var(--forest-700)" />
                <span>Ambient Storage Temperature</span>
              </span>
              <span style={{ fontWeight: 700, color: simTemp > 35 ? 'var(--warning-600)' : 'var(--forest-900)' }}>
                {simTemp}°C {tempDelta !== 0 && `(${tempDelta > 0 ? `+${tempDelta}` : tempDelta}°C)`}
              </span>
            </div>
            <input
              type="range"
              className="custom-range"
              min="0"
              max="45"
              step="1"
              value={simTemp}
              onChange={(e) => setSimTemp(parseInt(e.target.value))}
            />
            <span className="form-hint">
              Arrhenius kinetics: +10°C elevation roughly doubles the food deterioration rate (Q10 ≈ 2.05).
            </span>
          </div>

          {/* Relative Humidity Slider */}
          <div className="slider-container">
            <div className="form-label">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Droplets size={16} color="var(--forest-700)" />
                <span>Ambient Relative Humidity</span>
              </span>
              <span style={{ fontWeight: 700, color: simHumidity > 80 ? 'var(--warning-600)' : 'var(--forest-900)' }}>
                {simHumidity}% {humidityDelta !== 0 && `(${humidityDelta > 0 ? `+${humidityDelta}` : humidityDelta}%)`}
              </span>
            </div>
            <input
              type="range"
              className="custom-range"
              min="30"
              max="95"
              step="5"
              value={simHumidity}
              onChange={(e) => setSimHumidity(parseInt(e.target.value))}
            />
            <span className="form-hint">
              Simulates dry desert vs coastal monsoon conditions in India.
            </span>
          </div>

          {/* Target Shelf Life Days */}
          <div className="slider-container">
            <div className="form-label">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={16} color="var(--forest-700)" />
                <span>Target Shelf Life (Days)</span>
              </span>
              <span style={{ fontWeight: 700, color: 'var(--forest-900)' }}>
                {simShelfLife} Days
              </span>
            </div>
            <input
              type="range"
              className="custom-range"
              min="7"
              max="365"
              step="7"
              value={simShelfLife}
              onChange={(e) => setSimShelfLife(parseInt(e.target.value))}
            />
          </div>

          {/* Unit Budget in INR */}
          <div className="slider-container">
            <div className="form-label">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <IndianRupee size={16} color="var(--forest-700)" />
                <span>Packaging Budget (₹ / Pack)</span>
              </span>
              <span style={{ fontWeight: 700, color: 'var(--forest-900)' }}>
                ₹{simBudget.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              className="custom-range"
              min="1"
              max="25"
              step="0.5"
              value={simBudget}
              onChange={(e) => setSimBudget(parseFloat(e.target.value))}
            />
          </div>

          {/* Priority Slider: Cost vs Sustainability */}
          <div style={{ background: 'var(--ivory-100)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--paper-200)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--forest-900)', marginBottom: '0.75rem' }}>
              Dynamic Priority Calibration
            </div>

            <div style={{ marginBottom: '0.75rem' }}>
              <div className="form-label" style={{ fontSize: '0.78rem' }}>
                <span>Sustainability Weight</span>
                <span>{wSust}/5</span>
              </div>
              <input
                type="range"
                className="custom-range"
                min="1"
                max="5"
                value={wSust}
                onChange={(e) => setWSust(parseInt(e.target.value))}
              />
            </div>

            <div>
              <div className="form-label" style={{ fontSize: '0.78rem' }}>
                <span>Cost Sensitivity Weight</span>
                <span>{wCost}/5</span>
              </div>
              <input
                type="range"
                className="custom-range"
                min="1"
                max="5"
                value={wCost}
                onChange={(e) => setWCost(parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Live Recalculation Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Real-time Dynamic Delta Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #173B2A 0%, #1F4A35 100%)',
            color: '#FAF7F0',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-card)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Sparkles size={18} color="var(--sage-300)" />
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--sage-300)', fontWeight: 700 }}>
                Live Scenario Impact
              </div>
            </div>

            <div style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.65rem' }}>
              {simulatedTop?.material.name} holds Rank #1 ({simulatedTop?.scores.compositeScore}/100)
            </div>

            <p style={{ fontSize: '0.85rem', color: 'rgba(250, 247, 240, 0.9)', lineHeight: '1.5' }}>
              {tempDelta > 5
                ? `⚠️ Ambient temperature elevated by +${tempDelta}°C. Microbial degradation rate increased by ~${(Math.pow(2.05, tempDelta / 10)).toFixed(1)}x. Materials with high gas permeability experience accelerated oxidation.`
                : tempDelta < -5
                ? `❄️ Temperature reduced by ${Math.abs(tempDelta)}°C. Chemical kinetics slowed down, extending shelf life across all eligible barriers.`
                : 'Operating under standard baseline temperature envelope.'}
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.12)', padding: '0.45rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem' }}>
                Eligible Materials: <strong>{simulatedResult.eligibleCount} / {simulatedResult.totalMaterialsEvaluated}</strong>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.12)', padding: '0.45rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem' }}>
                Est. Shelf Life: <strong>~{simulatedTop?.estimatedShelfLifeDays} Days</strong>
              </div>
            </div>
          </div>

          {/* Side-by-Side: Baseline vs Simulated Top Recommendation */}
          <div className="card-surface">
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>
              Baseline vs Simulated Scenario Comparison
            </h3>

            <div className="grid-2" style={{ gap: '1rem' }}>
              {/* Baseline Card */}
              <div style={{ background: 'var(--ivory-100)', border: '1px solid var(--paper-200)', borderRadius: 'var(--radius-md)', padding: '1.15rem' }}>
                <span className="badge badge-brand" style={{ fontSize: '0.68rem', marginBottom: '0.5rem' }}>
                  Original Baseline
                </span>
                <div style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--forest-900)', marginTop: '0.25rem' }}>
                  {baselineTop?.material.name}
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--charcoal-600)', marginBottom: '0.75rem' }}>
                  At {originalProfile.storageTemperatureC}°C, {originalProfile.relativeHumidityPct}% RH
                </div>

                <div style={{ fontSize: '0.8rem', lineHeight: '1.6' }}>
                  <div>Score: <strong>{baselineTop?.scores.compositeScore}/100</strong></div>
                  <div>Shelf Life: <strong>~{baselineTop?.estimatedShelfLifeDays} days</strong></div>
                  <div>Cost: <strong>₹{baselineTop?.costEstimateInr.toFixed(2)}</strong></div>
                </div>
              </div>

              {/* What-If Card */}
              <div style={{ background: '#FFFFFF', border: '2px solid var(--forest-900)', borderRadius: 'var(--radius-md)', padding: '1.15rem', boxShadow: 'var(--shadow-card)' }}>
                <span className="badge badge-success" style={{ fontSize: '0.68rem', marginBottom: '0.5rem' }}>
                  Simulated Outcome
                </span>
                <div style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--forest-900)', marginTop: '0.25rem' }}>
                  {simulatedTop?.material.name}
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--charcoal-600)', marginBottom: '0.75rem' }}>
                  At {simTemp}°C, {simHumidity}% RH
                </div>

                <div style={{ fontSize: '0.8rem', lineHeight: '1.6' }}>
                  <div>
                    Score: <strong>{simulatedTop?.scores.compositeScore}/100</strong>{' '}
                    {simulatedTop && baselineTop && (
                      <span style={{ fontSize: '0.72rem', color: simulatedTop.scores.compositeScore >= baselineTop.scores.compositeScore ? 'var(--success-600)' : 'var(--error-600)' }}>
                        ({simulatedTop.scores.compositeScore - baselineTop.scores.compositeScore >= 0 ? '+' : ''}{simulatedTop.scores.compositeScore - baselineTop.scores.compositeScore})
                      </span>
                    )}
                  </div>
                  <div>
                    Shelf Life: <strong>~{simulatedTop?.estimatedShelfLifeDays} days</strong>{' '}
                    {simulatedTop && baselineTop && (
                      <span style={{ fontSize: '0.72rem', color: simulatedTop.estimatedShelfLifeDays >= baselineTop.estimatedShelfLifeDays ? 'var(--success-600)' : 'var(--warning-600)' }}>
                        ({simulatedTop.estimatedShelfLifeDays - baselineTop.estimatedShelfLifeDays >= 0 ? '+' : ''}{simulatedTop.estimatedShelfLifeDays - baselineTop.estimatedShelfLifeDays}d)
                      </span>
                    )}
                  </div>
                  <div>Cost: <strong>₹{simulatedTop?.costEstimateInr.toFixed(2)}</strong></div>
                </div>
              </div>
            </div>
          </div>

          {/* New Simulated Top-3 Ranks List */}
          <div className="card-surface">
            <h3 style={{ fontSize: '1.05rem', marginBottom: '0.85rem' }}>
              Simulated Top-3 Material Ranking
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {simulatedResult.recommendations.map((rec) => (
                <div
                  key={rec.rank}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: rec.rank === 1 ? 'var(--sage-50)' : '#FFFFFF',
                    border: '1px solid var(--paper-200)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--forest-900)', color: '#fff', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                      {rec.rank}
                    </span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--forest-900)' }}>
                        {rec.material.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--charcoal-600)' }}>
                        {rec.material.materialType}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--forest-900)' }}>
                      {rec.scores.compositeScore}/100
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--charcoal-600)' }}>
                      ~{rec.estimatedShelfLifeDays} days
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--paper-200)' }}>
        <button className="btn-secondary" onClick={onBackToResults}>
          <span>Back to Recommendation Results</span>
        </button>

        <button 
          className="btn-primary" 
          onClick={() => onApplyWhatIfToMain(simulatedProfile)}
          style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}
        >
          <span>Adopt What-If Profile & Continue</span>
          <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
};
