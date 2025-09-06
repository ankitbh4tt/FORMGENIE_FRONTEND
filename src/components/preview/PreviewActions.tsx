import React from "react";

const PreviewActions = () => {
  return (
    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
      <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium shadow-md hover:shadow-lg hover:opacity-90 transition-all transform hover:-translate-y-0.5">
        Save & Publish
      </button>
      <button className="px-6 py-2.5 rounded-xl border border-purple-300 text-purple-600 font-medium hover:bg-purple-50 transition-all">
        Amend Form
      </button>
    </div>
  );
};

export default PreviewActions;