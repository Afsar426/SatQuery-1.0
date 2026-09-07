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
        <div className="relative flex-1 flex flex-col">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value.slice(0, 500))}
            onKeyDown={handleKeyDown}
            placeholder="Type your question about the uploaded image in your language (e.g. English, हिन्दी, Hinglish)..."
            rows={5}
            className="w-full flex-1 min-h-[140px] text-xs sm:text-sm bg-sat-surface/40 border border-sat-border rounded-lg p-3.5 text-sat-ink placeholder-sat-slate/70 focus:outline-none focus:ring-1 focus:ring-sat-blue focus:border-sat-blue transition-all resize-none font-sans leading-relaxed"
          />
          <p className="text-[11px] text-sat-slate mt-2 flex items-center gap-1.5 font-sans">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-sat-blue"></span>
            <span>You can ask your own question in your preferred language (English, Hindi, Hinglish, etc.).</span>
          </p>
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
              <span>Analyzing image...</span>
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
