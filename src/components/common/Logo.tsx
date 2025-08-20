import React from 'react';

export const Logo: React.FC = () => (
  <div className="w-10 h-10 relative group">
    <svg
      className="w-full h-full transform group-hover:rotate-12 transition-transform duration-300"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18,4 C22,4 25,7 25,12 C25,17 22,20 18,20 L14,20 C10,20 7,17 7,12 C7,7 10,4 14,4 L18,4 Z" fill="#7c3aed" />
      <path d="M16,20 L16,28" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
      <path d="M12,28 L20,28" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="8" r="1" fill="white" className="animate-ping-slow opacity-70" />
      <path
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        d="M22,8 Q24,10 22,12"
        stroke="#7c3aed"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
    <div className="absolute -inset-1 bg-primary-500/20 rounded-full blur-md animate-pulse-slow"></div>
  </div>
);