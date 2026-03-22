import React from "react";
import { Logo } from "../common/Logo";

export const Footer: React.FC = () => (
  <footer className="bg-gradient-to-br from-slate-50 to-slate-100 border-t border-slate-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center space-x-2 mb-4">
            <Logo />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600">
              FormGenie
            </span>
          </div>
          <p className="text-slate-600 text-lg leading-relaxed mb-6 max-w-md">
            Create intelligent forms with AI assistance. Build, share, and
            collect responses effortlessly.
          </p>
          <div className="flex space-x-3">
            <a
              href="#"
              className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-violet-100 hover:text-violet-600 transition-all duration-200"
              title="Follow us on Twitter"
            >
              <span className="material-symbols-outlined text-lg">
                alternate_email
              </span>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-violet-100 hover:text-violet-600 transition-all duration-200"
              title="Connect on LinkedIn"
            >
              <span className="material-symbols-outlined text-lg">work</span>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-violet-100 hover:text-violet-600 transition-all duration-200"
              title="Join our Discord"
            >
              <span className="material-symbols-outlined text-lg">chat</span>
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">Product</h3>
          <div className="space-y-3 flex flex-col">
            <a href="#features" className="text-slate-600 hover:text-violet-600 transition-colors duration-200 text-sm">Features</a>
            <a href="#pricing" className="text-slate-600 hover:text-violet-600 transition-colors duration-200 text-sm">Pricing</a>
            <a href="#templates" className="text-slate-600 hover:text-violet-600 transition-colors duration-200 text-sm">Templates</a>
            <a href="#integrations" className="text-slate-600 hover:text-violet-600 transition-colors duration-200 text-sm">Integrations</a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">Support</h3>
          <div className="space-y-3 flex flex-col">
            <a href="#help" className="text-slate-600 hover:text-violet-600 transition-colors duration-200 text-sm">Help Center</a>
            <a href="#docs" className="text-slate-600 hover:text-violet-600 transition-colors duration-200 text-sm">Documentation</a>
            <a href="#contact" className="text-slate-600 hover:text-violet-600 transition-colors duration-200 text-sm">Contact Us</a>
            <a href="#status" className="text-slate-600 hover:text-violet-600 transition-colors duration-200 text-sm">Status</a>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
            <p className="text-slate-500 text-sm">
              &copy; 2024 FormGenie. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#privacy" className="text-slate-500 hover:text-violet-600 text-sm transition-colors duration-200">Privacy Policy</a>
              <a href="#terms" className="text-slate-500 hover:text-violet-600 text-sm transition-colors duration-200">Terms of Service</a>
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
