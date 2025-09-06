import React from "react";

const DividerMessage = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-px w-1/3 bg-purple-200"></div>
      <span className="px-3 text-sm text-purple-300">Preview Updated</span>
      <div className="h-px w-1/3 bg-purple-200"></div>
    </div>
  );
};

export default DividerMessage;