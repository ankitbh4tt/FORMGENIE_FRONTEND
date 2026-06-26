import { cn } from "@/lib/utils";

export function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-[5px] border border-border bg-surface-sunken px-1.5 font-mono text-[11px] font-medium text-ink-muted",
        className
      )}
      {...props}
    />
  );
}
