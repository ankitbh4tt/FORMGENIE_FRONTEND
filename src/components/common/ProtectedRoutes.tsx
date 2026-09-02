import { SignIn, useUser } from "@clerk/clerk-react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { Wordmark } from "@/components/common/Logo";
import { ComposeLine } from "@/components/motion/ComposeLine";
import { FormRenderer } from "@/components/form-fields/FormRenderer";
import { useTheme } from "@/lib/theme";
import type { FormField } from "@/components/form-fields/types";
import { installPreviewApi, isPreviewMode } from "@/dev/preview-api";

type ProtectedRouteProps = {
  children?: React.ReactNode;
};

const EXAMPLE: FormField[] = [
  { label: "Your name", type: "text", required: true },
  { label: "Email address", type: "email", required: true },
  { label: "How can we help?", type: "select", options: ["A question", "A quote", "Something else"] },
];

/**
 * The door. Signing in still looks like FormGenie: the same paper, the same
 * statement, a small real form beside the sign-in so the product is in view
 * before the first click.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();
  const location = useLocation();
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  // Development only: look at the app against a fake backend without an account.
  if (isPreviewMode()) {
    installPreviewApi();
    return <>{children || <Outlet />}</>;
  }

  if (!isLoaded) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-bg px-6">
        <ComposeLine active states={["Opening your workspace"]} label="Loading" duration={1800} />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="grid min-h-dvh bg-bg lg:grid-cols-[1.05fr_1fr]">
        <aside className="hidden flex-col justify-between border-r border-border bg-surface-sunken/50 px-[var(--spacing-gutter)] py-10 lg:flex">
          <Link to="/" className="flex h-11 w-fit items-center rounded-control" aria-label="FormGenie home">
            <Wordmark />
          </Link>

          <div className="max-w-[34rem]">
            <p className="font-display text-statement text-ink">
              <span className="block">Describe the form.</span>
              <span className="block">It takes shape.</span>
            </p>
            <p className="mt-4 max-w-[40ch] text-lead text-ink-muted">
              Write what you need in plain language, publish in a click, and read every answer in one calm place.
            </p>
            <div className="sheet mt-10 max-w-md p-6" aria-hidden="true">
              <p className="font-display text-h2 text-ink">Get in touch</p>
              <div className="mt-5">
                <FormRenderer schema={EXAMPLE} values={{}} disabled animate={false} idPrefix="signin-example" compact />
              </div>
            </div>
          </div>

          <p className="text-small text-ink-faint">© {new Date().getFullYear()} FormGenie. A portfolio project.</p>
        </aside>

        <main className="flex flex-col items-center justify-center px-4 py-10">
          <Link to="/" className="mb-8 flex h-11 items-center lg:hidden" aria-label="FormGenie home">
            <Wordmark />
          </Link>
          <SignIn
            fallbackRedirectUrl={`${location.pathname}${location.search}`}
            appearance={{
              variables: {
                colorPrimary: dark ? "#7f93f6" : "#2b4acb",
                colorBackground: dark ? "#201e1a" : "#ffffff",
                colorText: dark ? "#f5f2ec" : "#1a1a17",
                colorTextSecondary: dark ? "#aaa49a" : "#625e57",
                colorInputBackground: dark ? "#1c1a15" : "#ffffff",
                colorInputText: dark ? "#f5f2ec" : "#1a1a17",
                colorNeutral: dark ? "#f5f2ec" : "#1a1a17",
                fontFamily: "'Inter Variable', ui-sans-serif, system-ui, sans-serif",
                borderRadius: "8px",
              },
              elements: {
                cardBox: "shadow-sheet border border-border rounded-sheet",
                card: "shadow-none",
                footer: "border-t border-border",
              },
            }}
          />
        </main>
      </div>
    );
  }

  return <>{children || <Outlet />}</>;
};

export default ProtectedRoute;
