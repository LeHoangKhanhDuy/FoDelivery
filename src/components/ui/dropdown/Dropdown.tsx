import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { clsx } from "clsx";
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
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const contentStyle = width
    ? { width: typeof width === "number" ? `${width}px` : width }
    : undefined;

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const alignmentClass = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  }[align];

  const sideClass = {
    top: "bottom-full mb-2",
    right: "left-full top-0 ml-2",
    bottom: "top-full mt-2",
    left: "right-full top-0 mr-2",
  }[side];

  return (
    <div ref={rootRef} className="relative w-full">
      <div
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => !disabled && setIsOpen((current) => !current)}
        className={clsx(disabled && "pointer-events-none opacity-50")}
      >
        {trigger}
      </div>

      {isOpen ? (
        <div
          id={menuId}
          role="menu"
          style={contentStyle}
          onClick={() => setIsOpen(false)}
          className={clsx(
            "absolute z-[10000] min-w-[180px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg border border-slate-200 bg-white p-1 text-slate-800 shadow-xl shadow-slate-950/10 outline-none    ",
            "animate-in fade-in zoom-in-95 duration-100",
            alignmentClass,
            sideClass,
            className,
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
