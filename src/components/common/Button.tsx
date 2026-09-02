import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'sage' | 'terracotta' | 'isro' | 'geo' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-sans transition-all duration-150 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none select-none tracking-tight';

  const variantStyles = {
    // Primary CTA: Signal Amber with dark obsidian text (5% accent rule)
    primary: 'bg-[#D6A84F] text-[#171817] font-semibold hover:bg-[#C49842] active:bg-[#B38836] border border-[#D6A84F] shadow-subtle',
    // Secondary: Solid Stone surface with Warm Ivory text and hairline border
    secondary: 'bg-[#2B2C28] text-[#F1EBDD] hover:bg-[#333530] hover:text-[#D6A84F] border border-[#383A34] shadow-subtle',
    // Sage: Earth Sage for environmental / vegetation / GIS actions
    sage: 'bg-[#879477] text-[#171817] font-semibold hover:bg-[#788568] border border-[#879477] shadow-subtle',
    // Terracotta: Muted Terracotta for alerts / change verification
    terracotta: 'bg-[#B76552] text-[#F1EBDD] font-medium hover:bg-[#A55745] border border-[#B76552] shadow-subtle',
    // Semantic Aliases for backwards compatibility
    isro: 'bg-[#D6A84F] text-[#171817] font-semibold hover:bg-[#C49842] border border-[#D6A84F] shadow-subtle',
    geo: 'bg-[#879477] text-[#171817] font-semibold hover:bg-[#788568] border border-[#879477] shadow-subtle',
    ghost: 'bg-transparent text-[#AAA89E] hover:text-[#F1EBDD] hover:bg-[#2B2C28]',
    outline: 'bg-transparent border border-[#383A34] text-[#F1EBDD] hover:border-[#D6A84F] hover:text-[#D6A84F]',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    md: 'text-xs px-3.5 py-2 gap-2 font-medium',
    lg: 'text-sm px-5 py-2.5 gap-2.5 font-semibold',
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, variantStyles[variant], sizeStyles[size], className))}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin text-current" />
      ) : (
        icon && <span className="flex-shrink-0">{icon}</span>
      )}
      {children}
    </button>
  );
};
