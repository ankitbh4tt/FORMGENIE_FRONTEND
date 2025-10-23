import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { getUserForms, deleteForm } from "../../services/api";
import { useApi } from "../../services/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const { getUserForms, deleteForm } = useApi();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    try {
      setLoading(true);
      const response = await getUserForms();
      if (response.success) {
        setForms(response.forms || []);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError("Failed to load forms");
      console.error("Error loading forms:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteForm = async (formId) => {
    if (!window.confirm("Are you sure you want to delete this form?")) return;

    try {
      const response = await deleteForm(formId);
      if (response.success) {
        setForms(forms.filter((form) => form.formId !== formId));
      } else {
        alert("Failed to delete form");
      }
    } catch (err) {
      alert("Failed to delete form");
      console.error("Error deleting form:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-slate-600">
        <div className="relative w-15 h-15">
          <div className="absolute w-full h-full border-3 border-transparent border-t-purple-600 rounded-full animate-spin"></div>
        </div>
        <p>Loading your forms...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Form Builder
            </h1>
            <p className="text-slate-600 text-lg">
              Create intelligent forms with AI assistance
            </p>
          </div>

          <button
            onClick={() => navigate("/builder")}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 rounded-2xl font-semibold cursor-pointer transition-all duration-200 shadow-lg shadow-purple-500/30 hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/40 whitespace-nowrap"
          >
            <span className="material-symbols-outlined">add</span>
            Create New Form
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl mb-8">
            <span className="material-symbols-outlined">error</span>
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center text-center py-16 text-slate-600">
              <div className="w-25 h-25 rounded-full bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center mb-6 border-2 border-slate-200">
                <span className="material-symbols-outlined text-3xl text-slate-400">
                  description
                </span>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-slate-700">
                No Forms Yet
              </h3>
              <p className="text-base mb-8">
                Create your first AI-powered form to get started
              </p>
              <button
                onClick={() => navigate("/builder")}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 rounded-2xl font-semibold cursor-pointer transition-all duration-200 shadow-lg shadow-purple-500/30 hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/40"
              >
                Create Your First Form
              </button>
            </div>
          ) : (
            forms.map((form) => (
              <div
                key={form.formId}
                className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 transition-all duration-200 animate-in fade-in hover:transform hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 gap-3">
                  <h3 className="text-xl font-bold text-slate-800 leading-tight">
                    {form.title}
                  </h3>
                  <div className="flex gap-2 flex-shrink-0 self-end lg:self-auto">
                    <button
                      onClick={() => navigate(`/form/${form.formId}`)}
                      className="p-2 border-0 rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-100"
                      title="View Form"
                    >
                      <span className="material-symbols-outlined">
                        visibility
                      </span>
                    </button>
                    <button
                      onClick={() => handleDeleteForm(form.formId)}
                      className="p-2 border-0 rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100"
                      title="Delete Form"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>

                {form.description && (
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {form.description}
                  </p>
                )}

                <div className="flex justify-between items-center text-xs text-slate-400 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined">list</span>
                    {form.schema?.length || 0} fields
                  </div>
                  <div>
                    Created {new Date(form.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
