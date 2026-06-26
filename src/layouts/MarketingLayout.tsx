import { Outlet } from "react-router-dom";

/**
 * Wrapper for public marketing pages. The landing page owns its own header
 * and footer (see components/marketing), so this is intentionally minimal —
 * it just establishes the paper canvas.
 */
export default function MarketingLayout() {
  return (
    <div className="min-h-dvh bg-bg text-ink">
      <Outlet />
    </div>
  );
}
