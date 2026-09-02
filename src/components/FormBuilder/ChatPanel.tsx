import { useRef, useEffect, useLayoutEffect } from "react";
import { ArrowUp } from "lucide-react";
import MessageBubble, { type Message } from "./MessageBubble";
import { Logo } from "@/components/common/Logo";
import { useCoarsePointer } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (msg: string) => void;
  isLoading: boolean;
  inputValue: string;
  setInputValue: (val: string) => void;
  className?: string;
}

const SUGGESTIONS = [
  { label: "Contact form", prompt: "Create a contact form with name, email, and a message." },
  { label: "Event RSVP", prompt: "Build an RSVP form with name, email, number of guests, and dietary notes." },
  { label: "Feedback survey", prompt: "Make a feedback survey with a rating and a short comment." },
];

/**
 * The conversation. Messages above, the composer pinned below. While a request
 * is being composed the field stays readable and says it is busy; it is never
 * greyed out, because the person has not been locked out of anything.
 */
const ChatPanel = ({ messages, onSendMessage, isLoading, inputValue, setInputValue, className }: ChatPanelProps) => {
  const endRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const coarse = useCoarsePointer();

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, isLoading]);

  // The composer grows with its text, up to six lines.
  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [inputValue]);

  const submit = () => {
    if (inputValue.trim() && !isLoading) onSendMessage(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !coarse) {
      e.preventDefault();
      submit();
    }
  };

  const hasUserMessage = messages.some((m) => m.type === "user");

  return (
    <div className={cn("flex min-h-0 flex-1 flex-col", className)}>
      <div className="hidden shrink-0 items-center border-b border-border px-5 py-3 lg:flex">
        <p className="text-small text-ink-muted">
          <span className="font-medium text-ink">Conversation</span>
          {isLoading && <span> · Composing</span>}
        </p>
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-5 sm:px-6">
        <div className="mt-auto flex flex-col gap-1">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="fg-in flex items-start gap-3 py-1.5" data-visible="" role="status" aria-live="polite">
              <Logo className="mt-0.5 size-5 shrink-0 text-ink-faint" />
              <p className="text-ui text-ink-muted">Composing the form</p>
            </div>
          )}
          <div ref={endRef} />
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="shrink-0 border-t border-border px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-5"
        aria-busy={isLoading || undefined}
      >
        {!hasUserMessage && (
          <div className="mb-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => onSendMessage(s.prompt)}
                className="min-h-9 rounded-full border border-border px-3 text-small text-ink-muted transition-colors duration-(--dur-fast) hover:border-border-strong hover:text-ink"
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-end gap-2 rounded-control border border-border-strong bg-surface p-1.5 transition-[border-color,box-shadow] duration-(--dur-base) focus-within:border-ink focus-within:shadow-[inset_0_0_0_1px_var(--ink)]">
          <label htmlFor="builder-composer" className="sr-only">
            Describe your form or ask for a change
          </label>
          <textarea
            id="builder-composer"
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={hasUserMessage ? "Ask for a change" : "Describe your form"}
            rows={1}
            readOnly={isLoading}
            enterKeyHint="send"
            className="max-h-40 min-h-10 flex-1 resize-none bg-transparent px-2.5 py-2 text-[1rem] leading-relaxed text-ink outline-none placeholder:text-ink-faint"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            aria-label="Send"
            className="grid size-10 shrink-0 place-items-center rounded-control bg-accent text-accent-fg transition-[background-color,opacity,transform] duration-(--dur-fast) hover:bg-accent-hover active:scale-95 disabled:opacity-40"
          >
            <ArrowUp className="size-[18px]" aria-hidden="true" />
          </button>
        </div>
        {!coarse && <p className="mt-2 text-small text-ink-faint">Enter to send. Shift + Enter for a new line.</p>}
      </form>
    </div>
  );
};

export default ChatPanel;
