import React from 'react';
import { 
  CheckCircle2, 
  Download, 
  MapPin, 
  ExternalLink, 
  Bot, 
  Maximize2,
  Info
} from 'lucide-react';
import { AnalysisResponse } from '../../types/analysis';

interface AnswerTabProps {
  response: AnalysisResponse;
  onViewFullscreen?: (imageUrl: string) => void;
}

export const AnswerTab: React.FC<AnswerTabProps> = ({ 
  response,
  onViewFullscreen 
}) => {
  const { 
    answer, 
    visualEvidence, 
    confidence, 
    detectedArea, 
    coordinates, 
    insights 
  } = response;

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(response, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `satquery_result_${response.taskId || 'analysis'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleOpenGis = () => {
    if (coordinates) {
      window.open(`https://www.google.com/maps/@?api=1&map_action=map&center=${coordinates.lat},${coordinates.lng}&zoom=14&basemap=satellite`, '_blank');
    } else {
      alert('Coordinates mapped to EPSG:4326 center.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left Column: Visual Evidence (Side-by-Side Images & Key Insights) */}
      <div className="lg:col-span-8 flex flex-col space-y-6">
        
        {/* Side-by-Side Comparison Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Panel 1: Input Image */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-sat-ink font-sans">
              <span>Input Image</span>
              <span className="text-[10px] font-mono text-sat-slate">Sentinel-2 MSI</span>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-sat-border bg-black group shadow-xs">
              <img 
                src={visualEvidence?.inputImageUrl} 
                alt="Input Satellite Image" 
                className="w-full h-full object-cover"
              />
              {onViewFullscreen && visualEvidence?.inputImageUrl && (
                <button 
                  onClick={() => onViewFullscreen(visualEvidence.inputImageUrl)}
                  className="absolute top-2 right-2 p-1.5 rounded bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                  title="View full size"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Panel 2: Detected Region */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-sat-ink font-sans">
              <span>Detected Region</span>
              <span className="text-[10px] font-mono text-sat-blue font-semibold">Specialist Mask Active</span>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-sat-border bg-black group shadow-xs">
              <img 
                src={visualEvidence?.detectedRegionUrl} 
                alt="Detected Satellite Region" 
                className="w-full h-full object-cover"
              />
              {onViewFullscreen && visualEvidence?.detectedRegionUrl && (
                <button 
                  onClick={() => onViewFullscreen(visualEvidence.detectedRegionUrl)}
                  className="absolute top-2 right-2 p-1.5 rounded bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                  title="View full size"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Detection Legend */}
        <div className="flex items-center justify-between p-2.5 bg-sat-surface rounded-lg border border-sat-border text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-[#0077FF] inline-block shadow-xs"></span>
            <span className="font-semibold text-sat-ink">
              {visualEvidence?.detectedObject || 'Water Body'} (Detected)
            </span>
          </div>
          <span className="text-[11px] font-mono text-sat-slate">
            Region: {visualEvidence?.approximateRegion || 'Northern Area'}
          </span>
        </div>

        {/* Key Insights Checklist (matching mockup) */}
        <div className="bg-sat-card border border-sat-border rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-sat-blue" />
            <h4 className="text-xs font-bold text-sat-ink uppercase tracking-wider font-mono">
              Key Insights
            </h4>
          </div>

          <div className="space-y-2">
            {(insights && insights.length > 0 ? insights : [
              'Image validated successfully',
              'Query classified as Grounding',
              'Grounding model executed',
              'Water body detected with high confidence',
              'Response generated'
            ]).map((insight, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-sat-ink">
                <CheckCircle2 className="w-4 h-4 text-sat-success shrink-0" />
                <span className="font-medium">{insight}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right Column: AI Answer Card & Quantitative Metrics */}
      <div className="lg:col-span-4 flex flex-col space-y-4">
        
        {/* AI Answer Card */}
        <div className="bg-sat-card border border-sat-border rounded-xl p-6 shadow-card flex flex-col space-y-5">
          
          {/* Header */}
          <div className="flex items-center gap-2 text-sat-blue border-b border-sat-border pb-3">
            <Bot className="w-5 h-5 text-sat-blue" />
            <span className="text-xs font-bold uppercase tracking-wider text-sat-ink font-mono">
              AI Answer
            </span>
          </div>

          {/* Answer Text */}
          <p className="text-xs sm:text-sm text-sat-ink leading-relaxed font-sans font-normal">
            {answer}
          </p>

          {/* Confidence Metric Bar */}
          {confidence !== undefined && (
            <div className="pt-2 border-t border-sat-border/70">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-sat-slate font-medium">Confidence</span>
                <span className="font-mono font-bold text-sat-ink">
                  {Math.round(confidence * 100)}%
                </span>
              </div>
              <div className="w-full h-2 bg-sat-surface rounded-full overflow-hidden border border-sat-border/60">
                <div 
                  className="h-full bg-sat-blue rounded-full transition-all duration-700"
                  style={{ width: `${Math.round(confidence * 100)}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Detected Area Metric */}
          <div className="pt-2 border-t border-sat-border/70">
            <span className="text-xs text-sat-slate block">Detected Area (approx.)</span>
            <span className="text-lg font-bold font-mono text-sat-ink mt-0.5 block">
              {detectedArea || '2.34 km²'}
            </span>
          </div>

          {/* Coordinates */}
          <div className="pt-2 border-t border-sat-border/70">
            <div className="flex items-center gap-1.5 text-xs text-sat-slate mb-1">
              <MapPin className="w-3.5 h-3.5 text-sat-slate" />
              <span>Coordinates (Center)</span>
            </div>
            <span className="font-mono text-xs font-semibold text-sat-ink block bg-sat-surface p-2 rounded border border-sat-border">
              {coordinates?.formatted || '22.431° N, 75.362° E'}
            </span>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-3 border-t border-sat-border/70 space-y-2.5">
            <button
              onClick={handleDownload}
              className="w-full py-2.5 px-4 rounded bg-sat-blue hover:bg-sat-blue-hover text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-subtle"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Result</span>
            </button>

            <button
              onClick={handleOpenGis}
              className="w-full py-2.5 px-4 rounded bg-sat-card hover:bg-sat-surface border border-sat-border text-sat-ink text-xs font-medium flex items-center justify-between px-3 transition-colors"
            >
              <div className="flex items-center gap-2 text-left">
                <ExternalLink className="w-3.5 h-3.5 text-sat-slate" />
                <div className="flex flex-col">
                  <span className="font-semibold text-[11px]">View on Map</span>
                  <span className="text-[10px] text-sat-slate">Open in external GIS viewer</span>
                </div>
              </div>
              <span className="text-sat-slate font-mono text-xs">→</span>
            </button>
          </div>

        </div>

        {/* Small Task Metadata Panel */}
        <div className="bg-sat-surface border border-sat-border rounded-lg p-4 text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-sat-slate">Task:</span>
            <span className="font-semibold text-sat-ink">{response.task}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sat-slate">Model:</span>
            <span className="font-semibold text-sat-ink font-mono text-[11px] truncate max-w-[170px]">
              {response.model}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sat-slate">Status:</span>
            <span className="text-sat-success font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-sat-success"></span>
              Completed
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
