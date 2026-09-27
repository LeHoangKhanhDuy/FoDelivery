import type { ElementType, ReactNode } from "react";

export type DropdownAlign = "start" | "center" | "end";
export type DropdownSide = "top" | "right" | "bottom" | "left";
export type DropdownWidth = number | string;
export type DropdownIconType = ElementType;

export interface DropdownBaseItemProps {
  icon?: DropdownIconType;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  shortcut?: ReactNode;
  className?: string;
}

export interface DropdownDangerProps {
  danger?: boolean;
}
