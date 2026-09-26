import type { ElementType, ReactNode } from "react";
import type * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export type DropdownAlign = React.ComponentPropsWithoutRef<typeof DropdownMenu.Content>["align"];
export type DropdownSide = React.ComponentPropsWithoutRef<typeof DropdownMenu.Content>["side"];
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
