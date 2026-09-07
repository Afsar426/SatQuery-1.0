import React, { useState } from 'react';
import { ArrowRight, Waves, Trees, Building2, AlertTriangle, Maximize2, X, Compass, ShieldCheck, Sparkles } from 'lucide-react';
import heroConstellationImg from '../../assets/hero-satellite-constellation.jpg';

interface HeroSectionProps {
  onLaunch: (customQuery?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onLaunch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 4 Core Observation Domains depicted in the satellite constellation visual
  const observationDomains = [
    {
      id: 'coastal',
      label: 'Coastal Analysis',
      icon: Waves,
      sampleQuery: 'Where is the coastline and water boundary in this satellite image?',
      color: 'text-cyan-400',
      badgeBg: 'bg-cyan-500/20 border-cyan-400/30 text-cyan-300',
      desc: 'Shoreline detection, tidal dynamics & coastal erosion monitoring.'
    },
    {
      id: 'landuse',
      label: 'Land Use Mapping',
      icon: Trees,
      sampleQuery: 'Identify agricultural parcels, vegetation indices, and land cover types.',
      color: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/20 border-emerald-400/30 text-emerald-300',
      desc: 'Crop health phenology, forestry boundaries & parcel classification.'
    },
    {
      id: 'urban',
      label: 'Urban Growth',
      icon: Building2,
      sampleQuery: 'Detect urban expansion, building footprints, and dense infrastructure.',
      color: 'text-blue-400',
      badgeBg: 'bg-blue-500/20 border-blue-400/30 text-blue-300',
      desc: 'Metropolitan development, building footprints & road network density.'
    },
    {
      id: 'disaster',
      label: 'Disaster Monitoring',
      icon: AlertTriangle,
      sampleQuery: 'Identify flood inundation zones and thermal hazard hotspots.',
      color: 'text-amber-400',
      badgeBg: 'bg-amber-500/20 border-amber-400/30 text-amber-300',
      desc: 'Rapid flood delineation, wildfire extent & emergency impact assessment.'
    }
  ];

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-sat-border bg-[#F5F5F1]">
      {/* Subtle geospatial grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6">
            
            {/* Eyebrows */}
            <div className="flex items-center gap-3 text-xs tracking-widest text-sat-slate font-semibold uppercase">
              <span>Observe</span>
              <span className="text-sat-border">|</span>
              <span>Understand</span>
              <span className="text-sat-border">|</span>
              <span>Act</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-serif font-bold text-sat-ink leading-[1.12] tracking-tight">
              A Clearer View<br />
              for a <span className="text-sat-blue font-serif italic">Better Tomorrow.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-sat-slate max-w-xl leading-relaxed font-sans font-normal">
              SatQuery transforms natural-language queries into evidence-based insights from satellite imagery using remote-sensing models, GeoAI tools, and multi-agent coordination.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={() => onLaunch()}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-sat-blue text-white font-medium text-sm rounded shadow-subtle hover:bg-sat-blue-hover transition-all group"
              >
                <span>Launch SatQuery</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Quick Prompt Suggester */}
            <div className="pt-2 w-full">
              <div className="text-[11px] font-mono text-sat-slate uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sat-blue" />
                <span>Quick Scenario Queries:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {observationDomains.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => onLaunch(d.sampleQuery)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-sat-card border border-sat-border text-xs text-sat-ink hover:border-sat-blue hover:text-sat-blue transition-colors group shadow-subtle"
                    title={d.desc}
                  >
                    <d.icon className="w-3 h-3 text-sat-slate group-hover:text-sat-blue transition-colors" />
                    <span className="font-medium">{d.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mission Tagline */}
            <div className="pt-3 flex items-center gap-3 text-xs font-semibold text-sat-slate/90 tracking-widest uppercase">
              <span className="w-8 h-[2px] bg-[#E07A5F]"></span>
              <span>Powered by Space. Driven by People.</span>
            </div>
          </div>

          {/* Right Hero Visual: Aerospace-Grade Satellite Constellation Showcase */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            
            {/* Ambient Radial Glow Backdrop */}
            <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-tr from-cyan-500/20 via-blue-600/10 to-indigo-600/15 rounded-3xl blur-2xl opacity-80 pointer-events-none"></div>

            {/* Aerospace Framing Container */}
            <div className="relative w-full max-w-[560px] rounded-2xl p-1 sm:p-1.5 bg-gradient-to-b from-slate-700/80 via-slate-800/40 to-slate-950/90 border border-slate-700/60 shadow-2xl overflow-hidden group">
              
              {/* Inner Dark Viewport */}
              <div className="relative rounded-xl overflow-hidden bg-[#070D18] border border-slate-800/60">
                
                {/* High-Resolution Satellite Image (100% unobstructed) */}
                <img
                  src={heroConstellationImg}
                  alt="SatQuery Constellation: Earth Observation, Satellite Sensor Beam and Multi-Channel Analysis"
                  className="w-full h-auto object-contain block select-none transform transition-transform duration-700 ease-out group-hover:scale-[1.012]"
                  loading="eager"
                />

                {/* Top-Left Telemetry Badge */}
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md border border-cyan-500/30 text-[10px] sm:text-[11px] font-mono text-cyan-300 shadow-lg select-none">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="font-semibold tracking-wider">SATQUERY-1A</span>
                  <span className="text-white/30 hidden sm:inline">|</span>
                  <span className="text-gray-300 hidden sm:inline">LEO 580 KM</span>
                </div>

                {/* Top-Right Resolution & Expand Action */}
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-md px-2.5 py-1.5 rounded-md border border-white/15 text-[10px] font-mono text-gray-200 shadow-lg select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    <span className="font-medium tracking-wide">0.5M MULTI-SPECTRAL</span>
                  </div>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center w-8 h-8 rounded-md bg-slate-950/85 backdrop-blur-md border border-white/20 text-gray-300 hover:text-white hover:border-cyan-400/60 hover:bg-slate-900 transition-all shadow-lg"
                    title="Expand Full Satellite Telemetry View"
                    aria-label="Expand Full View"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* Mission Control Deck: Directly below the image in the aerospace chassis */}
              <div className="mt-1.5 sm:mt-2 px-2.5 py-2.5 sm:px-3 sm:py-3 bg-slate-950/90 rounded-xl border border-slate-800/80">
                <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-gray-300 mb-2 select-none">
                  <div className="flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="uppercase tracking-wider font-semibold text-white">4 Active Ground Channels</span>
                  </div>
                  <span className="text-gray-400 hidden xs:inline">LAT 20.59° N | LON 78.96° E</span>
                </div>

                {/* 4 Interactive Observation Channels matching the callout boxes in the image */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                  {observationDomains.map((d) => {
                    const Icon = d.icon;
                    return (
                      <button
                        key={d.id}
                        onClick={() => onLaunch(d.sampleQuery)}
                        className="flex items-center justify-center gap-1.5 px-2 py-1.5 bg-slate-900/90 hover:bg-slate-800 active:scale-95 border border-slate-700/60 hover:border-cyan-400/60 rounded-lg text-[10px] sm:text-[11px] font-medium text-gray-200 hover:text-white transition-all text-center group/btn shadow-sm"
                        title={`Click to analyze: ${d.desc}`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${d.color} group-hover/btn:scale-110 transition-transform`} />
                        <span className="truncate">{d.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sub-frame hardware calibration footer */}
              <div className="mt-1.5 px-3 py-1 flex items-center justify-between text-[9px] font-mono text-gray-400 tracking-wider">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>PAYLOAD INTEGRITY VERIFIED</span>
                </span>
                <span className="hidden sm:inline text-gray-500">
                  CARTOSAT-3 / SENTINEL-2 / LANDSAT-9 CALIBRATED
                </span>
                <span className="text-cyan-400 font-semibold">99.4% COVERAGE</span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Lightbox Modal for High-Resolution Image Inspection */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-4xl w-full bg-slate-950 border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <h3 className="text-base font-semibold text-white tracking-wide font-sans">
                  SatQuery Earth Observation Telemetry
                </h3>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono">
                  HIGH RESOLUTION
                </span>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Viewport */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 flex flex-col items-center justify-center bg-black/50">
              <div className="relative rounded-xl overflow-hidden border border-slate-800 shadow-xl max-w-2xl w-full">
                <img
                  src={heroConstellationImg}
                  alt="High Resolution Satellite Observation Map"
                  className="w-full h-auto object-contain block"
                />
              </div>

              {/* Telemetry Annotation Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full mt-6">
                {observationDomains.map((d) => {
                  const Icon = d.icon;
                  return (
                    <div 
                      key={d.id}
                      className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <Icon className={`w-4 h-4 ${d.color}`} />
                          <span className="text-xs font-bold text-white">{d.label}</span>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-snug">
                          {d.desc}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setIsModalOpen(false);
                          onLaunch(d.sampleQuery);
                        }}
                        className="mt-3 w-full py-1 px-2 rounded bg-sat-blue text-white text-[11px] font-medium hover:bg-sat-blue-hover transition-colors flex items-center justify-center gap-1"
                      >
                        <span>Analyze Domain</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

