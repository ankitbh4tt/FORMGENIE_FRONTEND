import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, ArrowRight, Plus, Inbox } from "lucide-react";
import { useApi } from "../../services/api";
import { Button } from "./ui/button";
import { CenteredSpinner } from "./ui/spinner";
import { EmptyState } from "./ui/empty-state";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";
import { FormCard, type FormSummary } from "./forms/FormCard";

const FormSelector = () => {
  const navigate = useNavigate();
  const { getUserForms } = useApi();
  const [forms, setForms] = useState<FormSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadForms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadForms = async () => {
    try {
      setLoading(true);
      const response = await getUserForms();
      if (response.success) setForms(response.forms || []);
      else setError(response.error);
    } catch (err) {
      setError("Failed to load forms");
      console.error("Error loading forms:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CenteredSpinner label="Loading your forms…" />;

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-medium tracking-tight text-ink">
          Responses
        </h1>
        <p className="mt-1 text-ink-muted">
          Choose a form to read what people have submitted.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      {forms.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="Nothing to show yet"
          description="Once you create and publish a form, you'll pick it here to view responses."
          action={
            <Button onClick={() => navigate("/builder")}>
              <Plus className="size-4" />
              Create a form
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {forms.map((form, i) => (
            <FormCard
              key={form.formId}
              form={form}
              index={i}
              footer={
                <div className="flex items-center gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => navigate(`/responses/${form.formId}`)}
                  >
                    View responses
                    <ArrowRight className="size-4" />
                  </Button>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => navigate(`/form/${form.formId}`)}
                        aria-label="Preview form"
                        className="grid size-9 shrink-0 place-items-center rounded-lg border border-border text-ink-muted transition-colors hover:bg-surface-sunken hover:text-ink"
                      >
                        <Eye className="size-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Preview</TooltipContent>
                  </Tooltip>
                </div>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FormSelector;
