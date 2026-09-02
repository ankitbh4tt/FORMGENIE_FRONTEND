import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

/** Light or dark. A colour change, not a performance: the icon swaps in place. */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={cn(
        "grid size-10 place-items-center rounded-control text-ink-muted transition-colors duration-(--dur-fast) hover:bg-surface-sunken hover:text-ink pointer-coarse:size-11",
        className
      )}
    >
      <span className="grid">
        <Sun
          className={cn("col-start-1 row-start-1 size-[18px] transition-opacity duration-(--dur-base)", isDark ? "opacity-0" : "opacity-100")}
          aria-hidden="true"
        />
        <Moon
          className={cn("col-start-1 row-start-1 size-[18px] transition-opacity duration-(--dur-base)", isDark ? "opacity-100" : "opacity-0")}
          aria-hidden="true"
        />
      </span>
    </button>
  );
}
