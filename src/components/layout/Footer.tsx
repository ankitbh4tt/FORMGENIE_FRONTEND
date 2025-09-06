import React from 'react';
import { Logo } from '../common/Logo';
import { NavItem } from '../common/NavItem';

export const Footer: React.FC = () => (
  <footer className="bg-gray-50 py-12 border-t border-gray-100 ">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-6 md:mb-0">
          <Logo />
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-purple-600">
            FormGenie
          </span>
        </div>
        <div className="flex space-x-6 mb-6 md:mb-0">
          <NavItem href="#">Terms</NavItem>
          <NavItem href="#">Privacy</NavItem>
          <NavItem href="#">Help</NavItem>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-100 hover:text-primary-600 transition-all duration-300">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-100 hover:text-primary-600 transition-all duration-300">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
);