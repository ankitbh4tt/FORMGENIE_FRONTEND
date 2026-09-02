import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * One field style for the whole product: a quiet border, a hairline of ink on
 * focus, and the error state on the control itself.
 */
export const inputBaseClass =
  "w-full rounded-control border border-border-strong bg-surface px-3.5 text-[1rem] text-ink transition-[border-color,box-shadow] duration-(--dur-base) ease-out placeholder:text-ink-faint focus:border-ink focus:shadow-[inset_0_0_0_1px_var(--ink)] disabled:cursor-not-allowed disabled:opacity-60 read-only:cursor-default aria-[invalid=true]:border-danger aria-[invalid=true]:focus:border-danger aria-[invalid=true]:focus:shadow-[inset_0_0_0_1px_var(--danger)]";

export interface InputProps extends React.ComponentProps<"input"> {
  invalid?: boolean;
  fieldSize?: "sm" | "md";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, fieldSize = "md", ...props }, ref) => (
    <input
      ref={ref}
      data-slot="input"
      aria-invalid={invalid || undefined}
      className={cn(inputBaseClass, fieldSize === "sm" ? "h-9 text-small" : "h-11", className)}
      {...props}
    />
  )
);
Input.displayName = "Input";
