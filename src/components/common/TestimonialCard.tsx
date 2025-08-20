import React from 'react';

interface TestimonialCardProps {
  name: string;
  title: string;
  quote: string;
  rating: number;
  initials: string;
  color: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, title, quote, rating, initials, color }) => (
  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
    <div className="flex items-center mb-4">
      <div className={`w-12 h-12 rounded-full bg-${color}-100 flex items-center justify-center text-${color}-600 font-semibold`}>
        {initials}
      </div>
      <div className="ml-4">
        <h4 className="font-semibold text-gray-900">{name}</h4>
        <p className="text-gray-500 text-sm">{title}</p>
      </div>
    </div>
    <p className="text-gray-600 mb-4">{quote}</p>
    <div className="flex text-yellow-400">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className="material-symbols-outlined">{i < rating ? 'star' : i + 0.5 === rating ? 'star_half' : 'star'}</span>
      ))}
    </div>
  </div>
);