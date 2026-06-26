import { useState } from "react";
import { Rocket, Wand2 } from "lucide-react";
import { useApi } from "../../../services/api";
import { toast } from "react-hot-toast";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Field } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface FormField {
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
}

interface FormActionsProps {
  sessionId: string | null | undefined;
  formSchema: FormField[];
  onNavigate: (url: string) => void;
  formId?: string | null;
  onSchemaUpdate: (schema: FormField[], sessionId: string) => void;
}

const FormActions = ({
  sessionId,
  formSchema,
  onNavigate,
  formId,
  onSchemaUpdate,
}: FormActionsProps) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isAmending, setIsAmending] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showAmendModal, setShowAmendModal] = useState(false);
  const [refinementPrompt, setRefinementPrompt] = useState("");

  const { saveForm, amendForm, refineSessionSchema } = useApi();

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
        toast.success("Form saved and published");
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
    if (formId) amendSavedForm();
    else if (sessionId) setShowAmendModal(true);
    else toast.error("No session or form to amend.");
  };

  const amendSavedForm = async () => {
    setIsAmending(true);
    try {
      const response = await amendForm(formId || "");
      if (response.success) {
        toast.success("Amendment session started");
        onSchemaUpdate(response.form.schema, response.sessionId);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Error amending form:", error);
      toast.error("Failed to start amendment.");
    } finally {
      setIsAmending(false);
    }
  };

  const handleRefineUnsaved = async () => {
    if (!refinementPrompt.trim()) return;
    setIsAmending(true);
    try {
      const response = await refineSessionSchema(
        refinementPrompt,
        sessionId || ""
      );
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
      toast.error("Failed to refine form.");
    } finally {
      setIsAmending(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row">
        <Button
          onClick={() => setShowSaveModal(true)}
          disabled={!formSchema.length}
          loading={isPublishing}
          className="flex-1"
        >
          {!isPublishing && <Rocket className="size-4" />}
          Save &amp; publish
        </Button>
        <Button
          variant="secondary"
          onClick={handleAmendForm}
          disabled={!formSchema.length || !(formId || sessionId)}
          loading={isAmending}
          className="flex-1"
        >
          {!isAmending && <Wand2 className="size-4" />}
          Refine
        </Button>
      </div>

      {/* Save & publish */}
      <Dialog open={showSaveModal} onOpenChange={setShowSaveModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save &amp; publish</DialogTitle>
            <DialogDescription>
              Give your form a name. You can share the link right after.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <Field label="Form title" htmlFor="form-title" required>
              <Input
                id="form-title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="e.g. Customer feedback"
                autoFocus
              />
            </Field>
            <Field label="Description" htmlFor="form-description" hint="Optional">
              <Textarea
                id="form-description"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="A short note shown at the top of your form"
                rows={3}
              />
            </Field>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowSaveModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveForm}
              disabled={!formTitle.trim()}
              loading={isPublishing}
            >
              Publish form
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Refine (unsaved) */}
      <Dialog open={showAmendModal} onOpenChange={setShowAmendModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Refine your form</DialogTitle>
            <DialogDescription>
              Describe the change and I'll update the form.
            </DialogDescription>
          </DialogHeader>

          <Field label="What should change?" htmlFor="refinement-prompt" required>
            <Textarea
              id="refinement-prompt"
              value={refinementPrompt}
              onChange={(e) => setRefinementPrompt(e.target.value)}
              placeholder="e.g. Make email required and add a phone number field"
              rows={3}
              autoFocus
            />
          </Field>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowAmendModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleRefineUnsaved}
              disabled={!refinementPrompt.trim()}
              loading={isAmending}
            >
              Refine form
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormActions;
