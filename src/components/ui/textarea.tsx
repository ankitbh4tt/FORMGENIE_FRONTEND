import * as React from "react";
import { cn } from "@/lib/utils";
import { inputBaseClass } from "./input";

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  invalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => (
    <textarea
      ref={ref}
      data-slot="textarea"
      aria-invalid={invalid || undefined}
      className={cn(inputBaseClass, "min-h-[88px] py-2.5 resize-y", className)}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
