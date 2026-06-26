import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { Wordmark } from "@/components/common/Logo";
import { Kbd } from "@/components/ui/kbd";
import { NAV_ITEMS } from "./nav-items";
import { cn } from "@/lib/utils";

interface SidebarNavProps {
  onNavigate?: () => void;
  onOpenCommand?: () => void;
}

export function SidebarNav({ onNavigate, onOpenCommand }: SidebarNavProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const go = (to: string) => {
    navigate(to);
    onNavigate?.();
  };

  return (
    <div className="flex h-full flex-col gap-1 px-3 py-4">
      <button
        onClick={() => go("/dashboard")}
        className="mb-3 flex items-center rounded-lg px-2 py-1.5 transition-colors hover:bg-surface-sunken focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label="FormGenie home"
      >
        <Wordmark />
      </button>

      <button
        onClick={() => {
          onOpenCommand?.();
          onNavigate?.();
        }}
        className="mb-1 flex items-center gap-2.5 rounded-lg border border-border bg-surface px-2.5 py-2 text-sm text-ink-faint shadow-xs transition-colors hover:border-border-strong hover:text-ink-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <Search className="size-4" />
        <span className="flex-1 text-left">Search…</span>
        <Kbd>⌘K</Kbd>
      </button>

      <button
        onClick={() => go("/builder")}
        className="mb-3 mt-1 flex h-9 items-center justify-center gap-2 rounded-lg bg-accent px-3 text-sm font-medium text-accent-fg shadow-xs transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        <Plus className="size-4" />
        New form
      </button>

      <nav className="flex flex-col gap-0.5">
        <p className="px-2.5 pb-1 pt-2 text-[11px] font-medium uppercase tracking-wider text-ink-faint">
          Workspace
        </p>
        {NAV_ITEMS.map((item) => {
          const active = item.match(pathname);
          const Icon = item.icon;
          return (
            <button
              key={item.to}
              onClick={() => go(item.to)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                active
                  ? "text-ink"
                  : "text-ink-muted hover:bg-surface-sunken hover:text-ink"
              )}
            >
              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  transition={{ type: "spring", stiffness: 480, damping: 38 }}
                  className="absolute inset-0 rounded-lg bg-surface-sunken"
                />
              )}
              <Icon className="relative z-10 size-[18px]" strokeWidth={2} />
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto px-2.5 pt-4">
        <p className="text-[11px] leading-relaxed text-ink-faint">
          FormGenie — describe it, publish it, collect it.
        </p>
      </div>
    </div>
  );
}
