"use client";

import { useState } from "react";
import LoadingButton from "../ui/LoadingButton";
import { useApi } from "../../../services/api";
import { toast } from "react-hot-toast"; // For UX feedback

const FormActions = ({
  sessionId,
  formSchema,
  onNavigate,
  formId,
  onSchemaUpdate,
}) => {
  // Added onSchemaUpdate for refinement callback
  const [isPublishing, setIsPublishing] = useState(false);
  const [isAmending, setIsAmending] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showAmendModal, setShowAmendModal] = useState(false); // New modal for refinement prompt
  const [refinementPrompt, setRefinementPrompt] = useState(""); // Temp state for prompt

  const { saveForm, amendForm, refineSessionSchema } = useApi();

  const handlePublish = () => {
    setShowSaveModal(true);
  };

  const handleSaveForm = async () => {
    if (!formTitle.trim()) return;

    setIsPublishing(true);

    try {
      const response = await saveForm({
        title: formTitle,
        description: formDescription,
        schema: formSchema,
        sessionId,
      });

      if (response.success) {
        setShowSaveModal(false);
        toast.success("Form saved and published successfully!");
        onNavigate(`/form/${response.formId}`);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Error saving form:", error);
      toast.error("Failed to save form. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleAmendForm = () => {
    if (formId) {
      // Saved form: Use DB-based amendment
      amendSavedForm();
    } else if (sessionId) {
      // Unsaved: Open modal for refinement prompt
      setShowAmendModal(true);
    } else {
      toast.error("No session or form ID available for amendment.");
    }
  };

  const amendSavedForm = async () => {
    setIsAmending(true);
    try {
      const response = await amendForm(formId);
      if (response.success) {
        toast.success("Amendment session started!");
        // Update UI with new session/schema
        onSchemaUpdate(response.form.schema, response.sessionId);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      toast.error("Failed to start amendment.");
    } finally {
      setIsAmending(false);
    }
  };

  const handleRefineUnsaved = async () => {
    if (!refinementPrompt.trim()) return;

    setIsAmending(true);
    try {
      const response = await refineSessionSchema(refinementPrompt, sessionId);
      if (response.success) {
        toast.success("Form refined successfully!");
        setShowAmendModal(false);
        setRefinementPrompt(""); // Reset
        // Update local schema and session
        onSchemaUpdate(response.schema, response.sessionId);
        // Optional: Render messages for history
        console.log("Refinement messages:", response.messages); // Use for chat UI
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      toast.error("Failed to refine form.");
    } finally {
      setIsAmending(false);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <LoadingButton
          onClick={handlePublish}
          disabled={!formSchema.length}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 rounded-2xl font-semibold cursor-pointer transition-all duration-200 shadow-lg shadow-purple-500/30 hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          loading={isPublishing}
        >
          <span className="material-symbols-outlined">publish</span>
          Save & Publish
        </LoadingButton>

        <LoadingButton
          onClick={handleAmendForm}
          disabled={!formSchema.length || !(formId || sessionId)}
          loading={isAmending}
          className="px-6 py-3 border-2 border-purple-300 text-purple-600 bg-white rounded-2xl font-semibold cursor-pointer transition-all duration-200 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">edit</span>
          Amend Form
        </LoadingButton>
      </div>

      {/* Existing Save Modal */}
      {showSaveModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowSaveModal(false)}
        >
          {/* ... (unchanged save modal code) ... */}
        </div>
      )}

      {/* New: Amendment Modal for Unsaved Refinement */}
      {showAmendModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowAmendModal(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-white to-slate-50 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">
                Refine Your Form
              </h3>
              <button
                onClick={() => setShowAmendModal(false)}
                className="p-2 bg-transparent border-0 text-slate-400 cursor-pointer rounded-lg transition-all duration-200 hover:bg-slate-100 hover:text-slate-600"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="refinement-prompt"
                  className="text-sm font-semibold text-gray-700"
                >
                  Refinement Prompt *
                </label>
                <textarea
                  id="refinement-prompt"
                  value={refinementPrompt}
                  onChange={(e) => setRefinementPrompt(e.target.value)}
                  placeholder="e.g., 'Make the email field required and add a phone number field'"
                  className="px-4 py-3 border-2 border-slate-200 rounded-xl text-sm resize-vertical min-h-[100px] transition-all duration-200 font-inherit focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                  rows="3"
                />
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => setShowAmendModal(false)}
                className="px-6 py-3 border-2 border-slate-300 text-slate-600 bg-white rounded-2xl font-semibold cursor-pointer transition-all duration-200 hover:bg-slate-50"
              >
                Cancel
              </button>
              <LoadingButton
                onClick={handleRefineUnsaved}
                disabled={!refinementPrompt.trim()}
                loading={isAmending}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 rounded-2xl font-semibold cursor-pointer transition-all duration-200 shadow-lg shadow-purple-500/30 hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                Refine Form
              </LoadingButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormActions;
