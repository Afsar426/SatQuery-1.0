import React from 'react';
import { HeroSection } from '../landing/HeroSection';
import { TechFlow } from '../landing/TechFlow';
import { ArrowRight, Compass, Waves, Trees, Building2, AlertTriangle } from 'lucide-react';
import { AppPage } from '../layout/Navbar';

interface HomePageProps {
  onLaunch: (customQuery?: string) => void;
  onNavigate: (page: AppPage) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onLaunch, onNavigate }) => {
  const previewUseCases = [
    {
      title: 'Coastal Analysis',
      desc: 'Shoreline erosion, tidal boundaries & mangrove tracking',
      icon: Waves,
      query: 'Where is the coastline and water boundary in this satellite image?'
    },
    {
      title: 'Land Use Mapping',
      desc: 'Crop health phenology, NDVI & agricultural parcels',
      icon: Trees,
      query: 'Identify agricultural parcels, vegetation indices, and land cover types.'
    },
    {
      title: 'Urban Growth',
      desc: 'Sub-meter building footprints & road network density',
      icon: Building2,
      query: 'Detect urban expansion, building footprints, and dense infrastructure.'
    },
    {
      title: 'Disaster Monitoring',
      desc: 'Rapid SAR flood inundation & thermal hazard mapping',
      icon: AlertTriangle,
      query: 'Identify flood inundation zones and thermal hazard hotspots.'
    }
  ];

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <HeroSection onLaunch={onLaunch} />

      {/* Use Cases Overview Section with Direct Tab Link */}
      <section className="py-16 bg-[#F5F5F1] border-b border-sat-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sat-slate mb-1">
                <Compass className="w-3.5 h-3.5 text-sat-blue" />
                <span>Operational Pillars</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-sat-ink tracking-tight">
                Earth Observation Domains
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewUseCases.map((uc) => {
              const Icon = uc.icon;
              return (
                <div
                  key={uc.title}
                  className="bg-sat-card border border-sat-border rounded-xl p-5 flex flex-col justify-between hover:border-sat-slate/70 hover:shadow-card transition-all shadow-subtle group"
                >
                  <div>
                    <div className="w-9 h-9 rounded-lg bg-sat-surface border border-sat-border flex items-center justify-center text-sat-blue mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-sat-ink font-sans mb-1.5">
                      {uc.title}
                    </h3>
                    <p className="text-xs text-sat-slate leading-relaxed">
                      {uc.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-sat-border/60 flex items-center justify-between">
                    <button
                      onClick={() => onLaunch(uc.query)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-sat-blue hover:text-sat-blue-hover transition-colors"
                    >
                      <span>Analyze</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onNavigate('docs-use-cases')}
                      className="text-[11px] text-sat-slate hover:text-sat-ink font-mono"
                    >
                      Details →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pipeline Tech Flow Architecture */}
      <TechFlow />
    </main>
  );
};
