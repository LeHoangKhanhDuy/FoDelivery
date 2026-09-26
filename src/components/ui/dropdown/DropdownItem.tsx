import type { MouseEventHandler } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DropdownIcon } from "@/components/ui/dropdown/DropdownIcon";
import type {
  DropdownBaseItemProps,
  DropdownDangerProps,
} from "@/components/ui/dropdown/types";
import { cn } from "@/lib/utils";

interface DropdownItemProps extends DropdownBaseItemProps, DropdownDangerProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
  active?: boolean;
}

export function DropdownItem({
  icon,
  label,
  description,
  danger,
  disabled,
  shortcut,
  onClick,
  active,
  className,
}: DropdownItemProps) {
  return (
    <DropdownMenu.Item
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "group my-0.5 flex min-h-9 cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2 text-sm outline-none transition-colors",
        !active &&
          "text-foreground hover:bg-slate-100 focus:bg-slate-100 data-[highlighted]:bg-slate-100 dark:hover:bg-slate-700/60 dark:focus:bg-slate-700/60 dark:data-[highlighted]:bg-slate-700/60",
        "data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        danger &&
          !active &&
          "text-[hsl(var(--danger))] focus:text-[hsl(var(--danger))] data-[highlighted]:text-[hsl(var(--danger))]",
        active &&
          "bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-300 focus:bg-primary/15 data-[highlighted]:bg-primary/15",
        className,
      )}
    >
      <DropdownIcon
        icon={icon}
        className={cn(
          danger
            ? "text-[hsl(var(--danger))]"
            : "text-muted-foreground group-data-[highlighted]:text-foreground",
          active && "text-primary dark:text-blue-300 group-data-[highlighted]:text-primary",
        )}
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate font-medium">{label}</span>
        {description ? (
          <span
            className={cn(
              "mt-0.5 block truncate text-xs text-muted-foreground",
              active && "text-primary/70 dark:text-blue-300/70",
            )}
          >
            {description}
          </span>
        ) : null}
      </span>
      {shortcut ? (
        <span
          className={cn(
            "ml-auto shrink-0 text-xs font-medium text-muted-foreground",
            active && "text-primary/70 dark:text-blue-300/70",
          )}
        >
          {shortcut}
        </span>
      ) : null}
    </DropdownMenu.Item>
  );
}
