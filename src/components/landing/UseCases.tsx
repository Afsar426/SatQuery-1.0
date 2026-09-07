import React from 'react';
import { Waves, AlertTriangle, Building2, Trees, ArrowRight, Compass } from 'lucide-react';

interface UseCasesProps {
  onSelectUseCase?: (query: string) => void;
}

export const UseCases: React.FC<UseCasesProps> = ({ onSelectUseCase }) => {
  const cases = [
    {
      title: 'Coastal Analysis',
      subtitle: 'Marine & Shoreline Dynamics',
      description: 'Track coastal erosion, tidal inundation, bathymetric indicators, and sensitive mangrove ecosystems.',
      icon: Waves,
      tag: 'OPTICAL + SWIR',
      sensor: 'SENTINEL-2 / LANDSAT-9',
      sampleQuery: 'Where is the coastline and water boundary in this satellite image?',
      // High realism SVG satellite tile: coastline, ocean blue & coastal rim
      imageSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" width="400" height="240">
        <rect width="400" height="240" fill="%230F2D4A"/>
        <path d="M 0 0 L 160 0 Q 210 90 170 160 T 260 240 L 0 240 Z" fill="%233A5A30"/>
        <path d="M 160 0 Q 210 90 170 160 T 260 240" fill="none" stroke="%2385C1E9" stroke-width="4" opacity="0.8"/>
        <path d="M 155 0 Q 205 90 165 160 T 255 240" fill="none" stroke="%23D4AC0D" stroke-width="2" opacity="0.6"/>
        <circle cx="90" cy="80" r="35" fill="%232D4825" opacity="0.9"/>
        <circle cx="280" cy="80" r="20" fill="%230B2238" opacity="0.6"/>
        <rect x="12" y="12" width="130" height="20" rx="3" fill="%2308111A" fill-opacity="0.85"/>
        <text x="18" y="26" fill="%2338BDF8" font-family="monospace" font-size="9" font-weight="bold">COASTAL OBSERVATION</text>
      </svg>`
    },
    {
      title: 'Land Use Mapping',
      subtitle: 'Agriculture & Forest Cover',
      description: 'Segment agricultural plots, quantify crop phenology (NDVI/EVI), and evaluate land degradation over seasons.',
      icon: Trees,
      tag: 'VEGETATION INDICES',
      sensor: 'CARTOSAT-3 / SENTINEL-2',
      sampleQuery: 'Identify agricultural parcels, vegetation indices, and land cover types.',
      // High realism SVG satellite tile: agriculture parcel grid & river loop
      imageSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" width="400" height="240">
        <rect width="400" height="240" fill="%23264423"/>
        <rect x="10" y="10" width="110" height="95" fill="%2338632E" stroke="%231E3518" stroke-width="2"/>
        <rect x="130" y="10" width="130" height="95" fill="%234A7C3B" stroke="%231E3518" stroke-width="2"/>
        <rect x="270" y="10" width="120" height="95" fill="%235C8E48" stroke="%231E3518" stroke-width="2"/>
        <rect x="10" y="115" width="180" height="115" fill="%233F6E33" stroke="%231E3518" stroke-width="2"/>
        <rect x="200" y="115" width="190" height="115" fill="%232D5025" stroke="%231E3518" stroke-width="2"/>
        <path d="M 0 110 Q 140 130 230 90 T 400 130" fill="none" stroke="%231E4459" stroke-width="12"/>
        <rect x="12" y="12" width="135" height="20" rx="3" fill="%2308111A" fill-opacity="0.85"/>
        <text x="18" y="26" fill="%234ADE80" font-family="monospace" font-size="9" font-weight="bold">LAND USE / CROP NDVI</text>
      </svg>`
    },
    {
      title: 'Urban Growth',
      subtitle: 'Smart Cities & Infrastructure',
      description: 'Detect urban sprawl, classify building footprints, analyze transportation density, and monitor unplanned settlements.',
      icon: Building2,
      tag: '0.28M HIGH-RES',
      sensor: 'CARTOSAT-3 PAN',
      sampleQuery: 'Detect urban expansion, building footprints, and dense infrastructure.',
      // High realism SVG satellite tile: urban road grid & building footprints
      imageSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" width="400" height="240">
        <rect width="400" height="240" fill="%233C4248"/>
        <path d="M 0 60 L 400 60 M 0 130 L 400 130 M 0 190 L 400 190" stroke="%231E2226" stroke-width="12"/>
        <path d="M 80 0 L 80 240 M 180 0 L 180 240 M 290 0 L 290 240" stroke="%231E2226" stroke-width="10"/>
        <rect x="95" y="75" width="70" height="42" fill="%235C6670"/>
        <rect x="200" y="75" width="75" height="42" fill="%234F5861"/>
        <rect x="305" y="75" width="80" height="42" fill="%235C6670"/>
        <rect x="95" y="145" width="70" height="35" fill="%234F5861"/>
        <rect x="200" y="145" width="75" height="35" fill="%23626D77"/>
        <rect x="12" y="12" width="130" height="20" rx="3" fill="%2308111A" fill-opacity="0.85"/>
        <text x="18" y="26" fill="%2360A5FA" font-family="monospace" font-size="9" font-weight="bold">URBAN FOOTPRINT</text>
      </svg>`
    },
    {
      title: 'Disaster Monitoring',
      subtitle: 'Emergency Rapid Response',
      description: 'Rapidly delineate flood inundation zones, assess active wildfire perimeters, and quantify post-calamity infrastructure damage.',
      icon: AlertTriangle,
      tag: 'SAR + THERMAL',
      sensor: 'RISAT-1A / SENTINEL-1',
      sampleQuery: 'Identify flood inundation zones and thermal hazard hotspots.',
      // High realism SVG satellite tile: flood extent inundation
      imageSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" width="400" height="240">
        <rect width="400" height="240" fill="%234A3E31"/>
        <path d="M 40 30 Q 150 140 280 70 T 390 190 L 0 240 L 0 80 Z" fill="%23152834" opacity="0.95"/>
        <path d="M 80 50 Q 170 160 300 90 T 370 200" fill="none" stroke="%2338BDF8" stroke-width="3" stroke-dasharray="5,4"/>
        <circle cx="320" cy="140" r="18" fill="%23B91C1C" opacity="0.7"/>
        <circle cx="320" cy="140" r="28" fill="none" stroke="%23F87171" stroke-width="1.5" stroke-dasharray="3,3"/>
        <rect x="12" y="12" width="135" height="20" rx="3" fill="%2308111A" fill-opacity="0.85"/>
        <text x="18" y="26" fill="%23F87171" font-family="monospace" font-size="9" font-weight="bold">SAR FLOOD DELINEATION</text>
      </svg>`
    }
  ];

  return (
    <section id="use-cases" className="py-16 bg-[#F5F5F1] border-b border-sat-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs tracking-widest font-semibold text-sat-slate uppercase mb-2">
            <Compass className="w-3.5 h-3.5 text-sat-blue" />
            <span>Operational Domains</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-sat-ink tracking-tight mb-3">
            Space Data. Smarter Decisions. Earth Intelligence.
          </h2>
          <p className="text-sm text-sat-slate leading-relaxed">
            Connected directly to our constellation telemetry, SatQuery enables precision inspection across four mission-critical Earth observation pillars.
          </p>
        </div>

        {/* 4 Satellite Thumbnail Cards matching the constellation image callouts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cases.map((c) => {
            const Icon = c.icon;
            return (
              <div 
                key={c.title}
                className="bg-sat-card border border-sat-border rounded-xl overflow-hidden flex flex-col shadow-subtle hover:border-sat-slate/70 hover:shadow-card transition-all group"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-950">
                  <img 
                    src={c.imageSvg} 
                    alt={c.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>

                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm border border-white/10 text-[9px] font-mono text-gray-300">
                    {c.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 text-sat-blue">
                      <Icon className="w-4 h-4 text-sat-blue" />
                      <h3 className="text-sm font-bold text-sat-ink font-sans">
                        {c.title}
                      </h3>
                    </div>

                    <div className="text-[11px] font-medium text-sat-slate mb-2">
                      {c.subtitle}
                    </div>

                    <p className="text-xs text-sat-slate leading-relaxed">
                      {c.description}
                    </p>
                  </div>

                  {/* Interactive Quick Launch Action */}
                  <div className="mt-5 pt-3 border-t border-sat-border/60 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-sat-slate/80">
                      {c.sensor}
                    </span>
                    
                    {onSelectUseCase && (
                      <button
                        onClick={() => onSelectUseCase(c.sampleQuery)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-sat-blue hover:text-sat-blue-hover transition-colors group/link"
                      >
                        <span>Analyze</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Vision Quote Banner */}
        <div className="w-full bg-sat-card border border-sat-border rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-subtle">
          <p className="font-serif italic text-sat-ink text-base sm:text-lg text-center sm:text-left">
            &ldquo;Leveraging space technology and agentic GeoAI for high-precision, evidence-backed Earth observation.&rdquo;
          </p>
          <div className="text-xs font-semibold text-sat-slate uppercase tracking-wider whitespace-nowrap">
            — SatQuery Earth Observation Network
          </div>
        </div>

      </div>
    </section>
  );
};

