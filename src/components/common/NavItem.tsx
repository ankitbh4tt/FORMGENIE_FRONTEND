import React from 'react';

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ href, children, className, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className={className || "text-slate-600 hover:text-violet-600 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-violet-600 after:transition-all after:duration-200 hover:after:w-full"}
  >
    {children}
  </a>
);
