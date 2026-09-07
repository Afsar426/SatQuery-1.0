import React from 'react';
import { Send, Loader2, AlertCircle } from 'lucide-react';

interface QueryCardProps {
  query: string;
  setQuery: (query: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  hasImage: boolean;
  errorMessage?: string | null;
}

export const QueryCard: React.FC<QueryCardProps> = ({
  query,
  setQuery,
  onAnalyze,
  isAnalyzing,
  hasImage,
  errorMessage
}) => {
  const exampleQuestions = [
    'Where is the water body?',
    'Describe this image',
    'Find built-up area',
    'Calculate NDVI',
    'Is there a forest area?'
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onAnalyze();
    }
  };

  return (
    <div className="bg-sat-card border border-sat-border rounded-xl p-6 shadow-card flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-sat-ink font-sans tracking-tight">
          2. Ask Your Question
        </h3>
        <span className="text-[11px] font-mono text-sat-slate">
          {query.length}/500
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-between space-y-4">
        {/* Natural Language Query Textarea */}
        <div className="relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value.slice(0, 500))}
            onKeyDown={handleKeyDown}
            placeholder="Ask something about this satellite image... (e.g. 'Where is the water body?')"
            rows={4}
            className="w-full text-xs sm:text-sm bg-sat-surface/40 border border-sat-border rounded-lg p-3.5 text-sat-ink placeholder-sat-slate/70 focus:outline-none focus:ring-1 focus:ring-sat-blue focus:border-sat-blue transition-all resize-none font-sans"
          />
        </div>

        {/* Example Questions Chips */}
        <div>
          <span className="text-[10px] uppercase font-mono tracking-wider text-sat-slate block mb-2">
            Example Questions:
          </span>
          <div className="flex flex-wrap gap-2">
            {exampleQuestions.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setQuery(q)}
                className="px-2.5 py-1 bg-sat-surface hover:bg-sat-border/60 border border-sat-border text-sat-ink text-xs rounded transition-colors text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Error Warning */}
        {errorMessage && (
          <div className="p-3 bg-sat-error-light border border-sat-error/30 rounded-lg flex items-center gap-2 text-sat-error text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Primary Action Button */}
        <button
          onClick={onAnalyze}
          disabled={isAnalyzing}
          className={`w-full py-3 px-4 rounded font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-subtle ${
            isAnalyzing
              ? 'bg-sat-blue/70 text-white cursor-wait'
              : !hasImage
              ? 'bg-sat-blue/90 hover:bg-sat-blue text-white'
              : 'bg-sat-blue hover:bg-sat-blue-hover text-white cursor-pointer active:scale-[0.99]'
          }`}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Analyzing satellite imagery...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Analyze</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
