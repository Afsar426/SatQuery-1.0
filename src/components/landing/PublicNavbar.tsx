import React from 'react';
import { Satellite, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

interface PublicNavbarProps {
  onLaunchMission: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenSignIn: () => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({
  onLaunchMission,
  onNavigateSection,
  onOpenSignIn,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#171817]/90 backdrop-blur-md border-b border-[#383A34] px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & ISRO Mission Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 rounded-sm bg-[#2B2C28] border border-[#D6A84F]/40 flex items-center justify-center text-[#D6A84F]">
              <Satellite className="w-4 h-4" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-[#F1EBDD]">
                SATQUERY <span className="text-[#D6A84F]">AI</span>
              </span>
              <span className="hidden sm:inline-block text-[9px] font-mono text-[#AAA89E] ml-2">
                EARTH INTELLIGENCE
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 pl-3 border-l border-[#383A34] text-[10px] font-mono text-[#D6A84F] bg-[#D6A84F]/10 px-2 py-0.5 rounded-sm border border-[#D6A84F]/25">
            <span>ISRO &bull; SIH 2026 (SIH26167)</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-[#AAA89E]">
          <button
            onClick={() => onNavigateSection('telemetry')}
            className="hover:text-[#F1EBDD] transition-colors"
          >
            Constellation
          </button>
          <button
            onClick={() => onNavigateSection('ask-earth')}
            className="hover:text-[#F1EBDD] transition-colors"
          >
            Ask Earth
          </button>
          <button
            onClick={() => onNavigateSection('temporal')}
            className="hover:text-[#F1EBDD] transition-colors"
          >
            Temporal Diff
          </button>
          <button
            onClick={() => onNavigateSection('fusion')}
            className="hover:text-[#F1EBDD] transition-colors"
          >
            Optical + SAR
          </button>
          <button
            onClick={() => onNavigateSection('architecture')}
            className="hover:text-[#F1EBDD] transition-colors"
          >
            Agentic AI
          </button>
          <button
            onClick={() => onNavigateSection('use-cases')}
            className="hover:text-[#F1EBDD] transition-colors"
          >
            Use Cases
          </button>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenSignIn}
            className="hidden sm:inline-flex"
          >
            Sign In
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            onClick={onLaunchMission}
          >
            Launch Mission
          </Button>
        </div>
      </div>
    </header>
  );
};
