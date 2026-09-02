import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PublicNavbar } from '../components/landing/PublicNavbar';
import { SatelliteOrbitHero } from '../components/landing/SatelliteOrbitHero';
import { LiveTelemetryBar } from '../components/landing/LiveTelemetryBar';
import { AskEarthDemo } from '../components/landing/AskEarthDemo';
import { InteractiveComparisonSection } from '../components/landing/InteractiveComparisonSection';
import { MultiModalFusionSection } from '../components/landing/MultiModalFusionSection';
import { AgentWorkflowInteractive } from '../components/landing/AgentWorkflowInteractive';
import { UseCasesGrid } from '../components/landing/UseCasesGrid';
import { PublicFooter } from '../components/landing/PublicFooter';
import { AuthModal } from '../components/auth/AuthModal';

export const LandingView: React.FC = () => {
  const { setCurrentRoute, loadDemoScenario } = useApp();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleLaunchMission = () => {
    setCurrentRoute('analysis');
  };

  const handleExploreDemo = () => {
    loadDemoScenario('scenario_bitemporal_change');
    setCurrentRoute('analysis');
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectUseCase = (theme: string) => {
    if (theme === 'Disaster') {
      loadDemoScenario('scenario_optical_sar');
    } else if (theme === 'Water') {
      loadDemoScenario('scenario_grounding');
    } else {
      loadDemoScenario('scenario_bitemporal_change');
    }
    setCurrentRoute('analysis');
  };

  return (
    <div className="min-h-screen bg-space-950 text-text-primary selection:bg-sky-500/30 selection:text-sky-200">
      {/* Public Aerospace Header */}
      <PublicNavbar
        onLaunchMission={handleLaunchMission}
        onNavigateSection={handleNavigateSection}
        onOpenSignIn={() => setAuthModalOpen(true)}
      />

      {/* Hero Section with Canvas Animated Satellite & Earth Curvature */}
      <SatelliteOrbitHero
        onLaunchMission={handleLaunchMission}
        onExploreDemo={handleExploreDemo}
      />

      {/* Section 02: Multi-Sensor Live Satellite Telemetry Stream */}
      <div id="telemetry">
        <LiveTelemetryBar />
      </div>

      {/* Section 03 & 04: "Ask Earth" Interactive Showcase */}
      <div id="ask-earth">
        <AskEarthDemo onOpenWorkstation={handleLaunchMission} />
      </div>

      {/* Section 05: Draggable Before/After Temporal Intelligence Slider */}
      <div id="temporal">
        <InteractiveComparisonSection onOpenWorkstation={handleLaunchMission} />
      </div>

      {/* Section 06: Multi-Modal Optical + SAR Fusion */}
      <div id="fusion">
        <MultiModalFusionSection onOpenWorkstation={handleLaunchMission} />
      </div>

      {/* Section 07: Clickable 8-Stage Agentic AI Workflow */}
      <div id="architecture">
        <AgentWorkflowInteractive onOpenWorkstation={handleLaunchMission} />
      </div>

      {/* Section 08: Real-World Use Cases */}
      <div id="use-cases">
        <UseCasesGrid onSelectUseCase={handleSelectUseCase} />
      </div>

      {/* Public Footer */}
      <PublicFooter onLaunchMission={handleLaunchMission} />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccessLogin={handleLaunchMission}
      />
    </div>
  );
};
