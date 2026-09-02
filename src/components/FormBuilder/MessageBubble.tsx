import { Logo } from "@/components/common/Logo";
import { cn } from "@/lib/utils";

export interface Message {
  id: number | string;
  type: string;
  content: string;
  timestamp: Date;
  isError?: boolean;
}

/**
 * A line in the conversation. The assistant speaks in plain text beside the
 * mark; the person's request is an ink bubble; a change is a quiet hairline note.
 */
const MessageBubble = ({ message }: { message: Message }) => {
  if (message.type === "divider") {
    return (
      <div className="fg-in my-3 flex items-center gap-3" data-visible="" role="status">
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
        <span className="max-w-[80%] text-center text-small text-ink-muted">{message.content}</span>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>
    );
  }

  const isAssistant = message.type === "assistant";

  if (isAssistant) {
    return (
      <div className="fg-in flex max-w-[92%] items-start gap-3 py-1.5" data-visible="">
        <Logo className={cn("mt-0.5 size-5 shrink-0", message.isError ? "text-danger" : "text-ink-muted")} />
        <p className={cn("text-ui leading-relaxed", message.isError ? "text-danger" : "text-ink")}>{message.content}</p>
      </div>
    );
  }

  return (
    <div className="fg-in ml-auto max-w-[85%] py-1.5" data-visible="">
      <p className="rounded-panel rounded-br-sm bg-ink px-4 py-2.5 text-ui leading-relaxed text-bg">{message.content}</p>
    </div>
  );
};

export default MessageBubble;
