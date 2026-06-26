import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.ComponentProps<"input">, "type"> {
  label?: React.ReactNode;
}

/**
 * Accessible checkbox built on a real <input type="checkbox"> (visually hidden,
 * peer-driven) so keyboard + form semantics are preserved.
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const autoId = React.useId();
    const inputId = id || autoId;
    return (
      <label
        htmlFor={inputId}
        className="group inline-flex cursor-pointer items-center gap-2.5 text-sm text-ink"
      >
        <span className="relative inline-grid place-items-center">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className="peer size-[18px] cursor-pointer appearance-none rounded-[6px] border border-border-strong bg-surface shadow-xs transition-colors checked:border-accent checked:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-1 focus-visible:ring-offset-bg disabled:opacity-50"
            {...props}
          />
          <Check
            className={cn(
              "pointer-events-none absolute size-3 text-accent-fg opacity-0 transition-opacity peer-checked:opacity-100",
              className
            )}
            strokeWidth={3}
          />
        </span>
        {label && <span className="select-none leading-snug">{label}</span>}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";
