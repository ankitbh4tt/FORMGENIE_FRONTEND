import { useEffect, useState } from "react";
import { Check, Copy, ExternalLink, Inbox, Wand2 } from "lucide-react";
import { useApi } from "../../../services/api";
import { toast } from "react-hot-toast";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Field, Label } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import type { FormField } from "../form-fields/types";

interface FormActionsProps {
  sessionId: string | null | undefined;
  formSchema: FormField[];
  onNavigate: (url: string) => void;
  formId?: string | null;
  onSchemaUpdate: (schema: FormField[], sessionId: string) => void;
  /** Layout of the two actions. */
  layout?: "row" | "bar";
}

/**
 * Publish, and refine. Publishing asks for a title in one dialog and then
 * shows the link rather than leaving the app: the person decides where to go
 * next. Refining opens the smaller dialog for a one-off change.
 */
const FormActions = ({ sessionId, formSchema, onNavigate, formId, onSchemaUpdate, layout = "row" }: FormActionsProps) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isAmending, setIsAmending] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showAmendModal, setShowAmendModal] = useState(false);
  const [refinementPrompt, setRefinementPrompt] = useState("");
  const [published, setPublished] = useState<{ formId: string; title: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const { saveForm, amendForm, refineSessionSchema } = useApi();

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(t);
  }, [copied]);

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
        setPublished({ formId: response.formId, title: formTitle });
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Error saving form:", error);
      toast.error("The form could not be published. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleAmendForm = () => {
    if (formId) amendSavedForm();
    else if (sessionId) setShowAmendModal(true);
    else toast.error("Nothing to refine yet.");
  };

  const amendSavedForm = async () => {
    setIsAmending(true);
    try {
      const response = await amendForm(formId || "");
      if (response.success) {
        toast.success("Ready to refine");
        onSchemaUpdate(response.form.schema, response.sessionId);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Error amending form:", error);
      toast.error("Refining could not be started.");
    } finally {
      setIsAmending(false);
    }
  };

  const handleRefineUnsaved = async () => {
    if (!refinementPrompt.trim()) return;
    setIsAmending(true);
    try {
      const response = await refineSessionSchema(refinementPrompt, sessionId || "");
      if (response.success) {
        toast.success("Form refined");
        setShowAmendModal(false);
        setRefinementPrompt("");
        onSchemaUpdate(response.schema, response.sessionId);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Error refining form:", error);
      toast.error("The change could not be applied.");
    } finally {
      setIsAmending(false);
    }
  };

  const publicUrl = published ? `${window.location.origin}/form/${published.formId}` : "";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
    } catch {
      toast.error("The link could not be copied.");
    }
  };

  const canAct = formSchema.length > 0;

  return (
    <>
      <div className={layout === "bar" ? "flex items-center gap-2" : "flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end"}>
        <Button
          variant="secondary"
          onClick={handleAmendForm}
          disabled={!canAct || !(formId || sessionId)}
          loading={isAmending}
          className={layout === "bar" ? "" : "sm:min-w-32"}
        >
          {!isAmending && <Wand2 className="size-4" aria-hidden="true" />}
          Refine
        </Button>
        <Button
          variant="accent"
          onClick={() => setShowSaveModal(true)}
          disabled={!canAct}
          loading={isPublishing}
          className={layout === "bar" ? "" : "sm:min-w-32"}
        >
          Publish
        </Button>
      </div>

      {/* Publish */}
      <Dialog open={showSaveModal} onOpenChange={setShowSaveModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish this form</DialogTitle>
            <DialogDescription>Give it a title. The link is ready the moment it is published.</DialogDescription>
          </DialogHeader>

          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveForm();
            }}
          >
            <Field label="Title" htmlFor="form-title" required>
              <Input
                id="form-title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Customer feedback"
                autoFocus
                autoComplete="off"
              />
            </Field>
            <Field label="Description" htmlFor="form-description" hint="Optional. Shown at the top of the form.">
              <Textarea
                id="form-description"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="A few words for the people filling it in."
                rows={3}
              />
            </Field>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setShowSaveModal(false)}>
                Not yet
              </Button>
              <Button type="submit" variant="accent" disabled={!formTitle.trim()} loading={isPublishing}>
                {isPublishing ? "Publishing" : "Publish"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Published */}
      <Dialog open={!!published} onOpenChange={(o) => !o && setPublished(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display text-statement font-medium">Your form is live.</DialogTitle>
            <DialogDescription>
              “{published?.title}” has a public link. Anyone with it can respond, and every answer lands in your
              dashboard.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Label htmlFor="published-link">Public link</Label>
            <div className="flex items-center gap-2">
              <Input id="published-link" type="url" value={publicUrl} readOnly onFocus={(e) => e.target.select()} className="min-w-0 flex-1" />
              <Button variant={copied ? "secondary" : "primary"} onClick={copy} className="min-w-24 shrink-0">
                {copied ? (
                  <>
                    <Check className="size-4" aria-hidden="true" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="size-4" aria-hidden="true" /> Copy
                  </>
                )}
              </Button>
            </div>
          </div>

          <DialogFooter className="sm:justify-start">
            <Button variant="secondary" asChild>
              <a href={publicUrl} target="_blank" rel="noreferrer">
                Open the form
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </Button>
            <Button variant="ghost" onClick={() => published && onNavigate(`/responses/${published.formId}`)}>
              <Inbox className="size-4" aria-hidden="true" />
              View responses
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Refine (unsaved) */}
      <Dialog open={showAmendModal} onOpenChange={setShowAmendModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Refine the form</DialogTitle>
            <DialogDescription>Describe the change and it is applied to the form.</DialogDescription>
          </DialogHeader>

          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleRefineUnsaved();
            }}
          >
            <Field label="What should change?" htmlFor="refinement-prompt" required>
              <Textarea
                id="refinement-prompt"
                value={refinementPrompt}
                onChange={(e) => setRefinementPrompt(e.target.value)}
                placeholder="Make email required and add a phone number."
                rows={3}
                autoFocus
              />
            </Field>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setShowAmendModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="accent" disabled={!refinementPrompt.trim()} loading={isAmending}>
                {isAmending ? "Applying" : "Apply the change"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormActions;
