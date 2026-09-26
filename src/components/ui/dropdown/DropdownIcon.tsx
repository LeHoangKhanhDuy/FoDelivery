import { cn } from "@/lib/utils";
import type { DropdownIconType } from "@/components/ui/dropdown/types";

interface DropdownIconProps {
  icon?: DropdownIconType;
  className?: string;
}

export function DropdownIcon({ icon: Icon, className }: DropdownIconProps) {
  if (!Icon) return null;

  return (
    <span className={cn("flex h-4 w-4 shrink-0 items-center justify-center", className)}>
      <Icon className="h-4 w-4" aria-hidden="true" />
    </span>
  );
}
