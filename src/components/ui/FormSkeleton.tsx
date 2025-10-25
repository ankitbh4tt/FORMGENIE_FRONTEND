const FormSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6">
      {/* Form Title Skeleton */}
      <div className="space-y-3">
        <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-100 rounded-lg w-3/4"></div>
        <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-100 rounded w-1/2"></div>
      </div>

      {/* Form Fields Skeleton */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-5 bg-gradient-to-r from-slate-200 to-slate-100 rounded w-1/3"></div>
          <div className="h-12 bg-gradient-to-r from-slate-200 to-slate-100 rounded-xl"></div>
        </div>
      ))}

      {/* Button Skeleton */}
      <div className="flex gap-3 pt-4">
        <div className="h-12 bg-gradient-to-r from-purple-200 to-pink-200 rounded-xl w-32"></div>
        <div className="h-12 bg-gradient-to-r from-slate-200 to-slate-100 rounded-xl w-24"></div>
      </div>

      {/* Loading Text */}
      <div className="flex items-center justify-center gap-2 pt-4">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"></div>
          <div
            className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
        <p className="text-sm text-slate-500 font-medium">Generating your form...</p>
      </div>
    </div>
  );
};

export default FormSkeleton;
