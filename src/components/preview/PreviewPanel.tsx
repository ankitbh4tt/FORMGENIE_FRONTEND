import React from "react";
import PreviewForm from "./PreviewForm";
import PreviewActions from "./PreviewActions";

const PreviewPanel = () => {
  return (
    <div className="w-full lg:w-1/2 lg:pl-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 relative">
        <div className="lg:hidden absolute right-6 top-6">
          <button className="text-purple-600 flex items-center text-sm font-medium">
            <span>Collapse Preview</span>
            <span className="material-symbols-outlined ml-1">expand_less</span>
          </button>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-bold">Live Preview</h2>
          <p className="text-sm text-gray-500">Generated form based on your chat</p>
        </div>
        <PreviewForm />
        <PreviewActions />
      </div>
    </div>
  );
};

export default PreviewPanel;