import React from 'react';
import { Card } from '@/components/ui/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { clsx } from 'clsx';

export interface StatCardProps {
  title: string;
  value: string | number;
  growthPercent?: number;
  growthLabel?: string;
  icon: React.ReactNode;
  iconBgColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  growthPercent,
  growthLabel = 'vs yesterday',
  icon,
  iconBgColor = 'bg-orange-50 text-[#F97316] dark:bg-orange-950/50 dark:text-orange-400',
}) => {
  const isPositive = growthPercent !== undefined && growthPercent >= 0;

  return (
    <Card hoverable className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {title}
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1.5 tracking-tight">
            {value}
          </h3>
        </div>
        <div className={clsx('p-3 rounded-2xl shrink-0', iconBgColor)}>{icon}</div>
      </div>

      {growthPercent !== undefined && (
        <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold">
          <span
            className={clsx(
              'inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md',
              isPositive
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                : 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
            )}
          >
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {isPositive ? `+${growthPercent}%` : `${growthPercent}%`}
          </span>
          <span className="text-slate-400 font-normal">{growthLabel}</span>
        </div>
      )}
    </Card>
  );
};
