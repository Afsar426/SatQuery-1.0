import React from 'react';
import { useApp } from './context/AppContext';
import { AppShell } from './components/layout/AppShell';
import { LandingView } from './views/LandingView';
import { DashboardView } from './views/DashboardView';
import { ProjectsView } from './views/ProjectsView';
import { AnalysisView } from './views/AnalysisView';
import { ResultsView } from './views/ResultsView';
import { AgentMonitorView } from './views/AgentMonitorView';
import { ReportsView } from './views/ReportsView';
import { EvaluationView } from './views/EvaluationView';
import { ModelRegistryView } from './views/ModelRegistryView';
import { SettingsView } from './views/SettingsView';

export const App: React.FC = () => {
  const { currentRoute } = useApp();

  // The Public SpaceTech Landing Page renders full-screen without dashboard chrome
  if (currentRoute === 'landing') {
    return <LandingView />;
  }

  const renderActiveView = () => {
    switch (currentRoute) {
      case 'dashboard':
        return <DashboardView />;
      case 'projects':
        return <ProjectsView />;
      case 'analysis':
        return <AnalysisView />;
      case 'results':
        return <ResultsView />;
      case 'agent':
        return <AgentMonitorView />;
      case 'reports':
        return <ReportsView />;
      case 'evaluation':
        return <EvaluationView />;
      case 'models':
        return <ModelRegistryView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return <AppShell>{renderActiveView()}</AppShell>;
};
