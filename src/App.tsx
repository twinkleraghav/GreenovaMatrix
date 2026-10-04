import React, { useState, useMemo, useEffect } from 'react';
import { FoodProfile, UserPersona, RecommendationItem } from './types';
import { PRESET_FOOD_PROFILES, DEFAULT_FRESH_PROFILE } from './data/foodPresets';
import { PACKAGING_MATERIALS } from './data/materialsData';
import { USER_PERSONAS } from './data/personas';
import { derivePackagingRequirements } from './engine/requirementEngine';
import { evaluateSafetyGate } from './engine/safetyGate';
import { runRecommendationEngine } from './engine/rankingEngine';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeHero } from './components/HomeHero';
import { ProductProfiler } from './components/ProductProfiler';
import { RequirementEngineView } from './components/RequirementEngineView';
import { RecommendationResults } from './components/RecommendationResults';
import { WhatIfSimulator } from './components/WhatIfSimulator';
import { ComplianceHub } from './components/ComplianceHub';
import { PackagingPassportView } from './components/PackagingPassportView';
import { EndOfLifeGuidance } from './components/EndOfLifeGuidance';
import { AnimatedOpeningIntro } from './components/AnimatedOpeningIntro';

export function App() {
  // Opening Animated Intro State
  const [showIntro, setShowIntro] = useState<boolean>(true);

  // Navigation State (1 to 8)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Active Persona
  const [activePersona, setActivePersona] = useState<UserPersona>('msme_manufacturer');

  // Food Profile State (Initialised to clean fresh formulation profile)
  const [currentProfile, setCurrentProfile] = useState<FoodProfile>(DEFAULT_FRESH_PROFILE);

  // When active persona changes, update priorities to match persona strategy
  const handlePersonaChange = (persona: UserPersona) => {
    setActivePersona(persona);
    const config = USER_PERSONAS[persona];
    setCurrentProfile((prev) => ({
      ...prev,
      priorities: { ...config.primaryPriorities },
    }));
  };

  // Fresh Analysis from Hero CTA (clean custom form without pre-selected template)
  const handleStartFreshAnalysis = () => {
    setCurrentProfile({
      ...DEFAULT_FRESH_PROFILE,
      id: `custom_${Date.now()}`,
      name: '',
      sourceTemplateId: undefined,
      createdAt: new Date().toISOString(),
    });
    setCurrentStep(2);
  };

  // Preset Selection from Home
  const handleSelectPreset = (preset: FoodProfile) => {
    setCurrentProfile({
      ...preset,
      sourceTemplateId: preset.id,
    });
    setCurrentStep(2); // Move to Profiler for confirmation/customization
  };

  // Derive Requirements deterministically
  const requirements = useMemo(() => {
    return derivePackagingRequirements(currentProfile);
  }, [currentProfile]);

  // Evaluate Deterministic Safety Gate
  const safetyResults = useMemo(() => {
    return evaluateSafetyGate(PACKAGING_MATERIALS, requirements, currentProfile);
  }, [requirements, currentProfile]);

  // Run Recommendation & Ranking Optimization
  const recommendationResponse = useMemo(() => {
    return runRecommendationEngine(PACKAGING_MATERIALS, safetyResults, requirements, currentProfile);
  }, [safetyResults, requirements, currentProfile]);

  // Selected Recommendation for Passport & Compliance (defaults to Rank 1)
  const [selectedRecommendation, setSelectedRecommendation] = useState<RecommendationItem | null>(null);

  // Keep selected recommendation in sync with recommendations result
  useEffect(() => {
    if (recommendationResponse.recommendations.length > 0) {
      const stillEligible = recommendationResponse.recommendations.find(
        (r) => r.material.id === selectedRecommendation?.material.id
      );
      if (stillEligible) {
        setSelectedRecommendation(stillEligible);
      } else {
        setSelectedRecommendation(recommendationResponse.recommendations[0]);
      }
    } else {
      setSelectedRecommendation(null);
    }
  }, [recommendationResponse]);

  // What-If Adoption Handler
  const handleApplyWhatIf = (updatedProfile: FoodProfile) => {
    setCurrentProfile(updatedProfile);
    setCurrentStep(4); // Return to Recommendations with updated profile
  };

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Top Sticky Navigation with 8-Step Grid Pipeline */}
      <Navbar
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        activePersona={activePersona}
        setActivePersona={handlePersonaChange}
      />

      {/* Animated Opening Brand Intro */}
      {showIntro && (
        <AnimatedOpeningIntro onComplete={() => setShowIntro(false)} />
      )}

      {/* Main Screen Content */}
      <main style={{ flex: 1 }}>
        <div className="app-container">
          {currentStep === 1 && (
            <HomeHero
              onStartAnalysis={handleStartFreshAnalysis}
              onSelectPreset={handleSelectPreset}
              activePersona={activePersona}
              setActivePersona={handlePersonaChange}
              onNavigateToStep={(step) => setCurrentStep(step)}
              onReplayIntro={() => setShowIntro(true)}
            />
          )}

          {currentStep === 2 && (
            <ProductProfiler
              profile={currentProfile}
              setProfile={setCurrentProfile}
              onProceedToRequirements={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <RequirementEngineView
              profile={currentProfile}
              requirements={requirements}
              safetyResults={safetyResults}
              onProceedToRecommendations={() => setCurrentStep(4)}
              onBackToProfiler={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 4 && (
            <RecommendationResults
              recommendationData={recommendationResponse}
              selectedRecommendation={selectedRecommendation}
              setSelectedRecommendation={(item) => setSelectedRecommendation(item)}
              onNavigateToWhatIf={() => setCurrentStep(5)}
              onNavigateToCompliance={() => setCurrentStep(6)}
              onNavigateToPassport={() => setCurrentStep(7)}
              onNavigateToEOL={() => setCurrentStep(8)}
            />
          )}

          {currentStep === 5 && (
            <WhatIfSimulator
              originalProfile={currentProfile}
              onApplyWhatIfToMain={handleApplyWhatIf}
              onBackToResults={() => setCurrentStep(4)}
            />
          )}

          {currentStep === 6 && (
            <ComplianceHub
              selectedRecommendation={selectedRecommendation}
              onProceedToPassport={() => setCurrentStep(7)}
              onBackToResults={() => setCurrentStep(4)}
            />
          )}

          {currentStep === 7 && selectedRecommendation && (
            <PackagingPassportView
              selectedRecommendation={selectedRecommendation}
              profile={currentProfile}
              activePersona={activePersona}
              onProceedToEOL={() => setCurrentStep(8)}
              onBackToResults={() => setCurrentStep(4)}
            />
          )}

          {currentStep === 8 && (
            <EndOfLifeGuidance
              selectedRecommendation={selectedRecommendation}
              profile={currentProfile}
              onRestartAnalysis={() => {
                setCurrentProfile(DEFAULT_FRESH_PROFILE);
                setCurrentStep(1);
              }}
              onBackToPassport={() => setCurrentStep(7)}
            />
          )}
        </div>
      </main>

      {/* Global Trust & Disclaimer Footer */}
      <Footer />
    </div>
  );
}

export default App;
