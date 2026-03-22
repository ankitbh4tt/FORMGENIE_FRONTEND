import React from 'react';

interface TestimonialCardProps {
  name: string;
  title: string;
  quote: string;
  rating: number;
  initials: string;
  color: 'blue' | 'green' | 'purple';
}

const colorMap = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
  green: { bg: 'bg-emerald-100', text: 'text-emerald-600' },
  purple: { bg: 'bg-violet-100', text: 'text-violet-600' },
} as const;

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, title, quote, rating, initials, color }) => {
  const colors = colorMap[color];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 border border-slate-100">
      <div className="flex items-center mb-4">
        <div className={`w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center ${colors.text} font-semibold`}>
          {initials}
        </div>
        <div className="ml-4">
          <h4 className="font-semibold text-slate-800">{name}</h4>
          <p className="text-slate-500 text-sm">{title}</p>
        </div>
      </div>
      <p className="text-slate-600 mb-4 leading-relaxed">{quote}</p>
      <div className="flex text-amber-400">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className="material-symbols-outlined text-lg">
            {i < Math.floor(rating) ? 'star' : i + 0.5 === rating ? 'star_half' : 'star_outline'}
          </span>
        ))}
      </div>
    </div>
  );
};
