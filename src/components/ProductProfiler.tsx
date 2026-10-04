import React, { useState } from 'react';
import { FoodProfile, FoodCategory, SensitivityLevel } from '../types';
import { PRESET_FOOD_PROFILES } from '../data/foodPresets';
import { 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle, 
  Camera, 
  FlaskConical, 
  Thermometer, 
  Scale, 
  Sliders,
  Info
} from 'lucide-react';

interface ProductProfilerProps {
  profile: FoodProfile;
  setProfile: React.Dispatch<React.SetStateAction<FoodProfile>>;
  onProceedToRequirements: () => void;
  onBack: () => void;
}

export const ProductProfiler: React.FC<ProductProfilerProps> = ({
  profile,
  setProfile,
  onProceedToRequirements,
  onBack,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [photoAssistanceActive, setPhotoAssistanceActive] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Category switch helper
  const handleCategoryChange = (cat: FoodCategory) => {
    // When changing category manually, update category without forcing a preset
    setProfile((prev) => ({
      ...prev,
      category: cat,
      sourceTemplateId: undefined,
    }));
  };

  // Validate inputs
  const handleProceed = () => {
    const errors: string[] = [];
    if (!profile.name.trim()) errors.push('Product name is required.');
    if (profile.waterActivityAw < 0.05 || profile.waterActivityAw > 1.0) errors.push('Water activity (aw) must be between 0.05 and 1.00.');
    if (profile.pH < 1.5 || profile.pH > 12.0) errors.push('pH value must be between 1.5 and 12.0.');
    if (profile.targetShelfLifeDays < 1) errors.push('Target shelf life must be at least 1 day.');
    if (profile.budgetPerPackInr <= 0) errors.push('Budget per pack must be greater than ₹0.');

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors([]);
    onProceedToRequirements();
  };

  // Simulate Photo-to-pack suggestion
  const simulatePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoAssistanceActive(true);
      // Simulated image recognition prefill
      setTimeout(() => {
        setProfile((prev) => ({
          ...prev,
          name: 'Freshly Captured Artisanal Savoury',
          category: 'dry_snacks',
          waterActivityAw: 0.29,
          fatPercentage: 20.0,
          pH: 6.1,
          oxygenSensitivity: 'high',
          lightSensitivity: 'high',
          targetShelfLifeDays: 120,
        }));
      }, 400);
    }
  };

  // Match current profile to preset templates ONLY if explicitly loaded via preset
  const matchingPreset = profile.sourceTemplateId
    ? PRESET_FOOD_PROFILES.find((p) => p.id === profile.sourceTemplateId)
    : profile.id.startsWith('preset_')
    ? PRESET_FOOD_PROFILES.find((p) => p.id === profile.id)
    : undefined;

  const activeTemplateId = matchingPreset ? matchingPreset.id : '';

  return (
    <div className="animate-fade-in" style={{ paddingTop: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--olive-600)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
            <FlaskConical size={14} />
            <span>Phase 01: Food Science Formulation</span>
          </div>
          <h1 style={{ fontSize: '2.1rem', marginTop: '0.2rem' }}>Product Profiler & Chemical Matrix</h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--charcoal-600)', marginTop: '0.25rem' }}>
            Enter your food’s scientific parameters. These values directly drive deterministic barrier derivations and safety gate validation.
          </p>
        </div>

        {/* Preset Selector Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#FFFFFF', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--paper-300)', boxShadow: 'var(--shadow-subtle)' }}>
          <Sparkles size={16} color="var(--forest-700)" />
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--charcoal-700)' }}>Load Template:</span>
          <select
            value={activeTemplateId}
            style={{ border: 'none', background: 'transparent', fontSize: '0.85rem', fontWeight: 600, color: 'var(--forest-900)', outline: 'none', cursor: 'pointer', maxWidth: '280px' }}
            onChange={(e) => {
              const selected = PRESET_FOOD_PROFILES.find((p) => p.id === e.target.value);
              if (selected) {
                setProfile({ ...selected, sourceTemplateId: selected.id });
              }
            }}
          >
            <option value="">Select a Food Preset to prefill...</option>
            {PRESET_FOOD_PROFILES.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Synchronized Template Banner if loaded from Home or dropdown */}
      {matchingPreset && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: 'var(--sage-50)',
          border: '1px solid var(--sage-300)',
          borderRadius: 'var(--radius-md)',
          padding: '0.65rem 1rem',
          marginBottom: '1.5rem',
        }}>
          {matchingPreset.optionalImageUrl && (
            <img
              src={matchingPreset.optionalImageUrl}
              alt={matchingPreset.name}
              style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', border: '1px solid var(--paper-300)' }}
            />
          )}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--olive-700)', fontWeight: 700 }}>
              Active Scientific Template
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--forest-900)' }}>
              {matchingPreset.name}
            </div>
          </div>
          <span className="badge badge-brand" style={{ fontSize: '0.72rem' }}>
            Template Synchronized
          </span>
        </div>
      )}

      {/* Validation Errors banner */}
      {validationErrors.length > 0 && (
        <div style={{ background: 'var(--error-100)', border: '1px solid var(--error-600)', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem', marginBottom: '1.5rem', color: 'var(--error-600)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem' }}>
            <AlertCircle size={16} />
            <span>Please correct the following fields before proceeding:</span>
          </div>
          <ul style={{ paddingLeft: '1.4rem', fontSize: '0.84rem' }}>
            {validationErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Photo Assistance Strip (Notice per PRD: Non-goal is letting AI guess pH from photo) */}
      <div style={{ background: 'var(--ivory-100)', border: '1px dashed var(--sage-500)', borderRadius: 'var(--radius-md)', padding: '0.9rem 1.25rem', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', background: 'var(--sage-300)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Camera size={18} color="var(--forest-900)" />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--forest-900)' }}>
              Optional Photo-to-Pack Visual Assistance
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--charcoal-600)' }}>
              Upload packaging/food photo to prefill category. Scientific values must be verified manually.
            </div>
          </div>
        </div>

        <label className="btn-secondary" style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem', cursor: 'pointer' }}>
          <span>Upload Image</span>
          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={simulatePhotoUpload} />
        </label>
      </div>

      {photoAssistanceActive && (
        <div style={{ background: 'var(--info-100)', border: '1px solid var(--info-600)', borderRadius: 'var(--radius-sm)', padding: '0.65rem 1rem', fontSize: '0.78rem', color: 'var(--info-600)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Info size={14} />
          <span>Visual detection suggested "Roasted Savoury". Baseline properties pre-filled below. Review and adjust values as needed.</span>
        </div>
      )}

      {/* Main Profile Form */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Section 1: Product Identity & Food Category */}
        <div className="card-surface">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--forest-900)', color: '#fff', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span>
            <span>Product Identification & Classification</span>
          </h3>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">
                <span>Product Commercial Label</span>
                <span className="form-hint">e.g., Artisanal Roasted Makhana</span>
              </label>
              <input
                type="text"
                className="form-input"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Enter product name..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <span>Food Category & Processing Class</span>
                <span className="form-hint">Standardized Category</span>
              </label>
              <select
                className="form-select"
                value={profile.category}
                onChange={(e) => handleCategoryChange(e.target.value as FoodCategory)}
              >
                <option value="dry_snacks">Dry Snacks & Savouries (Namkeen, Chips, Makhana)</option>
                <option value="fresh_produce">Fresh Produce (Fruits, Vegetables, Herbs)</option>
                <option value="pickles_sauces">Pickles, Sauces & High-Acid Preserves</option>
                <option value="dairy">Dairy Products (Paneer, Cheese, Butter)</option>
                <option value="bakery">Bakery & Confectionery (Cookies, Breads)</option>
                <option value="ready_to_eat">Ready-To-Eat (RTE Retort Gravies, Meals)</option>
                <option value="beverages">Beverages, Juices & Liquid Foods</option>
                <option value="frozen">Frozen Foods & Ice Creams</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Chemical & Intrinsic Food Environment */}
        <div className="card-surface">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--forest-900)', color: '#fff', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
            <span>Chemical & Intrinsic Food Properties</span>
          </h3>

          <div className="grid-2" style={{ gap: '1.5rem' }}>
            {/* Water Activity Slider */}
            <div className="slider-container">
              <div className="form-label">
                <span>Water Activity (aw)</span>
                <span style={{ fontWeight: 700, color: 'var(--forest-900)' }}>
                  {profile.waterActivityAw.toFixed(2)} {profile.waterActivityAw < 0.4 ? '• Dry/Crisp' : profile.waterActivityAw > 0.85 ? '• High Spoilage Risk' : '• Intermediate'}
                </span>
              </div>
              <input
                type="range"
                className="custom-range"
                min="0.10"
                max="0.99"
                step="0.01"
                value={profile.waterActivityAw}
                onChange={(e) => setProfile({ ...profile, waterActivityAw: parseFloat(e.target.value) })}
              />
              <span className="form-hint">Governs microbial growth and moisture-barrier criticality.</span>
            </div>

            {/* pH Acidity Slider */}
            <div className="slider-container">
              <div className="form-label">
                <span>Acidity / pH Level</span>
                <span style={{ fontWeight: 700, color: profile.pH < 4.0 ? 'var(--error-600)' : 'var(--forest-900)' }}>
                  pH {profile.pH.toFixed(1)} {profile.pH < 4.0 ? '⚠️ High Acid (Corrosive)' : profile.pH > 7.0 ? '• Alkaline' : '• Near Neutral'}
                </span>
              </div>
              <input
                type="range"
                className="custom-range"
                min="2.0"
                max="9.0"
                step="0.1"
                value={profile.pH}
                onChange={(e) => setProfile({ ...profile, pH: parseFloat(e.target.value) })}
              />
              <span className="form-hint">pH &lt; 4.0 activates strict FSSAI lining rules against metal corrosion.</span>
            </div>

            {/* Fat / Lipid Content Slider */}
            <div className="slider-container">
              <div className="form-label">
                <span>Fat / Lipid Content (%)</span>
                <span style={{ fontWeight: 700, color: 'var(--forest-900)' }}>
                  {profile.fatPercentage}% {profile.fatPercentage > 15 ? '• High Rancidity Vulnerability' : '• Low Fat'}
                </span>
              </div>
              <input
                type="range"
                className="custom-range"
                min="0"
                max="80"
                step="1"
                value={profile.fatPercentage}
                onChange={(e) => setProfile({ ...profile, fatPercentage: parseInt(e.target.value) })}
              />
              <span className="form-hint">High fat triggers oxygen & light barrier requirements to prevent rancid off-flavors.</span>
            </div>

            {/* Moisture % */}
            <div className="slider-container">
              <div className="form-label">
                <span>Total Moisture Content (%)</span>
                <span style={{ fontWeight: 700, color: 'var(--forest-900)' }}>{profile.moisturePercentage}%</span>
              </div>
              <input
                type="range"
                className="custom-range"
                min="1"
                max="95"
                step="1"
                value={profile.moisturePercentage}
                onChange={(e) => setProfile({ ...profile, moisturePercentage: parseInt(e.target.value) })}
              />
              <span className="form-hint">High moisture in paper/fiber packages causes soggy structural failure.</span>
            </div>
          </div>

          {/* Thermal Sterilization Checkbox */}
          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--paper-200)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600, color: 'var(--forest-900)' }}>
              <input
                type="checkbox"
                checked={profile.requiresHeatProcessing}
                onChange={(e) => setProfile({ ...profile, requiresHeatProcessing: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: 'var(--forest-900)', cursor: 'pointer' }}
              />
              <span>Product requires in-pack thermal processing (Retort 121°C or Hot Filling &gt; 85°C)</span>
            </label>

            {profile.requiresHeatProcessing && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--warning-100)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--warning-600)', fontSize: '0.78rem', color: 'var(--warning-600)', fontWeight: 600 }}>
                <Thermometer size={14} />
                <span>Enforces strict retort-grade polymer/metal safety filtering</span>
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Sensitivities & Storage Goals */}
        <div className="card-surface">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--forest-900)', color: '#fff', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
            <span>Degradation Sensitivities & Commercial Goals</span>
          </h3>

          <div className="grid-3" style={{ marginBottom: '1.25rem' }}>
            {/* Oxygen Sensitivity */}
            <div className="form-group">
              <label className="form-label">Oxygen Sensitivity</label>
              <select
                className="form-select"
                value={profile.oxygenSensitivity}
                onChange={(e) => setProfile({ ...profile, oxygenSensitivity: e.target.value as SensitivityLevel })}
              >
                <option value="low">Low (Starchy staples)</option>
                <option value="medium">Medium (Moderate lipid/color)</option>
                <option value="high">High (Nuts, fried snacks, dairy)</option>
              </select>
            </div>

            {/* Light Sensitivity */}
            <div className="form-group">
              <label className="form-label">Light & UV Sensitivity</label>
              <select
                className="form-select"
                value={profile.lightSensitivity}
                onChange={(e) => setProfile({ ...profile, lightSensitivity: e.target.value as SensitivityLevel })}
              >
                <option value="low">Low (Clear container okay)</option>
                <option value="medium">Medium (Amber/UV filter preferred)</option>
                <option value="high">High (Requires total foil opacity)</option>
              </select>
            </div>

            {/* Heat Sensitivity */}
            <div className="form-group">
              <label className="form-label">Heat Sensitivity</label>
              <select
                className="form-select"
                value={profile.heatSensitivity}
                onChange={(e) => setProfile({ ...profile, heatSensitivity: e.target.value as SensitivityLevel })}
              >
                <option value="low">Low (Ambient stable)</option>
                <option value="medium">Medium (Degrades &gt; 35°C)</option>
                <option value="high">High (Requires active cold chain)</option>
              </select>
            </div>
          </div>

          <div className="grid-2">
            {/* Target Shelf Life Days */}
            <div className="form-group">
              <label className="form-label">
                <span>Target Commercial Shelf Life (Days)</span>
                <span style={{ fontWeight: 700, color: 'var(--forest-900)' }}>{profile.targetShelfLifeDays} Days</span>
              </label>
              <input
                type="number"
                className="form-input"
                min="1"
                max="730"
                value={profile.targetShelfLifeDays}
                onChange={(e) => setProfile({ ...profile, targetShelfLifeDays: parseInt(e.target.value) || 1 })}
              />
            </div>

            {/* Packaging Unit Budget in INR */}
            <div className="form-group">
              <label className="form-label">
                <span>Target Packaging Unit Budget (₹ / Pack)</span>
                <span style={{ fontWeight: 700, color: 'var(--forest-900)' }}>₹{profile.budgetPerPackInr.toFixed(2)}</span>
              </label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="100"
                className="form-input"
                value={profile.budgetPerPackInr}
                onChange={(e) => setProfile({ ...profile, budgetPerPackInr: parseFloat(e.target.value) || 1 })}
              />
            </div>
          </div>
        </div>

        {/* Section 4: Progressive Disclosure (Advanced Parameters & Priorities) */}
        <div className="card-surface">
          <div
            onClick={() => setShowAdvanced(!showAdvanced)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Sliders size={18} color="var(--forest-700)" />
              <h3 style={{ fontSize: '1.05rem', margin: 0 }}>
                Advanced Environmental Operating Conditions & Optimization Weights
              </h3>
            </div>
            {showAdvanced ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {showAdvanced && (
            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--paper-200)' }}>
              <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label">
                    <span>Ambient Storage Temperature (°C)</span>
                    <span style={{ fontWeight: 700 }}>{profile.storageTemperatureC}°C</span>
                  </label>
                  <input
                    type="range"
                    className="custom-range"
                    min="-18"
                    max="45"
                    step="1"
                    value={profile.storageTemperatureC}
                    onChange={(e) => setProfile({ ...profile, storageTemperatureC: parseInt(e.target.value) })}
                  />
                  <span className="form-hint">Directly drives Arrhenius deterioration velocity.</span>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span>Ambient Relative Humidity (%)</span>
                    <span style={{ fontWeight: 700 }}>{profile.relativeHumidityPct}%</span>
                  </label>
                  <input
                    type="range"
                    className="custom-range"
                    min="30"
                    max="95"
                    step="5"
                    value={profile.relativeHumidityPct}
                    onChange={(e) => setProfile({ ...profile, relativeHumidityPct: parseInt(e.target.value) })}
                  />
                  <span className="form-hint">High humidity accelerates moisture vapor ingress across packaging walls.</span>
                </div>
              </div>

              {/* Priority Weights Sliders */}
              <div style={{ background: 'var(--ivory-100)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--paper-200)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--forest-900)', marginBottom: '0.25rem' }}>
                  Multi-Criteria AI Ranking Weights (1 = Low Importance, 5 = Critical Priority)
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-600)', marginBottom: '1rem' }}>
                  Adjust weights to tune recommendation scoring. Unsafe materials are filtered out regardless of weights.
                </div>

                <div className="grid-2" style={{ gap: '1rem' }}>
                  <div>
                    <div className="form-label">
                      <span>Low Packaging Cost</span>
                      <span style={{ fontWeight: 700 }}>Weight: {profile.priorities.cost}/5</span>
                    </div>
                    <input
                      type="range"
                      className="custom-range"
                      min="1"
                      max="5"
                      value={profile.priorities.cost}
                      onChange={(e) => setProfile({
                        ...profile,
                        priorities: { ...profile.priorities, cost: parseInt(e.target.value) }
                      })}
                    />
                  </div>

                  <div>
                    <div className="form-label">
                      <span>Long Shelf Life Protection</span>
                      <span style={{ fontWeight: 700 }}>Weight: {profile.priorities.shelfLife}/5</span>
                    </div>
                    <input
                      type="range"
                      className="custom-range"
                      min="1"
                      max="5"
                      value={profile.priorities.shelfLife}
                      onChange={(e) => setProfile({
                        ...profile,
                        priorities: { ...profile.priorities, shelfLife: parseInt(e.target.value) }
                      })}
                    />
                  </div>

                  <div>
                    <div className="form-label">
                      <span>Sustainability & Low Carbon Footprint</span>
                      <span style={{ fontWeight: 700 }}>Weight: {profile.priorities.sustainability}/5</span>
                    </div>
                    <input
                      type="range"
                      className="custom-range"
                      min="1"
                      max="5"
                      value={profile.priorities.sustainability}
                      onChange={(e) => setProfile({
                        ...profile,
                        priorities: { ...profile.priorities, sustainability: parseInt(e.target.value) }
                      })}
                    />
                  </div>

                  <div>
                    <div className="form-label">
                      <span>Indian Domestic Supply Availability</span>
                      <span style={{ fontWeight: 700 }}>Weight: {profile.priorities.availability}/5</span>
                    </div>
                    <input
                      type="range"
                      className="custom-range"
                      min="1"
                      max="5"
                      value={profile.priorities.availability}
                      onChange={(e) => setProfile({
                        ...profile,
                        priorities: { ...profile.priorities, availability: parseInt(e.target.value) }
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem' }}>
          <button className="btn-secondary" onClick={onBack}>
            <span>Back to Overview</span>
          </button>

          <button className="btn-primary" onClick={handleProceed} style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}>
            <span>Derive Requirements & Run Safety Gate</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};
