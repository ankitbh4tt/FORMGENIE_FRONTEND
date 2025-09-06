import React from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import DividerMessage from "./DividerMessage";

const ChatPanel = () => {
  return (
    <div className="w-full max-h-[85vh] lg:w-1/2 lg:pr-4 flex flex-col mb-6 lg:mb-0">
      <div className="bg-white rounded-2xl shadow-lg flex-grow overflow-hidden flex flex-col border border-purple-100">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            AI Form Builder
          </h2>
          <p className="text-sm text-gray-500">Describe the form you want to create</p>
        </div>
        <div className="flex-grow p-4 overflow-y-auto space-y-4">
          <ChatMessage
            isUser={false}
            content="Hello! I'm your AI form assistant. Describe the form you'd like to create and I'll build it for you in real-time."
          />
          <ChatMessage
            isUser={true}
            content="I need a contact form with name, email, phone number and a message field."
          />
          <DividerMessage />
          <ChatMessage
            isUser={false}
            content="I've created a contact form with name, email, phone, and message fields. You can see it in the preview panel. Would you like to make any adjustments?"
          />
          <TypingIndicator />
        </div>
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatPanel;