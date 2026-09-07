import React from 'react';
import { ExecutionStep } from '../../types/analysis';
import { CheckCircle2, Clock, Terminal } from 'lucide-react';

interface ExecutionTraceTabProps {
  steps: ExecutionStep[];
  taskId?: string;
  totalDurationMs?: number;
}

export const ExecutionTraceTab: React.FC<ExecutionTraceTabProps> = ({ 
  steps, 
  taskId = 'TASK-GROUND-2026-0904' 
}) => {
  const totalLatency = steps.reduce((sum, s) => sum + (s.durationMs || 0), 0);

  return (
    <div className="space-y-6">
      
      {/* Header bar */}
      <div className="bg-sat-card border border-sat-border rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-sat-blue" />
          <span className="text-xs font-mono font-bold text-sat-ink uppercase tracking-wider">
            Auditable Agent Execution Trace
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-sat-slate">
          <div>
            TASK ID: <span className="text-sat-ink font-semibold">{taskId}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-sat-slate" />
            <span>TOTAL LATENCY: {totalLatency || 658}ms</span>
          </div>
        </div>
      </div>

      {/* Execution Steps Timeline */}
      <div className="bg-sat-card border border-sat-border rounded-xl p-6 shadow-subtle">
        <div className="relative border-l-2 border-sat-border/80 ml-4 pl-6 space-y-8">
          {steps.map((step) => (
            <div key={step.id} className="relative group">
              {/* Bullet Node */}
              <div className="absolute -left-[33px] top-0.5 w-5 h-5 rounded-full bg-sat-card border-2 border-sat-success flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-sat-success" />
              </div>

              {/* Step Content */}
              <div className="flex flex-col space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-sat-ink font-sans">
                      {step.stepNumber}. {step.label}
                    </span>
                    <span className="text-[10px] font-mono bg-sat-surface px-2 py-0.5 rounded border border-sat-border text-sat-slate">
                      {step.status.toUpperCase()}
                    </span>
                  </div>

                  {step.durationMs && (
                    <span className="text-[11px] font-mono text-sat-slate">
                      +{step.durationMs}ms
                    </span>
                  )}
                </div>

                <p className="text-xs text-sat-slate font-mono leading-relaxed mt-1 bg-sat-surface/40 p-2.5 rounded border border-sat-border/60">
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 bg-sat-surface rounded-lg border border-sat-border text-[11px] text-sat-slate font-mono text-center">
        VERIFIED REPRODUCIBLE AGENT EXECUTION • GEO-AI RUNTIME 2026.1
      </div>

    </div>
  );
};
