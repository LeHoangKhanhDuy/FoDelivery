import React from 'react';
import { Search, X } from 'lucide-react';

export interface SearchBoxProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  value,
  onChange,
  placeholder = 'Tìm kiếm...',
  className = '',
}) => {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-orange-500/20 transition-all text-slate-900 dark:text-slate-100 placeholder-slate-400"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
