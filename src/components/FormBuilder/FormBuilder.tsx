import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { MessagesSquare, Eye } from "lucide-react";
import ChatPanel from "./ChatPanel";
import PreviewPanel from "./PreviewPanel";
import type { Message } from "./MessageBubble";
import { SegmentedControl } from "../ui/segmented";
import { useApi } from "../../../services/api";
import toast from "react-hot-toast";
import { describeDiff, diffSchemas, type FieldChange, type FormField } from "../form-fields/types";
import { cn } from "@/lib/utils";

/**
 * The builder. A conversation on the left, the form as a sheet on the right.
 * On a phone the two are one screen at a time, and sending a request shows the
 * form composing rather than a list of messages.
 */
const FormBuilder = (): React.ReactElement => {
  const { sessionId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { generateFormSchema, amendFormSchema, getSessionSchema } = useApi();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "assistant",
      content:
        "Hi! Describe the form you'd like to create and I'll compose it for you. You can refine it just by telling me what to change.",
      timestamp: new Date(),
    },
  ]);

  const [currentSessionId, setCurrentSessionId] = useState<string | null | undefined>(sessionId || null);
  const [formSchema, setFormSchema] = useState<FormField[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [inputValue, setInputValue] = useState(() => searchParams.get("prompt") ?? "");
  const [activeView, setActiveView] = useState<"chat" | "preview">("chat");
  const [highlights, setHighlights] = useState<Record<string, FieldChange> | undefined>();
  const highlightTimer = useRef<number | null>(null);

  useEffect(() => {
    if (sessionId && !formSchema.length && !isLoading) {
      setIsLoading(true);
      setIsGenerating(true);
      getSessionSchema(sessionId)
        .then((response) => {
          if (response.success) {
            setFormSchema(response.schema);
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now(),
                type: "assistant",
                content: "Your session is loaded. Continue editing or make new changes whenever you like.",
                timestamp: new Date(),
              },
            ]);
          } else {
            toast.error("That session was not found.");
            navigate("/builder");
          }
        })
        .catch((err) => {
          toast.error("The session could not be loaded.");
          console.error("Error loading session:", err);
          navigate("/builder");
        })
        .finally(() => {
          setIsLoading(false);
          setIsGenerating(false);
        });
    }
  }, [sessionId, formSchema.length, isLoading, navigate, getSessionSchema]);

  useEffect(
    () => () => {
      if (highlightTimer.current) window.clearTimeout(highlightTimer.current);
    },
    []
  );

  const markChanges = (prev: FormField[], next: FormField[]) => {
    const diff = diffSchemas(prev, next);
    if (Object.keys(diff.highlights).length === 0 && diff.removed.length === 0) return null;
    setHighlights(diff.highlights);
    if (highlightTimer.current) window.clearTimeout(highlightTimer.current);
    highlightTimer.current = window.setTimeout(() => setHighlights(undefined), 3000);
    return describeDiff(diff);
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setIsGenerating(true);
    setActiveView("preview");

    const previous = formSchema;

    try {
      let response;

      if (currentSessionId) {
        response = await amendFormSchema(message, currentSessionId);
      } else {
        response = await generateFormSchema(message);
        setCurrentSessionId(response.sessionId);
        window.history.pushState({}, "", `/builder/${response.sessionId}`);
      }

      if (response.success) {
        setFormSchema(response.schema);
        const summary = previous.length ? markChanges(previous, response.schema) : null;

        const assistantMessage: Message = {
          id: Date.now() + 1,
          type: "assistant",
          content: currentSessionId
            ? "Done! I've updated your form. Check the preview to see the changes."
            : "Here's your form. Take a look in the preview. Want to adjust anything?",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 2,
            type: "divider",
            content: summary ?? (previous.length ? "Preview updated" : `Composed ${response.schema.length} ${response.schema.length === 1 ? "field" : "fields"}`),
            timestamp: new Date(),
          },
        ]);
      } else {
        throw new Error(response.error || "Failed to generate form");
      }
    } catch (error) {
      console.error("Error generating form:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "assistant",
          content: "Sorry, I ran into an issue with that request. Try again with a slightly different description.",
          timestamp: new Date(),
          isError: true,
        },
      ]);
      setActiveView("chat");
    } finally {
      setIsLoading(false);
      setIsGenerating(false);
    }
  };

  const onSchemaUpdate = (schema: FormField[], id: string) => {
    markChanges(formSchema, schema);
    setFormSchema(schema);
    setCurrentSessionId(id);
  };

  return (
    <div className="flex h-full flex-col">
      <h1 className="sr-only">Form builder</h1>

      {/* Phone: one screen at a time */}
      <div className="flex shrink-0 items-center justify-center border-b border-border px-4 py-2 lg:hidden">
        <SegmentedControl
          layoutId="builder-view"
          aria-label="Builder view"
          value={activeView}
          onChange={setActiveView}
          options={[
            { value: "chat", label: "Conversation", icon: <MessagesSquare className="size-4" aria-hidden="true" /> },
            { value: "preview", label: "Preview", icon: <Eye className="size-4" aria-hidden="true" /> },
          ]}
        />
      </div>

      <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(20rem,26rem)_1fr]">
        <div className={cn("min-h-0 flex-col border-border lg:flex lg:border-r", activeView === "chat" ? "flex" : "hidden")}>
          <ChatPanel
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </div>

        <div className={cn("min-h-0 flex-col lg:flex", activeView === "preview" ? "flex" : "hidden")}>
          <PreviewPanel
            formSchema={formSchema}
            sessionId={currentSessionId}
            onNavigate={navigate}
            onSchemaUpdate={onSchemaUpdate}
            isGenerating={isGenerating}
            highlights={highlights}
            onSuggest={(prompt) => handleSendMessage(prompt)}
          />
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
