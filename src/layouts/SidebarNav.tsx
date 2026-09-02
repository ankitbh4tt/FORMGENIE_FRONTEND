import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserButton } from "@clerk/clerk-react";
import { Plus, Search } from "lucide-react";
import { Wordmark } from "@/components/common/Logo";
import { Kbd } from "@/components/ui/kbd";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NAV_ITEMS } from "./nav-items";
import { springCrisp } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SidebarNavProps {
  onNavigate?: () => void;
  onOpenCommand?: () => void;
}

/**
 * The desktop sidebar. One action that matters (New form) in the accent, a search,
 * three destinations, and the account at the foot where the eye rarely needs it.
 */
export function SidebarNav({ onNavigate, onOpenCommand }: SidebarNavProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const go = (to: string) => {
    navigate(to);
    onNavigate?.();
  };

  return (
    <div className="flex h-full flex-col px-4 py-5">
      <button
        type="button"
        onClick={() => go("/dashboard")}
        className="mb-6 flex h-11 w-fit items-center rounded-control px-1.5"
        aria-label="FormGenie, overview"
      >
        <Wordmark />
      </button>

      <button
        type="button"
        onClick={() => go("/builder")}
        className="flex h-11 items-center justify-center gap-2 rounded-control bg-accent px-3 text-ui font-medium text-accent-fg transition-[background-color,transform] duration-(--dur-fast) hover:bg-accent-hover active:scale-[0.985]"
      >
        <Plus className="size-4" aria-hidden="true" />
        New form
      </button>

      <button
        type="button"
        onClick={() => {
          onOpenCommand?.();
          onNavigate?.();
        }}
        className="mt-3 flex h-10 items-center gap-2.5 rounded-control border border-border bg-surface px-3 text-small text-ink-faint transition-colors duration-(--dur-fast) hover:border-border-strong hover:text-ink-muted"
      >
        <Search className="size-4" aria-hidden="true" />
        <span className="flex-1 text-left">Search</span>
        <Kbd>⌘K</Kbd>
      </button>

      <nav aria-label="Workspace" className="mt-6 flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => {
          const active = item.match(pathname);
          const Icon = item.icon;
          return (
            <button
              key={item.to}
              type="button"
              onClick={() => go(item.to)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex min-h-11 items-center gap-3 rounded-control px-3 text-ui font-medium transition-colors duration-(--dur-fast)",
                active ? "text-ink" : "text-ink-muted hover:bg-surface-sunken hover:text-ink"
              )}
            >
              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  transition={springCrisp}
                  className="absolute inset-0 rounded-control bg-surface-sunken"
                />
              )}
              <Icon className="relative z-10 size-[18px]" strokeWidth={1.75} aria-hidden="true" />
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-4">
        <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "size-8" } }} />
        <ThemeToggle />
      </div>
    </div>
  );
}
