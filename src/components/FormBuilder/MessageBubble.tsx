interface Message {
  id: number | string;
  type: string;
  content: string;
  timestamp: Date;
  isError?: boolean;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  if (message.type === "divider") {
    return (
      <div className="flex items-center my-6 gap-4 animate-in fade-in duration-300">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <span className="text-xs text-purple-600 font-medium px-3 py-1 bg-slate-50 border border-slate-200 rounded-xl">
          {message.content}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      </div>
    );
  }

  return (
    <div
      className={`max-w-[80%] mb-2 animate-in slide-in-from-left duration-300 ${
        message.type === "assistant" ? "self-start" : "self-end ml-auto"
      }`}
    >
      <div
        className={`px-5 py-4 rounded-2xl text-sm leading-relaxed break-words ${
          message.type === "assistant"
            ? message.isError
              ? "bg-red-50 text-red-600 border border-red-200"
              : "bg-slate-50 text-slate-800 rounded-bl-md border border-slate-200"
            : "bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-md shadow-lg shadow-purple-500/30"
        }`}
      >
        {message.content}
      </div>
      <div
        className={`text-xs text-slate-400 mt-1 ${
          message.type === "assistant" ? "text-left" : "text-right"
        }`}
      >
        {message.timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
};

export default MessageBubble;
