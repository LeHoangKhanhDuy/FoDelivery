import React from 'react';
import { clsx } from 'clsx';

export interface Column<T> {
  header: string;
  accessor?: keyof T;
  cell?: (item: T, index: number) => React.ReactNode;
  className?: string;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  isLoading,
  emptyMessage = 'No data available',
  className,
}: TableProps<T>) {
  return (
    <div className={clsx('w-full overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900', className)}>
      <table className="w-full text-left text-sm border-collapse">
        <thead>
          <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 font-semibold text-xs">
            {columns.map((col, idx) => (
              <th key={idx} className={clsx('px-4 py-3.5', col.className)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, rIdx) => (
              <tr key={rIdx} className="animate-pulse">
                {columns.map((_, cIdx) => (
                  <td key={cIdx} className="px-4 py-4">
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-24" />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-slate-400">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={keyExtractor(item)}
                onClick={() => onRowClick && onRowClick(item)}
                className={clsx(
                  'transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/50',
                  onRowClick && 'cursor-pointer'
                )}
              >
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className={clsx('px-4 py-3.5', col.className)}>
                    {col.cell
                      ? col.cell(item, index)
                      : col.accessor
                      ? String(item[col.accessor] ?? '')
                      : null}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
