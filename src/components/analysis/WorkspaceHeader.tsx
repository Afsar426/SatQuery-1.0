import React from 'react';
import { ChevronRight } from 'lucide-react';

interface WorkspaceHeaderProps {
  onGoHome: () => void;
}

export const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({ onGoHome }) => {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="mb-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-1.5 text-xs text-sat-slate mb-3 font-medium">
        <button 
          onClick={onGoHome} 
          className="hover:text-sat-ink transition-colors"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-sat-border" />
        <span className="text-sat-ink font-semibold">Analysis</span>
      </div>

      {/* Title & Telemetry Bar */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-sat-border pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-sat-ink tracking-tight">
            Analyze Geographical Imagery
          </h1>
          <p className="text-xs sm:text-sm text-sat-slate mt-1.5 max-w-3xl leading-relaxed">
            Upload geographical imagery and ask your question, SatQuery analyzes and provides evidence-backed insights using specialized models and geospatial tools.
          </p>
        </div>

        {/* Live Mission Status Telemetry Card (matching screenshot top-right) */}
        <div className="hidden sm:flex flex-col items-end text-right bg-sat-card px-4 py-2.5 rounded-lg border border-sat-border shadow-subtle min-w-[190px]">
          <div className="flex items-center gap-2 text-xs font-bold text-sat-success">
            <span className="w-2 h-2 rounded-full bg-sat-success"></span>
            System Ready
          </div>
          <div className="text-[11px] text-sat-slate mt-0.5">
            All services operational
          </div>
          <div className="text-[10px] font-mono text-sat-slate/80 mt-0.5">
            {currentDate}
          </div>
        </div>
      </div>
    </div>
  );
};
