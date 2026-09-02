import React from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { modelService } from '../services/modelService';
import {
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

export const ModelRegistryView: React.FC = () => {
  const models = modelService.getAll();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-7 pb-16 bg-[#171817]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#383A34] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#F1EBDD] tracking-tight">
              Specialist Model &amp; Tool Registry
            </h1>
            <Badge variant="amber" size="sm">{models.length} Specialists Online</Badge>
          </div>
          <p className="text-xs text-[#AAA89E] mt-1">
            Catalog of fine-tuned domain models and deterministic GIS tools orchestrated by the SatQuery Agent Controller.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#879477] bg-[#2B2C28] px-3 py-1.5 rounded-sm border border-[#383A34]">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>All 7 Model Checkpoints Warm &amp; Ready</span>
        </div>
      </div>

      {/* Specialist Model Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {models.map(model => (
          <Card key={model.id} className="p-4 space-y-3.5 flex flex-col justify-between bg-[#2B2C28] border-[#383A34]">
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-xs font-bold text-[#F1EBDD]">{model.name}</h3>
                  <span className="text-[10px] font-mono text-[#D6A84F]">{model.version}</span>
                </div>
                <Badge variant="sage" size="sm">
                  {model.status.toUpperCase()}
                </Badge>
              </div>

              <div className="text-xs text-[#879477] font-medium font-mono">
                {model.task}
              </div>

              <p className="text-[11px] text-[#AAA89E] leading-relaxed">
                {model.description}
              </p>

              {/* Technical Specifications in Charcoal */}
              <div className="p-2.5 bg-[#222321] rounded-sm border border-[#383A34] text-[10px] font-mono space-y-1">
                <div>
                  <span className="text-[#AAA89E] block">Input Specification:</span>
                  <span className="text-[#F1EBDD]">{model.inputType}</span>
                </div>
                <div>
                  <span className="text-[#AAA89E] block">Output Contract:</span>
                  <span className="text-[#F1EBDD]">{model.outputType}</span>
                </div>
                <div>
                  <span className="text-[#AAA89E] block">Model Backbone:</span>
                  <span className="text-[#AAA89E]">{model.backbone}</span>
                </div>
              </div>
            </div>

            <div className="pt-2.5 border-t border-[#383A34] flex items-center justify-between text-[10px] font-mono text-[#AAA89E]">
              <span>P95 Latency: <strong className="text-[#F1EBDD]">{model.latencyP95}</strong></span>
              <span className="text-[#D6A84F] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#879477]" /> Domain Adapted
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
