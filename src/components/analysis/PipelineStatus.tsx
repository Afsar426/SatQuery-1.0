import React from 'react';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { ExecutionStep } from '../../types/analysis';

interface PipelineStatusProps {
  isAnalyzing: boolean;
  steps?: ExecutionStep[];
  selectedModel?: string;
  taskName?: string;
}

export const PipelineStatus: React.FC<PipelineStatusProps> = ({
  isAnalyzing,
  selectedModel,
  taskName
}) => {
  const defaultSteps = [
    { label: 'Image validated', status: 'completed' },
    { label: 'Query understood', status: 'completed' },
    { label: `Task classified: ${taskName || 'Grounding'}`, status: 'completed' },
    { label: `Specialist model selected: ${selectedModel || 'RS-Grounding-v2.1'}`, status: 'completed' },
    { label: 'Analysis completed', status: 'completed' },
    { label: 'Evidence generated', status: 'completed' }
  ];

  return (
    <div className="bg-sat-card border border-sat-border rounded-xl p-5 shadow-card my-6">
      <div className="flex items-center justify-between mb-3 border-b border-sat-border pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sat-blue"></span>
          <h4 className="text-xs font-bold uppercase tracking-wider text-sat-ink font-mono">
            Analysis Pipeline
          </h4>
        </div>
        <span className="text-[11px] font-mono text-sat-slate">
          {isAnalyzing ? (
            <span className="flex items-center gap-1.5 text-sat-blue font-medium">
              <Loader2 className="w-3 h-3 animate-spin" />
              Processing Tensor...
            </span>
          ) : (
            <span className="text-sat-success font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Pipeline Complete
            </span>
          )}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {defaultSteps.map((step, idx) => {
          return (
            <div 
              key={idx}
              className="flex items-center gap-2 p-2 rounded bg-sat-surface/60 border border-sat-border/70"
            >
              {isAnalyzing && idx >= 3 ? (
                <Circle className="w-3.5 h-3.5 text-sat-slate/50 shrink-0" />
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5 text-sat-success shrink-0" />
              )}
              <span className="text-[11px] font-medium text-sat-ink truncate">
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
