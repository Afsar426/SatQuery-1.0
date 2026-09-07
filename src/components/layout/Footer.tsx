import React from 'react';
import { SatQueryLogoIcon } from '../common/Emblems';

interface FooterProps {
  onNavigate: (page: 'landing' | 'analysis') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#131B23] text-sat-border border-t border-[#202C38] py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#233140]">
          {/* Logo & Product Name */}
          <div className="flex items-center gap-3">
            <SatQueryLogoIcon className="w-8 h-8 text-[#56819F]" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white tracking-tight">SatQuery</span>
              <span className="text-xs text-gray-400 font-medium">Earth Observation Intelligence</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex items-center gap-8 text-xs font-medium text-gray-300">
            <button onClick={() => onNavigate('landing')} className="hover:text-white transition-colors">
              Home
            </button>
            <a href="#capabilities" className="hover:text-white transition-colors">
              Capabilities
            </a>
            <a href="#use-cases" className="hover:text-white transition-colors">
              Use Cases
            </a>
            <button onClick={() => onNavigate('analysis')} className="hover:text-white transition-colors">
              Analysis Workspace
            </button>
          </div>

          {/* Government / ISRO partnership note */}
          <div className="flex items-center gap-3 text-right">
            {/* Indian flag stripe motif */}
            <div className="flex flex-col w-5 h-3.5 rounded-sm overflow-hidden border border-gray-600">
              <div className="h-1/3 bg-[#FF9933]"></div>
              <div className="h-1/3 bg-white flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#000088]"></div>
              </div>
              <div className="h-1/3 bg-[#128807]"></div>
            </div>
            <div className="flex flex-col text-[11px] text-gray-400">
              <span className="text-gray-200 font-medium">A Government of India Initiative</span>
              <span className="text-gray-400 text-[10px]">In collaboration with ISRO • SIH 2026</span>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500">
          <p>© {new Date().getFullYear()} SatQuery. Dedicated to peaceful Earth observation and scientific research.</p>
          <p className="mt-2 sm:mt-0 font-mono text-[10px]">INTERNAL PROTOTYPE • NODE: BLR-ISRO-EO-01</p>
        </div>
      </div>
    </footer>
  );
};
