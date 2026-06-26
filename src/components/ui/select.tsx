import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps extends React.ComponentProps<"select"> {
  invalid?: boolean;
}

/**
 * Styled native <select>. Native is intentional: it's fully accessible,
 * keyboard-complete, and renders the OS picker on mobile — premium without
 * the weight of a custom listbox.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, invalid, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        data-slot="select"
        aria-invalid={invalid || undefined}
        className={cn(
          "h-10 w-full appearance-none rounded-lg border border-border-strong bg-surface pl-3.5 pr-10 text-sm text-ink shadow-xs transition-[border-color,box-shadow] duration-150 focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25 disabled:cursor-not-allowed disabled:opacity-60 aria-[invalid=true]:border-danger",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint" />
    </div>
  )
);
Select.displayName = "Select";
