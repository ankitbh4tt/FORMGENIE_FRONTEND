import React from 'react';
import { Logo } from '../common/Logo';
import { NavItem } from '../common/NavItem';

export const Header: React.FC = () => (
  <header className="absolute top-0 left-0 w-full z-50 bg-white/5 backdrop-blur-md border-b border-white/10">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Logo />
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-purple-600">
          FormGenie
        </span>
      </div>
      <nav>
        <div className="hidden md:flex items-center space-x-6">
          <NavItem href="#features">Features</NavItem>
          <NavItem href="#testimonials">Testimonials</NavItem>
          <a
            href="/login"
            className="px-5 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-gray-700 hover:shadow-md hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-0.5 hover:text-primary-600"
          >
            Login
          </a>
          <button className="px-5 py-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
            Sign Up Free
          </button>
        </div>
        <div className="md:hidden">
          <details className="relative">
            <summary className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gray-700 hover:bg-white/20 transition-colors duration-300 list-none">
              <span className="material-symbols-outlined">menu</span>
            </summary>
            <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-gray-100 py-2 z-50">
              <NavItem href="#features">Features</NavItem>
              <NavItem href="#testimonials">Testimonials</NavItem>
              <a href="/login" className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600">
                Login
              </a>
              <a href="/signup" className="block px-4 py-2 font-medium text-primary-600 hover:bg-primary-50">
                Sign Up Free
              </a>
            </div>
          </details>
        </div>
      </nav>
    </div>
  </header>
);