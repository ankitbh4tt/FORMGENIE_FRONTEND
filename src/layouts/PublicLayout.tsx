import { Outlet, Link } from "react-router-dom";
import { Wordmark } from "@/components/common/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { installPreviewApi, isPreviewMode } from "@/dev/preview-api";

/**
 * Minimal chrome for respondents. A quiet brand bar, the form, and one honest
 * line at the foot. Nothing competes with the form.
 */
export default function PublicLayout() {
  if (isPreviewMode()) installPreviewApi();
  return (
    <div className="flex min-h-dvh flex-col bg-bg text-ink">
      <header className="flex h-14 shrink-0 items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex h-11 items-center rounded-control px-1" aria-label="FormGenie">
          <Wordmark />
        </Link>
        <ThemeToggle />
      </header>

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <footer className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 px-4 py-6 text-small text-ink-faint">
        <span>Made with</span>
        <Link to="/" className="link-quiet font-medium text-ink-muted">
          FormGenie
        </Link>
        <span aria-hidden="true">·</span>
        <Link to="/" className="link-quiet">
          Create your own form
        </Link>
      </footer>
    </div>
  );
}
