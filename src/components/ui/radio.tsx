import * as React from "react";
import { cn } from "@/lib/utils";

export interface RadioProps
  extends Omit<React.ComponentProps<"input">, "type"> {
  label?: React.ReactNode;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
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
            type="radio"
            className={cn(
              "peer size-[18px] cursor-pointer appearance-none rounded-full border border-border-strong bg-surface shadow-xs transition-colors checked:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-1 focus-visible:ring-offset-bg disabled:opacity-50",
              className
            )}
            {...props}
          />
          <span className="pointer-events-none absolute size-2 scale-0 rounded-full bg-accent transition-transform peer-checked:scale-100" />
        </span>
        {label && <span className="select-none leading-snug">{label}</span>}
      </label>
    );
  }
);
Radio.displayName = "Radio";
