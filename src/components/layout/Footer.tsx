import React from "react";
import { Logo } from "../common/Logo";
import { NavItem } from "../common/NavItem";

export const Footer: React.FC = () => (
  <footer className="bg-gradient-to-br from-slate-50 to-slate-100 border-t border-slate-200">
    <div className="container mx-auto px-4 py-16">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center space-x-2 mb-4">
            <Logo />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-purple-600">
              FormGenie
            </span>
          </div>
          <p className="text-slate-600 text-lg leading-relaxed mb-6 max-w-md">
            Create intelligent forms with AI assistance. Build, share, and
            collect responses effortlessly.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 hover:from-blue-200 hover:to-blue-300 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              title="Follow us on Twitter"
            >
              <span className="material-symbols-outlined text-xl">
                alternate_email
              </span>
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 hover:from-blue-200 hover:to-blue-300 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              title="Connect on LinkedIn"
            >
              <span className="material-symbols-outlined text-xl">work</span>
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center text-purple-600 hover:from-purple-200 hover:to-purple-300 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              title="Join our Discord"
            >
              <span className="material-symbols-outlined text-xl">chat</span>
            </a>
          </div>
        </div>

        {/* Product Links */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Product</h3>
          <div className="space-y-3">
            <NavItem
              href="#features"
              className="text-slate-600 hover:text-purple-600 transition-colors"
            >
              Features
            </NavItem>
            <NavItem
              href="#pricing"
              className="text-slate-600 hover:text-purple-600 transition-colors"
            >
              Pricing
            </NavItem>
            <NavItem
              href="#templates"
              className="text-slate-600 hover:text-purple-600 transition-colors"
            >
              Templates
            </NavItem>
            <NavItem
              href="#integrations"
              className="text-slate-600 hover:text-purple-600 transition-colors"
            >
              Integrations
            </NavItem>
          </div>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Support</h3>
          <div className="space-y-3">
            <NavItem
              href="#help"
              className="text-slate-600 hover:text-purple-600 transition-colors"
            >
              Help Center
            </NavItem>
            <NavItem
              href="#docs"
              className="text-slate-600 hover:text-purple-600 transition-colors"
            >
              Documentation
            </NavItem>
            <NavItem
              href="#contact"
              className="text-slate-600 hover:text-purple-600 transition-colors"
            >
              Contact Us
            </NavItem>
            <NavItem
              href="#status"
              className="text-slate-600 hover:text-purple-600 transition-colors"
            >
              Status
            </NavItem>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="pt-8 border-t border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
            <p className="text-slate-500 text-sm">
              © 2024 FormGenie. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <NavItem
                href="#privacy"
                className="text-slate-500 hover:text-purple-600 text-sm transition-colors"
              >
                Privacy Policy
              </NavItem>
              <NavItem
                href="#terms"
                className="text-slate-500 hover:text-purple-600 text-sm transition-colors"
              >
                Terms of Service
              </NavItem>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-slate-500 text-sm">
            <span className="material-symbols-outlined text-sm">favorite</span>
            <span>Made with love for form builders</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
