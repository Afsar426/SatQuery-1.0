import React from 'react';
import { Satellite, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

interface PublicFooterProps {
  onLaunchMission: () => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({ onLaunchMission }) => {
  return (
    <footer className="bg-[#171817] border-t border-[#383A34] text-[#AAA89E] text-xs">
      {/* Pre-Footer Call to Action */}
      <div className="border-b border-[#383A34] py-14 px-6 bg-[#222321]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#D6A84F] bg-[#D6A84F]/10 border border-[#D6A84F]/25 px-3 py-1 rounded-sm">
            SIH 2026 National Competition Ready
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#F1EBDD] tracking-tight">
            Step into the Earth Intelligence Mission Workstation.
          </h2>
          <p className="text-[#AAA89E] text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
            Ingest satellite GeoTIFFs, run natural language visual reasoning, evaluate multi-temporal differences, and export certified scientific reports.
          </p>
          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={onLaunchMission}
            >
              Launch Mission Workstation
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-sm bg-[#2B2C28] border border-[#D6A84F]/40 flex items-center justify-center text-[#D6A84F]">
              <Satellite className="w-3.5 h-3.5" />
            </div>
            <span className="text-sm font-bold text-[#F1EBDD]">
              SATQUERY <span className="text-[#D6A84F]">AI</span>
            </span>
          </div>
          <p className="text-[11px] text-[#AAA89E] leading-relaxed font-sans">
            An Interactive Vision-Language Assistant for Multimodal Remote Sensing Image Analysis through Text Queries.
          </p>
          <div className="text-[10px] font-mono text-[#879477] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Autonomous Agent Protocol v4.2</span>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-mono font-bold text-[#F1EBDD] uppercase tracking-wider block">
            National Space Mission
          </span>
          <ul className="space-y-1.5 text-[11px] font-mono text-[#AAA89E]">
            <li>Smart India Hackathon 2026</li>
            <li>Problem ID: SIH26167</li>
            <li>Organization: ISRO</li>
            <li>Dept: Department of Space / ISRO</li>
            <li>Theme: Space Technology</li>
          </ul>
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-mono font-bold text-[#F1EBDD] uppercase tracking-wider block">
            Earth Observation Satellites
          </span>
          <ul className="space-y-1.5 text-[11px] font-mono text-[#AAA89E]">
            <li>Sentinel-2 MSI (10m Optical)</li>
            <li>Sentinel-1 C-SAR (10m Radar)</li>
            <li>Resourcesat-2A LISS-IV (5.8m)</li>
            <li>Landsat-9 OLI-2 (15/30m)</li>
            <li>Cartosat-3 (Sub-Meter GSD)</li>
          </ul>
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-mono font-bold text-[#F1EBDD] uppercase tracking-wider block">
            Domain Benchmarks
          </span>
          <ul className="space-y-1.5 text-[11px] font-mono text-[#AAA89E]">
            <li>RSVQA High-Res (84.1% Accuracy)</li>
            <li>VRSBench Grounding (76.8% IoU)</li>
            <li>CDVQA Bi-Temporal (82.6% Acc)</li>
            <li>BigEarthNet-MM (590k Pretraining)</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#383A34] py-4 px-6 text-center text-[10px] font-mono text-[#AAA89E]">
        © 2026 SATQUERY AI &bull; Smart India Hackathon &bull; Built for ISRO / Department of Space &bull; Confidential Evaluation Prototype
      </div>
    </footer>
  );
};
