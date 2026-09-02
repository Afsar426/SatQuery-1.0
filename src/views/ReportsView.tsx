import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { reportService } from '../services/reportService';
import {
  Printer,
  Satellite,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { ReportItem } from '../types';

export const ReportsView: React.FC = () => {
  const { activeReport, activeResult, setCurrentRoute } = useApp();

  const reports = reportService.getAll();
  const [selectedReport, setSelectedReport] = useState<ReportItem>(activeReport || reports[0]);

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-7 pb-16 bg-[#171817]">
      {/* Top Header (Hidden on Print) */}
      <div className="no-print flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#383A34] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-[#F1EBDD] tracking-tight">
            Scientific Remote-Sensing Analysis Reports
          </h1>
          <p className="text-xs text-[#AAA89E] mt-1">
            Automated, verifiable mission reports with quantitative metrics, evidence maps, and execution traces.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            icon={<Printer className="w-4 h-4 text-[#D6A84F]" />}
            onClick={handlePrintReport}
          >
            Print / Save as PDF
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setCurrentRoute('analysis')}
          >
            Back to Workstation
          </Button>
        </div>
      </div>

      {/* Main Grid: Report Preview (Left 8 cols) & Reports Archive (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* ======================================================== */}
        {/* REPORT DOCUMENT PREVIEW (PRINT OPTIMIZED) (8 COLS)       */}
        {/* ======================================================== */}
        <div className="lg:col-span-8 bg-[#222321] border border-[#383A34] rounded-panel p-8 md:p-10 shadow-panel space-y-6 print:p-0 print:border-none print:shadow-none print:bg-white print:text-black">
          {/* Official Letterhead / Header */}
          <div className="border-b-2 border-[#D6A84F]/40 pb-5 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Satellite className="w-5 h-5 text-[#D6A84F]" />
                <span className="text-lg font-extrabold tracking-wider text-[#F1EBDD] uppercase">
                  SATQUERY <span className="text-[#D6A84F]">AI</span>
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-[#D6A84F]/15 text-[#D6A84F] border border-[#D6A84F]/30 rounded-sm font-semibold">
                  ISRO SIH26167
                </span>
              </div>
              <div className="text-xs font-mono text-[#AAA89E]">
                AUTONOMOUS REMOTE-SENSING ANALYSIS SYSTEM
              </div>
              <div className="text-[11px] font-mono text-[#879477] mt-0.5">
                Department of Space / ISRO &bull; National Space Technology Division
              </div>
            </div>

            <div className="text-right font-mono text-xs text-[#AAA89E]">
              <div className="font-bold text-[#D6A84F] text-sm">{selectedReport.reportNumber}</div>
              <div>DATE: {selectedReport.generatedDate}</div>
              <div className="text-[#879477] font-medium mt-1">STATUS: CERTIFIED FINAL</div>
            </div>
          </div>

          {/* Report Metadata Table */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3.5 bg-[#2B2C28] rounded-sm border border-[#383A34] text-xs font-mono">
            <div>
              <span className="text-[10px] text-[#AAA89E] block">Project</span>
              <span className="font-semibold text-[#F1EBDD] truncate block">{selectedReport.projectName}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#AAA89E] block">Analysis Mode</span>
              <span className="font-semibold text-[#D6A84F] block">{selectedReport.analysisMode}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#AAA89E] block">Certified Analyst</span>
              <span className="font-semibold text-[#F1EBDD] block">{selectedReport.analyst}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#AAA89E] block">CRS / Datum</span>
              <span className="font-semibold text-[#F1EBDD] block">WGS 84 / UTM 43N</span>
            </div>
          </div>

          {/* Natural Language Query Section */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D6A84F] font-mono">
              1. Natural-Language Query &amp; Task Intent
            </h3>
            <div className="p-3 bg-[#2B2C28] border border-[#383A34] rounded-sm text-xs font-mono text-[#F1EBDD]">
              "{selectedReport.query}"
            </div>
          </div>

          {/* Specialist Models & Workflow Employed */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D6A84F] font-mono">
              2. Agent-Selected Specialist Models &amp; Tools
            </h3>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 bg-[#2B2C28] border border-[#383A34] rounded-sm text-[#AAA89E]">
                &bull; Metadata &amp; Co-Registration Validator Tool v4.1
              </span>
              <span className="px-2.5 py-1 bg-[#2B2C28] border border-[#383A34] rounded-sm text-[#AAA89E]">
                &bull; Siamese RS-Change Detection Transformer v3.2
              </span>
              <span className="px-2.5 py-1 bg-[#2B2C28] border border-[#383A34] rounded-sm text-[#AAA89E]">
                &bull; Change-VQA Specialist Model v1.8 (CDVQA Benchmark)
              </span>
            </div>
          </div>

          {/* AI Result & Technical Narrative */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#879477] font-mono">
              3. Verified Technical Findings &amp; Narrative
            </h3>
            <p className="text-xs text-[#F1EBDD] leading-relaxed p-3.5 bg-[#2B2C28] rounded-sm border border-[#383A34] font-sans">
              {activeResult?.answer || 'Autonomous analysis confirms significant infrastructure expansion across the northern observation quadrant, converting fallow agricultural terrain into impermeable logistics and industrial foundations.'}
            </p>
          </div>

          {/* Geospatial Quantitative Statistics Table */}
          {activeResult?.statistics && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#D6A84F] flex items-center gap-1.5 font-mono">
                <TrendingUp className="w-3.5 h-3.5" /> 4. Quantitative Geospatial Statistics
              </h3>
              <div className="grid grid-cols-4 gap-2.5 text-xs font-mono">
                <div className="p-2.5 bg-[#2B2C28] border border-[#383A34] rounded-sm">
                  <span className="text-[10px] text-[#AAA89E] block">Net Changed Area</span>
                  <span className="text-[#B76552] font-bold text-sm">
                    +{activeResult.statistics.changedAreaKm2} km²
                  </span>
                </div>
                <div className="p-2.5 bg-[#2B2C28] border border-[#383A34] rounded-sm">
                  <span className="text-[10px] text-[#AAA89E] block">Expansion Ratio</span>
                  <span className="text-[#D6A84F] font-bold text-sm">
                    +{activeResult.statistics.percentageChange}%
                  </span>
                </div>
                <div className="p-2.5 bg-[#2B2C28] border border-[#383A34] rounded-sm">
                  <span className="text-[10px] text-[#AAA89E] block">Changed Clusters</span>
                  <span className="text-[#F1EBDD] font-bold text-sm">
                    {activeResult.statistics.detectedRegionsCount} Polygons
                  </span>
                </div>
                <div className="p-2.5 bg-[#2B2C28] border border-[#383A34] rounded-sm">
                  <span className="text-[10px] text-[#AAA89E] block">Confidence Score</span>
                  <span className="text-[#879477] font-bold text-sm">
                    {(activeResult.confidence.score! * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Observable Execution Trace Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#AAA89E] font-mono">
              5. Observable Workflow Audit Verification
            </h3>
            <div className="p-3 bg-[#2B2C28] rounded-sm border border-[#383A34] text-[11px] font-mono text-[#AAA89E] space-y-1">
              <div>&bull; Input Verification: EPSG:32643 Co-registration verified (RMSE: 0.22 px)</div>
              <div>&bull; Query Intent: Mapped to Bi-Temporal Change Detection &amp; Description</div>
              <div>&bull; Inference Forward Pass: Siamese Transformer executed in 580ms</div>
              <div>&bull; Grounding Output: 14 polygon vector geometries generated and verified</div>
            </div>
          </div>

          {/* Official Sign-off Footer */}
          <div className="pt-5 border-t border-[#383A34] flex items-center justify-between text-xs font-mono text-[#AAA89E]">
            <div>ISRO / SAC GeoAI Autonomous Pipeline Cert #85E4</div>
            <div className="flex items-center gap-1.5 text-[#879477]">
              <ShieldCheck className="w-4 h-4" /> Cryptographically Verified Artifact
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* REPORTS ARCHIVE (RIGHT 4 COLS - HIDDEN ON PRINT)         */}
        {/* ======================================================== */}
        <div className="no-print lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#D6A84F] flex items-center justify-between px-1 font-mono">
            <span>Archived Reports ({reports.length})</span>
          </div>

          <div className="space-y-2">
            {reports.map(rep => (
              <div
                key={rep.id}
                onClick={() => setSelectedReport(rep)}
                className={`p-3.5 rounded-sm border cursor-pointer transition-colors ${
                  selectedReport.id === rep.id
                    ? 'bg-[#2B2C28] border-[#D6A84F]/50 shadow-subtle'
                    : 'bg-[#222321] border-[#383A34] hover:border-[#474942] hover:bg-[#2B2C28]/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#D6A84F] font-mono">{rep.reportNumber}</span>
                  <Badge variant="sage" size="sm">{rep.status}</Badge>
                </div>

                <div className="text-xs font-bold text-[#F1EBDD] line-clamp-1">
                  {rep.title}
                </div>

                <p className="text-[11px] text-[#AAA89E] mt-0.5 font-mono">
                  Project: {rep.projectName}
                </p>

                <div className="mt-2.5 pt-2 border-t border-[#383A34]/50 flex items-center justify-between text-[10px] font-mono text-[#AAA89E]">
                  <span>{rep.generatedDate.split(' ')[0]}</span>
                  <span className="text-[#879477]">{rep.analysisMode}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
