import React from 'react';
import { useApp } from '../context/AppContext';
import { GeoMap } from '../components/map/GeoMap';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Tooltip } from '../components/common/Tooltip';
import { ProgressStepper } from '../components/common/ProgressStepper';
import {
  Sparkles,
  Send,
  Layers,
  ShieldCheck,
  FileText,
  Workflow,
  Eye,
  TrendingUp,
  Radio,
} from 'lucide-react';

export const AnalysisView: React.FC = () => {
  const {
    currentProject,
    currentQuery,
    setCurrentQuery,
    runAnalysis,
    isAnalyzing,
    agentSteps,
    activeResult,
    setValidationDrawerOpen,
    validationResult,
    layers,
    toggleLayerVisibility,
    setLayerOpacity,
    setMapCenter,
    setMapZoom,
    setCurrentRoute,
    generateReportForResult,
  } = useApp();

  const querySuggestions = [
    { text: 'What changed between these two dates?', label: 'Bi-Temporal Change' },
    { text: 'Has the built-up area increased?', label: 'Change-VQA' },
    { text: 'Highlight the water body.', label: 'Region Grounding' },
    { text: 'What major land-cover types are visible?', label: 'Single-Image VQA' },
    { text: 'Use optical and SAR together to identify built-up and water-covered regions.', label: 'Optical + SAR' },
  ];

  const handleRunQuery = (text?: string) => {
    const q = text || currentQuery;
    if (!q.trim()) return;
    runAnalysis(q);
  };

  const handleFocusEvidence = (center: [number, number], zoom: number) => {
    setMapCenter(center);
    setMapZoom(zoom);
  };

  const handleGenerateReport = () => {
    if (!activeResult) return;
    generateReportForResult(activeResult);
    setCurrentRoute('reports');
  };

  return (
    <div className="h-full flex flex-col bg-[#171817] overflow-hidden select-none">
      {/* Analysis Workspace Sub-Header */}
      <div className="h-11 bg-[#222321] border-b border-[#383A34] px-4 py-2 flex items-center justify-between flex-shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#F1EBDD]">{currentProject.name}</span>
            <span className="text-[10px] font-mono text-[#879477] bg-[#879477]/15 px-1.5 py-0.5 rounded-sm border border-[#879477]/30">
              {currentProject.regionName.split(',')[0]}
            </span>
          </div>

          <div className="h-3.5 w-px bg-[#383A34]" />

          {/* Auto-detected Mode Pill */}
          <div className="flex items-center gap-1.5">
            <Badge variant="amber" size="sm" icon={<Sparkles className="w-3 h-3 text-[#D6A84F]" />}>
              {activeResult?.modeLabel || 'AGENT READY'}
            </Badge>
          </div>
        </div>

        {/* Validation Status Quick Indicator */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setValidationDrawerOpen(true)}
            className="flex items-center gap-1.5 text-xs font-mono text-[#AAA89E] hover:text-[#D6A84F] transition-colors bg-[#2B2C28] px-2 py-0.5 rounded-sm border border-[#383A34]"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#879477]" />
            <span>Validation: {validationResult.status}</span>
          </button>
        </div>
      </div>

      {/* 3-Panel Professional GeoAI Workstation */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* ======================================================== */}
        {/* LEFT PANEL: DATA, METADATA & LAYERS (20% width)          */}
        {/* ======================================================== */}
        <aside className="w-72 md:w-80 bg-[#222321] border-r border-[#383A34] flex flex-col flex-shrink-0 overflow-y-auto">
          {/* Inputs Section */}
          <div className="p-3.5 border-b border-[#383A34] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D6A84F] flex items-center gap-1.5 font-mono">
                <Radio className="w-3.5 h-3.5" /> Pipeline Inputs ({currentProject.images.length})
              </span>
              <button
                onClick={() => setValidationDrawerOpen(true)}
                className="text-[10px] text-[#D6A84F] hover:underline font-mono"
              >
                Inspect
              </button>
            </div>

            <div className="space-y-1.5">
              {currentProject.images.map(img => (
                <div
                  key={img.id}
                  className="p-2 bg-[#2B2C28] border border-[#383A34] rounded-sm text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#F1EBDD] truncate max-w-[170px]" title={img.name}>
                      {img.name}
                    </span>
                    <Badge variant={img.modality === 'sar' ? 'sand' : 'amber'} size="sm">
                      {img.temporalType}
                    </Badge>
                  </div>

                  <div className="text-[10px] font-mono text-[#AAA89E] flex items-center justify-between">
                    <span>{img.metadata.resolution}</span>
                    <span>{img.metadata.sensor.split(' ')[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Layer Management Section */}
          <div className="p-3.5 border-b border-[#383A34] space-y-2.5 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D6A84F] flex items-center gap-1.5 font-mono">
                <Layers className="w-3.5 h-3.5" /> Active Map Layers
              </span>
              <span className="text-[10px] text-[#AAA89E] font-mono">{layers.filter(l => l.visible).length} Visible</span>
            </div>

            <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
              {layers.map(layer => (
                <div
                  key={layer.id}
                  className="p-2 bg-[#2B2C28]/70 border border-[#383A34]/60 rounded-sm text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={layer.visible}
                        onChange={() => toggleLayerVisibility(layer.id)}
                        className="rounded-sm bg-[#171817] border-[#383A34] text-[#D6A84F] focus:ring-0 cursor-pointer h-3.5 w-3.5"
                      />
                      <span className="text-[#F1EBDD] text-[11px] font-medium">{layer.name}</span>
                    </label>
                    {layer.color && (
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: layer.color }}
                      />
                    )}
                  </div>

                  {layer.visible && (
                    <div className="flex items-center gap-2 pl-5">
                      <span className="text-[9px] text-[#AAA89E]">Opacity</span>
                      <input
                        type="range"
                        min="0.1"
                        max="1.0"
                        step="0.05"
                        value={layer.opacity}
                        onChange={e => setLayerOpacity(layer.id, parseFloat(e.target.value))}
                        className="w-full accent-[#D6A84F] h-1 bg-[#171817] rounded cursor-pointer"
                      />
                      <span className="text-[9px] font-mono text-[#AAA89E] w-6 text-right">
                        {Math.round(layer.opacity * 100)}%
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Technical Metadata Standard */}
          <div className="p-3 bg-[#171817] text-xs space-y-1.5 border-t border-[#383A34]">
            <span className="text-[10px] font-semibold text-[#AAA89E] uppercase tracking-wider block font-mono">
              Geospatial Standards
            </span>
            <div className="space-y-0.5 text-[10px] font-mono text-[#AAA89E]">
              <div>CRS: <span className="text-[#F1EBDD]">{currentProject.images[0]?.metadata.crs.split(' ')[0] || 'EPSG:32643'}</span></div>
              <div>GSD: <span className="text-[#F1EBDD]">{currentProject.images[0]?.metadata.resolution || '10m'}</span></div>
              <div>Raster: <span className="text-[#F1EBDD]">Cloud-Optimized GeoTIFF</span></div>
            </div>
          </div>
        </aside>

        {/* ======================================================== */}
        {/* CENTER PANEL: GEOSPATIAL MAP CANVAS (54% width)          */}
        {/* ======================================================== */}
        <div className="flex-1 relative h-full bg-[#171817] overflow-hidden flex flex-col">
          <GeoMap />
        </div>

        {/* ======================================================== */}
        {/* RIGHT PANEL: AI AGENT, RESULTS & TRACE (26% width)       */}
        {/* ======================================================== */}
        <aside className="w-80 md:w-96 bg-[#222321] border-l border-[#383A34] flex flex-col flex-shrink-0 overflow-y-auto">
          {/* Agent Header */}
          <div className="p-3.5 border-b border-[#383A34] bg-[#171817] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-sm bg-[#2B2C28] border border-[#D6A84F]/40 flex items-center justify-center text-[#D6A84F]">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#F1EBDD] tracking-wider uppercase font-mono">
                  SATQUERY CONTROLLER
                </h3>
                <span className="text-[10px] font-mono text-[#879477] flex items-center gap-1">
                  ● {isAnalyzing ? 'ORCHESTRATING WORKFLOW...' : 'AGENT READY'}
                </span>
              </div>
            </div>

            <Tooltip
              content="SatQuery dynamically determines whether your query requires Single-Image VQA, Region Grounding, Bi-Temporal Change Detection, or Optical-SAR Fusion."
              title="Autonomous Orchestrator"
              showIcon
            />
          </div>

          {/* Query Input Box */}
          <div className="p-3.5 border-b border-[#383A34] space-y-2.5 bg-[#222321]">
            <div className="relative">
              <textarea
                rows={2}
                value={currentQuery}
                onChange={e => setCurrentQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleRunQuery();
                  }
                }}
                placeholder="Ask a natural-language remote-sensing question..."
                className="w-full bg-[#2B2C28] border border-[#383A34] rounded-panel p-2.5 text-xs text-[#F1EBDD] placeholder:text-[#78766D] focus:outline-none focus:border-[#D6A84F] resize-none font-sans leading-relaxed shadow-subtle"
              />
              <div className="absolute right-2 bottom-2">
                <Button
                  variant="primary"
                  size="sm"
                  loading={isAnalyzing}
                  onClick={() => handleRunQuery()}
                  icon={<Send className="w-3 h-3" />}
                >
                  Analyze
                </Button>
              </div>
            </div>

            {/* Quick Query Suggestion Chips */}
            <div className="space-y-1">
              <span className="text-[9px] uppercase font-mono text-[#78766D] tracking-wider block">
                Standard Remote-Sensing Queries:
              </span>
              <div className="flex flex-wrap gap-1">
                {querySuggestions.map(s => (
                  <button
                    key={s.text}
                    onClick={() => {
                      setCurrentQuery(s.text);
                      handleRunQuery(s.text);
                    }}
                    className="text-[10px] font-sans px-2 py-0.5 bg-[#2B2C28] hover:bg-[#333530] text-[#AAA89E] hover:text-[#D6A84F] border border-[#383A34] rounded-sm transition-all text-left"
                  >
                    {s.text}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Agent Response / Results Stream */}
          <div className="p-3.5 space-y-3.5 flex-1">
            {activeResult && (
              <div className="space-y-3.5">
                {/* Natural Language Answer Card */}
                <div className="p-3.5 bg-[#2B2C28] border border-[#383A34] rounded-panel space-y-2.5 shadow-panel">
                  <div className="flex items-center justify-between border-b border-[#383A34] pb-1.5">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#D6A84F] flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" /> Calibrated AI Answer
                    </span>
                    <Tooltip
                      content={activeResult.confidence.explanation}
                      title={`Confidence: ${(activeResult.confidence.score! * 100).toFixed(0)}%`}
                    >
                      <Badge variant="sage" size="sm">
                        {(activeResult.confidence.score! * 100).toFixed(0)}% HIGH CERTAINTY
                      </Badge>
                    </Tooltip>
                  </div>

                  <p className="text-xs text-[#F1EBDD] leading-relaxed font-sans">
                    {activeResult.answer}
                  </p>

                  <div className="text-[10px] text-[#AAA89E] bg-[#222321] p-2 rounded-sm border border-[#383A34] leading-relaxed font-mono">
                    <span className="text-[#879477] font-semibold">Evidence Basis:</span> {activeResult.evidenceSummary}
                  </div>
                </div>

                {/* Geospatial Statistics Table */}
                {activeResult.statistics && (
                  <div className="p-3 bg-[#2B2C28] border border-[#383A34] rounded-panel space-y-2">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#879477] flex items-center gap-1.5">
                      <TrendingUp className="w-3 h-3" /> Quantitative Geospatial Statistics
                    </span>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-0.5">
                      <div className="bg-[#222321] p-2 rounded-sm border border-[#383A34]">
                        <span className="text-[9px] text-[#AAA89E] block">Changed Area</span>
                        <span className="text-[#B76552] font-bold text-sm">
                          +{activeResult.statistics.changedAreaKm2} km²
                        </span>
                      </div>
                      <div className="bg-[#222321] p-2 rounded-sm border border-[#383A34]">
                        <span className="text-[9px] text-[#AAA89E] block">Expansion %</span>
                        <span className="text-[#D6A84F] font-bold text-sm">
                          +{activeResult.statistics.percentageChange}%
                        </span>
                      </div>
                      <div className="bg-[#222321] p-2 rounded-sm border border-[#383A34]">
                        <span className="text-[9px] text-[#AAA89E] block">Change Clusters</span>
                        <span className="text-[#F1EBDD] font-bold text-sm">
                          {activeResult.statistics.detectedRegionsCount} Polygons
                        </span>
                      </div>
                      <div className="bg-[#222321] p-2 rounded-sm border border-[#383A34]">
                        <span className="text-[9px] text-[#AAA89E] block">Current Built-up</span>
                        <span className="text-[#F1EBDD] font-bold text-sm">
                          {activeResult.statistics.currentBuiltUpKm2 || '22.00'} km²
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Spatial Evidence Interactive Cards */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#AAA89E]">
                      Spatial Evidence ({activeResult.evidenceItems.length})
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {activeResult.evidenceItems.map(ev => (
                      <div
                        key={ev.id}
                        className="p-2 bg-[#2B2C28] border border-[#383A34] rounded-sm text-xs flex items-center justify-between gap-2"
                      >
                        <div>
                          <div className="font-medium text-[#F1EBDD] text-[11px] flex items-center gap-1.5">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: ev.colorCode }}
                            />
                            {ev.title}
                          </div>
                          <div className="text-[10px] text-[#AAA89E] line-clamp-1 mt-0.5">
                            {ev.description}
                          </div>
                        </div>

                        <Button
                          variant="secondary"
                          size="sm"
                          icon={<Eye className="w-3 h-3 text-[#D6A84F]" />}
                          onClick={() => handleFocusEvidence(ev.centerCoords, ev.targetZoom)}
                        >
                          Focus
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: View Trace & Generate Report */}
                <div className="pt-2 flex items-center gap-2 border-t border-[#383A34]">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex-1"
                    icon={<Workflow className="w-3.5 h-3.5 text-[#D6A84F]" />}
                    onClick={() => setCurrentRoute('agent')}
                  >
                    View Trace
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    icon={<FileText className="w-3.5 h-3.5" />}
                    onClick={handleGenerateReport}
                  >
                    Generate Report
                  </Button>
                </div>
              </div>
            )}

            {/* Observable Execution Trace / Agent Activity Stepper */}
            <div className="mt-3.5 pt-3.5 border-t border-[#383A34] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#D6A84F] flex items-center gap-1.5">
                  <Workflow className="w-3 h-3" /> Observable Agent Activity
                </span>
                <span className="text-[9px] font-mono text-[#AAA89E]">Audit Trail</span>
              </div>

              <ProgressStepper steps={agentSteps} isAnalyzing={isAnalyzing} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
