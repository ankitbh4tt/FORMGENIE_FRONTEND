import * as React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function Label({
  className,
  required,
  children,
  ...props
}: React.ComponentProps<"label"> & { required?: boolean }) {
  return (
    <label
      className={cn(
        "text-sm font-medium text-ink flex items-center gap-1",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="text-danger" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

interface FieldProps {
  label?: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

/**
 * Standard field wrapper: label + control + (hint | inline error).
 * Errors render with role="alert" and an id so controls can wire
 * aria-describedby for screen readers.
 */
export function Field({
  label,
  htmlFor,
  required,
  hint,
  error,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      )}
      {children}
      {error ? (
        <p
          id={htmlFor ? `${htmlFor}-error` : undefined}
          role="alert"
          className="flex items-center gap-1.5 text-[13px] text-danger"
        >
          <AlertCircle className="size-3.5 shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p className="text-[13px] text-ink-faint">{hint}</p>
      ) : null}
    </div>
  );
}
