import React from "react";

const TypingIndicator = () => {
  return (
    <div className="flex items-start max-w-[80%]">
      <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm text-gray-800">
        <div className="flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-100"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;