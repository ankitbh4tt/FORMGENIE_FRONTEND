import * as React from "react";
import { cn } from "@/lib/utils";

export interface RadioProps extends Omit<React.ComponentProps<"input">, "type"> {
  label?: React.ReactNode;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
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
            type="radio"
            className={cn(
              "peer size-5 cursor-pointer appearance-none rounded-full border border-border-strong bg-surface transition-[border-color,box-shadow] duration-(--dur-fast) checked:border-ink checked:shadow-[inset_0_0_0_5px_var(--ink)] group-hover:border-ink-faint checked:group-hover:border-ink disabled:cursor-not-allowed",
              className
            )}
            {...props}
          />
        </span>
        {label && <span className="select-none leading-snug">{label}</span>}
      </label>
    );
  }
);
Radio.displayName = "Radio";
