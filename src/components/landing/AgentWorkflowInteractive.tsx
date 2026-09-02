import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { ArrowRight } from 'lucide-react';

interface AgentWorkflowInteractiveProps {
  onOpenWorkstation: () => void;
}

export const AgentWorkflowInteractive: React.FC<AgentWorkflowInteractiveProps> = ({
  onOpenWorkstation,
}) => {
  const workflowStages = [
    {
      id: 'step-1',
      num: '01',
      title: 'User Text Query',
      agent: 'Natural Language Ingest',
      description: 'Accepts unconstrained natural-language questions in domain language, such as "What changed between these two dates?" or "Highlight the water body."',
      inputContract: 'Raw text string + Georeferenced image tensor pointer(s)',
      outputContract: 'Sanitized semantic token stream with spatial intent keywords',
      latency: '24 ms',
    },
    {
      id: 'step-2',
      num: '02',
      title: 'Mission Planner',
      agent: 'SatQuery Agentic Controller',
      description: 'Evaluates number of images, modalities (Optical vs SAR), and intent (Single-VQA, Captioning, Grounding, Bi-temporal Change, or Dual-Fusion).',
      inputContract: 'Parsed query + Raster metadata headers (EPSG, GSD, bands)',
      outputContract: 'Determined Task Mode: BITEMPORAL_CHANGE_DETECTION',
      latency: '45 ms',
    },
    {
      id: 'step-3',
      num: '03',
      title: 'Data Retrieval & Verification',
      agent: 'Deterministic Geodetic Validator',
      description: 'Validates CRS projection congruency (EPSG:32643), GSD scale compatibility, bounding box intersection, and sub-pixel alignment.',
      inputContract: 'Sentinel-2 L2A GeoTIFFs (T1: 2024-03-15, T2: 2026-02-28)',
      outputContract: 'Validation State: READY (RMSE 0.22 px, 99.8% Congruence)',
      latency: '82 ms',
    },
    {
      id: 'step-4',
      num: '04',
      title: 'Specialist Model Dispatch',
      agent: 'Multi-Model Tool Dispatcher',
      description: 'Autonomous controller routes tensors to specialist model heads: Siamese Change-Net v3.2 + Change-VQA Temporal Reasoning Engine.',
      inputContract: 'Normalized raster matrices (B2, B3, B4, B8 NIR)',
      outputContract: 'Model weights allocated on active NVIDIA RTX GPU tensor cores',
      latency: '52 ms',
    },
    {
      id: 'step-5',
      num: '05',
      title: 'Feature Differencing & Inference',
      agent: 'Siamese Transformer Vision Head',
      description: 'Computes deep multi-scale feature pyramids and cross-temporal attention, isolating land conversion while ignoring seasonal illumination variations.',
      inputContract: 'Paired bi-temporal feature embeddings',
      outputContract: 'Binary change heatmap logits + segmented change polygon bounds',
      latency: '580 ms',
    },
    {
      id: 'step-6',
      num: '06',
      title: 'Geospatial Measurement Engine',
      agent: 'GIS Spatial Calculator',
      description: 'Integrates coordinate transform matrix with pixel counts to calculate exact metric ground area (+3.42 km² / +18.4% growth) across 14 clusters.',
      inputContract: 'Pixel change mask + GSD pixel size (10.0m)',
      outputContract: 'Quantitative statistics: +3.42 km² net built-up expansion',
      latency: '68 ms',
    },
    {
      id: 'step-7',
      num: '07',
      title: 'Evidence Verification',
      agent: 'Certainty & Evidence Validator',
      description: 'Cross-verifies NDBI built-up indices against vision model logits to compute a calibrated certainty score (89.2% High Consensus).',
      inputContract: 'Model softmax logits + spectral delta threshold',
      outputContract: 'Calibrated Confidence Tier: HIGH (Certainty: 0.892)',
      latency: '40 ms',
    },
    {
      id: 'step-8',
      num: '08',
      title: 'Grounded Answer & Map Synthesis',
      agent: 'Autonomous Report Synthesizer',
      description: 'Compiles natural-language narrative, binds vector GeoJSON polygons to the interactive satellite canvas, and generates an audit trace.',
      inputContract: 'All verified pipeline artifacts',
      outputContract: 'Interactive map layer + verified narrative + printable report',
      latency: '140 ms',
    },
  ];

  const [activeStage, setActiveStage] = useState(workflowStages[1]);

  return (
    <section className="py-20 px-6 bg-[#171817] border-b border-[#383A34] relative">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#879477] bg-[#879477]/10 border border-[#879477]/30 px-2.5 py-0.5 rounded-sm font-bold">
              Autonomous Agent Architecture
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#F1EBDD] tracking-tight">
            Not a generic chatbot.{' '}
            <span className="text-[#D6A84F]">An autonomous remote-sensing agent.</span>
          </h2>

          <p className="text-sm text-[#AAA89E] leading-relaxed font-normal">
            SatQuery AI does not pass raw images into an unspecialized black-box LLM.
            Instead, an autonomous controller orchestrates an 8-stage verifiable workflow, guaranteeing deterministic
            geodetic validation, specialist model routing, and cryptographically traceable evidence.
          </p>
        </div>

        {/* 8-Stage Interactive Workflow Horizontal / Grid Stepper */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
          {workflowStages.map((stage) => {
            const isSelected = activeStage.id === stage.id;

            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage)}
                className={`p-3 rounded-sm text-left transition-all relative border ${
                  isSelected
                    ? 'bg-[#2B2C28] border-[#D6A84F]/60 shadow-subtle'
                    : 'bg-[#222321] border-[#383A34] hover:border-[#474942] hover:bg-[#2B2C28]/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-bold font-mono ${isSelected ? 'text-[#D6A84F]' : 'text-[#AAA89E]'}`}>
                    {stage.num}
                  </span>
                  <span className="text-[9px] font-mono text-[#AAA89E]">{stage.latency}</span>
                </div>
                <div className="text-xs font-semibold text-[#F1EBDD] leading-tight line-clamp-1">
                  {stage.title}
                </div>
                <div className="text-[10px] text-[#AAA89E] font-mono truncate mt-0.5">
                  {stage.agent.split(' ')[0]}
                </div>

                {isSelected && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D6A84F]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Interactive Deep-Dive Inspection Card for Selected Stage */}
        <Card className="p-6 md:p-8 bg-[#222321] border border-[#383A34] shadow-panel space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#383A34] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-[#2B2C28] border border-[#D6A84F]/40 flex items-center justify-center text-[#D6A84F] font-mono font-bold text-sm">
                {activeStage.num}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-[#F1EBDD]">{activeStage.title}</h3>
                  <Badge variant="amber" size="sm">{activeStage.agent}</Badge>
                </div>
                <p className="text-xs text-[#AAA89E] mt-0.5">
                  Phase Latency: <strong className="text-[#F1EBDD] font-mono">{activeStage.latency}</strong> &bull; Zero Hallucination Protocol
                </p>
              </div>
            </div>

            <Button
              variant="secondary"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5 text-[#D6A84F]" />}
              onClick={onOpenWorkstation}
            >
              Inspect in Live Workstation
            </Button>
          </div>

          <p className="text-sm text-[#F1EBDD] leading-relaxed font-sans">
            {activeStage.description}
          </p>

          {/* Observable Parameter Contract Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3.5 bg-[#171817] rounded-sm border border-[#383A34] space-y-1.5">
              <span className="text-[10px] text-[#AAA89E] uppercase tracking-wider block font-bold">
                Input Contract Specification
              </span>
              <div className="text-[#AAA89E] leading-relaxed font-mono text-[11px]">
                {activeStage.inputContract}
              </div>
            </div>

            <div className="p-3.5 bg-[#171817] rounded-sm border border-[#383A34] space-y-1.5">
              <span className="text-[10px] text-[#879477] uppercase tracking-wider block font-bold">
                Output Telemetry &amp; Verification State
              </span>
              <div className="text-[#F1EBDD] leading-relaxed font-mono text-[11px]">
                {activeStage.outputContract}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
