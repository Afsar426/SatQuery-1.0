import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onLaunch: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onLaunch }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 border-b border-sat-border bg-[#F5F5F1]">
      {/* Subtle geospatial grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Eyebrows */}
            <div className="flex items-center gap-3 text-xs tracking-widest text-sat-slate font-semibold uppercase">
              <span>Observe</span>
              <span className="text-sat-border">|</span>
              <span>Understand</span>
              <span className="text-sat-border">|</span>
              <span>Act</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-sat-ink leading-[1.15] tracking-tight">
              A Clearer View<br />
              for a <span className="text-sat-blue font-serif italic">Better Tomorrow.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-sat-slate max-w-2xl leading-relaxed font-sans font-normal">
              SatQuery transforms natural-language queries into evidence-based insights from satellite imagery using remote-sensing models, GeoAI tools and agentic analysis.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onLaunch}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-sat-blue text-white font-medium text-sm rounded shadow-subtle hover:bg-sat-blue-hover transition-all group"
              >
                <span>Launch SatQuery</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#capabilities"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-sat-card border border-sat-border text-sat-ink font-medium text-sm rounded hover:bg-[#EBECE8] transition-colors"
              >
                Explore Capabilities
              </a>
            </div>

            {/* Eyebrow / Mission Tagline */}
            <div className="pt-4 flex items-center gap-3 text-xs font-semibold text-sat-slate/90 tracking-widest uppercase">
              <span className="w-8 h-[2px] bg-[#E07A5F]"></span>
              <span>Powered by Space. Driven by People.</span>
            </div>
          </div>

          {/* Right Hero Visual: Realistic Earth / Satellite View with India Focus */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px] aspect-square rounded-2xl overflow-hidden border border-sat-border bg-[#0C1726] shadow-card">
              {/* Earth and orbital space vector graphic */}
              <svg viewBox="0 0 500 500" className="w-full h-full object-cover">
                <defs>
                  <radialGradient id="spaceAtmosphere" cx="65%" cy="35%" r="70%">
                    <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.4"/>
                    <stop offset="60%" stop-color="#1E3A8A" stop-opacity="0.2"/>
                    <stop offset="100%" stop-color="#0B1320" stop-opacity="0.9"/>
                  </radialGradient>
                  <linearGradient id="earthGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#4F7942"/>
                    <stop offset="40%" stop-color="#2D5A27"/>
                    <stop offset="70%" stop-color="#1E4D6B"/>
                    <stop offset="100%" stop-color="#0F2B48"/>
                  </linearGradient>
                </defs>

                {/* Stars and cosmic depth */}
                <rect width="500" height="500" fill="#09111C"/>
                <circle cx="60" cy="80" r="1" fill="#FFFFFF" opacity="0.6"/>
                <circle cx="120" cy="40" r="1.5" fill="#FFFFFF" opacity="0.8"/>
                <circle cx="420" cy="90" r="1" fill="#FFFFFF" opacity="0.5"/>
                <circle cx="380" cy="420" r="1" fill="#FFFFFF" opacity="0.7"/>
                <circle cx="90" cy="440" r="1.5" fill="#FFFFFF" opacity="0.8"/>

                {/* Earth Globe Body */}
                <circle cx="360" cy="280" r="230" fill="url(#earthGlow)"/>
                
                {/* Simplified Indian Subcontinent & Asian Landmass */}
                {/* Himalaya & Tibetan Plateau */}
                <path d="M 230 180 Q 290 160 380 175 Q 420 180 460 210 Q 400 230 320 220 Z" fill="#758E61" opacity="0.9"/>
                {/* Indian Peninsula */}
                <path d="M 280 205 Q 310 240 330 300 Q 320 370 290 410 Q 260 350 245 280 Q 255 230 280 205 Z" fill="#608048"/>
                {/* Arabian Sea coastal rim */}
                <path d="M 220 210 Q 250 240 245 280 Q 210 240 200 200 Z" fill="#88A065" opacity="0.8"/>
                {/* Bay of Bengal waters */}
                <path d="M 330 290 Q 370 270 410 320 Q 350 360 315 380 Z" fill="#133D5C" opacity="0.7"/>

                {/* Atmospheric limb / halo */}
                <circle cx="360" cy="280" r="230" fill="none" stroke="#60A5FA" stroke-width="4" opacity="0.7"/>
                <circle cx="360" cy="280" r="234" fill="none" stroke="#93C5FD" stroke-width="2" opacity="0.4"/>
                <circle cx="360" cy="280" r="230" fill="url(#spaceAtmosphere)"/>

                {/* Satellite Orbit Path */}
                <path d="M 40 180 Q 240 80 460 240" fill="none" stroke="#38BDF8" stroke-width="1.8" stroke-dasharray="6,4" opacity="0.85"/>
                
                {/* Satellite on orbit track */}
                <g transform="translate(180, 116)">
                  <circle cx="0" cy="0" r="4" fill="#38BDF8"/>
                  <circle cx="0" cy="0" r="8" fill="none" stroke="#38BDF8" opacity="0.5"/>
                  <line x1="-12" y1="0" x2="12" y2="0" stroke="#FFFFFF" stroke-width="2"/>
                </g>

                {/* Ground sensor target beam to Indian Subcontinent */}
                <polygon points="180,116 285,270 305,270" fill="#38BDF8" opacity="0.15"/>
                <circle cx="295" cy="270" r="4" fill="#F97316"/>
                <circle cx="295" cy="270" r="10" fill="none" stroke="#F97316" stroke-width="1.5" stroke-dasharray="3,2"/>
              </svg>

              {/* Mission Badge Overlay in bottom right corner */}
              <div className="absolute bottom-6 right-6 text-right font-sans">
                <div className="text-[10px] tracking-[0.2em] font-semibold text-gray-400 uppercase">
                  India
                </div>
                <div className="text-xs font-bold tracking-wider text-white uppercase">
                  From Space
                </div>
                <div className="text-[9px] tracking-[0.15em] text-gray-300 uppercase">
                  For a Brighter
                </div>
                <div className="text-[11px] font-extrabold tracking-wider text-[#F97316] uppercase">
                  Tomorrow
                </div>
              </div>

              {/* Coordinates imprint top left */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded border border-white/10 font-mono text-[10px] text-gray-300">
                SENSOR: CARTOSAT-3 / SENTINEL-2
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
