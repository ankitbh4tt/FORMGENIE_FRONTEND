import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/inter";
import "@fontsource-variable/fraunces";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ClerkProvider } from "@clerk/clerk-react";
import { ThemeProvider } from "./lib/theme";
import { ToastHost } from "./components/ui/Toast";

// Import your Publishable Key
const ENV_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Clerk's well-known example/dummy publishable key. It lets ClerkProvider mount
// (so Clerk hooks like useUser work and report a signed-out state) without a
// real Clerk project — handy for local testing.
const DEV_FALLBACK_KEY = "pk_test_ZXhhbXBsZS5jbGVyay5hY2NvdW50cy5kZXYk";

// In production we still require a real key. In dev, fall back to the dummy key
// so the app can be tested without Clerk configured.
if (!ENV_KEY && import.meta.env.PROD) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

if (!ENV_KEY) {
  console.warn(
    "[dev] VITE_CLERK_PUBLISHABLE_KEY is missing — using a dummy Clerk key. Auth will not work."
  );
}

const PUBLISHABLE_KEY = ENV_KEY || DEV_FALLBACK_KEY;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <RouterProvider router={router} />
        <ToastHost />
      </ClerkProvider>
    </ThemeProvider>
  </React.StrictMode>
);
