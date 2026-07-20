import React from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs font-semibold gap-1.5',
    md: 'px-4 py-2 text-sm font-semibold gap-2',
    lg: 'px-5 py-2.5 text-base font-semibold gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#F97316] text-white hover:bg-[#EA580C] shadow-sm shadow-orange-500/20 focus:ring-[#F97316]',
    secondary:
      'bg-orange-50 text-[#F97316] hover:bg-orange-100 dark:bg-slate-800 dark:text-orange-400 dark:hover:bg-slate-700 focus:ring-orange-300',
    outline:
      'border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 focus:ring-slate-400',
    ghost:
      'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 focus:ring-slate-400',
    danger:
      'bg-red-600 text-white hover:bg-red-700 shadow-sm shadow-red-500/20 focus:ring-red-500',
  };

  return (
    <button
      className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!isLoading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  );
};
