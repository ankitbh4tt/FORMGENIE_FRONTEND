import { useState, useEffect } from "react";
import { Check, Copy, Link2, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  formId: string;
  formTitle: string;
}

const ShareModal = ({ isOpen, onClose, formId, formTitle }: ShareModalProps) => {
  const [copied, setCopied] = useState(false);
  const [publicUrl, setPublicUrl] = useState("");

  useEffect(() => {
    if (isOpen) {
      setPublicUrl(`${window.location.origin}/form/${formId}`);
      setCopied(false);
    }
  }, [isOpen, formId]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = publicUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share form</DialogTitle>
          <DialogDescription>
            Anyone with this link can fill out{" "}
            <span className="font-medium text-ink">{formTitle}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-medium text-ink-muted">
            Public link
          </label>
          <div className="flex items-center gap-2">
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-border-strong bg-surface-sunken px-3 py-2">
              <Link2 className="size-4 shrink-0 text-ink-faint" />
              <input
                type="text"
                value={publicUrl}
                readOnly
                className="w-full min-w-0 bg-transparent text-sm text-ink outline-none"
                onFocus={(e) => e.target.select()}
              />
            </div>
            <Button
              variant={copied ? "secondary" : "primary"}
              onClick={handleCopyLink}
              className="shrink-0"
            >
              {copied ? (
                <>
                  <Check className="size-4" /> Copied
                </>
              ) : (
                <>
                  <Copy className="size-4" /> Copy
                </>
              )}
            </Button>
          </div>
        </div>

        <a
          href={publicUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
        >
          Open form
          <ExternalLink className="size-3.5" />
        </a>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
