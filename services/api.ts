import { useAuth } from "@clerk/clerk-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const useApi = () => {
  const { getToken } = useAuth();

  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = await getToken();

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  };

  // ---- APIs (no token param needed anymore) ----
  return {
    generateFormSchema: (prompt: string, sessionId: string | null = null) =>
      apiCall("/api/v1/ai/generate-form", {
        method: "POST",
        body: JSON.stringify({ prompt, sessionId }),
      }),

    amendFormSchema: (prompt: string, formId: string) =>
      apiCall("/api/v1/ai/amend-form", {
        method: "POST",
        body: JSON.stringify({ prompt, formId }),
      }),

    // New: Refine unsaved schema from session
    refineSessionSchema: (refinementPrompt: string, sessionId: string) =>
      apiCall("/api/v1/ai/amend-session", {
        method: "POST",
        body: JSON.stringify({ refinementPrompt, sessionId }),
      }),

    saveForm: (formData: any) =>
      apiCall("/api/v1/forms/save-form", {
        method: "POST",
        body: JSON.stringify(formData),
      }),

    getUserForms: () => apiCall("/api/v1/forms/all"),

    getPublicForm: (formId: string) =>
      apiCall(`/api/v1/forms/public/${formId}`),

    updateForm: (formId: string, formData: any) =>
      apiCall(`/api/v1/forms/update/${formId}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      }),

    deleteForm: (formId: string) =>
      apiCall(`/api/v1/forms/delete/${formId}`, { method: "DELETE" }),

    amendForm: (formId: string) =>
      apiCall(`/api/v1/forms/amend/${formId}`, { method: "POST" }),

    submitFormResponse: (formId: string, responses: any) =>
      apiCall(`/api/v1/responses/submit/${formId}`, {
        method: "POST",
        body: JSON.stringify({ responses }),
      }),

    getFormResponses: (formId: string) =>
      apiCall(`/api/v1/responses/responses/${formId}`),
    getSessionSchema: (sessionId: string) =>
      apiCall(`/api/v1/ai/session/${sessionId}`),

    // Dashboard API
    getDashboardStats: () => apiCall("/api/v1/dashboard/stats"),

    // Responses API
    getAllResponses: () => apiCall("/api/v1/responses/all"),
  };
};
