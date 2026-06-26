import * as React from "react";
import { cn } from "@/lib/utils";

export const inputBaseClass =
  "w-full rounded-lg border border-border-strong bg-surface px-3.5 text-sm text-ink shadow-xs transition-[border-color,box-shadow] duration-150 placeholder:text-ink-faint focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25 disabled:cursor-not-allowed disabled:opacity-60 aria-[invalid=true]:border-danger aria-[invalid=true]:ring-danger/20";

export interface InputProps extends React.ComponentProps<"input"> {
  invalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, ...props }, ref) => (
    <input
      ref={ref}
      data-slot="input"
      aria-invalid={invalid || undefined}
      className={cn(inputBaseClass, "h-10", className)}
      {...props}
    />
  )
);
Input.displayName = "Input";
