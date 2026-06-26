import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

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
        "relative grid size-9 place-items-center rounded-lg border border-border text-ink-muted transition-colors hover:bg-surface-sunken hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        className
      )}
    >
      <motion.span
        key={isDark ? "moon" : "sun"}
        initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
        className="flex"
      >
        {isDark ? <Moon className="size-[18px]" /> : <Sun className="size-[18px]" />}
      </motion.span>
    </button>
  );
}
