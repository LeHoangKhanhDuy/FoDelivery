import React from 'react';
import { clsx } from 'clsx';
import fodeliveryLogo from '@/assets/FoDelivery_Logo.png';

interface AuthLogoProps {
  centered?: boolean;
}

export const AuthLogo: React.FC<AuthLogoProps> = ({ centered = false }) => (
  <div className={clsx('flex items-center gap-4', centered && 'flex-col gap-0 text-center')}>
    <img
      src={fodeliveryLogo}
      alt="Logo FoDelivery"
      className="h-14 w-14 shrink-0 object-contain"
    />

    <div>
      <div
        className={clsx(
          'font-black leading-none tracking-tight',
          centered ? 'text-[28px] text-slate-900' : 'text-[28px] text-white'
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
