import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useApi } from "../../services/api";
import { Button } from "./ui/button";
import FormSkeleton from "./ui/FormSkeleton";
import { FormRenderer } from "./form-fields/FormRenderer";
import { SuccessStamp } from "./form-fields/SuccessStamp";
import { initialValues, missingRequired, type FormField, type FormValues, type FieldValue } from "./form-fields/types";

interface FormType {
  title: string;
  description?: string;
  schema: FormField[];
}

/**
 * The respondent's page. The form is a sheet on paper: a title in the display
 * face, the fields, one action. Errors sit beside their fields and the first
 * one takes focus; the thank-you takes focus too.
 */
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
      setError("This form could not be loaded.");
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!form) return;

    const missing = missingRequired(form.schema, formData);
    if (missing.length > 0) {
      const nextErrors: Record<string, string> = {};
      missing.forEach((label) => (nextErrors[label] = "Please fill this in."));
      setErrors(nextErrors);
      const firstIndex = form.schema.findIndex((f) => f.label === missing[0]);
      const el = document.getElementById(`field-${firstIndex}`);
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
      el?.focus({ preventScroll: true });
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      const responses = form.schema.map((field) => ({
        label: field.label,
        value: formData[field.label],
      }));
      const response = await submitFormResponse(formId || "", responses);
      if (response.success) setSubmitted(true);
      else throw new Error(response.error);
    } catch (err) {
      setError("Your response could not be sent. Please try again.");
      console.error("Error submitting form:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    if (!form) return;
    setFormData(initialValues(form.schema));
    setErrors({});
    setSubmitted(false);
    window.scrollTo({ top: 0 });
  };

  if (loading) {
    return (
      <div className="px-4 py-8 sm:py-14">
        <div className="sheet mx-auto max-w-xl p-7 sm:p-9">
          <FormSkeleton />
        </div>
      </div>
    );
  }

  if (error && !form) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="font-display text-statement text-ink">This form is not here.</h1>
        <p className="mt-3 max-w-[40ch] text-lead text-ink-muted">{error}</p>
        <Button variant="secondary" className="mt-8" asChild>
          <Link to="/">Go to FormGenie</Link>
        </Button>
      </div>
    );
  }

  if (submitted) {
    return (
      <SuccessStamp title="Thank you." message="Your response has been recorded.">
        <Button variant="quiet" onClick={reset}>
          Send another response
        </Button>
      </SuccessStamp>
    );
  }

  return (
    <div className="px-4 py-8 sm:py-14">
      <div className="sheet fg-in mx-auto max-w-xl" data-visible="">
        <div className="border-b border-border px-6 py-7 sm:px-9 sm:py-9">
          <h1 className="font-display text-title text-ink">{form?.title}</h1>
          {form?.description && <p className="mt-3 text-lead text-ink-muted">{form.description}</p>}
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-7 sm:px-9 sm:py-9" noValidate aria-busy={submitting || undefined}>
          {form && <FormRenderer schema={form.schema} values={formData} onChange={handleInputChange} errors={errors} />}

          {error && (
            <p role="alert" className="mt-6 text-small text-danger">
              {error}
            </p>
          )}

          <div className="mt-8 border-t border-border pt-7">
            <Button type="submit" variant="accent" size="lg" loading={submitting} className="w-full">
              {submitting ? "Sending" : "Submit"}
            </Button>
          </div>
        </form>
      </div>

      <p className="mx-auto mt-5 max-w-xl text-center text-small text-ink-faint">
        Never send information you would not want shared.
      </p>
    </div>
  );
};

export default FormView;
