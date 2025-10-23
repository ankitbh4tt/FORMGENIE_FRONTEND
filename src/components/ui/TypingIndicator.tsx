const TypingIndicator = () => {
  return (
    <div className="max-w-[80%] mb-2 animate-in slide-in-from-left duration-300 self-start">
      <div className="px-5 py-4 bg-slate-50 text-slate-800 rounded-2xl rounded-bl-md border border-slate-200">
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse"></div>
          <div
            className="w-2 h-2 rounded-full bg-slate-400 animate-pulse"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 rounded-full bg-slate-400 animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
