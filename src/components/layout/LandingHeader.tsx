import React, { useState } from "react";
import { Logo } from "../common/Logo";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

// The new, cleaned-up NavLink component.
const NavLink = ({ href, children, onClick, className }: { href: string; children: React.ReactNode; onClick?: () => void; className?: string }) => (
  <a href={href} onClick={onClick} className={className}>
    {children}
  </a>
);

export const LandingHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center relative">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
          <Logo />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-purple-600">
            FormGenie
          </span>
        </div>

        {/* Navigation */}
        <nav>
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="#features" className="text-gray-700 hover:text-purple-600 transition-colors">
              Features
            </NavLink>
            <NavLink href="#testimonials" className="text-gray-700 hover:text-purple-600 transition-colors">
              Testimonials
            </NavLink>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-5 py-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                  Login / Sign Up
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Mobile Menu Toggle and User Button */}
          <div className="md:hidden flex items-center space-x-2">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <button
              onClick={toggleMobileMenu}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gray-700 hover:bg-white/20 transition-colors duration-300"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </nav>

        {/* Mobile Menu Popover */}
        {isMobileMenuOpen && (
          <div className="absolute right-4 top-full mt-2 w-48 rounded-lg bg-white shadow-xl border border-gray-200 py-2 z-50 flex flex-col space-y-2">
            <NavLink
              href="#features"
              className="px-4 py-2 font-medium text-gray-800 hover:bg-gray-100 transition-colors duration-150"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </NavLink>
            <NavLink
              href="#testimonials"
              className="px-4 py-2 font-medium text-gray-800 hover:bg-gray-100 transition-colors duration-150"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </NavLink>
            <hr className="my-1 border-gray-100" />
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  className="block w-full text-left font-medium px-4 py-2 text-primary-600 hover:bg-gray-100 transition-colors"
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