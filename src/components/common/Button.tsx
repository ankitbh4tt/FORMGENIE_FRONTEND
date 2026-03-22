import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, className, href }) => {
  const baseStyles = 'px-8 py-4 rounded-xl font-semibold shadow-md transition-all duration-200 transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2';
  const gradientStyles = 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 hover:shadow-lg';

  return href ? (
    <a href={href} className={`${baseStyles} ${gradientStyles} ${className || ''}`}>
      {children}
    </a>
  ) : (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${baseStyles} ${gradientStyles} ${className || ''}`}
    >
      {children}
    </motion.button>
  );
};
