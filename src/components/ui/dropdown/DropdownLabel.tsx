import type { ReactNode } from "react";
import { clsx } from "clsx";

interface DropdownLabelProps {
  children: ReactNode;
  className?: string;
}

export function DropdownLabel({ children, className }: DropdownLabelProps) {
  return (
    <div className={clsx("px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400", className)}>
      {children}
    </div>
  );
}
