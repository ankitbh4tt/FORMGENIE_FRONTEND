import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MessagesSquare, Eye } from "lucide-react";
import ChatPanel from "./ChatPanel";
import PreviewPanel from "./PreviewPanel";
import { SegmentedControl } from "../ui/segmented";
import { useApi } from "../../../services/api";
import toast from "react-hot-toast";

interface Message {
  id: number | string;
  type: string;
  content: string;
  timestamp: Date;
  isError?: boolean;
}

interface FormField {
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
}

const FormBuilder = (): React.ReactElement => {
  const { sessionId } = useParams();
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

  const [currentSessionId, setCurrentSessionId] = useState<
    string | null | undefined
  >(sessionId || null);
  const [formSchema, setFormSchema] = useState<FormField[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [activeView, setActiveView] = useState<"chat" | "preview">("chat");

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
                content:
                  "Your session is loaded. Continue editing or make new changes whenever you like.",
                timestamp: new Date(),
              },
            ]);
          } else {
            toast.error("Session not found");
            navigate("/builder");
          }
        })
        .catch((err) => {
          toast.error("Failed to load session");
          console.error("Error loading session:", err);
          navigate("/builder");
        })
        .finally(() => {
          setIsLoading(false);
          setIsGenerating(false);
        });
    }
  }, [sessionId, formSchema.length, isLoading, navigate, getSessionSchema]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage = {
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

        const assistantMessage = {
          id: Date.now() + 1,
          type: "assistant",
          content: currentSessionId
            ? "Done! I've updated your form. Check the preview to see the changes."
            : "Here's your form. Take a look in the preview. Want to adjust anything?",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 2,
              type: "divider",
              content: "Preview updated",
              timestamp: new Date(),
            },
          ]);
        }, 500);
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
          content:
            "Sorry, I ran into an issue with that request. Try again with a slightly different description.",
          timestamp: new Date(),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Mobile view toggle */}
      <div className="flex items-center justify-center border-b border-border bg-bg/80 px-4 py-2.5 backdrop-blur lg:hidden">
        <SegmentedControl
          layoutId="builder-view"
          value={activeView}
          onChange={setActiveView}
          options={[
            { value: "chat", label: "Chat", icon: <MessagesSquare className="size-4" /> },
            { value: "preview", label: "Preview", icon: <Eye className="size-4" /> },
          ]}
        />
      </div>

      <div className="min-h-0 flex-1 p-3 sm:p-4">
        <div className="mx-auto flex h-full max-w-6xl gap-4">
          <div
            className={`${
              activeView === "chat" ? "flex" : "hidden"
            } min-h-0 flex-1 lg:flex`}
          >
            <ChatPanel
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          </div>

          <div
            className={`${
              activeView === "preview" ? "flex" : "hidden"
            } min-h-0 flex-1 lg:flex`}
          >
            <PreviewPanel
              formSchema={formSchema}
              sessionId={currentSessionId}
              onNavigate={navigate}
              onSchemaUpdate={(schema, sessionId) => {
                setFormSchema(schema);
                setCurrentSessionId(sessionId);
              }}
              isGenerating={isGenerating}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
