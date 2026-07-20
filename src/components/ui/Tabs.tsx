import React from 'react';
import { clsx } from 'clsx';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTabId: string;
  onTabChange: (id: string) => void;
  variant?: 'pills' | 'underline';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTabId,
  onTabChange,
  variant = 'pills',
}) => {
  if (variant === 'underline') {
    return (
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6">
        {tabs.map((t) => {
          const isActive = t.id === activeTabId;
          return (
            <button
              key={t.id}
              onClick={() => onTabChange(t.id)}
              className={clsx(
                'pb-3 font-semibold text-sm transition-colors relative flex items-center gap-2',
                isActive
                  ? 'text-[#F97316]'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              )}
            >
              {t.icon && <span>{t.icon}</span>}
              <span>{t.label}</span>
              {t.count !== undefined && (
                <span
                  className={clsx(
                    'px-2 py-0.5 text-xs rounded-full font-bold',
                    isActive ? 'bg-orange-100 text-[#F97316]' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  )}
                >
                  {t.count}
                </span>
              )}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F97316] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl gap-1">
      {tabs.map((t) => {
        const isActive = t.id === activeTabId;
        return (
          <button
            key={t.id}
            onClick={() => onTabChange(t.id)}
            className={clsx(
              'px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5',
              isActive
                ? 'bg-white dark:bg-slate-900 text-[#F97316] shadow-sm'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            )}
          >
            {t.icon && <span>{t.icon}</span>}
            <span>{t.label}</span>
            {t.count !== undefined && (
              <span
                className={clsx(
                  'px-1.5 py-0.5 text-[10px] rounded-full font-extrabold',
                  isActive ? 'bg-orange-100 text-[#F97316]' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                )}
              >
                {t.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
