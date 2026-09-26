import type { ReactNode } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import type { DropdownAlign, DropdownSide, DropdownWidth } from "@/components/ui/dropdown/types";

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: DropdownAlign;
  side?: DropdownSide;
  width?: DropdownWidth;
  disabled?: boolean;
  className?: string;
}

export function Dropdown({
  trigger,
  children,
  align = "end",
  side = "bottom",
  width,
  disabled,
  className,
}: DropdownProps) {
  const contentStyle = width
    ? { width: typeof width === "number" ? `${width}px` : width }
    : undefined;

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild disabled={disabled}>
        {trigger}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align={align}
          side={side}
          sideOffset={8}
          collisionPadding={16}
          style={contentStyle}
          className={cn(
            "z-[10000] min-w-[220px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg border border-border bg-surface p-1 text-foreground shadow-xl shadow-slate-950/10 outline-none dark:shadow-black/30",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 duration-100",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 duration-100",
            "data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
            className,
          )}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
