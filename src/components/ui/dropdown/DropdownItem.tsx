import type { MouseEventHandler } from "react";
import { DropdownIcon } from "@/components/ui/dropdown/DropdownIcon";
import type {
  DropdownBaseItemProps,
  DropdownDangerProps,
} from "@/components/ui/dropdown/types";
import { clsx } from "clsx";

interface DropdownItemProps extends DropdownBaseItemProps, DropdownDangerProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
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
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "group my-0.5 flex min-h-9 w-full cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2 text-left text-sm outline-none transition-colors",
        !active &&
          "text-slate-700 hover:bg-slate-100 focus:bg-slate-100   ",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        danger &&
          !active &&
          "text-red-600 focus:text-red-600 ",
        active &&
          "bg-orange-50 text-orange-600 focus:bg-orange-100  ",
        className,
      )}
    >
      <DropdownIcon
        icon={icon}
        className={clsx(
          danger
            ? "text-red-500"
            : "text-slate-400 group-hover:text-slate-600 ",
          active && "text-orange-500",
        )}
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate font-medium">{label}</span>
        {description ? (
          <span
            className={clsx(
              "mt-0.5 block truncate text-xs text-slate-500 ",
              active && "text-orange-500/80",
            )}
          >
            {description}
          </span>
        ) : null}
      </span>
      {shortcut ? (
        <span
          className={clsx(
            "ml-auto shrink-0 text-xs font-medium text-slate-500 ",
            active && "text-orange-500/80",
          )}
        >
          {shortcut}
        </span>
      ) : null}
    </button>
  );
}
