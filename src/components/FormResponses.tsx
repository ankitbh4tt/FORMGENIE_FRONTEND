import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Share2, Inbox, ExternalLink } from "lucide-react";
import { useApi } from "../../services/api";
import { Button } from "./ui/button";
import { PageHeader } from "./ui/page-header";
import { EmptyState } from "./ui/empty-state";
import { Skeleton } from "./ui/skeleton";
import ShareModal from "./ShareModal";
import { ResponsesTable, type ResponseRow } from "./responses/ResponsesTable";
import { plural } from "@/lib/format";

interface ApiResponse {
  responseId: string;
  submitterId?: string;
  responses: Array<{
    label: string;
    value: string | number | boolean | string[];
  }>;
  createdAt: string;
}

interface UserForm {
  formId: string;
  title: string;
}

/** Every answer to one form, in the table. */
const FormResponses = () => {
  const navigate = useNavigate();
  const { formId } = useParams();
  const { getFormResponses, getUserForms } = useApi();
  const [responses, setResponses] = useState<ApiResponse[]>([]);
  const [formTitle, setFormTitle] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [share, setShare] = useState(false);

  useEffect(() => {
    if (formId) loadFormResponses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formId]);

  const loadFormResponses = async () => {
    try {
      setLoading(true);
      const response = await getFormResponses(formId!);
      if (response.success && response.responses) {
        setResponses(response.responses);
        const formsResponse = await getUserForms();
        if (formsResponse.success && formsResponse.forms) {
          const form = (formsResponse.forms as UserForm[]).find((f) => f.formId === formId);
          setFormTitle(form?.title || "Form");
        }
      } else {
        setError(response.error || "The responses could not be loaded.");
      }
    } catch (err) {
      setError("The responses could not be loaded.");
      console.error("Error loading responses:", err);
    } finally {
      setLoading(false);
    }
  };

  const { rows, fieldLabels } = useMemo(() => {
    const labels: string[] = [];
    const seen = new Set<string>();
    responses.forEach((r) =>
      r.responses.forEach((f) => {
        if (!seen.has(f.label)) {
          seen.add(f.label);
          labels.push(f.label);
        }
      })
    );
    const mapped: ResponseRow[] = responses.map((r) => ({
      id: r.responseId,
      createdAt: r.createdAt,
      submitterId: r.submitterId,
      values: Object.fromEntries(r.responses.map((f) => [f.label, f.value])),
    }));
    return { rows: mapped, fieldLabels: labels };
  }, [responses]);

  return (
    <div className="app-frame py-8 md:py-10">
      <PageHeader
        back={{ to: "/responses", label: "All forms" }}
        title={loading ? "Responses" : formTitle}
        description={loading ? undefined : plural(responses.length, "response")}
        actions={
          <>
            <Button variant="secondary" onClick={() => setShare(true)}>
              <Share2 className="size-4" aria-hidden="true" />
              Share
            </Button>
            <Button variant="ghost" onClick={() => navigate(`/form/${formId}`)}>
              View public form
              <ExternalLink className="size-4" aria-hidden="true" />
            </Button>
          </>
        }
      />

      {error && (
        <p role="alert" className="mt-6 text-ui text-danger">
          {error}
        </p>
      )}

      {loading ? (
        <div className="mt-8 flex flex-col gap-3" aria-hidden="true">
          <Skeleton className="h-9 w-72 max-w-full" />
          <Skeleton className="mt-2 h-10 w-full" />
          {[0, 1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-11 w-full" />
          ))}
        </div>
      ) : responses.length === 0 ? (
        <EmptyState
          className="mt-8"
          icon={Inbox}
          title="No responses yet."
          description="Share the link and the answers appear here the moment they are submitted."
          action={
            <Button variant="accent" onClick={() => setShare(true)}>
              <Share2 className="size-4" aria-hidden="true" />
              Share the form
            </Button>
          }
        />
      ) : (
        <div className="mt-8">
          <ResponsesTable rows={rows} fieldLabels={fieldLabels} caption={`Responses to ${formTitle}`} />
        </div>
      )}

      <ShareModal isOpen={share} onClose={() => setShare(false)} formId={formId ?? ""} formTitle={formTitle} />
    </div>
  );
};

export default FormResponses;
