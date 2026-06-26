import { Toaster, ToastBar, toast } from "react-hot-toast";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

/**
 * Single styled toast host for the whole app. react-hot-toast was already in
 * use across the codebase but no <Toaster/> was ever mounted, so toasts never
 * rendered. This wires it up with Editorial Paper styling + token colors.
 */
export function ToastHost() {
  return (
    <Toaster
      position="bottom-right"
      gutter={10}
      toastOptions={{
        duration: 3800,
        style: {
          background: "var(--surface-raised)",
          color: "var(--ink)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)",
          padding: "10px 12px",
          fontSize: "14px",
          fontWeight: 500,
          maxWidth: "380px",
        },
        success: { iconTheme: { primary: "var(--success)", secondary: "var(--surface)" } },
        error: { iconTheme: { primary: "var(--danger)", secondary: "var(--surface)" } },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <div className="flex items-center gap-2.5">
              <span className="flex shrink-0 items-center">
                {t.type === "success" ? (
                  <CheckCircle2 className="size-[18px] text-success" />
                ) : t.type === "error" ? (
                  <AlertCircle className="size-[18px] text-danger" />
                ) : (
                  icon
                )}
              </span>
              <span className="leading-snug">{message}</span>
              {t.type !== "loading" && (
                <button
                  onClick={() => toast.dismiss(t.id)}
                  aria-label="Dismiss"
                  className="ml-1 grid size-6 shrink-0 place-items-center rounded-md text-ink-faint transition-colors hover:bg-surface-sunken hover:text-ink"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}
