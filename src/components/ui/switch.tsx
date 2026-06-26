import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps
  extends Omit<React.ComponentProps<"button">, "onChange"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked = false, onCheckedChange, disabled, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "relative inline-flex h-6 w-10 shrink-0 items-center rounded-full border border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50",
        checked ? "bg-accent" : "bg-border-strong",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "inline-block size-[18px] rounded-full bg-white shadow-sm transition-transform duration-200",
          checked ? "translate-x-[18px]" : "translate-x-0.5"
        )}
      />
    </button>
  )
);
Switch.displayName = "Switch";
