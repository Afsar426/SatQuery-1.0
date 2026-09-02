import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'amber' | 'sage' | 'sand' | 'terracotta' | 'cyan' | 'teal' | 'isro' | 'sar' | 'neutral' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  icon,
  className,
}) => {
  const baseStyles = 'inline-flex items-center font-mono uppercase tracking-wider rounded-sm select-none';

  const variantStyles = {
    // Signal Amber (Active / Intent / Task)
    amber: 'bg-[#D6A84F]/12 text-[#D6A84F] border border-[#D6A84F]/30',
    // Earth Sage (Ready / Verified / Vegetation / GIS Valid)
    sage: 'bg-[#879477]/15 text-[#879477] border border-[#879477]/30',
    // Pale Sand (Overlays / Subtle Highlights)
    sand: 'bg-[#D8C8A6]/15 text-[#D8C8A6] border border-[#D8C8A6]/30',
    // Muted Terracotta (Changes / Anomalies / Alerts)
    terracotta: 'bg-[#B76552]/15 text-[#B76552] border border-[#B76552]/30',
    // Semantic System Aliases
    success: 'bg-[#879477]/15 text-[#879477] border border-[#879477]/30',
    warning: 'bg-[#D6A84F]/15 text-[#D6A84F] border border-[#D6A84F]/30',
    error: 'bg-[#B76552]/15 text-[#B76552] border border-[#B76552]/30',
    cyan: 'bg-[#D6A84F]/12 text-[#D6A84F] border border-[#D6A84F]/30',
    teal: 'bg-[#879477]/15 text-[#879477] border border-[#879477]/30',
    isro: 'bg-[#D6A84F]/15 text-[#D6A84F] border border-[#D6A84F]/35',
    sar: 'bg-[#D8C8A6]/15 text-[#D8C8A6] border border-[#D8C8A6]/30',
    neutral: 'bg-[#2B2C28] text-[#AAA89E] border border-[#383A34]',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-1.5 py-0.5 gap-1 font-medium',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold',
  };

  return (
    <span className={twMerge(clsx(baseStyles, variantStyles[variant], sizeStyles[size], className))}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
