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

