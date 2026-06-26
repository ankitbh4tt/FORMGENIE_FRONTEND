import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  interactive,
  ...props
}: React.ComponentProps<"div"> & { interactive?: boolean }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-xl border border-border bg-surface shadow-xs",
        interactive &&
          "transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-md",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-1 p-5 pb-0", className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn("text-base font-semibold tracking-tight text-ink", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return <p className={cn("text-sm text-ink-muted", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("p-5", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center gap-2 p-5 pt-0", className)}
      {...props}
    />
  );
}
