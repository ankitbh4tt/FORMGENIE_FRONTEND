import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComposeLine } from "@/components/motion/ComposeLine";

export function Spinner({ className, size = 18 }: { className?: string; size?: number }) {
  return (
    <Loader2
      className={cn("animate-spin text-ink-muted", className)}
      style={{ width: size, height: size }}
      aria-label="Loading"
      role="status"
    />
  );
}

/** A page-level working state: the compose line with one named beat. */
export function CenteredSpinner({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-6">
      <ComposeLine active states={[label]} label={label} duration={1800} />
    </div>
  );
}
