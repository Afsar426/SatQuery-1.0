import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import {
  Radar,
  Eye,
  Layers,
  CloudRain,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface MultiModalFusionSectionProps {
  onOpenWorkstation: () => void;
}

export const MultiModalFusionSection: React.FC<MultiModalFusionSectionProps> = ({
  onOpenWorkstation,
}) => {
  const [activeTab, setActiveTab] = useState<'optical' | 'sar' | 'fusion'>('fusion');

  return (
    <section className="py-20 px-6 bg-[#171817] border-b border-[#383A34] relative">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#D8C8A6] bg-[#D8C8A6]/10 border border-[#D8C8A6]/30 px-2.5 py-0.5 rounded-sm font-bold">
              Multi-Modal Remote Sensing
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#F1EBDD] tracking-tight">
            Optical + SAR Fusion.{' '}
            <span className="text-[#879477]">See through clouds in any weather.</span>
          </h2>

          <p className="text-sm text-[#AAA89E] leading-relaxed font-normal">
            Passive optical sensors are blinded by monsoon clouds, smoke, and darkness.
            SatQuery AI aligns C-band active microwave Synthetic Aperture Radar (SAR) backscatter with multispectral
            reflectance to deliver 24/7 all-weather flood boundary delineation and structural monitoring.
          </p>
        </div>

        {/* 3 Interactive Mode Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('optical')}
            className={`px-4 py-2 rounded-sm text-xs font-mono transition-colors flex items-center gap-2 border ${
              activeTab === 'optical'
                ? 'bg-[#2B2C28] text-[#D6A84F] font-semibold border-[#D6A84F]/50 shadow-subtle'
                : 'bg-[#222321] text-[#AAA89E] hover:text-[#F1EBDD] border-[#383A34]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>1. Optical Sensor (38.4% Cloud Occlusion)</span>
          </button>

          <button
            onClick={() => setActiveTab('sar')}
            className={`px-4 py-2 rounded-sm text-xs font-mono transition-colors flex items-center gap-2 border ${
              activeTab === 'sar'
                ? 'bg-[#2B2C28] text-[#D8C8A6] font-semibold border-[#D8C8A6]/50 shadow-subtle'
                : 'bg-[#222321] text-[#AAA89E] hover:text-[#F1EBDD] border-[#383A34]'
            }`}
          >
            <Radar className="w-3.5 h-3.5" />
            <span>2. Sentinel-1 C-SAR Radar (Microwave Backscatter)</span>
          </button>

          <button
            onClick={() => setActiveTab('fusion')}
            className={`px-4 py-2 rounded-sm text-xs font-mono transition-colors flex items-center gap-2 border ${
              activeTab === 'fusion'
                ? 'bg-[#2B2C28] text-[#879477] font-semibold border-[#879477]/50 shadow-subtle'
                : 'bg-[#222321] text-[#AAA89E] hover:text-[#F1EBDD] border-[#383A34]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>3. Cross-Modal Fused Classification (Cloud-Free)</span>
          </button>
        </div>

        {/* Visual Modality Display Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#222321] border border-[#383A34] rounded-panel p-6 md:p-8 shadow-panel">
          {/* Imagery Canvas Mockup (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="relative rounded-sm overflow-hidden border border-[#383A34] bg-[#171817] aspect-[16/10] flex items-center justify-center">
              {activeTab === 'optical' ? (
                <div className="relative w-full h-full">
                  <img
                    src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80"
                    alt="Optical Satellite View with Clouds"
                    className="w-full h-full object-cover"
                  />
                  {/* Cloud Occlusion Warning Banner */}
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="bg-[#171817]/95 border border-[#B76552]/60 px-3.5 py-1.5 rounded-sm text-[#B76552] font-mono text-xs flex items-center gap-2">
                      <CloudRain className="w-4 h-4 text-[#B76552]" />
                      <span>Optical Surface Occluded: 38.4% Cloud Coverage</span>
                    </div>
                  </div>
                </div>
              ) : activeTab === 'sar' ? (
                <div className="relative w-full h-full">
                  <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
                    alt="Synthetic Aperture Radar Backscatter View"
                    className="w-full h-full object-cover filter contrast-125 grayscale"
                  />
                  {/* Radar Telemetry Tag */}
                  <div className="absolute top-3 left-3 bg-[#171817]/95 border border-[#383A34] px-2.5 py-1 rounded-sm text-[10px] font-mono text-[#D8C8A6]">
                    C-Band Active Microwave &bull; Gamma0 VV/VH &bull; Penetrates Clouds
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80"
                    alt="Fused Optical and SAR Result"
                    className="w-full h-full object-cover"
                  />
                  {/* Vector Flood Polygons Overlaid on top of cloudy imagery */}
                  <div className="absolute inset-0 p-4 flex items-center justify-center pointer-events-none">
                    <div className="border-2 border-[#879477] bg-[#879477]/25 rounded-sm p-3 text-center backdrop-blur-[1px]">
                      <span className="text-xs font-mono font-bold text-[#F1EBDD] uppercase block">
                        ✓ 28.6 km² Inundation Boundary Mapped Under Cloud Cover
                      </span>
                      <span className="text-[10px] font-mono text-[#879477]">
                        Sub-pixel Co-registration RMSE: 0.18 px
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sub-label */}
            <div className="text-[11px] font-mono text-[#AAA89E] flex items-center justify-between">
              <span>Sensor: {activeTab === 'optical' ? 'Sentinel-2 MSI' : activeTab === 'sar' ? 'Sentinel-1 C-SAR IW' : 'Optical-SAR Cross-Modal Net v3.0'}</span>
              <span className="text-[#879477]">Assam Brahmaputra Basin (UTM Zone 46N)</span>
            </div>
          </div>

          {/* Explanation Text & Technical Contracts (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div>
                <Badge variant={activeTab === 'optical' ? 'amber' : activeTab === 'sar' ? 'sand' : 'sage'}>
                  {activeTab === 'optical' ? 'Passive Optical Sensing' : activeTab === 'sar' ? 'Active Microwave Radar' : 'Fused Cross-Modal Interpretation'}
                </Badge>
                <h3 className="text-base font-bold text-[#F1EBDD] mt-1.5">
                  {activeTab === 'optical'
                    ? 'High Spectral Detail, Vulnerable to Cloud Cover'
                    : activeTab === 'sar'
                    ? 'Cloud-Penetrating Structural Backscatter'
                    : 'Unambiguous Multi-Sensor Decision Consensus'}
                </h3>
              </div>

              <p className="text-xs text-[#AAA89E] leading-relaxed font-sans">
                {activeTab === 'optical'
                  ? 'Optical imagery captures 13 discrete multispectral bands (Visible, NIR, RedEdge, SWIR). However, optical photons cannot penetrate clouds, creating complete information dropouts during monsoon flood emergencies.'
                  : activeTab === 'sar'
                  ? 'Synthetic Aperture Radar transmits 5.405 GHz microwave pulses that pass through clouds, haze, and rain. Specular reflection from water creates dark low-backscatter returns (< -22 dB), while double-bounce returns highlight elevated buildings.'
                  : 'By cross-attending optical spectral profiles with polarimetric SAR ratios, SatQuery AI resolves ambiguities. Shallow standing floodwaters and saturated soil are delineated with zero cloud occlusion.'}
              </p>

              <div className="p-3.5 bg-[#2B2C28] rounded-panel border border-[#383A34] space-y-2 text-xs font-mono">
                <span className="text-[10px] text-[#AAA89E] uppercase tracking-wider block font-bold">
                  Technical Fusion Metrics
                </span>
                <div className="flex justify-between">
                  <span className="text-[#AAA89E]">Spatial Co-registration:</span>
                  <span className="text-[#F1EBDD] font-bold">RMSE: 0.18 pixels</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#AAA89E]">Cloud Penetration:</span>
                  <span className="text-[#879477] font-bold">100% Surface Extraction</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#AAA89E]">Confidence Score:</span>
                  <span className="text-[#D6A84F] font-bold">88.5% Cross-Modal</span>
                </div>
              </div>
            </div>

            <Button
              variant="sage"
              size="md"
              className="w-full"
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={onOpenWorkstation}
            >
              Open Optical + SAR Analysis Workstation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
