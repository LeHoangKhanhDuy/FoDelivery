import React from 'react';
import { clsx } from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  padded?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverable = false,
  padded = true,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'bg-white dark:bg-slate-900 rounded-xl transition-all duration-200 overflow-hidden',
        padded && 'p-5',
        hoverable && 'card-hover cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
