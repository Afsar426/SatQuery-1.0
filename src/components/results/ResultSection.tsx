import React, { useState } from 'react';
import { AnalysisResponse } from '../../types/analysis';
import { Bot, FileImage, Copy, Check, Sparkles, Loader2 } from 'lucide-react';

interface ResultSectionProps {
  response: AnalysisResponse | null;
  isAnalyzing?: boolean;
  userQuery?: string;
  userImageUrl?: string | null;
  imageName?: string | null;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ 
  response,
  isAnalyzing = false,
  userQuery,
  userImageUrl,
  imageName
}) => {
  const [copied, setCopied] = useState(false);

  // Use actual uploaded image URL first
  const displayImage = userImageUrl || response?.visualEvidence?.inputImageUrl;

  // Calculate confidence percentage if present
  const confidenceValue = response?.confidence;
  const confidencePercent = confidenceValue !== undefined && confidenceValue !== null
    ? (confidenceValue <= 1 ? Math.round(confidenceValue * 100) : Math.round(confidenceValue))
    : null;

  const handleCopy = () => {
    if (response?.answer) {
      navigator.clipboard.writeText(response.answer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="analysis-result" className="mt-10 space-y-6 scroll-mt-6">
      
      {/* 1. User's Question Banner */}
      <div className="bg-sat-card border border-sat-border rounded-xl p-5 sm:p-6 shadow-card">
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sat-blue"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sat-slate">
              Question
            </span>
          </div>
          {isAnalyzing && (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono bg-blue-50 text-sat-blue border border-blue-200">
              <Loader2 className="w-3 h-3 animate-spin" />
              Processing
            </span>
          )}
        </div>
        <p className="text-sm sm:text-base font-semibold text-sat-ink font-sans leading-relaxed">
          &ldquo;{userQuery || 'Question about the uploaded image'}&rdquo;
        </p>
      </div>

      {/* 2. Side-by-Side (Desktop) / Stacked (Mobile) Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* Left Column: Uploaded Image */}
        <div className="bg-sat-card border border-sat-border rounded-xl p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="border-b border-sat-border pb-3 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileImage className="w-4 h-4 text-sat-blue" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-sat-ink font-mono">
                  Uploaded Image
                </h4>
              </div>
              {imageName && (
                <span className="text-[11px] font-mono text-sat-slate truncate max-w-[180px]">
                  {imageName}
                </span>
              )}
            </div>

            <div className="relative rounded-lg overflow-hidden border border-sat-border bg-sat-surface/60 flex items-center justify-center min-h-[280px] sm:min-h-[340px] max-h-[480px]">
              {displayImage ? (
                <img 
                  src={displayImage} 
                  alt="Uploaded geographical satellite scene" 
                  className="max-h-[460px] w-full object-contain block select-none"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-sat-slate p-8 text-center">
                  <FileImage className="w-12 h-12 mb-2 text-sat-slate/50" />
                  <span className="text-xs font-mono">Image preview unavailable</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 pt-2 text-[11px] font-mono text-sat-slate flex items-center justify-between border-t border-sat-border/40">
            <span>INPUT SCENE</span>
            <span>GEOGRAPHICAL RASTER</span>
          </div>
        </div>

        {/* Right Column: AI Model Text Answer (Directly in front / "uske samne") */}
        <div className="bg-sat-card border border-sat-border rounded-xl p-6 shadow-card flex flex-col justify-between">
          <div>
            {/* Header with Title and Copy Button */}
            <div className="flex items-center justify-between border-b border-sat-border pb-3 mb-5">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-sat-blue shrink-0" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-sat-ink font-mono">
                  AI Model Answer
                </h4>
              </div>

              {response && (
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded border border-sat-border bg-sat-surface hover:bg-sat-border/30 text-sat-ink transition-colors cursor-pointer"
                  title="Copy answer to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 text-[11px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-sat-slate" />
                      <span className="text-sat-slate text-[11px]">Copy</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Model Text Answer or Loading State */}
            {isAnalyzing ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-sat-blue">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-sat-ink mb-1">
                    Analyzing satellite imagery...
                  </h5>
                  <p className="text-xs text-sat-slate max-w-sm leading-relaxed">
                    Executing remote-sensing model inference to extract features and generate an evidence-based answer.
                  </p>
                </div>
                <div className="w-48 h-1.5 bg-sat-surface rounded-full overflow-hidden border border-sat-border/60 mt-2">
                  <div className="h-full bg-sat-blue w-2/3 rounded-full animate-pulse"></div>
                </div>
              </div>
            ) : response ? (
              <div className="space-y-4">
                {/* Model Text-based Output */}
                <div className="prose prose-sm max-w-none text-sat-ink">
                  <p className="text-sm text-sat-ink leading-relaxed font-sans font-normal whitespace-pre-line">
                    {response.answer}
                  </p>
                </div>

                {/* Grounding / Object Note if detected */}
                {response.visualEvidence?.detectedObject && (
                  <div className="p-3 bg-sat-surface rounded-lg border border-sat-border text-xs text-sat-slate flex items-center justify-between">
                    <span className="font-medium text-sat-ink">Detected Target:</span>
                    <span className="font-mono text-sat-blue font-semibold">
                      {response.visualEvidence.detectedObject}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-12 text-center text-sat-slate text-xs">
                No analysis result available yet.
              </div>
            )}
          </div>

          {/* Footer: Confidence Score */}
          {response && confidencePercent !== null && (
            <div className="pt-5 mt-6 border-t border-sat-border">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-sat-slate font-medium">Model Confidence</span>
                <span className="font-mono font-bold text-sat-ink text-sm">
                  {confidencePercent}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-sat-surface rounded-full overflow-hidden border border-sat-border/60">
                <div 
                  className="h-full bg-sat-blue rounded-full transition-all duration-700"
                  style={{ width: `${confidencePercent}%` }}
                ></div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
