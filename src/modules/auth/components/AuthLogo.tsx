import React from 'react';
import { clsx } from 'clsx';
import { Sparkles } from 'lucide-react';

interface AuthLogoProps {
  centered?: boolean;
}

export const AuthLogo: React.FC<AuthLogoProps> = ({ centered = false }) => (
  <div className={clsx('flex items-center gap-4', centered && 'flex-col gap-0 text-center')}>
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff8a2a] to-[#F97316] shadow-lg shadow-orange-500/30">
      <Sparkles className="h-7 w-7 text-white" strokeWidth={2.5} />
    </div>

    <div>
      <div
        className={clsx(
          'font-black leading-none tracking-tight',
          centered ? 'mt-4 text-[28px] text-slate-900' : 'text-[28px] text-white'
        )}
      >
        <span>Fo</span>
        <span className="text-[#F97316]">Delivery</span>
      </div>
      <p
        className={clsx(
          'font-medium text-slate-400',
          centered ? 'mt-3 px-2 text-xs leading-5' : 'mt-2 max-w-[260px] text-sm leading-5'
        )}
      >
        Hệ thống Quản lý Giao hàng &amp; POS
        {!centered && <br />} Đa kênh Doanh nghiệp
      </p>
    </div>
  </div>
);
