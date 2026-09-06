import React from 'react';
import { MessageSquare, Bot, Cpu, Eye, CheckCircle2 } from 'lucide-react';

export const TechFlow: React.FC = () => {
  const sensorTags = ['Optical', 'SAR (Synthetic Aperture Radar)', 'Vision-Language Models', 'GeoAI', 'Agentic AI'];

  const pipelineSteps = [
    {
      step: '1',
      title: 'Natural Language Query',
      subtitle: 'Intent parsing & entity extraction',
      icon: MessageSquare
    },
    {
      step: '2',
      title: 'AI Agent',
      subtitle: 'Task classification & routing',
      icon: Bot
    },
    {
      step: '3',
      title: 'Specialist Model / Tool',
      subtitle: 'Spectral grounding & VQA inference',
      icon: Cpu
    },
    {
      step: '4',
      title: 'Visual Evidence',
      subtitle: 'GeoJSON vector mask & localization',
      icon: Eye
    },
    {
      step: '5',
      title: 'Answer',
      subtitle: 'Factual, evidence-grounded report',
      icon: CheckCircle2
    }
  ];

  return (
    <section id="about" className="py-16 bg-[#F5F5F1] border-b border-sat-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Badges */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs tracking-widest font-semibold text-sat-slate uppercase block mb-2">
            Mission Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-sat-ink tracking-tight mb-4">
            From Raw Constellation Data to Grounded Answers
          </h2>
          <p className="text-xs sm:text-sm text-sat-slate mb-6">
            Multi-sensor fusion orchestrated by autonomous geospatial agents for mission-critical Earth observation.
          </p>

          {/* Sensor Capability Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {sensorTags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 rounded bg-sat-card border border-sat-border text-[11px] font-mono text-sat-slate font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Clean Horizontal Technology Flow */}
        <div className="bg-sat-card border border-sat-border rounded-xl p-6 sm:p-8 shadow-subtle">
          <div className="text-[11px] font-mono uppercase tracking-wider text-sat-slate mb-6 text-center sm:text-left">
            Pipeline Execution Flow
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {pipelineSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="relative flex flex-col items-center md:items-start text-center md:text-left p-4 rounded-lg bg-sat-surface/70 border border-sat-border/80">
                  <div className="flex items-center justify-between w-full mb-3">
                    <div className="w-8 h-8 rounded bg-sat-card border border-sat-border flex items-center justify-center text-sat-blue">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs font-bold text-sat-slate/70">
                      0{step.step}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-sat-ink font-sans mb-1">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-sat-slate leading-normal">
                    {step.subtitle}
                  </p>

                  {/* Arrow for desktop */}
                  {idx < pipelineSteps.length - 1 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-sat-border bg-sat-card rounded-full p-0.5 border border-sat-border">
                      <span className="text-xs font-bold text-sat-slate px-1">→</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
