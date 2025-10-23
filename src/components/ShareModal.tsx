import { useState, useEffect } from "react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  formId: string;
  formTitle: string;
}

const ShareModal = ({
  isOpen,
  onClose,
  formId,
  formTitle,
}: ShareModalProps) => {
  const [copied, setCopied] = useState(false);
  const [publicUrl, setPublicUrl] = useState("");

  useEffect(() => {
    if (isOpen) {
      // Generate the public URL
      const baseUrl = window.location.origin;
      const url = `${baseUrl}/form/${formId}`;
      setPublicUrl(url);
      setCopied(false);
    }
  }, [isOpen, formId]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = publicUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-purple-600">
                share
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Share Form</h3>
              <p className="text-sm text-slate-600">
                Get a public link to share
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-slate-400">
              close
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-slate-800 mb-2">
              {formTitle}
            </h4>
            <p className="text-sm text-slate-600">
              Share this link with anyone to let them fill out your form
            </p>
          </div>

          {/* URL Display */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Public Form Link
            </label>
            <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  value={publicUrl}
                  readOnly
                  className="w-full bg-transparent text-sm text-slate-700 border-none outline-none"
                />
              </div>
              <button
                onClick={handleCopyLink}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  copied
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-purple-100 text-purple-700 border border-purple-200 hover:bg-purple-200"
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {copied ? "check" : "content_copy"}
                </span>
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-blue-600 text-sm mt-0.5">
                info
              </span>
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">How to use this link:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Share this link via email, social media, or messaging</li>
                  <li>Anyone with the link can fill out your form</li>
                  <li>Responses will appear in your dashboard</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 bg-slate-50">
          <button
            onClick={onClose}
            className="px-6 py-2 text-slate-600 hover:text-slate-800 font-medium transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleCopyLink}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg shadow-purple-500/30"
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
