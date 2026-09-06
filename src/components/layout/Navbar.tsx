import React from 'react';
import { SatQueryLogoIcon, IndiaGovEmblem, IsroLogo } from '../common/Emblems';
import { ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentPage: 'landing' | 'analysis';
  onNavigate: (page: 'landing' | 'analysis') => void;
  onOpenDocs?: () => void;
  onOpenHistory?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onNavigate,
  onOpenDocs,
  onOpenHistory
}) => {
  return (
    <header className="w-full bg-[#F5F5F1] border-b border-sat-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Subtitle */}
          <div 
            className="flex items-center gap-3 cursor-pointer group select-none"
            onClick={() => onNavigate('landing')}
          >
            <SatQueryLogoIcon className="w-8 h-8 text-sat-blue transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-sat-ink font-sans">
                SatQuery
              </span>
              <span className="text-[11px] font-medium text-sat-slate tracking-normal -mt-0.5">
                Earth Observation Intelligence
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button 
              onClick={() => onNavigate('landing')}
              className={`transition-colors pb-1 border-b-2 ${
                currentPage === 'landing' 
                  ? 'text-sat-ink border-sat-blue font-semibold' 
                  : 'text-sat-slate border-transparent hover:text-sat-ink'
              }`}
            >
              Home
            </button>

            {currentPage === 'landing' ? (
              <>
                <a 
                  href="#capabilities" 
                  className="text-sat-slate hover:text-sat-ink transition-colors pb-1 border-b-2 border-transparent"
                >
                  Capabilities
                </a>
                <a 
                  href="#use-cases" 
                  className="text-sat-slate hover:text-sat-ink transition-colors pb-1 border-b-2 border-transparent"
                >
                  Use Cases
                </a>
                <a 
                  href="#about" 
                  className="text-sat-slate hover:text-sat-ink transition-colors pb-1 border-b-2 border-transparent"
                >
                  About
                </a>
              </>
            ) : (
              <>
                <button 
                  onClick={() => onNavigate('analysis')}
                  className="text-sat-ink font-semibold border-b-2 border-sat-blue pb-1"
                >
                  Analysis
                </button>
                <button 
                  onClick={onOpenHistory}
                  className="text-sat-slate hover:text-sat-ink transition-colors pb-1 border-b-2 border-transparent"
                >
                  History
                </button>
                <button 
                  onClick={onOpenDocs}
                  className="text-sat-slate hover:text-sat-ink transition-colors pb-1 border-b-2 border-transparent"
                >
                  Documentation
                </button>
              </>
            )}
          </nav>

          {/* Right Header Content: Government Emblems & Action */}
          <div className="flex items-center gap-6">
            {/* Telemetry pill (visible in workspace mode or larger screens) */}
            {currentPage === 'analysis' && (
              <div className="hidden lg:flex flex-col items-end text-right border-r border-sat-border pr-6">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-sat-success">
                  <span className="w-2 h-2 rounded-full bg-sat-success animate-pulse"></span>
                  System Ready
                </div>
                <span className="text-[10px] text-sat-slate">All services operational</span>
                <span className="text-[9px] font-mono text-sat-slate/80">SIH 2026 Internal Node</span>
              </div>
            )}

            {/* Official Indian Space Emblems (Government of India + ISRO) */}
            <div className="hidden sm:flex items-center gap-5 border-l border-sat-border pl-6">
              <IndiaGovEmblem />
              <div className="h-7 w-[1px] bg-sat-border"></div>
              <IsroLogo />
            </div>

            {/* CTA button (on landing page) */}
            {currentPage === 'landing' && (
              <button
                onClick={() => onNavigate('analysis')}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded bg-sat-blue text-white hover:bg-sat-blue-hover transition-colors shadow-subtle"
              >
                <span>Launch SatQuery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
