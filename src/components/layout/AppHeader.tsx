import React, { useState } from "react";
import { Logo } from "../common/Logo";
import { UserButton } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";

// Enhanced NavLink with active state detection
const NavLink = ({
  href,
  children,
  onClick,
  className,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
}) => (
  <a
    href={href}
    onClick={onClick}
    className={`transition-colors ${
      isActive
        ? "text-purple-600 font-semibold"
        : "text-gray-700 hover:text-purple-600"
    } ${className}`}
  >
    {children}
  </a>
);

export const AppHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Helper function to check if a path is active
  const isActivePath = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center relative">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <Logo />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-purple-600">
            FormGenie
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink href="/dashboard" isActive={isActivePath("/dashboard")}>
            Dashboard
          </NavLink>
          <NavLink href="/forms" isActive={isActivePath("/forms")}>
            My Forms
          </NavLink>
          <NavLink href="/responses" isActive={isActivePath("/responses")}>
            Responses
          </NavLink>

          {/* CTA Button */}
          <button
            onClick={() => navigate("/builder")}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            + New Form
          </button>

          {/* User Avatar */}
          <UserButton afterSignOutUrl="/" />
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center space-x-2">
          <UserButton afterSignOutUrl="/" />
          <button
            onClick={toggleMobileMenu}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gray-700 hover:bg-white/20 transition-colors duration-300"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>

        {/* Mobile Menu Popover */}
        {isMobileMenuOpen && (
          <div className="absolute right-4 top-full mt-2 w-48 rounded-lg bg-white shadow-xl border border-gray-200 py-2 z-50 flex flex-col space-y-2">
            <NavLink
              href="/dashboard"
              className="px-4 py-2 font-medium text-gray-800 hover:bg-gray-100"
              isActive={isActivePath("/dashboard")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </NavLink>
            <NavLink
              href="/forms"
              className="px-4 py-2 font-medium text-gray-800 hover:bg-gray-100"
              isActive={isActivePath("/forms")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Forms
            </NavLink>
            <NavLink
              href="/responses"
              className="px-4 py-2 font-medium text-gray-800 hover:bg-gray-100"
              isActive={isActivePath("/responses")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Responses
            </NavLink>
            <hr className="my-1 border-gray-100" />
            <button
              onClick={() => {
                navigate("/builder");
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left font-medium px-4 py-2 text-purple-600 hover:bg-gray-100 transition-colors"
            >
              + New Form
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
