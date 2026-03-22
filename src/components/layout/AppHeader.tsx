import React, { useState, useEffect, useRef } from "react";
import { Logo } from "../common/Logo";
import { UserButton } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";

export const AppHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  const isActivePath = (path: string) => {
    if (path === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(path);
  };

  const handleNav = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const navLinkClass = (path: string) =>
    `text-sm font-medium transition-colors duration-200 cursor-pointer ${
      isActivePath(path)
        ? "text-violet-600"
        : "text-slate-600 hover:text-violet-600"
    }`;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center relative">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => handleNav("/dashboard")}
        >
          <Logo />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600">
            FormGenie
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <button onClick={() => handleNav("/dashboard")} className={navLinkClass("/dashboard")}>
            Dashboard
          </button>
          <button onClick={() => handleNav("/forms")} className={navLinkClass("/forms")}>
            My Forms
          </button>
          <button onClick={() => handleNav("/responses")} className={navLinkClass("/responses")}>
            Responses
          </button>

          <button
            onClick={() => handleNav("/builder")}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
          >
            + New Form
          </button>

          <UserButton afterSignOutUrl="/" />
        </nav>

        <div className="md:hidden flex items-center space-x-2" ref={menuRef}>
          <UserButton afterSignOutUrl="/" />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors duration-200"
          >
            <span className="material-symbols-outlined">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>

          {isMobileMenuOpen && (
            <div className="absolute right-4 top-full mt-2 w-48 rounded-xl bg-white shadow-lg border border-slate-200 py-2 z-50 flex flex-col">
              <button
                onClick={() => handleNav("/dashboard")}
                className={`px-4 py-2.5 text-left text-sm font-medium transition-colors duration-200 ${
                  isActivePath("/dashboard") ? "text-violet-600 bg-violet-50" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => handleNav("/forms")}
                className={`px-4 py-2.5 text-left text-sm font-medium transition-colors duration-200 ${
                  isActivePath("/forms") ? "text-violet-600 bg-violet-50" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                My Forms
              </button>
              <button
                onClick={() => handleNav("/responses")}
                className={`px-4 py-2.5 text-left text-sm font-medium transition-colors duration-200 ${
                  isActivePath("/responses") ? "text-violet-600 bg-violet-50" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                Responses
              </button>
              <hr className="my-1 border-slate-100" />
              <button
                onClick={() => handleNav("/builder")}
                className="px-4 py-2.5 text-left text-sm font-medium text-violet-600 hover:bg-violet-50 transition-colors duration-200"
              >
                + New Form
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
