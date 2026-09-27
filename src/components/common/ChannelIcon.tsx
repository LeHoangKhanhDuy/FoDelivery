import React from 'react';
import { OrderChannel } from '@/types';
import { Phone, Globe, Store } from 'lucide-react';

interface ChannelIconProps {
  channel: OrderChannel | string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ChannelIcon: React.FC<ChannelIconProps> = ({
  channel,
  size = 'md',
  showLabel = false,
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const renderIcon = () => {
    const iconCls = iconSizes[size];

    switch (channel) {
      case 'FACEBOOK':
        return (
          <svg className={iconCls} viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        );
      case 'ZALO':
        return (
          <span className="font-black tracking-tighter text-[11px] font-sans leading-none">
            Zalo
          </span>
        );
      case 'PHONE':
        return <Phone className={iconCls} />;
      case 'WEBSITE':
      case 'WEB':
        return <Globe className={iconCls} />;
      case 'POS':
      default:
        return <Store className={iconCls} />;
    }
  };

  const getStyleClasses = () => {
    switch (channel) {
      case 'FACEBOOK':
        return 'bg-blue-50  text-[#1877F2] border-blue-200 ';
      case 'ZALO':
        return 'bg-sky-50  text-[#0068FF] border-sky-200 ';
      case 'PHONE':
        return 'bg-emerald-50  text-emerald-600  border-emerald-200 ';
      case 'WEBSITE':
      case 'WEB':
        return 'bg-purple-50  text-purple-600  border-purple-200 ';
      case 'POS':
      default:
        return 'bg-orange-50  text-[#F97316] border-orange-200 ';
    }
  };

  const getChannelLabel = () => {
    switch (channel) {
      case 'FACEBOOK':
        return 'Facebook';
      case 'ZALO':
        return 'Zalo OA';
      case 'PHONE':
        return 'Điện thoại';
      case 'WEBSITE':
      case 'WEB':
        return 'Website';
      case 'POS':
        return 'Tại quầy POS';
      default:
        return channel;
    }
  };

  return (
    <div className="inline-flex items-center gap-2">
      <div
        title={getChannelLabel()}
        className={`rounded-xl border flex items-center justify-center font-bold shrink-0 shadow-2xs transition-transform hover:scale-105 ${sizeClasses[size]} ${getStyleClasses()}`}
      >
        {renderIcon()}
      </div>
      {showLabel && (
        <span className="text-xs font-semibold text-slate-800 ">
          {getChannelLabel()}
        </span>
      )}
    </div>
  );
};
