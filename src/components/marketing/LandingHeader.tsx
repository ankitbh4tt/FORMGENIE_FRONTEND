import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/common/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
];

export function LandingHeader() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
        <button
          onClick={() => navigate("/")}
          className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Wordmark />
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:grid" />
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => navigate("/dashboard")}
          >
            Sign in
          </Button>
          <Button
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => navigate("/dashboard")}
          >
            Start free
          </Button>

          <button
            onClick={() => setOpen((o) => !o)}
            className="grid size-9 place-items-center rounded-lg text-ink-muted hover:bg-surface-sunken hover:text-ink md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-bg px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-muted hover:bg-surface-sunken hover:text-ink"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={() => navigate("/dashboard")}
              >
                Sign in
              </Button>
              <Button
                size="sm"
                className="flex-1"
                onClick={() => navigate("/dashboard")}
              >
                Start free
              </Button>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
