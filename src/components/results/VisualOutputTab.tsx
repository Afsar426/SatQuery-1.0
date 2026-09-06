import React, { useState } from 'react';
import { Sliders, Eye, EyeOff, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { AnalysisResponse } from '../../types/analysis';

interface VisualOutputTabProps {
  response: AnalysisResponse;
}

export const VisualOutputTab: React.FC<VisualOutputTabProps> = ({ response }) => {
  const [opacity, setOpacity] = useState(85);
  const [showOverlay, setShowOverlay] = useState(true);
  const [zoom, setZoom] = useState(100);

  const inputImg = response.visualEvidence?.inputImageUrl;
  const overlayImg = response.visualEvidence?.detectedRegionUrl;

  return (
    <div className="flex flex-col space-y-6">
      
      {/* Control Toolbar */}
      <div className="bg-sat-card border border-sat-border rounded-lg p-4 flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Opacity & Visibility Controls */}
        <div className="flex items-center gap-6 flex-wrap">
          {/* Toggle Mask */}
          <button
            onClick={() => setShowOverlay(!showOverlay)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-semibold border transition-all ${
              showOverlay 
                ? 'bg-sat-blue text-white border-sat-blue' 
                : 'bg-sat-surface text-sat-slate border-sat-border hover:text-sat-ink'
            }`}
          >
            {showOverlay ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{showOverlay ? 'Grounding Mask Active' : 'Mask Hidden'}</span>
          </button>

          {/* Opacity Slider */}
          <div className="flex items-center gap-3">
            <Sliders className="w-3.5 h-3.5 text-sat-slate" />
            <span className="text-xs font-medium text-sat-slate">Mask Opacity:</span>
            <input
              type="range"
              min="10"
              max="100"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              disabled={!showOverlay}
              className="w-28 accent-sat-blue cursor-pointer disabled:opacity-40"
            />
            <span className="text-xs font-mono text-sat-ink w-8">
              {opacity}%
            </span>
          </div>
        </div>

        {/* Right: Zoom Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom(Math.max(75, zoom - 15))}
            className="p-1.5 rounded border border-sat-border bg-sat-surface hover:bg-sat-border/40 text-sat-ink transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-sat-slate px-2">
            {zoom}%
          </span>
          <button
            onClick={() => setZoom(Math.min(175, zoom + 15))}
            className="p-1.5 rounded border border-sat-border bg-sat-surface hover:bg-sat-border/40 text-sat-ink transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setZoom(100); setOpacity(85); setShowOverlay(true); }}
            className="p-1.5 rounded border border-sat-border bg-sat-surface hover:bg-sat-border/40 text-sat-slate hover:text-sat-ink transition-colors ml-1"
            title="Reset View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Main Interactive Viewport Canvas */}
      <div className="relative w-full aspect-[16/10] max-h-[560px] bg-[#0A1016] rounded-xl overflow-hidden border border-sat-border flex items-center justify-center shadow-card">
        
        <div 
          className="relative max-w-full max-h-full transition-transform duration-200"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          {/* Base Layer: Raw Satellite Image */}
          {inputImg && (
            <img
              src={inputImg}
              alt="Raw Satellite Scene"
              className="block max-w-full max-h-full object-contain select-none"
            />
          )}

          {/* Overlay Layer: Specialist Grounding Mask with adjustable opacity */}
          {overlayImg && showOverlay && (
            <div 
              className="absolute inset-0 transition-opacity duration-150 pointer-events-none"
              style={{ opacity: opacity / 100 }}
            >
              <img
                src={overlayImg}
                alt="Specialist Grounding Mask Overlay"
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>

        {/* Viewport Overlay HUD */}
        <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded text-[11px] font-mono text-gray-200">
          PROJECTION: EPSG:4326 | GSD: 10M | BAND: TRUE-COLOR + MASK
        </div>

        <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded text-[11px] font-mono text-gray-200 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#0077FF]"></span>
          <span>TARGET: {response.visualEvidence?.detectedObject || 'FEATURE'}</span>
        </div>

      </div>

      {/* Grounding Technical Details */}
      <div className="p-4 bg-sat-card border border-sat-border rounded-lg text-xs text-sat-slate flex flex-col sm:flex-row justify-between gap-2">
        <div>
          <span className="font-semibold text-sat-ink">Vectorization Algorithm: </span>
          <span>Marching Squares contour extraction with epsilon tolerance 0.002°</span>
        </div>
        <div className="font-mono text-[11px]">
          BOUNDING BOX: [ymin: 0.08, xmin: 0.45, ymax: 0.42, xmax: 0.88]
        </div>
      </div>

    </div>
  );
};
