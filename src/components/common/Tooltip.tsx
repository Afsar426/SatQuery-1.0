import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface TooltipProps {
  content: string;
  children?: React.ReactNode;
  title?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  showIcon?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  title,
  position = 'top',
  showIcon = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="relative inline-flex items-center group cursor-help"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {showIcon && (
        <Info className="w-3.5 h-3.5 text-[#AAA89E] hover:text-[#D6A84F] ml-1 transition-colors" />
      )}

      {isVisible && (
        <div
          className={`absolute z-50 w-64 p-2.5 bg-[#2B2C28] text-[#F1EBDD] text-xs rounded-sm border border-[#D6A84F]/30 shadow-panel transition-opacity duration-150 pointer-events-none ${positionClasses[position]}`}
          role="tooltip"
        >
          {title && (
            <div className="font-semibold text-[#D6A84F] font-mono mb-1 border-b border-[#383A34] pb-0.5">
              {title}
            </div>
          )}
          <div className="text-[#AAA89E] leading-relaxed font-normal">{content}</div>
        </div>
      )}
    </div>
  );
};
