"use client";

import { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "../ui/TypingIndicator";

const ChatPanel = ({
  messages,
  onSendMessage,
  isLoading,
  inputValue,
  setInputValue,
}) => {
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden flex-1 max-h-full">
      <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-white to-slate-50 flex justify-between items-start">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-1 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI Form Builder
          </h2>
          <p className="text-slate-600 text-sm">
            Describe the form you want to create
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              isLoading ? "bg-amber-500 animate-pulse" : "bg-emerald-500"
            }`}
          ></div>
          <span className="text-xs text-slate-600 font-medium">
            {isLoading ? "Generating..." : "Ready"}
          </span>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 min-h-0">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isLoading && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6 border-t border-slate-100 bg-white"
      >
        <div className="flex items-end gap-3 mb-4">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe the form you want to create..."
            className="flex-1 p-4 border-2 border-slate-200 rounded-2xl text-sm resize-none transition-all duration-200 font-inherit min-h-[48px] max-h-[120px] focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed"
            rows="1"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 border-0 rounded-xl text-white cursor-pointer transition-all duration-200 flex items-center justify-center min-w-[48px] h-12 hover:transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span className="material-symbols-outlined text-xl">
              {isLoading ? "hourglass_empty" : "send"}
            </span>
          </button>
        </div>

        {!messages.some((m) => m.type === "user") && (
          <div className="mt-2">
            <div className="flex gap-2 flex-wrap">
              <button
                type="button"
                onClick={() =>
                  setInputValue(
                    "Create a contact form with name, email, and message"
                  )
                }
                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-600 cursor-pointer transition-all duration-200 hover:bg-slate-100 hover:border-purple-500 hover:text-purple-600"
              >
                Contact Form
              </button>
              <button
                type="button"
                onClick={() =>
                  setInputValue(
                    "Build a survey with multiple choice and rating questions"
                  )
                }
                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-600 cursor-pointer transition-all duration-200 hover:bg-slate-100 hover:border-purple-500 hover:text-purple-600"
              >
                Survey Form
              </button>
              <button
                type="button"
                onClick={() =>
                  setInputValue(
                    "Make a registration form with personal details"
                  )
                }
                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-600 cursor-pointer transition-all duration-200 hover:bg-slate-100 hover:border-purple-500 hover:text-purple-600"
              >
                Registration Form
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ChatPanel;
