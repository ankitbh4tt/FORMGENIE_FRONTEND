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

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <RouterProvider router={router} />
        <ToastHost />
      </ClerkProvider>
    </ThemeProvider>
    {/* A very light paper tooth over the whole interface. Fixed and static. */}
    <div className="paper-tooth" aria-hidden="true" />
  </React.StrictMode>
);
