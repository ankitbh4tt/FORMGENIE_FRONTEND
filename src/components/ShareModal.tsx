import { useState, useEffect } from "react";
import { Check, Copy, ExternalLink, Share } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/field";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  formId: string;
  formTitle: string;
}

/** One link, copied in one press, and the device's own share sheet where there is one. */
const ShareModal = ({ isOpen, onClose, formId, formTitle }: ShareModalProps) => {
  const [copied, setCopied] = useState(false);
  const [publicUrl, setPublicUrl] = useState("");
  const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

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
    window.setTimeout(() => setCopied(false), 2200);
  };

  const handleShare = async () => {
    try {
      await navigator.share({ title: formTitle, url: publicUrl });
    } catch {
      /* the person closed the sheet */
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share “{formTitle}”</DialogTitle>
          <DialogDescription>Anyone with this link can fill in the form. Responses arrive in your dashboard.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <Label htmlFor="share-link">Public link</Label>
          <div className="flex items-center gap-2">
            <Input id="share-link" type="url" value={publicUrl} readOnly onFocus={(e) => e.target.select()} className="min-w-0 flex-1" />
            <Button variant={copied ? "secondary" : "primary"} onClick={handleCopyLink} className="shrink-0 min-w-24">
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
          <p className="sr-only" aria-live="polite">
            {copied ? "Link copied" : ""}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a href={publicUrl} target="_blank" rel="noreferrer" className="link-quiet inline-flex min-h-11 items-center gap-1.5 text-ui text-ink">
            Open the form
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
          {canShare && (
            <button type="button" onClick={handleShare} className="link-quiet inline-flex min-h-11 items-center gap-1.5 text-ui text-ink">
              Share from this device
              <Share className="size-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
