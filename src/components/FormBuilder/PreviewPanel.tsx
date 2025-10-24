"use client";

import { useState } from "react";
import FormPreview from "./FormPreview";
import FormActions from "./FormActions";

interface FormField {
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
}

interface PreviewPanelProps {
  formSchema: FormField[];
  sessionId: string | null | undefined;
  onNavigate: (url: string) => void;
  onSchemaUpdate: (schema: FormField[], sessionId: string) => void;
}

const PreviewPanel = ({ formSchema, sessionId, onNavigate, onSchemaUpdate }: PreviewPanelProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`flex flex-col bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden flex-1 max-h-full transition-all duration-300 ${
        isCollapsed ? "lg:flex" : ""
      }`}
    >
      <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-white to-slate-50 flex justify-between items-center">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-slate-800 mb-1">
            Live Preview
          </h2>
          <p className="text-slate-600 text-sm">
            Generated form based on your chat
          </p>
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 bg-transparent border-0 text-purple-600 cursor-pointer rounded-lg transition-all duration-200 lg:hidden hover:bg-slate-50"
        >
          <span className="material-symbols-outlined">
            {isCollapsed ? "expand_more" : "expand_less"}
          </span>
        </button>
      </div>

      <div
        className={`flex-1 p-6 overflow-y-auto flex flex-col gap-6 min-h-0 ${
          isCollapsed ? "hidden lg:flex" : "flex"
        }`}
      >
        {formSchema.length > 0 ? (
          <>
            <FormPreview schema={formSchema} />
            <FormActions
              sessionId={sessionId}
              formSchema={formSchema}
              onNavigate={onNavigate}
              onSchemaUpdate={onSchemaUpdate}
            />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-600">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center mb-6 border-2 border-slate-200">
              <span className="material-symbols-outlined text-2xl text-slate-400">
                description
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-slate-700">
              No Form Yet
            </h3>
            <p className="text-sm">Start chatting to generate your form</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
