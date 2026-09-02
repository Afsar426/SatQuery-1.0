import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Tooltip } from '../components/common/Tooltip';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileText,
  Search,
  Eye,
} from 'lucide-react';
import { AnalysisResult } from '../types';

export const ResultsView: React.FC = () => {
  const {
    activeResult,
    setActiveResult,
    setCurrentRoute,
    setMapCenter,
    setMapZoom,
    generateReportForResult,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResult, setSelectedResult] = useState<AnalysisResult>(activeResult!);

  const handleFocusEvidence = (res: AnalysisResult) => {
    setActiveResult(res);
    if (res.evidenceItems.length > 0) {
      setMapCenter(res.evidenceItems[0].centerCoords);
      setMapZoom(res.evidenceItems[0].targetZoom);
    }
    setCurrentRoute('analysis');
  };

  const handleGenerateReport = (res: AnalysisResult) => {
    generateReportForResult(res);
    setCurrentRoute('reports');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 pb-16 bg-[#171817]">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#383A34] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-[#F1EBDD] tracking-tight">
            Analysis Results &amp; Visual Evidence Archive
          </h1>
          <p className="text-xs text-[#AAA89E] mt-1">
            Grounded spatial intelligence archive with calibrated confidence, quantitative metrics, and evidence overlays.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#AAA89E] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by query or keyword..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-[#2B2C28] border border-[#383A34] rounded-sm pl-9 pr-3 py-1.5 text-xs text-[#F1EBDD] focus:outline-none focus:border-[#D6A84F] w-64"
            />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {selectedResult && (
          <div className="lg:col-span-8 space-y-4">
            <Card className="p-6 space-y-4 bg-[#222321] border-[#383A34]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#383A34] pb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="amber">{selectedResult.modeLabel}</Badge>
                  <span className="text-[11px] font-mono text-[#AAA89E]">
                    {selectedResult.createdAt.split('T')[0]}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Tooltip
                    content={selectedResult.confidence.explanation}
                    title="Calibrated Confidence"
                  >
                    <Badge variant="sage" size="md">
                      {(selectedResult.confidence.score! * 100).toFixed(0)}% {selectedResult.confidence.tier} CONFIDENCE
                    </Badge>
                  </Tooltip>
                </div>
              </div>

              {/* Natural-Language Query Prompt */}
              <div className="p-3 bg-[#171817] border border-[#383A34] rounded-sm">
                <span className="text-[10px] uppercase font-mono text-[#D6A84F] block mb-1">
                  User Text Query
                </span>
                <p className="text-sm font-semibold text-[#F1EBDD] font-mono">
                  "{selectedResult.query}"
                </p>
              </div>

              {/* Calibrated AI Answer */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#879477] flex items-center gap-1.5 font-mono">
                  <Sparkles className="w-3.5 h-3.5" /> Domain Analysis Answer
                </span>
                <p className="text-xs text-[#F1EBDD] leading-relaxed font-sans bg-[#2B2C28] p-3.5 rounded-sm border border-[#383A34]">
                  {selectedResult.answer}
                </p>
              </div>

              {/* Quantitative Metrics */}
              {selectedResult.statistics && (
                <div className="p-3.5 bg-[#171817] border border-[#383A34] rounded-sm space-y-2">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#D6A84F] flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" /> Calculated Geospatial Statistics
                  </span>
                  <div className="grid grid-cols-3 gap-3 text-xs font-mono">
                    <div className="p-2 bg-[#2B2C28] rounded-sm border border-[#383A34]">
                      <span className="text-[9px] text-[#AAA89E] block">Changed Extent</span>
                      <span className="text-[#B76552] font-bold text-sm">
                        +{selectedResult.statistics.changedAreaKm2} km²
                      </span>
                    </div>
                    <div className="p-2 bg-[#2B2C28] rounded-sm border border-[#383A34]">
                      <span className="text-[9px] text-[#AAA89E] block">Change %</span>
                      <span className="text-[#D6A84F] font-bold text-sm">
                        +{selectedResult.statistics.percentageChange}%
                      </span>
                    </div>
                    <div className="p-2 bg-[#2B2C28] rounded-sm border border-[#383A34]">
                      <span className="text-[9px] text-[#AAA89E] block">Clusters</span>
                      <span className="text-[#F1EBDD] font-bold text-sm">
                        {selectedResult.statistics.detectedRegionsCount}
                      </span>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-[#AAA89E] mt-0.5">
                    Method: {selectedResult.statistics.calculationMethod}
                  </div>
                </div>
              )}

              {/* Spatial Evidence Items */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#AAA89E] font-mono">
                  Grounded Spatial Evidence ({selectedResult.evidenceItems.length})
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {selectedResult.evidenceItems.map(ev => (
                    <div
                      key={ev.id}
                      className="p-2.5 bg-[#171817] border border-[#383A34] rounded-sm space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-[#F1EBDD] flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: ev.colorCode }}
                          />
                          {ev.title}
                        </span>
                        <Badge variant="amber" size="sm">{ev.type}</Badge>
                      </div>
                      <p className="text-[11px] text-[#AAA89E] leading-relaxed">
                        {ev.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#383A34] flex items-center justify-between">
                <Button
                  variant="primary"
                  size="md"
                  icon={<Eye className="w-4 h-4" />}
                  onClick={() => handleFocusEvidence(selectedResult)}
                >
                  Show on Interactive Map
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  icon={<FileText className="w-4 h-4 text-[#D6A84F]" />}
                  onClick={() => handleGenerateReport(selectedResult)}
                >
                  Generate Official Report
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* History List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#D6A84F] flex items-center justify-between px-1 font-mono">
            <span>Completed Mission History</span>
            <span className="text-[10px] text-[#AAA89E] font-mono">4 Total</span>
          </div>

          <div className="space-y-2">
            {[selectedResult].concat([]).map((res, i) => (
              <div
                key={res.id + i}
                onClick={() => setSelectedResult(res)}
                className={`p-3 rounded-sm border cursor-pointer transition-colors ${
                  selectedResult?.id === res.id
                    ? 'bg-[#2B2C28] border-[#D6A84F]/50 shadow-subtle'
                    : 'bg-[#222321] border-[#383A34] hover:border-[#474942] hover:bg-[#2B2C28]/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="amber" size="sm">{res.modeLabel.split(' ')[0]}</Badge>
                  <span className="text-[10px] font-mono text-[#879477] font-semibold">
                    {(res.confidence.score! * 100).toFixed(0)}% Certainty
                  </span>
                </div>

                <div className="text-xs font-semibold text-[#F1EBDD] line-clamp-1 font-mono">
                  "{res.query}"
                </div>

                <p className="text-[11px] text-[#AAA89E] mt-1 line-clamp-2 leading-relaxed">
                  {res.answer}
                </p>

                <div className="mt-2.5 pt-2 border-t border-[#383A34]/50 flex items-center justify-between text-[10px] font-mono text-[#AAA89E]">
                  <span>{res.evidenceItems.length} Evidence Layers</span>
                  <span className="text-[#D6A84F] flex items-center gap-1">
                    Select <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
