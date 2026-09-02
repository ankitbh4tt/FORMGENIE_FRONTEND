import { Outlet } from "react-router-dom";

/** The paper canvas for public marketing pages. The landing page owns its own header and footer. */
export default function MarketingLayout() {
  return (
    <div className="min-h-dvh bg-bg text-ink">
      <a href="#main" className="sr-only-focusable fixed left-3 top-3 z-[60] rounded-control bg-ink px-3 py-2 text-small text-bg">
        Skip to content
      </a>
      <Outlet />
    </div>
  );
}
