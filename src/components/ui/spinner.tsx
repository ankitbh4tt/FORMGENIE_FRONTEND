import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Spinner({
  className,
  size = 18,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Loader2
      className={cn("animate-spin text-ink-muted", className)}
      style={{ width: size, height: size }}
      aria-label="Loading"
      role="status"
    />
  );
}

export function CenteredSpinner({ label }: { label?: string }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-ink-muted">
      <Spinner size={22} className="text-accent" />
      {label && <p className="text-sm">{label}</p>}
    </div>
  );
}
