import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import {
  Sparkles,
  Eye,
  TrendingUp,
  MapPin,
  CheckCircle2,
  GitCompare,
  ArrowRight,
  Layers,
  Radio,
} from 'lucide-react';

interface AskEarthDemoProps {
  onOpenWorkstation: () => void;
}

export const AskEarthDemo: React.FC<AskEarthDemoProps> = ({ onOpenWorkstation }) => {
  const showcaseQueries = [
    {
      id: 'q1',
      query: 'What changed in this region between March 2024 and February 2026?',
      label: 'Bi-Temporal Change',
      mode: 'Siamese Change-Net v3.2',
      answer: 'Substantial peri-urban infrastructure development and commercial warehousing construction expanded along the northern arterial highway (NH-44 corridor). 3.42 km² of previously barren fallow land and seasonal cropland were converted into impermeable concrete surfaces.',
      stats: '+3.42 km² (+18.4% growth) across 14 clustered polygons',
      confidence: '89.2% High Consensus',
      evidence: 'Bi-Temporal Change Difference Mask (NDBI Delta > 0.18)',
      sensor: 'Sentinel-2 MSI Level-2A (10m GSD)',
    },
    {
      id: 'q2',
      query: 'Has the built-up area increased?',
      label: 'Change-VQA Polarity',
      mode: 'Change-VQA Specialist v1.8',
      answer: 'YES. The built-up surface area increased by 3.42 km² over the 715-day temporal baseline, expanding from 18.58 km² to 22.00 km², with concentrated logistics facilities established near the northern bypass.',
      stats: 'Decision: YES (Logit certainty 0.924 vs NO: 0.051)',
      confidence: '92.4% Certainty',
      evidence: 'Affirmative Built-Up Classification Mask & Geometric Polygons',
      sensor: 'Sentinel-2 MSI Level-2A (10m GSD)',
    },
    {
      id: 'q3',
      query: 'Highlight the water body.',
      label: 'Visual Grounding',
      mode: 'RS-Grounding Specialist v2.0',
      answer: 'The primary perennial water body was localized in the southeastern quadrant (Coordinates: 30.185°N, 74.975°E), representing an irrigation storage reservoir spanning 42.6 hectares with high NIR absorption (NDWI: 0.64).',
      stats: 'Bounding Box: [74.962, 30.174, 74.988, 30.196] • 42.6 ha',
      confidence: '94.1% High IoU',
      evidence: 'WGS-84 Bounding Box & Pixel-level NDWI Segmentation Mask',
      sensor: 'Resourcesat-2A LISS-IV (5.8m GSD)',
    },
    {
      id: 'q4',
      query: 'Use optical and SAR together to identify water and built-up zones under clouds.',
      label: 'Optical + SAR Fusion',
      mode: 'Cross-Modal Fusion Net v3.0',
      answer: 'By fusing multi-spectral optical reflectance with Sentinel-1 SAR microwave radar backscatter, inundated river channels were classified despite 38.4% cloud cover. Solid elevated structures produce strong double-bounce backscatter (VV > -6 dB).',
      stats: 'Cloud-penetrating delineation across 28.6 km² flood basin',
      confidence: '88.5% Cross-Modal',
      evidence: 'SAR Specular Inundation Layer + Optical Multispectral Profile',
      sensor: 'Sentinel-1 C-SAR IW + Sentinel-2 MSI',
    },
  ];

  const [activeQuery, setActiveQuery] = useState(showcaseQueries[0]);

  return (
    <section className="py-20 px-6 bg-[#171817] border-b border-[#383A34] relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#D6A84F] bg-[#D6A84F]/10 border border-[#D6A84F]/30 px-2.5 py-0.5 rounded-sm font-bold">
              Autonomous Earth Intelligence
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#F1EBDD] tracking-tight">
            Ask Earth.{' '}
            <span className="text-[#D6A84F]">Get grounded spatial answers.</span>
          </h2>

          <p className="text-sm text-[#AAA89E] leading-relaxed font-normal">
            Unlike generic text chatbots that hallucinate vague descriptions, SatQuery AI parses remote-sensing intent,
            engages specialized satellite models, and grounds every answer with coordinate bounding boxes,
            pixel-accurate change masks, and quantitative metrics.
          </p>
        </div>

        {/* Interactive Query Selection Chips */}
        <div className="flex flex-wrap gap-2">
          {showcaseQueries.map(item => {
            const isSelected = activeQuery.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveQuery(item)}
                className={`px-3 py-2 rounded-sm text-xs font-mono transition-colors flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#2B2C28] text-[#D6A84F] font-semibold border-[#D6A84F]/50 shadow-subtle'
                    : 'bg-[#222321] text-[#AAA89E] hover:text-[#F1EBDD] border-[#383A34] hover:border-[#474942]'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#D6A84F]' : 'bg-[#AAA89E]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Live Demonstration Workstation Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#222321] border border-[#383A34] rounded-panel p-6 md:p-8 shadow-panel">
          {/* Left Column: Simulated Satellite Imagery & Visual Evidence (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-sm overflow-hidden border border-[#383A34] bg-[#171817] aspect-[16/10] flex items-center justify-center group">
              <img
                src={
                  activeQuery.id === 'q3'
                    ? 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
                    : activeQuery.id === 'q4'
                    ? 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
                    : 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80'
                }
                alt="Satellite Observation View"
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Dynamic Vector Overlay Mockup */}
              <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                {/* Top Corner Telemetry */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono bg-[#171817]/95 text-[#D6A84F] px-2.5 py-1 rounded-sm border border-[#383A34]">
                    SENSOR: {activeQuery.sensor}
                  </span>
                  <span className="text-[10px] font-mono bg-[#171817]/95 text-[#879477] px-2.5 py-1 rounded-sm border border-[#383A34]">
                    {activeQuery.confidence}
                  </span>
                </div>

                {/* Grounded Bounding Box or Change Cluster graphic in Muted Terracotta */}
                <div className="border-2 border-[#B76552] bg-[#B76552]/25 rounded-sm p-2 max-w-xs self-center backdrop-blur-[1px]">
                  <div className="text-[9px] font-mono text-[#F1EBDD] font-bold uppercase">
                    [EVIDENCE] {activeQuery.evidence}
                  </div>
                </div>

                {/* Bottom Coordinates */}
                <div className="text-[10px] font-mono bg-[#171817]/95 text-[#AAA89E] px-2 py-0.5 rounded-sm border border-[#383A34] self-start">
                  WGS-84 &bull; UTM 43N &bull; Spatial Intersection 99.8%
                </div>
              </div>
            </div>

            {/* Evidence details bar */}
            <div className="p-3 bg-[#2B2C28] rounded-sm border border-[#383A34] flex items-center justify-between text-xs font-mono">
              <span className="text-[#AAA89E] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#D6A84F]" />
                Evidence Layer: <strong className="text-[#F1EBDD] font-semibold">{activeQuery.evidence}</strong>
              </span>
              <Button
                variant="ghost"
                size="sm"
                icon={<Eye className="w-3.5 h-3.5 text-[#D6A84F]" />}
                onClick={onOpenWorkstation}
              >
                Inspect in Workstation
              </Button>
            </div>
          </div>

          {/* Right Column: Natural Language Input & Calibrated Response (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              {/* User Prompt */}
              <div className="p-3.5 bg-[#2B2C28] rounded-sm border border-[#383A34] space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#D6A84F] uppercase">
                  <span>Natural Language Query</span>
                  <span className="text-[#AAA89E]">User Analyst</span>
                </div>
                <p className="text-xs font-semibold text-[#F1EBDD] leading-relaxed font-mono">
                  "{activeQuery.query}"
                </p>
              </div>

              {/* Agent Routing */}
              <div className="p-2.5 bg-[#2B2C28]/60 rounded-sm border border-[#383A34]/60 text-xs font-mono flex items-center justify-between">
                <span className="text-[#AAA89E]">Selected Model:</span>
                <span className="text-[#879477] font-semibold">{activeQuery.mode}</span>
              </div>

              {/* Calibrated AI Answer */}
              <div className="p-4 bg-[#2B2C28] rounded-panel border border-[#383A34] space-y-2.5 shadow-subtle">
                <div className="flex items-center justify-between border-b border-[#383A34] pb-1.5">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#D6A84F] flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" /> Grounded Analysis Finding
                  </span>
                  <Badge variant="sage" size="sm">{activeQuery.confidence}</Badge>
                </div>
                <p className="text-xs text-[#F1EBDD] leading-relaxed font-sans">
                  {activeQuery.answer}
                </p>
              </div>

              {/* Quantitative Metrics in Stone */}
              <div className="p-3 bg-[#2B2C28] rounded-sm border border-[#383A34] space-y-1">
                <span className="text-[9px] uppercase font-mono text-[#AAA89E] block">
                  Measured Geospatial Telemetry
                </span>
                <div className="text-xs font-mono font-bold text-[#D6A84F]">
                  {activeQuery.stats}
                </div>
              </div>
            </div>

            {/* Direct CTA */}
            <div className="pt-3 border-t border-[#383A34]">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={onOpenWorkstation}
              >
                Launch This Scenario in Workstation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
