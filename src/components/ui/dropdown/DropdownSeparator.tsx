import { clsx } from "clsx";

interface DropdownSeparatorProps {
  className?: string;
}

export function DropdownSeparator({ className }: DropdownSeparatorProps) {
  return <div role="separator" className={clsx("my-1 border-t border-slate-200 ", className)} />;
}
