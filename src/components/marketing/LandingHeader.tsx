import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { Menu } from "lucide-react";
import { Wordmark } from "@/components/common/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "How it works", href: "#how" },
  { label: "Fields", href: "#fields" },
  { label: "FAQ", href: "#faq" },
];

/**
 * The running head. Transparent over the hero, a ground and a hairline once the
 * page has moved. On a phone the menu is a designed screen, not a dropped list.
 */
export function LandingHeader() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > 24;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-(--dur-base) ease-out",
        scrolled ? "bg-bg/85 shadow-[0_1px_0_0_var(--border)] backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="frame flex h-16 items-center gap-6">
        <Link to="/" className="flex h-11 shrink-0 items-center rounded-control" aria-label="FormGenie home">
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="ml-2 hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-line flex h-11 items-center text-ui font-medium text-ink-muted transition-colors duration-(--dur-fast) hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <ThemeToggle className="hidden sm:grid" />
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex" onClick={() => navigate("/dashboard")}>
            Sign in
          </Button>
          <Button variant="accent" size="sm" className="hidden sm:inline-flex" onClick={() => navigate("/dashboard")}>
            Start building
          </Button>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid size-11 place-items-center rounded-control text-ink-muted hover:text-ink md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="full" title="Menu" className="bg-bg">
          <div className="frame flex h-16 items-center">
            <Wordmark />
          </div>
          <nav aria-label="Menu" className="frame mt-6 flex flex-col">
            {LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="fg-in hairline-b flex min-h-16 items-center text-title font-semibold text-ink"
                style={{ "--i": i } as React.CSSProperties}
                data-visible=""
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="frame mt-8 flex flex-col gap-3">
            <Button variant="accent" size="lg" arrow onClick={() => navigate("/dashboard")}>
              Start building
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate("/dashboard")}>
              Sign in
            </Button>
          </div>
          <div className="frame mt-auto flex items-center justify-between pb-[max(1.5rem,env(safe-area-inset-bottom))] text-small text-ink-faint">
            <span>A form in a sentence.</span>
            <ThemeToggle />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
