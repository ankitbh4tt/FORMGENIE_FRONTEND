import * as React from "react";
import { cn } from "@/lib/utils";

export function Label({
  className,
  required,
  children,
  ...props
}: React.ComponentProps<"label"> & { required?: boolean }) {
  return (
    <label
      className={cn("flex items-baseline gap-1.5 text-small font-medium text-ink", className)}
      {...props}
    >
      {children}
      {required && (
        <span className="text-ink-faint" aria-hidden="true">
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
  /** Keep the message row's height, so validating never moves the form. */
  reserveMessage?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Label above, control, then one message row that is either a hint or an error.
 * Errors say what to do, sit beside their own field, and are announced.
 */
export function Field({
  label,
  htmlFor,
  required,
  hint,
  error,
  reserveMessage = false,
  className,
  children,
}: FieldProps) {
  const messageId = htmlFor ? `${htmlFor}-message` : undefined;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      )}
      {children}
      {error ? (
        <p id={messageId} role="alert" className="text-small text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={messageId} className="text-small text-ink-faint">
          {hint}
        </p>
      ) : reserveMessage ? (
        <p className="min-h-5" aria-hidden="true" />
      ) : null}
    </div>
  );
}
