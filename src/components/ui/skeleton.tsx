import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return <div aria-hidden="true" className={cn("fg-shimmer rounded-md bg-surface-sunken", className)} {...props} />;
}
