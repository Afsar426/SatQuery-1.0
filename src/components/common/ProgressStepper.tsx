import React from 'react';
import { AgentStep } from '../../types';
import { CheckCircle2, Loader2, Clock, AlertCircle } from 'lucide-react';

interface ProgressStepperProps {
  steps: AgentStep[];
  isAnalyzing?: boolean;
}

export const ProgressStepper: React.FC<ProgressStepperProps> = ({ steps, isAnalyzing }) => {
  return (
    <div className="space-y-2.5 font-sans">
      {steps.map((step, idx) => {
        const isLast = idx === steps.length - 1;
        const isCurrentActive = isAnalyzing && isLast;

        return (
          <div key={step.id} className="relative flex items-start group">
            {/* Step Line */}
            {!isLast && (
              <div
                className={`absolute left-3 top-5 bottom-0 w-px ${
                  step.status === 'completed' ? 'bg-[#879477]/40' : 'bg-[#383A34]'
                }`}
              />
            )}

            {/* Step Icon */}
            <div className="flex-shrink-0 z-10 mr-2.5 mt-0.5">
              {step.status === 'completed' ? (
                <div className="w-6 h-6 rounded bg-[#879477]/15 border border-[#879477]/40 flex items-center justify-center text-[#879477]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              ) : isCurrentActive ? (
                <div className="w-6 h-6 rounded bg-[#D6A84F]/15 border border-[#D6A84F]/40 flex items-center justify-center text-[#D6A84F] animate-spin">
                  <Loader2 className="w-3.5 h-3.5" />
                </div>
              ) : step.status === 'failed' ? (
                <div className="w-6 h-6 rounded bg-[#B76552]/15 border border-[#B76552]/40 flex items-center justify-center text-[#B76552]">
                  <AlertCircle className="w-3.5 h-3.5" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded bg-[#222321] border border-[#383A34] flex items-center justify-center text-[#AAA89E] text-xs font-mono">
                  <Clock className="w-3 h-3" />
                </div>
              )}
            </div>

            {/* Step Content */}
            <div className="flex-1 min-w-0 pb-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase font-mono tracking-wider text-[#D6A84F]">
                  {step.phase}
                </span>
                {step.latencyMs > 0 && (
                  <span className="text-[10px] font-mono text-[#AAA89E]">
                    {step.latencyMs}ms
                  </span>
                )}
              </div>

              <div className="text-xs font-medium text-[#F1EBDD] mt-0.5">
                {step.title}
              </div>

              <div className="text-[11px] text-[#AAA89E] mt-0.5 leading-relaxed font-sans">
                {step.description}
              </div>

              {step.toolUsed && (
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 bg-[#222321] border border-[#383A34] rounded text-[#879477]">
                    Tool: {step.toolUsed}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
