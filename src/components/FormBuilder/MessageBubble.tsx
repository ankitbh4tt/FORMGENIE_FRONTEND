import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  id: number | string;
  type: string;
  content: string;
  timestamp: Date;
  isError?: boolean;
}

const MessageBubble = ({ message }: { message: Message }) => {
  if (message.type === "divider") {
    return (
      <div className="my-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="rounded-full border border-border bg-surface-sunken px-2.5 py-0.5 text-[11px] font-medium text-ink-muted">
          {message.content}
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>
    );
  }

  const isAssistant = message.type === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
      className={cn("mb-2 max-w-[82%]", isAssistant ? "self-start" : "ml-auto self-end")}
    >
      <div
        className={cn(
          "rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed",
          isAssistant
            ? message.isError
              ? "rounded-bl-md border border-danger/30 bg-danger-soft text-danger"
              : "rounded-bl-md border border-border bg-surface-sunken text-ink"
            : "rounded-br-md bg-accent text-accent-fg"
        )}
      >
        {message.content}
      </div>
      <div
        className={cn(
          "mt-1 text-[11px] text-ink-faint",
          isAssistant ? "text-left" : "text-right"
        )}
      >
        {message.timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </motion.div>
  );
};

export default MessageBubble;
