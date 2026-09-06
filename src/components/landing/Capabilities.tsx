import React from 'react';
import { MessageSquareText, Focus, Cpu, Layers } from 'lucide-react';

export const Capabilities: React.FC = () => {
  const capabilities = [
    {
      number: '01',
      title: 'Visual Question Answering',
      description: 'Ask natural-language questions about satellite imagery.',
      icon: MessageSquareText
    },
    {
      number: '02',
      title: 'Visual Grounding',
      description: 'Locate and highlight objects or regions referred to in a query.',
      icon: Focus
    },
    {
      number: '03',
      title: 'Agentic Analysis',
      description: 'Automatically select the right model or tool for your query.',
      icon: Cpu
    },
    {
      number: '04',
      title: 'Geospatial Insights',
      description: 'Generate actionable insights with visual evidence and metrics.',
      icon: Layers
    }
  ];

  return (
    <section id="capabilities" className="py-16 bg-[#F5F5F1] border-b border-sat-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div 
                key={cap.number}
                className="bg-sat-card border border-sat-border rounded-lg p-6 flex flex-col justify-between hover:border-sat-slate/60 transition-all shadow-subtle group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded bg-sat-surface border border-sat-border flex items-center justify-center text-sat-blue group-hover:text-sat-ink transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-sat-slate">
                      {cap.number}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-sat-ink mb-2 font-sans tracking-tight">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-sat-slate leading-relaxed font-sans">
                    {cap.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-sat-border/50 flex items-center text-[11px] font-medium text-sat-blue">
                  <span>Explore tool</span>
                  <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
