import React from 'react';

// SatQuery Modern Satellite Wordmark Icon
export const SatQueryLogoIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg 
    className={className} 
    viewBox="0 0 32 32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-label="SatQuery Logo"
  >
    {/* Central satellite body */}
    <rect x="12" y="12" width="8" height="8" rx="1.5" transform="rotate(45 16 16)" fill="#315A73" stroke="#17212B" strokeWidth="1.5"/>
    {/* Solar panel left */}
    <path d="M 5 7 L 11 13 L 9 15 L 3 9 Z" fill="#4B779A" stroke="#17212B" strokeWidth="1.2"/>
    <line x1="5.5" y1="9.5" x2="8.5" y2="12.5" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.8"/>
    {/* Solar panel right */}
    <path d="M 23 25 L 29 19 L 27 17 L 21 23 Z" fill="#4B779A" stroke="#17212B" strokeWidth="1.2"/>
    <line x1="23.5" y1="21.5" x2="26.5" y2="18.5" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.8"/>
    {/* Transmission antenna dish */}
    <path d="M 21 11 L 25 7" stroke="#315A73" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="26" cy="6" r="1.5" fill="#2E7D32"/>
    {/* Earth sensor beam */}
    <path d="M 11 21 L 7 25" stroke="#66737D" strokeWidth="1.5" strokeLinecap="round"/>
    {/* Orbit arc */}
    <path d="M 4 28 A 18 18 0 0 1 28 4" stroke="#D8DCD9" strokeWidth="1.2" strokeDasharray="3 3"/>
  </svg>
);

// State Emblem of India representation (Government of India / Ministry of Space)
export const IndiaGovEmblem: React.FC<{ className?: string }> = ({ className = 'h-9' }) => (
  <div className={`flex items-center gap-2 text-sat-ink ${className}`}>
    <svg viewBox="0 0 24 32" className="h-8 w-auto fill-current" aria-label="Emblem of India">
      {/* Ashoka pillar lions stylized silhouette */}
      <path d="M 12 1 C 10 1 8 3 8 5 C 8 7 9 8 10 9 C 8 10 7 12 7 14 C 7 16 8 18 10 19 L 10 24 L 6 24 C 5 24 5 26 6 26 L 18 26 C 19 26 19 24 18 24 L 14 24 L 14 19 C 16 18 17 16 17 14 C 17 12 16 10 14 9 C 15 8 16 7 16 5 C 16 3 14 1 12 1 Z" opacity="0.9"/>
      {/* Base & Chakra */}
      <circle cx="12" cy="21.5" r="2" fill="none" stroke="currentColor" strokeWidth="0.8"/>
      <rect x="5" y="27" width="14" height="2" rx="0.5" fill="currentColor"/>
    </svg>
    <div className="flex flex-col text-[9px] leading-[11px] font-sans font-medium text-sat-ink/80 tracking-tight">
      <span className="font-semibold text-sat-ink">Government of India</span>
      <span className="text-sat-slate">Ministry of Space</span>
    </div>
  </div>
);

// ISRO Emblem representation
export const IsroLogo: React.FC<{ className?: string }> = ({ className = 'h-9' }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="relative flex items-center justify-center">
      {/* Orange launch streak arrow */}
      <svg viewBox="0 0 36 36" className="w-8 h-8" aria-label="ISRO Symbol">
        <path d="M 6 30 Q 18 18 28 6" stroke="#F97316" strokeWidth="3" strokeLinecap="round" fill="none"/>
        <polygon points="28,4 32,8 24,10" fill="#F97316"/>
        <circle cx="15" cy="18" r="4" fill="none" stroke="#2563EB" strokeWidth="1.8"/>
        <line x1="10" y1="18" x2="20" y2="18" stroke="#2563EB" strokeWidth="1.5"/>
        <line x1="15" y1="13" x2="15" y2="23" stroke="#2563EB" strokeWidth="1.5"/>
      </svg>
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-[12px] font-bold text-[#F97316] font-sans tracking-wide">इसरो</span>
      <span className="text-[13px] font-extrabold text-[#2563EB] tracking-wider font-sans">isro</span>
    </div>
  </div>
);
