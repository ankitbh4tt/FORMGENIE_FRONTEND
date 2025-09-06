import React from "react";
import ChatPanel from "../components/chat/ChatPanel";
import PreviewPanel from "../components/preview/PreviewPanel";

export const FormBuilder = () => {
  return (
    <div id="webcrumbs">
      <div className="flex flex-col lg:flex-row h-screen bg-gray-50 p-4 md:p-6 lg:p-8 font-sans">
        <ChatPanel />
        <PreviewPanel />
      </div>
    </div>
  );
};