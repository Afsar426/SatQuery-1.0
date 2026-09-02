import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import {
  Building2,
  Waves,
  Wheat,
  Droplets,
  Trees,
  Ship,
  ArrowRight,
} from 'lucide-react';

interface UseCasesGridProps {
  onSelectUseCase: (theme: string) => void;
}

export const UseCasesGrid: React.FC<UseCasesGridProps> = ({ onSelectUseCase }) => {
  const useCases = [
    {
      id: 'urban',
      title: 'Urban Growth & Infrastructure',
      badge: 'Urban',
      icon: <Building2 className="w-5 h-5 text-[#D6A84F]" />,
      description: 'Audit illegal encroachments, monitor peri-urban highway corridor expansion, and track construction development over multi-year baselines.',
      query: 'What changed in this urban corridor between 2024 and 2026?',
      metric: '3.42 km² New Logistics Hubs Mapped',
    },
    {
      id: 'disaster',
      title: 'Disaster Management & Flood Inundation',
      badge: 'Disaster',
      icon: <Waves className="w-5 h-5 text-[#879477]" />,
      description: 'Rapid all-weather flood response using Sentinel-1 C-SAR radar backscatter to map submerged road networks through torrential cloud cover.',
      query: 'Identify flooded zones and submerged infrastructure using SAR.',
      metric: '28.6 km² Inundation Delineated 24/7',
    },
    {
      id: 'agriculture',
      title: 'Agricultural Phenology & Crop Yield',
      badge: 'Agriculture',
      icon: <Wheat className="w-5 h-5 text-[#D8C8A6]" />,
      description: 'Track seasonal crop cycles, differentiate fallow acreage from mature canopy with RedEdge indices, and verify irrigation access.',
      query: 'Compare crop canopy health and harvest progression.',
      metric: '84.2% Classification Accuracy on LISS-IV',
    },
    {
      id: 'water',
      title: 'Water Resources & Reservoir Storage',
      badge: 'Water',
      icon: <Droplets className="w-5 h-5 text-[#879477]" />,
      description: 'Surface water extraction via Normalized Difference Water Index (NDWI) to measure seasonal contraction of dams and wetlands.',
      query: 'Highlight the water body and measure surface area.',
      metric: '42.6 Hectares Localized with Sub-pixel Precision',
    },
    {
      id: 'forest',
      title: 'Forestry & Conservation Monitoring',
      badge: 'Environment',
      icon: <Trees className="w-5 h-5 text-[#879477]" />,
      description: 'Automated canopy loss detection and illegal timber road encroachment alerts across protected wildlife reserves and biosphere zones.',
      query: 'Detect canopy fragmentation and clear-cut logging corridors.',
      metric: 'Sub-Hectare Disturbance Alerting',
    },
    {
      id: 'maritime',
      title: 'Maritime & Critical Infrastructure',
      badge: 'Defense / Dual-Use',
      icon: <Ship className="w-5 h-5 text-[#D8C8A6]" />,
      description: 'Vessel detection in coastal berths, dry-dock vessel activity monitoring, and deepwater harbor expansion validation.',
      query: 'Detect berthed ships and harbor expansion.',
      metric: 'CFAR Constant False Alarm Rate Verification',
    },
  ];

  return (
    <section className="py-20 px-6 bg-[#171817] border-b border-[#383A34] relative">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#D6A84F] bg-[#D6A84F]/10 border border-[#D6A84F]/30 px-2.5 py-0.5 rounded-sm font-bold">
              Mission Applications
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#F1EBDD] tracking-tight">
            Built for serious Earth observation.{' '}
            <span className="text-[#879477]">Ready for national space technology.</span>
          </h2>

          <p className="text-sm text-[#AAA89E] leading-relaxed font-normal">
            Designed to address Smart India Hackathon Problem Statement <strong>SIH26167 (ISRO / Department of Space)</strong>,
            providing autonomous vision-language intelligence across civilian planning, disaster relief, and strategic resource governance.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {useCases.map(uc => (
            <Card
              key={uc.id}
              className="p-5 flex flex-col justify-between space-y-4 hover:border-[#474942] transition-all cursor-pointer group bg-[#2B2C28] border-[#383A34]"
              onClick={() => onSelectUseCase(uc.badge)}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-9 h-9 rounded-sm bg-[#222321] border border-[#383A34] flex items-center justify-center">
                    {uc.icon}
                  </div>
                  <Badge variant="amber" size="sm">{uc.badge}</Badge>
                </div>

                <h3 className="text-sm font-bold text-[#F1EBDD] group-hover:text-[#D6A84F] transition-colors">
                  {uc.title}
                </h3>

                <p className="text-xs text-[#AAA89E] leading-relaxed font-sans">
                  {uc.description}
                </p>

                <div className="p-2.5 bg-[#222321] rounded-sm border border-[#383A34]/60 text-[11px] font-mono text-[#AAA89E]">
                  <span className="text-[#D6A84F] font-semibold block text-[10px] uppercase">Example Query:</span>
                  "{uc.query}"
                </div>
              </div>

              <div className="pt-3 border-t border-[#383A34]/60 flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#879477] font-medium">{uc.metric}</span>
                <span className="text-[#AAA89E] group-hover:text-[#D6A84F] flex items-center gap-1 transition-colors">
                  Launch <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
