import React from "react";

export interface ValueCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color?: "blue" | "green" | "purple" | "slate" | "amber" | "rose";
}

const colorMap = {
  blue: { bg: "bg-blue-100", text: "text-blue-600" },
  green: { bg: "bg-emerald-100", text: "text-emerald-600" },
  purple: { bg: "bg-violet-100", text: "text-violet-600" },
  slate: { bg: "bg-slate-100", text: "text-slate-600" },
  amber: { bg: "bg-amber-100", text: "text-amber-600" },
  rose: { bg: "bg-rose-100", text: "text-rose-600" },
} as const;

export const ValueCard: React.FC<ValueCardProps> = ({
  title,
  description,
  icon,
  color = "blue",
}) => {
  const colors = colorMap[color];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-slate-100 flex flex-col">
      <div
        className={`w-12 h-12 rounded-xl mb-5 flex items-center justify-center ${colors.bg} ${colors.text}`}
      >
        {icon}
      </div>
      <h3 className="font-semibold text-slate-900 text-lg mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
};
