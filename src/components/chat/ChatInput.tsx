import React from "react";

const ChatInput = () => {
  return (
    <div className="p-4 border-t border-gray-100">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Describe the form you want..."
          className="flex-grow px-4 py-3 rounded-l-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
        <button className="p-3 rounded-r-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 transition-all">
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;