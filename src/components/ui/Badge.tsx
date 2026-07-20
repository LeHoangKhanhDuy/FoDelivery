import React from 'react';
import { clsx } from 'clsx';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  className,
}) => {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[11px] font-semibold gap-1 rounded-md',
    md: 'px-2.5 py-1 text-xs font-semibold gap-1.5 rounded-lg',
  };

  const variantStyles = {
    primary: 'bg-orange-100 text-[#F97316] dark:bg-orange-950/60 dark:text-orange-400 border border-orange-200 dark:border-orange-900',
    secondary: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-900',
    success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-900',
    danger: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-900',
    info: 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200 dark:border-sky-900',
    neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center justify-center font-medium tracking-wide transition-colors',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
