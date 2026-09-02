import React from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import {
  Workflow,
  Terminal,
  Play,
} from 'lucide-react';

export const AgentMonitorView: React.FC = () => {
  const { activeResult, setCurrentRoute, loadDemoScenario } = useApp();

  const trace = activeResult?.executionTrace;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-7 pb-16 bg-[#171817]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#383A34] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#F1EBDD] tracking-tight">
              Agent Controller &amp; Observable Execution Monitor
            </h1>
            <Badge variant="amber" size="sm">Audit Log</Badge>
          </div>
          <p className="text-xs text-[#AAA89E] mt-1">
            Observable audit trail of agentic orchestration, deterministic geodetic input verification, specialist model routing, and evidence synthesis.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            icon={<Play className="w-3.5 h-3.5 text-[#D6A84F]" />}
            onClick={() => {
              loadDemoScenario('scenario_bitemporal_change');
              setCurrentRoute('agent');
            }}
          >
            Replay Trace
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setCurrentRoute('analysis')}
          >
            Return to Workstation
          </Button>
        </div>
      </div>

      {/* Orchestration Flowchart Card */}
      <Card className="p-6 bg-[#222321] border-[#383A34]">
        <div className="flex items-center justify-between mb-5 border-b border-[#383A34] pb-3">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#D6A84F] flex items-center gap-2 font-mono">
              <Workflow className="w-4 h-4" /> Agentic Routing &amp; Specialist Model Architecture
            </h2>
            <p className="text-xs text-[#AAA89E] mt-0.5">
              Natural-language query and satellite raster tensors dynamically dispatched to specialized remote-sensing models.
            </p>
          </div>
          <span className="text-[10px] font-mono text-[#AAA89E]">Zero Hallucination Protocol</span>
        </div>

        {/* Visual Architecture Flowchart */}
        <div className="flex flex-col items-center justify-center py-4 select-none">
          {/* Top Node: SatQuery Agent Controller */}
          <div className="px-6 py-3 rounded-sm bg-[#2B2C28] border border-[#D6A84F]/50 text-center max-w-sm w-full shadow-subtle">
            <div className="text-[10px] uppercase font-mono text-[#D6A84F] tracking-wider font-semibold">
              Autonomous Orchestrator
            </div>
            <div className="text-xs font-bold text-[#F1EBDD] tracking-wide">SATQUERY AGENT CONTROLLER</div>
            <div className="text-[10px] text-[#AAA89E] mt-0.5 font-mono">
              Query Parsing &bull; Task Intent Classification
            </div>
          </div>

          {/* Branch Connectors */}
          <div className="w-px h-5 bg-[#383A34] my-0.5" />
          <div className="w-3/4 max-w-xl h-px bg-[#383A34] relative">
            <div className="absolute left-0 top-0 w-px h-4 bg-[#383A34]" />
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-4 bg-[#383A34]" />
            <div className="absolute right-0 top-0 w-px h-4 bg-[#383A34]" />
          </div>

          {/* 3 Specialist Modality Paths */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-4xl mt-3.5">
            {/* VQA & Grounding Specialist Path */}
            <div className="p-3.5 bg-[#2B2C28] border border-[#383A34] rounded-sm space-y-1.5 text-center">
              <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded-sm bg-[#D6A84F]/10 text-[#D6A84F] font-semibold border border-[#D6A84F]/20">
                Single-Image Path
              </span>
              <div className="text-xs font-bold text-[#F1EBDD]">RS-VQA &amp; Grounding Specialist</div>
              <p className="text-[11px] text-[#AAA89E]">
                Dense scene captioning, visual Q&A, and bounding box/mask regression.
              </p>
            </div>

            {/* Bi-Temporal Change Specialist Path */}
            <div className="p-3.5 bg-[#2B2C28] border border-[#D6A84F]/50 rounded-sm space-y-1.5 text-center shadow-subtle">
              <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded-sm bg-[#D6A84F]/15 text-[#D6A84F] font-semibold border border-[#D6A84F]/30">
                Bi-Temporal Path (Active)
              </span>
              <div className="text-xs font-bold text-[#F1EBDD]">Siamese Change-Net &amp; Change-VQA</div>
              <p className="text-[11px] text-[#AAA89E]">
                Feature differencing, temporal change maps, and quantitative conversion statistics.
              </p>
            </div>

            {/* Optical-SAR Cross Modal Path */}
            <div className="p-3.5 bg-[#2B2C28] border border-[#383A34] rounded-sm space-y-1.5 text-center">
              <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded-sm bg-[#D8C8A6]/10 text-[#D8C8A6] font-semibold border border-[#D8C8A6]/20">
                Cross-Modal Path
              </span>
              <div className="text-xs font-bold text-[#F1EBDD]">Optical-SAR Cross-Modal Fusion</div>
              <p className="text-[11px] text-[#AAA89E]">
                Joint feature alignment combining optical VNIR with cloud-penetrating radar.
              </p>
            </div>
          </div>

          {/* Merge Connectors */}
          <div className="w-3/4 max-w-xl h-px bg-[#383A34] relative mt-3.5">
            <div className="absolute left-0 bottom-0 w-px h-4 bg-[#383A34]" />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-px h-4 bg-[#383A34]" />
            <div className="absolute right-0 bottom-0 w-px h-4 bg-[#383A34]" />
          </div>
          <div className="w-px h-5 bg-[#383A34] my-0.5" />

          {/* Bottom Node: Evidence & Result Integration */}
          <div className="px-6 py-3 rounded-sm bg-[#2B2C28] border border-[#879477]/50 text-center max-w-sm w-full shadow-subtle">
            <div className="text-[10px] uppercase font-mono text-[#879477] tracking-wider font-semibold">
              Output Synthesis
            </div>
            <div className="text-xs font-bold text-[#F1EBDD] tracking-wide">RESULT INTEGRATION &amp; EVIDENCE</div>
            <div className="text-[10px] text-[#AAA89E] mt-0.5 font-mono">
              Vector Map Overlays + Calibrated Answer + Metrics
            </div>
          </div>
        </div>
      </Card>

      {/* Step-by-Step Observable Trace Timeline */}
      {trace && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#D6A84F] flex items-center gap-2 font-mono">
                <Terminal className="w-3.5 h-3.5" /> Observable Execution Trace Log
              </h2>
              <p className="text-xs text-[#AAA89E] mt-0.5 font-mono">
                Query: "{trace.query}" &bull; Pipeline Latency: {trace.totalDurationMs} ms
              </p>
            </div>
            <Badge variant="amber">{trace.modeLabel}</Badge>
          </div>

          <div className="space-y-2">
            {trace.steps.map((step, idx) => (
              <Card key={step.id} className="p-3.5 space-y-2.5 bg-[#2B2C28] border-[#383A34]">
                <div className="flex items-start justify-between gap-3 border-b border-[#383A34] pb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-sm bg-[#222321] border border-[#383A34] flex items-center justify-center text-[#D6A84F] text-xs font-mono font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#F1EBDD] flex items-center gap-2">
                        <span>{step.title}</span>
                        <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded-sm bg-[#222321] border border-[#383A34] text-[#D6A84F]">
                          Phase: {step.phase}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#AAA89E] mt-0.5">
                        {step.description}
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-xs font-mono font-semibold text-[#F1EBDD]">
                      {step.latencyMs} ms
                    </span>
                    <span className="text-[9px] font-mono text-[#879477] block font-medium">
                      ● VALIDATED
                    </span>
                  </div>
                </div>

                {/* Input & Output Contracts */}
                {(step.inputContract || step.outputContract) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-[10px] font-mono bg-[#171817] p-2.5 rounded-sm border border-[#383A34]">
                    {step.inputContract && (
                      <div>
                        <span className="text-[9px] text-[#AAA89E] uppercase tracking-wider block mb-1">
                          Input Contract Parameters
                        </span>
                        <pre className="text-[#AAA89E] overflow-x-auto">
                          {JSON.stringify(step.inputContract, null, 2)}
                        </pre>
                      </div>
                    )}
                    {step.outputContract && (
                      <div>
                        <span className="text-[9px] text-[#879477] uppercase tracking-wider block mb-1">
                          Output Verification State
                        </span>
                        <pre className="text-[#AAA89E] overflow-x-auto">
                          {JSON.stringify(step.outputContract, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
