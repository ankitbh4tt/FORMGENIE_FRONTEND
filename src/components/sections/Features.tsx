import React from 'react';

export const Features: React.FC = () => (
  <section id="features" className="py-20 bg-white/30 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How FormGenie Works</h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Three simple steps to transform your form ideas into reality</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-slate-100 hover:-translate-y-0.5">
          <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 mb-6">
            <span className="material-symbols-outlined text-2xl">edit</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">1. Describe Your Form</h3>
          <p className="text-slate-600 leading-relaxed">
            Simply tell FormGenie what kind of form you need. Use natural language to specify fields, validation, and design preferences.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-slate-100 hover:-translate-y-0.5">
          <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 mb-6">
            <span className="material-symbols-outlined text-2xl">auto_awesome</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">2. AI Magic Happens</h3>
          <p className="text-slate-600 leading-relaxed">
            Our AI analyzes your requirements and generates a fully functional form with all the fields, validation, and styling you specified.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-slate-100 hover:-translate-y-0.5">
          <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 mb-6">
            <span className="material-symbols-outlined text-2xl">landscape</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">3. Deploy Instantly</h3>
          <p className="text-slate-600 leading-relaxed">
            Get your form instantly with embed code, direct link, or export options. Integrate with your favorite tools or use our hosting.
          </p>
        </div>
      </div>
    </div>
  </section>
);
