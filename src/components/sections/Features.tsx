import React from 'react';

export const Features: React.FC = () => (
  <section className="py-20 bg-white/30 backdrop-blur-sm">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How FormGenie Works</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Three simple steps to transform your form ideas into reality</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-6">
            <span className="material-symbols-outlined text-3xl">edit</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Describe Your Form</h3>
          <p className="text-gray-600">
            Simply tell FormGenie what kind of form you need. Use natural language to specify fields, validation, and design preferences.
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-6">
            <span className="material-symbols-outlined text-3xl">auto_awesome</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">2. AI Magic Happens</h3>
          <p className="text-gray-600">
            Our AI analyzes your requirements and generates a fully functional form with all the fields, validation, and styling you specified.
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-6">
            <span className="material-symbols-outlined text-3xl">landscape</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Deploy Instantly</h3>
          <p className="text-gray-600">
            Get your form instantly with embed code, direct link, or export options. Integrate with your favorite tools or use our hosting.
          </p>
        </div>
      </div>
    </div>
  </section>
);