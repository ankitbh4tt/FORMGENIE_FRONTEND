import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Plus, Inbox } from "lucide-react";
import { useApi } from "../../services/api";
import { Button } from "./ui/button";
import { PageHeader } from "./ui/page-header";
import { EmptyState } from "./ui/empty-state";
import { Skeleton } from "./ui/skeleton";
import { FormRow, type FormSummary } from "./forms/FormRow";
import { Reveal } from "./motion/Reveal";

/** Choose a form to read its responses. */
const FormSelector = () => {
  const navigate = useNavigate();
  const { getUserForms } = useApi();
  const [forms, setForms] = useState<FormSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadForms = async () => {
      try {
        setLoading(true);
        const response = await getUserForms();
        if (response.success) setForms(response.forms || []);
        else setError(response.error);
      } catch (err) {
        setError("Your forms could not be loaded.");
        console.error("Error loading forms:", err);
      } finally {
        setLoading(false);
      }
    };
    loadForms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-frame py-8 md:py-10">
      <PageHeader title="Responses" description="Choose a form to read what people have sent." />

      {error && (
        <p role="alert" className="mt-6 text-ui text-danger">
          {error}
        </p>
      )}

      {loading ? (
        <ul className="hairline mt-8" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <li key={i} className="hairline-b flex flex-col gap-2.5 py-5">
              <Skeleton className="h-5 w-56" />
              <Skeleton className="h-3.5 w-32" />
            </li>
          ))}
        </ul>
      ) : forms.length === 0 ? (
        <EmptyState
          className="mt-8"
          icon={Inbox}
          title="Nothing to read yet."
          description="Once you publish a form and share its link, the answers gather here."
          action={
            <Button variant="accent" onClick={() => navigate("/builder")}>
              <Plus className="size-4" aria-hidden="true" />
              Create a form
            </Button>
          }
        />
      ) : (
        <Reveal amount="some" as="ul" className="hairline mt-8">
          {forms.map((form, i) => (
            <FormRow
              key={form.formId}
              form={form}
              index={i}
              onOpen={() => navigate(`/responses/${form.formId}`)}
              actions={
                <Button variant="secondary" size="sm" onClick={() => navigate(`/responses/${form.formId}`)}>
                  View responses
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              }
            />
          ))}
        </Reveal>
      )}
    </div>
  );
};

export default FormSelector;
