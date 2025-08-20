import React from 'react';
import { Header } from './layout/Header';
import { Hero } from './sections/Hero';
import { Features } from './sections/Features';
import { Testimonials } from './sections/Testimonials';
import { CtaSection } from './sections/CtaSection';
import { Footer } from './layout/Footer';

export const LandingPage: React.FC = () => {
  return (
    <div id="webcrumbs" className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute h-32 w-32 rounded-full bg-primary-300/20 blur-xl animate-float left-1/4 top-1/4"></div>
        <div className="absolute h-24 w-24 rounded-full bg-purple-300/20 blur-xl animate-float-delay left-3/4 top-1/3"></div>
        <div className="absolute h-40 w-40 rounded-full bg-blue-300/20 blur-xl animate-float-slow left-1/2 top-2/3"></div>
        <div className="absolute h-36 w-36 rounded-full bg-teal-300/20 blur-xl animate-float-delay left-1/5 top-2/3"></div>
        <div className="absolute h-28 w-28 rounded-full bg-pink-300/20 blur-xl animate-float-slow left-4/5 top-1/5"></div>
      </div>

      {/* Doodles */}
      <div className="absolute top-20 left-10 w-16 h-16 rotate-12 opacity-10 animate-spin-slow pointer-events-none">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M30,10 Q50,5 70,10 Q95,15 90,40 Q85,65 70,80 Q55,95 30,90 Q5,85 10,60 Q15,35 30,10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="absolute bottom-20 right-10 w-20 h-20 -rotate-12 opacity-10 animate-bounce-slow pointer-events-none">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          <path d="M30,40 L70,60 M30,60 L70,40" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute top-1/3 right-20 w-24 h-24 rotate-45 opacity-10 animate-float-slow pointer-events-none">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M20,20 L80,20 L80,80 L20,80 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M35,50 L65,50 M50,35 L50,65" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <CtaSection />
      <Footer />
    </div>
  );
};