import React from 'react';

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  className?: string;  // Add this line
  onClick?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ href, children }) => (
  <a
    href={href}
    className="text-gray-700 hover:text-primary-600 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-600 after:transition-all after:duration-300 hover:after:w-full"
  >
    {children}
  </a>
);