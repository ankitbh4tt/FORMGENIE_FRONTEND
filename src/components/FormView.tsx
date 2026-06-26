import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FileWarning, Send } from "lucide-react";
import { useApi } from "../../services/api";
import { Button } from "./ui/button";
import { CenteredSpinner } from "./ui/spinner";
import { FormRenderer } from "./form-fields/FormRenderer";
import { SuccessStamp } from "./form-fields/SuccessStamp";
import {
  initialValues,
  missingRequired,
  type FormField,
  type FormValues,
  type FieldValue,
} from "./form-fields/types";

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
  const [formData, setFormData] = useState<FormValues>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formId]);

  const loadForm = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await getPublicForm(formId || "");
      if (response.success) {
        setForm(response.form);
        setFormData(initialValues(response.form.schema));
      } else {
        setError(response.error || "This form could not be found.");
      }
    } catch (err) {
      setError("Failed to load form");
      console.error("Error loading form:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (label: string, value: FieldValue): void => {
    setFormData((prev) => ({ ...prev, [label]: value }));
    setErrors((prev) => {
      if (!prev[label]) return prev;
      const next = { ...prev };
      delete next[label];
      return next;
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!form) return;

    const missing = missingRequired(form.schema, formData);
    if (missing.length > 0) {
      const nextErrors: Record<string, string> = {};
      missing.forEach((label) => (nextErrors[label] = "This field is required."));
      setErrors(nextErrors);
      // focus first invalid field
      const firstIndex = form.schema.findIndex((f) => f.label === missing[0]);
      document.getElementById(`field-${firstIndex}`)?.focus();
      return;
    }

    try {
      setSubmitting(true);
      const responses = form.schema.map((field) => ({
        label: field.label,
        value: formData[field.label],
      }));
      const response = await submitFormResponse(formId || "", responses);
      if (response.success) setSubmitted(true);
      else throw new Error(response.error);
    } catch (err) {
      setError("Failed to submit form. Please try again.");
      console.error("Error submitting form:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <CenteredSpinner label="Loading form…" />;

  if (error && !form) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="grid size-16 place-items-center rounded-full border border-border bg-surface text-ink-muted">
          <FileWarning className="size-7" strokeWidth={1.5} />
        </div>
        <h2 className="mt-6 font-display text-2xl font-medium tracking-tight text-ink">
          Form not found
        </h2>
        <p className="mt-2 max-w-sm text-ink-muted">{error}</p>
      </div>
    );
  }

  if (submitted) return <SuccessStamp />;

  return (
    <div className="px-4 py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
        className="mx-auto max-w-xl overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
      >
        <div className="border-b border-border px-7 py-7 sm:px-9">
          <h1 className="font-display text-[1.75rem] font-medium leading-tight tracking-tight text-ink">
            {form?.title}
          </h1>
          {form?.description && (
            <p className="mt-2 leading-relaxed text-ink-muted">
              {form.description}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="px-7 py-7 sm:px-9" noValidate>
          {form && (
            <FormRenderer
              schema={form.schema}
              values={formData}
              onChange={handleInputChange}
              errors={errors}
            />
          )}

          {error && (
            <p role="alert" className="mt-5 text-[13px] text-danger">
              {error}
            </p>
          )}

          <div className="mt-8 border-t border-border pt-6">
            <Button
              type="submit"
              size="lg"
              loading={submitting}
              className="w-full"
            >
              {!submitting && <Send className="size-4" />}
              Submit
            </Button>
          </div>
        </form>
      </motion.div>

      <p className="mx-auto mt-5 max-w-xl text-center text-xs text-ink-faint">
        Never submit sensitive information you wouldn’t want shared.
      </p>
    </div>
  );
};

export default FormView;
