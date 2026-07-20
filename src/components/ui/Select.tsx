import React from 'react';
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  icon?: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, icon, className, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3 text-slate-400 pointer-events-none flex items-center justify-center">
              {icon}
            </div>
          )}
          <select
            id={selectId}
            ref={ref}
            className={clsx(
              'w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-900 border rounded-xl transition-colors duration-150 appearance-none focus:outline-none focus:ring-2 text-slate-900 dark:text-slate-100 pr-9',
              icon && 'pl-10',
              error
                ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                : 'border-slate-200 dark:border-slate-700 focus:border-[#F97316] focus:ring-orange-500/20',
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 pointer-events-none text-slate-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error && <span className="text-xs font-medium text-red-500">{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
