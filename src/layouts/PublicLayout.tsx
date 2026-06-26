import { Outlet, Link } from "react-router-dom";
import { Wordmark } from "@/components/common/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/**
 * Minimal chrome for public form respondents (/form/:id). No app navigation —
 * just a quiet brand bar and a trust footer, so the form itself is the focus.
 */
export default function PublicLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-bg text-ink">
      <header className="flex h-14 shrink-0 items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="rounded-lg px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Wordmark />
        </Link>
        <ThemeToggle />
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="flex items-center justify-center gap-1.5 py-6 text-xs text-ink-faint">
        <span>Made with</span>
        <Link to="/" className="font-medium text-ink-muted hover:text-ink">
          FormGenie
        </Link>
      </footer>
    </div>
  );
}
