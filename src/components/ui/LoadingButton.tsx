"use client";

const LoadingButton = ({
  children,
  loading = false,
  disabled = false,
  onClick,
  className = "",
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${className} ${loading ? "cursor-wait" : ""}`}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-transparent border-t-current rounded-full animate-spin"></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
