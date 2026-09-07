import React, { useState } from 'react';
import { SatQueryLogoIcon } from '../common/Emblems';
import { ArrowRight, Menu, X, Activity } from 'lucide-react';

export type AppPage = 'home' | 'analysis' | 'docs-use-cases' | 'history';

interface NavbarProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navTabs: { id: AppPage; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'analysis', label: 'Analysis' },
    { id: 'docs-use-cases', label: 'Documentation & Use Cases' },
    { id: 'history', label: 'History' }
  ];

  const handleTabClick = (pageId: AppPage) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-[#F5F5F1] border-b border-sat-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Subtitle */}
          <div 
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
            onClick={() => handleTabClick('home')}
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

          {/* Desktop Web Application Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
            {navTabs.map((tab) => {
              const isActive = currentPage === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`relative py-2 text-xs lg:text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-sat-ink font-bold'
                      : 'text-sat-slate hover:text-sat-ink'
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sat-blue rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Header Content: Telemetry & Primary Action */}
          <div className="flex items-center gap-4">
            
            {/* Telemetry Status Pill */}
            <div className="hidden lg:flex flex-col items-end text-right border-r border-sat-border pr-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-sat-success">
                <span className="w-2 h-2 rounded-full bg-sat-success animate-pulse"></span>
                System Ready
              </div>
              <span className="text-[10px] text-sat-slate">EO-Cluster Operational</span>
            </div>

            {/* Launch Analysis Button (Shown when not on analysis page) */}
            {currentPage !== 'analysis' ? (
              <button
                onClick={() => handleTabClick('analysis')}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded bg-sat-blue text-white hover:bg-sat-blue-hover transition-colors shadow-subtle"
              >
                <span>Launch Analysis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded bg-sat-surface border border-sat-border text-sat-slate">
                <Activity className="w-3.5 h-3.5 text-sat-success" />
                <span>Workspace Live</span>
              </div>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-sat-slate hover:text-sat-ink hover:bg-sat-surface border border-sat-border transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F5F5F1] border-b border-sat-border px-4 pt-2 pb-6 space-y-2 shadow-lg">
          <div className="text-[10px] font-mono uppercase tracking-wider text-sat-slate px-3 pt-2">
            Navigation Pages
          </div>
          {navTabs.map((tab) => {
            const isActive = currentPage === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between transition-colors ${
                  isActive
                    ? 'bg-sat-card text-sat-blue font-bold shadow-xs border border-sat-border'
                    : 'text-sat-slate hover:text-sat-ink hover:bg-sat-surface'
                }`}
              >
                <span>{tab.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-sat-blue"></span>}
              </button>
            );
          })}

          <div className="pt-3 border-t border-sat-border mt-3">
            <button
              onClick={() => handleTabClick('analysis')}
              className="w-full py-2.5 px-4 rounded bg-sat-blue text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-subtle"
            >
              <span>Open Analysis Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
