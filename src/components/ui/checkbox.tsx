import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<React.ComponentProps<"input">, "type"> {
  label?: React.ReactNode;
}

/**
 * A real checkbox, visually redrawn. The label is the target, 44px tall on a
 * phone, and the check draws rather than pops.
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const autoId = React.useId();
    const inputId = id || autoId;
    return (
      <label
        htmlFor={inputId}
        className="group inline-flex min-h-11 cursor-pointer items-center gap-3 py-1 text-[1rem] text-ink has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60"
      >
        <span className="relative inline-grid place-items-center">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className={cn(
              "peer size-5 cursor-pointer appearance-none rounded-[6px] border border-border-strong bg-surface transition-[background-color,border-color] duration-(--dur-fast) checked:border-ink checked:bg-ink group-hover:border-ink-faint checked:group-hover:border-ink disabled:cursor-not-allowed",
              className
            )}
            {...props}
          />
          <Check
            className="pointer-events-none absolute size-3.5 text-bg opacity-0 transition-opacity duration-(--dur-fast) peer-checked:opacity-100"
            strokeWidth={3}
            aria-hidden="true"
          />
        </span>
        {label && <span className="select-none leading-snug">{label}</span>}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";
