import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC<{ label?: string }> = ({ label = 'Đang tải dữ liệu...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 gap-3 text-slate-500">
      <Loader2 className="w-8 h-8 text-[#F97316] animate-spin" />
      <span className="text-xs font-semibold text-slate-500">{label}</span>
    </div>
  );
};
