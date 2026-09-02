import React from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { evaluationService } from '../services/evaluationService';
import {
  Satellite,
  Info,
} from 'lucide-react';

export const EvaluationView: React.FC = () => {
  const benchmarks = evaluationService.getAll();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-7 pb-16 bg-[#171817]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#383A34] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#F1EBDD] tracking-tight">
              Benchmarking &amp; Model Evaluation Suite
            </h1>
            <Badge variant="sage" size="sm">Academic &amp; Domain Benchmarks</Badge>
          </div>
          <p className="text-xs text-[#AAA89E] mt-1">
            Empirical validation results across standard remote sensing vision-language benchmarks (RSVQA, VRSBench, CDVQA, BigEarthNet).
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#AAA89E] bg-[#2B2C28] px-3 py-1.5 rounded-sm border border-[#383A34]">
          <Info className="w-3.5 h-3.5 text-[#D6A84F]" />
          <span>ISRO / SAC Domain Benchmarks: Calibrating for SIH 2026</span>
        </div>
      </div>

      {/* Domain Adaptation Methodology Card */}
      <Card className="p-6 bg-[#222321] border-[#383A34]">
        <div className="flex items-center justify-between mb-4 border-b border-[#383A34] pb-3">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#D6A84F] flex items-center gap-2 font-mono">
              <Satellite className="w-3.5 h-3.5" /> Remote-Sensing Domain Adaptation Lifecycle
            </h2>
            <p className="text-xs text-[#AAA89E] mt-0.5">
              Standard commercial VLMs fail on top-down nadir aerial scenes without domain adaptation.
            </p>
          </div>
          <Badge variant="amber">Domain Specialist Pipeline</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 pt-1 text-xs font-mono">
          <div className="p-3 bg-[#2B2C28] rounded-sm border border-[#383A34] space-y-1.5">
            <span className="text-[9px] text-[#D6A84F] font-bold uppercase block">Stage 01</span>
            <div className="font-bold text-[#F1EBDD] text-xs">Pretrained Vision / VLM Backbone</div>
            <p className="text-[11px] text-[#AAA89E] font-sans leading-relaxed">
              Base visual representations initialized from contrastive web imagery models.
            </p>
          </div>

          <div className="p-3 bg-[#2B2C28] rounded-sm border border-[#383A34] space-y-1.5">
            <span className="text-[9px] text-[#D6A84F] font-bold uppercase block">Stage 02</span>
            <div className="font-bold text-[#F1EBDD] text-xs">RS Pre-training Corpora</div>
            <p className="text-[11px] text-[#AAA89E] font-sans leading-relaxed">
              Domain adaptation on BigEarthNet-MM (590k pairs) + VRSBench for multispectral band alignment.
            </p>
          </div>

          <div className="p-3 bg-[#2B2C28] rounded-sm border border-[#383A34] space-y-1.5">
            <span className="text-[9px] text-[#D6A84F] font-bold uppercase block">Stage 03</span>
            <div className="font-bold text-[#F1EBDD] text-xs">Specialist Fine-Tuning</div>
            <p className="text-[11px] text-[#AAA89E] font-sans leading-relaxed">
              Siamese encoders for temporal differencing (CDVQA) and text-guided bounding box regression.
            </p>
          </div>

          <div className="p-3 bg-[#2B2C28] rounded-sm border border-[#D6A84F]/50 space-y-1.5 shadow-subtle">
            <span className="text-[9px] text-[#879477] font-bold uppercase block">Stage 04: Certified</span>
            <div className="font-bold text-[#F1EBDD] text-xs">SatQuery RS Specialists</div>
            <p className="text-[11px] text-[#AAA89E] font-sans leading-relaxed">
              Domain models with calibrated certainty scores and sub-pixel spatial grounding accuracy.
            </p>
          </div>
        </div>
      </Card>

      {/* Benchmark Datasets Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {benchmarks.map(bench => {
          const isEvaluated = bench.evaluationStatus === 'Evaluated';

          return (
            <Card key={bench.id} className="p-5 space-y-3.5 flex flex-col justify-between bg-[#2B2C28] border-[#383A34]">
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-[#F1EBDD]">{bench.name}</h3>
                    <div className="text-xs text-[#879477] font-mono mt-0.5">{bench.task}</div>
                  </div>
                  <Badge variant={isEvaluated ? 'sage' : 'amber'} size="sm">
                    {bench.evaluationStatus}
                  </Badge>
                </div>

                <p className="text-xs text-[#AAA89E] leading-relaxed font-sans">
                  {bench.description}
                </p>

                {/* Metrics Table */}
                <div className="p-3 bg-[#222321] rounded-sm border border-[#383A34] space-y-1.5">
                  <span className="text-[9px] uppercase font-mono tracking-wider text-[#AAA89E] block">
                    Benchmarked Metrics &amp; Baseline Comparison
                  </span>
                  <div className="space-y-1">
                    {bench.metrics.map(m => (
                      <div key={m.name} className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[#AAA89E]">{m.name}:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[#F1EBDD] font-bold">{m.score}</span>
                          {m.baseline && (
                            <span className="text-[10px] text-[#AAA89E]">
                              (vs {m.baseline})
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2.5 border-t border-[#383A34] flex items-center justify-between text-[10px] font-mono text-[#AAA89E]">
                <span>Source: {bench.source}</span>
                <span className="text-[#D6A84F]">
                  Peer-Reviewed Benchmark
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
