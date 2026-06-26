import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, Share2, Inbox, Trash2, Plus, FileText } from "lucide-react";
import { useApi } from "../../services/api";
import ShareModal from "./ShareModal";
import { Button } from "./ui/button";
import { CenteredSpinner } from "./ui/spinner";
import { EmptyState } from "./ui/empty-state";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { FormCard, type FormSummary } from "./forms/FormCard";

function IconAction({
  label,
  onClick,
  children,
  destructive,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  destructive?: boolean;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          aria-label={label}
          className={`grid size-8 place-items-center rounded-lg border border-border text-ink-muted transition-colors hover:bg-surface-sunken hover:text-ink ${
            destructive ? "hover:border-danger/40 hover:bg-danger-soft hover:text-danger" : ""
          }`}
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

const Forms = () => {
  const navigate = useNavigate();
  const { getUserForms, deleteForm } = useApi();
  const [forms, setForms] = useState<FormSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shareModal, setShareModal] = useState<{
    isOpen: boolean;
    formId: string;
    formTitle: string;
  }>({ isOpen: false, formId: "", formTitle: "" });
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
        setError("Failed to load forms");
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
        setForms((prev) =>
          prev.filter((f) => f.formId !== pendingDelete.formId)
        );
        toast.success("Form deleted");
        setPendingDelete(null);
      } else {
        toast.error("Failed to delete form");
      }
    } catch (err) {
      toast.error("Failed to delete form");
      console.error("Error deleting form:", err);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <CenteredSpinner label="Loading your forms…" />;

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-medium tracking-tight text-ink">
            Your forms
          </h1>
          <p className="mt-1 text-ink-muted">
            Manage, share, and review every form you've built.
          </p>
        </div>
        <Button onClick={() => navigate("/builder")}>
          <Plus className="size-4" />
          New form
        </Button>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      {forms.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No forms yet"
          description="Create your first form and it'll show up here, ready to share."
          action={
            <Button onClick={() => navigate("/builder")}>
              <Plus className="size-4" />
              Create your first form
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
                  <IconAction
                    label="Preview"
                    onClick={() => navigate(`/form/${form.formId}`)}
                  >
                    <Eye className="size-4" />
                  </IconAction>
                  <IconAction
                    label="Share"
                    onClick={() =>
                      setShareModal({
                        isOpen: true,
                        formId: form.formId,
                        formTitle: form.title,
                      })
                    }
                  >
                    <Share2 className="size-4" />
                  </IconAction>
                  <IconAction
                    label="Responses"
                    onClick={() => navigate(`/responses/${form.formId}`)}
                  >
                    <Inbox className="size-4" />
                  </IconAction>
                  <div className="ml-auto">
                    <IconAction
                      label="Delete"
                      destructive
                      onClick={() => setPendingDelete(form)}
                    >
                      <Trash2 className="size-4" />
                    </IconAction>
                  </div>
                </div>
              }
            />
          ))}
        </div>
      )}

      <ShareModal
        isOpen={shareModal.isOpen}
        onClose={() =>
          setShareModal({ isOpen: false, formId: "", formTitle: "" })
        }
        formId={shareModal.formId}
        formTitle={shareModal.formTitle}
      />

      <Dialog
        open={!!pendingDelete}
        onOpenChange={(o) => !o && setPendingDelete(null)}
      >
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Delete this form?</DialogTitle>
            <DialogDescription>
              “{pendingDelete?.title}” and its responses will be permanently
              removed. This can't be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setPendingDelete(null)}>
              Cancel
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
