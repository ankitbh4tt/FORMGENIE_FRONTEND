import React from "react";

interface ChatMessageProps {
  isUser: boolean;
  content: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ isUser, content }) => {
  return (
    <div className={`flex items-start ${isUser ? "justify-end ml-auto" : ""} max-w-[80%]`}>
      <div
        className={`p-3 rounded-2xl shadow-sm text-${
          isUser ? "white" : "gray-800"
        } ${isUser ? "bg-gradient-to-r from-purple-600 to-pink-500 rounded-tr-none" : "bg-gray-100 rounded-tl-none"}`}
      >
        {content}
      </div>
    </div>
  );
};

export default ChatMessage;