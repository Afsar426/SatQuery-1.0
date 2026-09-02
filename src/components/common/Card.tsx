import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'stone' | 'charcoal' | 'graphite';
  highlight?: 'none' | 'amber' | 'sage' | 'terracotta';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'stone',
  highlight = 'none',
  ...props
}) => {
  const baseStyles = 'rounded-panel transition-colors border shadow-panel';

  const variantStyles = {
    stone: 'bg-[#2B2C28] border-[#383A34]',
    charcoal: 'bg-[#222321] border-[#383A34]',
    graphite: 'bg-[#171817] border-[#383A34]',
  };

  const highlightStyles = {
    none: '',
    amber: 'border-[#D6A84F]/40 hover:border-[#D6A84F]',
    sage: 'border-[#879477]/40 hover:border-[#879477]',
    terracotta: 'border-[#B76552]/40 hover:border-[#B76552]',
  };

  return (
    <div
      className={twMerge(clsx(baseStyles, variantStyles[variant], highlightStyles[highlight], className))}
      {...props}
    >
      {children}
    </div>
  );
};
