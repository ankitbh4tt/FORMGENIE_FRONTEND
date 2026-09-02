import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, Share2, Inbox, Trash2, Plus, MoreHorizontal, FileText } from "lucide-react";
import { useApi } from "../../services/api";
import ShareModal from "./ShareModal";
import { Button } from "./ui/button";
import { PageHeader } from "./ui/page-header";
import { EmptyState } from "./ui/empty-state";
import { Skeleton } from "./ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { FormRow, type FormSummary } from "./forms/FormRow";
import { Reveal } from "./motion/Reveal";
import { plural } from "@/lib/format";

/**
 * Your forms, as an index. Rows, not cards; the actions a form needs most
 * (share, responses) are words, and the rest sit behind one menu.
 */
const Forms = () => {
  const navigate = useNavigate();
  const { getUserForms, deleteForm } = useApi();
  const [forms, setForms] = useState<FormSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [share, setShare] = useState<{ formId: string; formTitle: string } | null>(null);
  const [pendingDelete, setPendingDelete] = useState<FormSummary | null>(null);
  const [deleting, setDeleting] = useState(false);

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

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      const response = await deleteForm(pendingDelete.formId);
      if (response.success) {
        setForms((prev) => prev.filter((f) => f.formId !== pendingDelete.formId));
        toast.success("Form deleted");
        setPendingDelete(null);
      } else {
        toast.error("The form could not be deleted.");
      }
    } catch (err) {
      toast.error("The form could not be deleted.");
      console.error("Error deleting form:", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="app-frame py-8 md:py-10">
      <PageHeader
        title="Forms"
        description={loading ? "Everything you have built." : forms.length ? `${plural(forms.length, "form")}, ready to share.` : "Everything you have built."}
      />

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
              <Skeleton className="h-4 w-80 max-w-full" />
              <Skeleton className="h-3.5 w-32" />
            </li>
          ))}
        </ul>
      ) : forms.length === 0 ? (
        <EmptyState
          className="mt-8"
          icon={FileText}
          title="No forms yet."
          description="Describe the first one and it appears here, ready to share the moment you publish it."
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
                <>
                  <Button variant="secondary" size="sm" onClick={() => setShare({ formId: form.formId, formTitle: form.title })}>
                    <Share2 className="size-4" aria-hidden="true" />
                    Share
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => navigate(`/responses/${form.formId}`)}>
                    <Inbox className="size-4" aria-hidden="true" />
                    Responses
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm" aria-label={`More actions for ${form.title}`}>
                        <MoreHorizontal className="size-4" aria-hidden="true" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onSelect={() => navigate(`/form/${form.formId}`)}>
                        <Eye />
                        View public form
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem destructive onSelect={() => setPendingDelete(form)}>
                        <Trash2 />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              }
            />
          ))}
        </Reveal>
      )}

      <ShareModal isOpen={!!share} onClose={() => setShare(null)} formId={share?.formId ?? ""} formTitle={share?.formTitle ?? ""} />

      <Dialog open={!!pendingDelete} onOpenChange={(o) => !o && setPendingDelete(null)}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Delete this form?</DialogTitle>
            <DialogDescription>
              “{pendingDelete?.title}” and every response to it will be removed. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setPendingDelete(null)}>
              Keep it
            </Button>
            <Button variant="danger" loading={deleting} onClick={confirmDelete}>
              Delete form
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Forms;
