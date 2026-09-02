import React, { useState } from 'react';
import { Button } from '../common/Button';
import { ArrowRight } from 'lucide-react';

interface InteractiveComparisonSectionProps {
  onOpenWorkstation: () => void;
}

export const InteractiveComparisonSection: React.FC<InteractiveComparisonSectionProps> = ({
  onOpenWorkstation,
}) => {
  const [sliderPos, setSliderPos] = useState<number>(50);

  return (
    <section className="py-20 px-6 bg-[#222321] border-b border-[#383A34] relative">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#383A34] pb-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B76552] bg-[#B76552]/10 border border-[#B76552]/30 px-2.5 py-0.5 rounded-sm font-bold">
              Bi-Temporal Remote Sensing
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#F1EBDD] tracking-tight">
              Temporal Intelligence.{' '}
              <span className="text-[#D6A84F]">See Earth transform over time.</span>
            </h2>
            <p className="text-sm text-[#AAA89E] leading-relaxed">
              Drag the interactive split slider to compare two registered Sentinel-2 observations (March 2024 vs February 2026).
              SatQuery AI's Siamese transformer isolates structural land conversion while rejecting seasonal illumination noise.
            </p>
          </div>

          <Button
            variant="secondary"
            size="md"
            icon={<ArrowRight className="w-4 h-4 text-[#D6A84F]" />}
            onClick={onOpenWorkstation}
          >
            Open in Analysis Workstation
          </Button>
        </div>

        {/* The Interactive Before/After Split Comparison Container */}
        <div className="relative rounded-panel overflow-hidden border border-[#383A34] bg-[#171817] aspect-[16/9] md:aspect-[21/9] max-h-[520px] select-none shadow-panel">
          {/* Base Image T2 (Subsequent 2026 + Detected Built-up overlay) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1600&q=80"
              alt="2026 Observation Epoch"
              className="w-full h-full object-cover"
            />
            {/* Muted Terracotta change heat overlay markings on T2 side */}
            <div className="absolute top-1/4 right-1/4 w-36 h-24 border-2 border-[#B76552] bg-[#B76552]/30 rounded-sm backdrop-blur-[1px] flex items-center justify-center text-[10px] font-mono text-[#F1EBDD] font-bold p-1">
              +1.18 km² New Logistics Hub
            </div>
            <div className="absolute bottom-1/3 right-1/3 w-28 h-16 border-2 border-[#B76552] bg-[#B76552]/30 rounded-sm backdrop-blur-[1px] flex items-center justify-center text-[10px] font-mono text-[#F1EBDD] font-bold p-1">
              +0.84 km² Warehousing
            </div>
          </div>

          {/* Top Clipped Image T1 (Baseline 2024 Agricultural Cropland) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <div className="w-[100vw] h-full absolute left-0 top-0 max-w-7xl">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80"
                alt="2024 Baseline Epoch"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Draggable Vertical Divider Handle in Signal Amber */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-[#D6A84F] pointer-events-none cursor-ew-resize flex items-center justify-center z-20"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="w-7 h-7 rounded-full bg-[#171817] border border-[#D6A84F] flex items-center justify-center text-[#D6A84F] text-xs font-mono font-bold shadow-panel">
              ↔
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4 z-10 bg-[#171817]/95 border border-[#383A34] px-3 py-1 rounded-sm text-xs font-mono text-[#879477]">
            T1: MARCH 2024 (AGRICULTURAL BASELINE)
          </div>
          <div className="absolute top-4 right-4 z-10 bg-[#171817]/95 border border-[#383A34] px-3 py-1 rounded-sm text-xs font-mono text-[#B76552]">
            T2: FEBRUARY 2026 (PERI-URBAN EXPANSION)
          </div>

          {/* Interactive Range Input Overlay for Dragging */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={e => setSliderPos(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          />

          {/* Bottom Telemetry Bar over comparison */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
            <div className="bg-[#171817]/95 border border-[#383A34] px-3 py-1 rounded-sm text-xs font-mono text-[#AAA89E]">
              Study Region: Bengaluru North NH-44 &bull; EPSG:32643 &bull; GSD 10.0m
            </div>
            <div className="bg-[#171817]/95 border border-[#383A34] px-3 py-1 rounded-sm text-xs font-mono text-[#879477] font-semibold">
              Detected Net Expansion: +3.42 km² (+18.4%)
            </div>
          </div>
        </div>

        {/* 3 Metric Cards in Stone */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-[#2B2C28] border border-[#383A34] rounded-panel space-y-1 font-mono">
            <span className="text-[10px] text-[#AAA89E] uppercase block">Surface Conversion</span>
            <div className="text-xl font-bold text-[#B76552]">+3.42 km²</div>
            <p className="text-xs text-[#AAA89E] font-sans leading-relaxed">
              Cropland and barren fallow plots transformed into impermeable transport and logistics facilities.
            </p>
          </div>

          <div className="p-4 bg-[#2B2C28] border border-[#383A34] rounded-panel space-y-1 font-mono">
            <span className="text-[10px] text-[#AAA89E] uppercase block">Expansion Percentage</span>
            <div className="text-xl font-bold text-[#D6A84F]">+18.4%</div>
            <p className="text-xs text-[#AAA89E] font-sans leading-relaxed">
              Baseline built-up footprint expanded from 18.58 km² to 22.00 km² over the 715-day period.
            </p>
          </div>

          <div className="p-4 bg-[#2B2C28] border border-[#383A34] rounded-panel space-y-1 font-mono">
            <span className="text-[10px] text-[#AAA89E] uppercase block">Spatial Change Clusters</span>
            <div className="text-xl font-bold text-[#879477]">14 Polygons</div>
            <p className="text-xs text-[#AAA89E] font-sans leading-relaxed">
              Delineated with sub-pixel boundary geometry and vectorized for immediate GIS export.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
