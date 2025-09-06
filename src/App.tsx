import { Outlet } from "react-router-dom";
import { Footer } from "./components/layout/Footer";
import { AppHeader } from "./components/layout/AppHeader";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <AppHeader />
      {/* Content */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
