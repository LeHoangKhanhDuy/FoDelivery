import type { ReactNode } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";

interface DropdownLabelProps {
  children: ReactNode;
  className?: string;
}

export function DropdownLabel({ children, className }: DropdownLabelProps) {
  return (
    <DropdownMenu.Label className={cn("px-3 py-2 text-xs font-bold uppercase tracking-wide text-muted-foreground", className)}>
      {children}
    </DropdownMenu.Label>
  );
}
