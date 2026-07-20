import React from 'react';
import { clsx } from 'clsx';

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  status?: 'online' | 'busy' | 'offline';
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name = 'User',
  size = 'md',
  className,
  status,
}) => {
  const sizeStyles = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
    xl: 'w-14 h-14 text-lg',
  };

  const statusColors = {
    online: 'bg-emerald-500 ring-2 ring-white dark:ring-slate-900',
    busy: 'bg-amber-500 ring-2 ring-white dark:ring-slate-900',
    offline: 'bg-slate-400 ring-2 ring-white dark:ring-slate-900',
  };

  const getInitials = (n: string) => {
    const parts = n.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return n.substring(0, 2).toUpperCase();
  };

  return (
    <div className="relative inline-block shrink-0">
      {src ? (
        <img
          src={src}
          alt={name}
          className={clsx('rounded-full object-cover border border-slate-200 dark:border-slate-700', sizeStyles[size], className)}
        />
      ) : (
        <div
          className={clsx(
            'rounded-full bg-orange-100 text-[#F97316] font-bold flex items-center justify-center border border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-900',
            sizeStyles[size],
            className
          )}
        >
          {getInitials(name)}
        </div>
      )}
      {status && (
        <span
          className={clsx(
            'absolute bottom-0 right-0 rounded-full w-2.5 h-2.5',
            statusColors[status]
          )}
        />
      )}
    </div>
  );
};
