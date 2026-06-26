import { useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "../ui/TypingIndicator";
import { cn } from "@/lib/utils";

interface Message {
  id: number | string;
  type: string;
  content: string;
  timestamp: Date;
  isError?: boolean;
}

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (msg: string) => void;
  isLoading: boolean;
  inputValue: string;
  setInputValue: (val: string) => void;
}

const SUGGESTIONS = [
  { label: "Contact form", prompt: "Create a contact form with name, email, and a message." },
  { label: "Event RSVP", prompt: "Build an RSVP form with name, email, number of guests, and dietary notes." },
  { label: "Feedback survey", prompt: "Make a feedback survey with a rating and a short comment." },
];

const ChatPanel = ({
  messages,
  onSendMessage,
  isLoading,
  inputValue,
  setInputValue,
}: ChatPanelProps) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const submit = () => {
    if (inputValue.trim() && !isLoading) onSendMessage(inputValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const hasUserMessage = messages.some((m) => m.type === "user");

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-xs">
      {/* header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="font-display text-lg font-medium tracking-tight text-ink">
            Form assistant
          </h2>
          <p className="text-[13px] text-ink-muted">
            Describe what you need — refine by chatting
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "size-2 rounded-full transition-colors",
              isLoading ? "animate-pulse bg-warning" : "bg-success"
            )}
          />
          <span className="hidden text-xs font-medium text-ink-muted sm:inline">
            {isLoading ? "Composing…" : "Ready"}
          </span>
        </div>
      </div>

      {/* messages */}
      <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-4 py-5 sm:px-5">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* composer */}
      <form onSubmit={handleSubmit} className="border-t border-border p-4">
        {!hasUserMessage && (
          <div className="mb-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setInputValue(s.prompt)}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-[13px] text-ink-muted transition-colors hover:border-border-strong hover:text-ink"
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-end gap-2 rounded-xl border border-border-strong bg-surface p-2 transition-colors focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/25">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your form…"
            rows={1}
            disabled={isLoading}
            className="max-h-[140px] min-h-[28px] flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-ink outline-none placeholder:text-ink-faint disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            aria-label="Send"
            className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-fg transition-colors hover:bg-accent-hover disabled:opacity-40 disabled:hover:bg-accent"
          >
            <ArrowUp className="size-[18px]" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatPanel;
