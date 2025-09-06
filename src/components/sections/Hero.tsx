import React from 'react';
import { Button } from '../common/Button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
    const navigate = useNavigate();
  const handleClick = () => {
    navigate('/dashboard');
  };

  return (
    <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-fuchsia-50/30 to-purple-100/30 animate-gradient-x"></div>
      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900"
            >
              Whisper Your Wish, <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-purple-600">
                FormGenie Makes it Real!
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-lg mx-auto md:mx-0"
            >
              Create your forms with AI magic—fast and tailored to you.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button onClick={handleClick} className="animate-pulse bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white hover:from-fuchsia-600 hover:to-purple-700 transition-all duration-300">
                Start Creating Now
                <span className="material-symbols-outlined ml-2 align-middle group-hover:translate-x-1 transition-transform duration-300">
                  arrow_forward
                </span>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center md:justify-start gap-4"
            >
              <div className="flex items-center space-x-2 bg-white/40 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md hover:bg-white/60 transition-all duration-300 transform hover:-translate-y-0.5">
                <span className="material-symbols-outlined text-purple-600">bolt</span>
                <span className="text-sm text-gray-700">Lightning Fast</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/40 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md hover:bg-white/60 transition-all duration-300 transform hover:-translate-y-0.5">
                <span className="material-symbols-outlined text-purple-600">auto_awesome</span>
                <span className="text-sm text-gray-700">AI Powered</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/40 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md hover:bg-white/60 transition-all duration-300 transform hover:-translate-y-0.5">
                <span className="material-symbols-outlined text-purple-600">code</span>
                <span className="text-sm text-gray-700">No-Code Required</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-6 flex items-center justify-center md:justify-start space-x-4"
            >
              <span className="text-gray-500 text-sm">Trusted by 10,000+ users</span>
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-medium text-blue-600">
                  JD
                </div>
                <div className="w-8 h-8 rounded-full bg-green-100 border-2 border-white flex items-center justify-center text-xs font-medium text-green-600">
                  KL
                </div>
                <div className="w-8 h-8 rounded-full bg-yellow-100 border-2 border-white flex items-center justify-center text-xs font-medium text-yellow-600">
                  MN
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center text-xs font-medium text-purple-600">
                  +7k
                </div>
              </div>
            </motion.div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/30 to-purple-600/30 rounded-3xl blur-xl animate-pulse-slow"></div>
              <motion.div
                className="relative bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-purple-200 transform hover:rotate-1 hover:scale-102 transition-all duration-500 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                    <span className="material-symbols-outlined">landscape</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse delay-100"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse delay-200"></div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-3">Just describe your form...</div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-3">
                  <p className="text-gray-600">
                    "I need a contact form with name, email, phone number and a dropdown for services. Add a message box
                    and GDPR consent checkbox."
                  </p>
                </div>
                <div className="flex justify-end mb-4">
                  <button className="px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white rounded-lg hover:from-fuchsia-600 hover:to-purple-700 transition-all duration-300 flex items-center">
                    <span className="material-symbols-outlined mr-1 text-sm align-middle">auto_awesome</span>
                    Generate Form
                  </button>
                </div>
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="h-8 bg-gray-100 rounded-md w-3/4 animate-pulse"
                  ></motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="h-8 bg-gray-100 rounded-md w-full animate-pulse"
                  ></motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="h-8 bg-gray-100 rounded-md w-5/6 animate-pulse"
                  ></motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="h-20 bg-gray-100 rounded-md w-full animate-pulse"
                  ></motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    className="h-10 bg-gradient-to-r from-fuchsia-100 to-purple-100 rounded-md w-1/3 ml-auto animate-pulse"
                  ></motion.div>
                </div>
                <div className="absolute -right-3 -bottom-3 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-float-slow">
                  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#7c3aed" strokeWidth="1" strokeDasharray="5,3" />
                    <path d="M35,45 L65,45 L65,75 L35,75 Z" fill="none" stroke="#7c3aed" strokeWidth="1" />
                    <path d="M40,55 L60,55 M40,65 L60,65" stroke="#7c3aed" strokeWidth="1" />
                    <path d="M45,35 C45,25 55,25 55,35" stroke="#7c3aed" strokeWidth="1" fill="none" />
                  </svg>
                </div>
                <div className="absolute -right-6 -bottom-6 w-20 h-20 opacity-80 animate-float">
                  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z" fill="none" stroke="#7c3aed" strokeWidth="1" />
                    <path d="M50,20 C65,20 80,35 80,50 C80,65 65,80 50,80 C35,80 20,65 20,50 C20,35 35,20 50,20 Z" fill="none" stroke="#7c3aed" strokeWidth="1" />
                    <path d="M50,30 C60,30 70,40 70,50 C70,60 60,70 50,70 C40,70 30,60 30,50 C30,40 40,30 50,30 Z" fill="none" stroke="#7c3aed" strokeWidth="1" />
                    <path d="M40,50 L60,50 M50,40 L50,60" stroke="#7c3aed" strokeWidth="2" />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};