import React from 'react';
import { SatQueryLogoIcon } from '../common/Emblems';
import { AppPage } from './Navbar';
import { Satellite, Radio } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: AppPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#131B23] text-sat-border border-t border-[#202C38] py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#233140]">
          
          {/* Logo & Product Name */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => onNavigate('home')}
          >
            <SatQueryLogoIcon className="w-8 h-8 text-[#56819F]" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white tracking-tight">SatQuery</span>
              <span className="text-xs text-gray-400 font-medium">Earth Observation Intelligence</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-gray-300">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
              Home
            </button>
            <button onClick={() => onNavigate('analysis')} className="hover:text-white transition-colors">
              Analysis Workspace
            </button>
            <button onClick={() => onNavigate('docs-use-cases')} className="hover:text-white transition-colors">
              Documentation &amp; Use Cases
            </button>
            <button onClick={() => onNavigate('history')} className="hover:text-white transition-colors">
              History
            </button>
          </div>

          {/* System Telemetry Badge */}
          <div className="flex items-center gap-3 text-right">
            <div className="w-8 h-8 rounded-lg bg-[#1B2734] border border-gray-700 flex items-center justify-center text-[#56819F]">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            </div>
            <div className="flex flex-col text-[11px] text-gray-400">
              <span className="text-gray-200 font-medium flex items-center gap-1.5">
                <Satellite className="w-3 h-3 text-cyan-400 inline" />
                Multi-Sensor Constellation Active
              </span>
              <span className="text-gray-400 text-[10px]">Sentinel-2 • Landsat-9 • Cartosat-3</span>
            </div>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500">
          <p>© {new Date().getFullYear()} SatQuery. Dedicated to peaceful Earth observation and scientific research.</p>
          <p className="mt-2 sm:mt-0 font-mono text-[10px] tracking-wider text-gray-400">
            CLUSTER: EO-GLOBAL-01 • LATENCY: OPTIMAL
          </p>
        </div>
      </div>
    </footer>
  );
};
