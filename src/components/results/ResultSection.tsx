import React, { useState } from 'react';
import { AnalysisResponse } from '../../types/analysis';
import { AnswerTab } from './AnswerTab';
import { VisualOutputTab } from './VisualOutputTab';
import { MetricsTab } from './MetricsTab';
import { ExecutionTraceTab } from './ExecutionTraceTab';
import { Eye, MessageSquare, BarChart, Terminal, X } from 'lucide-react';

interface ResultSectionProps {
  response: AnalysisResponse;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ response }) => {
  const [activeTab, setActiveTab] = useState<'answer' | 'visual' | 'metrics' | 'trace'>('answer');
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const tabs = [
    { id: 'answer', label: 'Answer', icon: MessageSquare },
    { id: 'visual', label: 'Visual Output', icon: Eye },
    { id: 'metrics', label: 'Metrics', icon: BarChart },
    { id: 'trace', label: 'Execution Trace', icon: Terminal },
  ] as const;

  return (
    <section className="mt-10 bg-sat-card border border-sat-border rounded-xl p-6 sm:p-8 shadow-card">
      
      {/* Section Header & Tabs Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sat-border pb-4 mb-6">
        <h3 className="text-xl font-serif font-bold text-sat-ink tracking-tight">
          3. Result
        </h3>

        {/* Tab switcher matching screenshot */}
        <div className="flex items-center gap-1 bg-sat-surface p-1 rounded-lg border border-sat-border self-start sm:self-auto overflow-x-auto max-w-full">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === t.id
                    ? 'bg-sat-card text-sat-ink shadow-xs border border-sat-border/80'
                    : 'text-sat-slate hover:text-sat-ink'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'answer' && (
        <AnswerTab 
          response={response} 
          onViewFullscreen={(url) => setFullscreenImage(url)} 
        />
      )}

      {activeTab === 'visual' && (
        <VisualOutputTab response={response} />
      )}

      {activeTab === 'metrics' && (
        <MetricsTab response={response} />
      )}

      {activeTab === 'trace' && (
        <ExecutionTraceTab 
          steps={response.executionTrace} 
          taskId={response.taskId} 
        />
      )}

      {/* Fullscreen Image Lightbox Modal */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] bg-black rounded-lg overflow-hidden border border-gray-700">
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img 
              src={fullscreenImage} 
              alt="Satellite Fullscreen" 
              className="max-w-full max-h-[85vh] object-contain"
            />
          </div>
        </div>
      )}

    </section>
  );
};
