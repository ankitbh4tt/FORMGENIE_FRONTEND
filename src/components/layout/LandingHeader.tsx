import React, { useState, useEffect, useRef } from "react";
import { Logo } from "../common/Logo";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export const LandingHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center relative">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
          <Logo />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600">
            FormGenie
          </span>
        </div>

        <nav>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors duration-200">
              Features
            </a>
            <a href="#benefits" className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors duration-200">
              Benefits
            </a>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2">
                  Login / Sign Up
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          <div className="md:hidden flex items-center space-x-2" ref={menuRef}>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors duration-200"
            >
              <span className="material-symbols-outlined">
                {isMobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className="absolute right-4 top-full mt-2 w-48 rounded-xl bg-white shadow-lg border border-slate-200 py-2 z-50 flex flex-col">
            <a
              href="#features"
              className="px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#benefits"
              className="px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Benefits
            </a>
            <hr className="my-1 border-slate-100" />
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  className="w-full text-left text-sm font-medium px-4 py-2.5 text-violet-600 hover:bg-violet-50 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login / Sign Up
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        )}
      </div>
    </header>
  );
};
