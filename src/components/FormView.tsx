"use client";

import * as React from 'react';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { getPublicForm, submitFormResponse } from "../../services/api";
import { useApi } from "../../services/api";
import LoadingButton from "./ui/LoadingButton";

interface FormField {
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
}

interface FormType {
  title: string;
  description?: string;
  schema: FormField[];
}

const FormView = (): React.ReactElement => {
  const { formId } = useParams();
  const { getPublicForm, submitFormResponse } = useApi();
  const [form, setForm] = useState<FormType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    loadForm();
  }, [formId]);

  const loadForm = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await getPublicForm(formId || "");
      if (response.success) {
        setForm(response.form);
        // Initialize form data
        const initialData: Record<string, any> = {};
        response.form.schema.forEach((field: FormField) => {
          initialData[field.label] = field.type === "checkbox" ? false : "";
        });
        setFormData(initialData);
      } else {
        setError(response.error || null);
      }
    } catch (err) {
      setError("Failed to load form");
      console.error("Error loading form:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (fieldLabel: string, value: any): void => {
    setFormData((prev) => ({
      ...prev,
      [fieldLabel]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Validate required fields
    if (!form) return;
    const missingFields = form.schema
      .filter((field) => field.required && !formData[field.label])
      .map((field) => field.label);

    if (missingFields.length > 0) {
      alert(`Please fill in required fields: ${missingFields.join(", ")}`);
      return;
    }

    try {
      setSubmitting(true);
      if (!form) return;
      // Convert form data to API format
      const responses = form.schema.map((field: FormField) => ({
        label: field.label,
        value: formData[field.label],
      }));

      const response = await submitFormResponse(formId || "", responses);

      if (response.success) {
        setSubmitted(true);
      } else {
        throw new Error(response.error);
      }
    } catch (err) {
      alert("Failed to submit form. Please try again.");
      console.error("Error submitting form:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const renderField = (field: FormField, index: number): React.ReactElement => {
    const fieldId = `field-${index}`;
    const value = formData[field.label] || "";

    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <input
            key={index}
            id={fieldId}
            type={field.type}
            value={value}
            onChange={(e) => handleInputChange(field.label, e.target.value)}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-sm transition-all duration-200 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
            placeholder={`Enter ${field.label.toLowerCase()}`}
            required={field.required}
          />
        );

      case "date":
        return (
          <input
            key={index}
            id={fieldId}
            type="date"
            value={value}
            onChange={(e) => handleInputChange(field.label, e.target.value)}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-sm transition-all duration-200 bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
            required={field.required}
          />
        );

      case "select":
        return (
          <select
            key={index}
            id={fieldId}
            value={value}
            onChange={(e) => handleInputChange(field.label, e.target.value)}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-sm transition-all duration-200 bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
            required={field.required}
          >
            <option value="">Choose an option</option>
            {field.options?.map((option: string, optIndex: number) => (
              <option key={optIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case "checkbox":
        return (
          <div key={index} className="flex items-center gap-3 py-2">
            <input
              id={fieldId}
              type="checkbox"
              checked={value}
              onChange={(e) => handleInputChange(field.label, e.target.checked)}
              className="w-5 h-5 accent-purple-600 cursor-pointer"
            />
            <label
              htmlFor={fieldId}
              className="text-sm text-gray-700 cursor-pointer select-none font-semibold"
            >
              {field.label}
              {field.required && (
                <span className="text-red-500 font-medium ml-1">*</span>
              )}
            </label>
          </div>
        );

      case "file":
        return (
          <div key={index} className="relative">
            <input
              id={fieldId}
              type="file"
              onChange={(e) => {
                const files = e.target.files;
                handleInputChange(field.label, files && files[0] ? files[0].name : "");
              }}
              className="absolute opacity-0 w-full h-full cursor-pointer"
              required={field.required}
            />
            <label
              htmlFor={fieldId}
              className="flex flex-col items-center justify-center py-8 px-4 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 cursor-pointer transition-all duration-200 gap-2 hover:border-purple-500 hover:bg-purple-50"
            >
              <span className="material-symbols-outlined text-2xl text-slate-400">
                cloud_upload
              </span>
              <span className="text-sm text-slate-600">
                {value || "Choose file or drag here"}
              </span>
            </label>
          </div>
        );

      default:
        return (
          <textarea
            key={index}
            id={fieldId}
            rows={4}
            value={value}
            onChange={(e) => handleInputChange(field.label, e.target.value)}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-sm resize-vertical transition-all duration-200 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
            placeholder={`Enter ${field.label.toLowerCase()}`}
            required={field.required}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center py-8 text-slate-600">
        <div className="relative w-15 h-15 mb-4">
          <div className="absolute w-full h-full border-3 border-transparent border-t-purple-600 rounded-full animate-spin"></div>
        </div>
        <p>Loading form...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center py-8 text-red-600">
        <div className="w-25 h-25 rounded-full bg-red-50 flex items-center justify-center mb-6 border-2 border-red-200">
          <span className="material-symbols-outlined text-3xl">error</span>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Form Not Found</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center py-8 text-emerald-600">
        <div className="w-25 h-25 rounded-full bg-emerald-50 flex items-center justify-center mb-6 border-2 border-emerald-200">
          <span className="material-symbols-outlined text-3xl">
            check_circle
          </span>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Thank You!</h2>
        <p>Your response has been submitted successfully.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden">
        <div className="p-8 bg-gradient-to-r from-white to-slate-50 border-b border-slate-100 text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            {form?.title}
          </h1>
          {form?.description && (
            <p className="text-slate-600 text-base leading-relaxed">
              {form.description}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
          {form?.schema.map((field: FormField, index: number) => (
            <div
              key={index}
              className="flex flex-col gap-2 animate-in fade-in duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {field.type !== "checkbox" && (
                <label
                  htmlFor={`field-${index}`}
                  className="text-sm font-semibold text-gray-700 flex items-center gap-1"
                >
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 font-medium">*</span>
                  )}
                </label>
              )}
              {renderField(field, index)}
            </div>
          ))}

          <div className="pt-4 border-t border-slate-100">
            <LoadingButton
              type="submit"
              loading={submitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 rounded-2xl text-base font-semibold cursor-pointer transition-all duration-200 shadow-lg shadow-purple-500/30 hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              onClick={() => {}}
            >
              <span className="material-symbols-outlined">send</span>
              Submit Form
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormView;
