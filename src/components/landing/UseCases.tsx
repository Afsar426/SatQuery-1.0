import React from 'react';
import { Sprout, AlertTriangle, Building2, Trees } from 'lucide-react';

export const UseCases: React.FC = () => {
  const cases = [
    {
      title: 'Environmental Monitoring',
      description: 'Track forests, water bodies and land use changes.',
      icon: Trees,
      // High realism SVG satellite tile: forest & river
      imageSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" width="400" height="240">
        <rect width="400" height="240" fill="%231E3821"/>
        <path d="M 0 120 Q 120 70 220 130 T 400 110" fill="none" stroke="%23102428" stroke-width="28"/>
        <path d="M 0 120 Q 120 70 220 130 T 400 110" fill="none" stroke="%23184E5E" stroke-width="16"/>
        <circle cx="80" cy="50" r="30" fill="%232D502E" opacity="0.8"/>
        <circle cx="280" cy="180" r="45" fill="%2318351B" opacity="0.9"/>
        <rect x="10" y="10" width="90" height="18" rx="2" fill="%230F171F" fill-opacity="0.8"/>
        <text x="16" y="23" fill="%23FFFFFF" font-family="monospace" font-size="9">SENTINEL-2 NDVI</text>
      </svg>`
    },
    {
      title: 'Disaster Response',
      description: 'Assess flood, fire and other disaster-affected areas.',
      icon: AlertTriangle,
      // High realism SVG satellite tile: flood extent inundation
      imageSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" width="400" height="240">
        <rect width="400" height="240" fill="%235A4D3B"/>
        <path d="M 50 40 Q 150 140 280 80 T 380 200 L 0 240 L 0 80 Z" fill="%231B323D" opacity="0.9"/>
        <path d="M 90 60 Q 170 160 300 100 T 360 210" fill="none" stroke="%232D769E" stroke-width="3" stroke-dasharray="4,4"/>
        <rect x="10" y="10" width="110" height="18" rx="2" fill="%230F171F" fill-opacity="0.8"/>
        <text x="16" y="23" fill="%23FFFFFF" font-family="monospace" font-size="9">SAR FLOOD DELINEATION</text>
      </svg>`
    },
    {
      title: 'Urban Planning',
      description: 'Support sustainable and smart city development.',
      icon: Building2,
      // High realism SVG satellite tile: urban grid
      imageSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" width="400" height="240">
        <rect width="400" height="240" fill="%234A5157"/>
        <path d="M 0 60 L 400 60 M 0 130 L 400 130 M 0 190 L 400 190" stroke="%2323282D" stroke-width="12"/>
        <path d="M 80 0 L 80 240 M 180 0 L 180 240 M 290 0 L 290 240" stroke="%2323282D" stroke-width="10"/>
        <rect x="95" y="75" width="70" height="42" fill="%2368737C"/>
        <rect x="200" y="75" width="75" height="42" fill="%2358636B"/>
        <rect x="10" y="10" width="95" height="18" rx="2" fill="%230F171F" fill-opacity="0.8"/>
        <text x="16" y="23" fill="%23FFFFFF" font-family="monospace" font-size="9">CARTOSAT-3 0.28M</text>
      </svg>`
    },
    {
      title: 'Agriculture & Land Management',
      description: 'Monitor crop health and land utilization.',
      icon: Sprout,
      // High realism SVG satellite tile: agriculture plots
      imageSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" width="400" height="240">
        <rect width="400" height="240" fill="%235C6D48"/>
        <rect x="10" y="10" width="110" height="95" fill="%23445831" stroke="%23304120" stroke-width="3"/>
        <rect x="130" y="10" width="130" height="95" fill="%236D8155" stroke="%23304120" stroke-width="3"/>
        <rect x="270" y="10" width="120" height="95" fill="%237D8D5A" stroke="%23304120" stroke-width="3"/>
        <rect x="10" y="115" width="180" height="115" fill="%2352663A" stroke="%23304120" stroke-width="3"/>
        <rect x="200" y="115" width="190" height="115" fill="%233B4E26" stroke="%23304120" stroke-width="3"/>
        <rect x="10" y="10" width="85" height="18" rx="2" fill="%230F171F" fill-opacity="0.8"/>
        <text x="16" y="23" fill="%23FFFFFF" font-family="monospace" font-size="9">CROP PHENOLOGY</text>
      </svg>`
    }
  ];

  return (
    <section id="use-cases" className="py-16 bg-[#F5F5F1] border-b border-sat-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs tracking-widest font-semibold text-sat-slate uppercase block mb-2">
            Real-World Impact
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-sat-ink tracking-tight mb-3">
            Space Data. Smarter Decisions. Stronger India.
          </h2>
          <p className="text-sm text-sat-slate leading-relaxed">
            From environmental monitoring to disaster response, SatQuery helps analyze Earth&apos;s changes for a more sustainable and secure future.
          </p>
        </div>

        {/* 4 Satellite Thumbnail Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cases.map((c) => {
            const Icon = c.icon;
            return (
              <div 
                key={c.title}
                className="bg-sat-card border border-sat-border rounded-lg overflow-hidden flex flex-col shadow-subtle hover:border-sat-slate transition-all group"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-900">
                  <img 
                    src={c.imageSvg} 
                    alt={c.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-sat-blue">
                      <Icon className="w-4 h-4 text-sat-blue" />
                      <h3 className="text-sm font-bold text-sat-ink font-sans">
                        {c.title}
                      </h3>
                    </div>
                    <p className="text-xs text-sat-slate leading-relaxed">
                      {c.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Our Vision Quote Banner */}
        <div className="w-full bg-sat-card border border-sat-border rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-subtle">
          <p className="font-serif italic text-sat-ink text-base sm:text-lg text-center sm:text-left">
            &ldquo;Leveraging space technology for a safer, greener and more prosperous India.&rdquo;
          </p>
          <div className="text-xs font-semibold text-sat-slate uppercase tracking-wider whitespace-nowrap">
            — Our Vision
          </div>
        </div>

      </div>
    </section>
  );
};
