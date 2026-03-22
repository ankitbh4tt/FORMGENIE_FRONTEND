import React from "react";
import { Button } from "../common/Button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/30 via-purple-50/20 to-slate-50/30"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 z-10 relative">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900"
            >
              Whisper Your Wish, <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600">
                FormGenie Makes it Real!
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-600 max-w-lg mx-auto md:mx-0"
            >
              Create your forms with AI magic-fast and tailored to you.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button onClick={handleClick}>
                Start Creating Now
                <span className="material-symbols-outlined ml-2 align-middle">
                  arrow_forward
                </span>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center md:justify-start gap-3"
            >
              <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm hover:shadow-md hover:bg-white/80 transition-all duration-200">
                <span className="material-symbols-outlined text-violet-600">
                  bolt
                </span>
                <span className="text-sm text-slate-700">Lightning Fast</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm hover:shadow-md hover:bg-white/80 transition-all duration-200">
                <span className="material-symbols-outlined text-violet-600">
                  auto_awesome
                </span>
                <span className="text-sm text-slate-700">AI Powered</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm hover:shadow-md hover:bg-white/80 transition-all duration-200">
                <span className="material-symbols-outlined text-violet-600">
                  code
                </span>
                <span className="text-sm text-slate-700">No-Code Required</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-6 flex items-center justify-center md:justify-start space-x-4"
            >
              <span className="text-slate-500 text-sm">
                Trusted by 10,000+ users
              </span>
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-medium text-blue-600">
                  JD
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-xs font-medium text-emerald-600">
                  KL
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-100 border-2 border-white flex items-center justify-center text-xs font-medium text-amber-600">
                  MN
                </div>
                <div className="w-8 h-8 rounded-full bg-violet-100 border-2 border-white flex items-center justify-center text-xs font-medium text-violet-600">
                  +7k
                </div>
              </div>
            </motion.div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-600/20 rounded-2xl blur-xl"></div>
              <motion.div
                className="relative bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-slate-200 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center text-white">
                    <span className="material-symbols-outlined">landscape</span>
                  </div>
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                  </div>
                </div>
                <div className="text-sm text-slate-600 mb-3">
                  Just describe your form...
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 mb-3">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    "I need a contact form with name, email, phone number and a
                    dropdown for services. Add a message box and GDPR consent
                    checkbox."
                  </p>
                </div>
                <div className="flex justify-end mb-4">
                  <button className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:from-violet-700 hover:to-purple-700 transition-all duration-200 flex items-center shadow-sm">
                    <span className="material-symbols-outlined mr-1 text-sm align-middle">
                      auto_awesome
                    </span>
                    Generate Form
                  </button>
                </div>
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="h-8 bg-slate-100 rounded-lg w-3/4 animate-pulse"
                  ></motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="h-8 bg-slate-100 rounded-lg w-full animate-pulse"
                  ></motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="h-8 bg-slate-100 rounded-lg w-5/6 animate-pulse"
                  ></motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="h-20 bg-slate-100 rounded-lg w-full animate-pulse"
                  ></motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    className="h-10 bg-gradient-to-r from-violet-100 to-purple-100 rounded-lg w-1/3 ml-auto animate-pulse"
                  ></motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
