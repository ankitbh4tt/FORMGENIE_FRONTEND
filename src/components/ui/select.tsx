import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { inputBaseClass } from "./input";

export interface SelectProps extends React.ComponentProps<"select"> {
  invalid?: boolean;
  fieldSize?: "sm" | "md";
}

/**
 * A styled native select. Native is deliberate: keyboard complete, accessible,
 * and it opens the operating system's own picker on a phone.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, invalid, fieldSize = "md", children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        data-slot="select"
        aria-invalid={invalid || undefined}
        className={cn(
          inputBaseClass,
          "appearance-none pr-10",
          fieldSize === "sm" ? "h-9 text-small" : "h-11",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint"
        aria-hidden="true"
      />
    </div>
  )
);
Select.displayName = "Select";
