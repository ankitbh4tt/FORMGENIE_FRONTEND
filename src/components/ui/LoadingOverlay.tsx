const LoadingOverlay = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6 p-8 bg-white rounded-2xl shadow-2xl border border-purple-100">
        <div className="relative w-15 h-15">
          <div className="absolute w-full h-full border-3 border-transparent border-t-purple-600 rounded-full animate-spin"></div>
          <div
            className="absolute w-full h-full border-3 border-transparent border-r-pink-600 rounded-full animate-spin"
            style={{ animationDelay: "-0.5s" }}
          ></div>
          <div
            className="absolute w-full h-15 border-3 border-transparent border-b-cyan-600 rounded-full animate-spin"
            style={{ animationDelay: "-1s" }}
          ></div>
        </div>
        <p className="text-base font-medium text-slate-700 text-center m-0">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
