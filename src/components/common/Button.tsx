import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, className, href }) => {
  const baseStyles = 'px-8 py-4 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-1';
  const gradientStyles = 'bg-gradient-to-r from-rose-500 to-purple-600 text-white hover:from-rose-600 hover:to-purple-700 hover:shadow-xl';

  return href ? (
    <a href={href} className={`${baseStyles} ${gradientStyles} ${className || ''}`}>
      {children}
    </a>
  ) : (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseStyles} ${gradientStyles} ${className || ''}`}
    >
      {children}
    </motion.button>
  );
};