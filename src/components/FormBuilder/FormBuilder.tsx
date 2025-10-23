"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChatPanel from "./ChatPanel";
import PreviewPanel from "./PreviewPanel";
import LoadingOverlay from "../ui/LoadingOverlay";
import { useApi } from "../../../services/api";
import toast from "react-hot-toast";

const FormBuilder = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const {
    getUserForms,
    generateFormSchema,
    amendFormSchema,
    getSessionSchema,
  } = useApi();

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      content:
        "Hello! I'm your AI form assistant. Describe the form you'd like to create and I'll build it for you in real-time.",
      timestamp: new Date(),
    },
  ]);

  const [currentSessionId, setCurrentSessionId] = useState(sessionId || null);
  const [formSchema, setFormSchema] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (sessionId && !formSchema.length && !isLoading) {
      setIsLoading(true);
      setLoadingMessage("Loading your form session...");
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
                  "Your form session has been loaded. You can continue editing or make new changes!",
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
          setLoadingMessage("");
        });
    }
  }, [sessionId, formSchema.length, isLoading, navigate, getSessionSchema]);

  const handleSendMessage = async (message) => {
    if (!message.trim() || isLoading) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setLoadingMessage("AI is analyzing your request...");

    try {
      let response;

      if (currentSessionId) {
        // Amend existing form
        setLoadingMessage("Updating your form...");
        response = await amendFormSchema(message, currentSessionId);
      } else {
        // Generate new form
        setLoadingMessage("Creating your form...");
        response = await generateFormSchema(message);
        setCurrentSessionId(response.sessionId);

        // Update URL without page reload
        window.history.pushState({}, "", `/builder/${response.sessionId}`);
      }

      if (response.success) {
        setFormSchema(response.schema);

        // Add success message
        const assistantMessage = {
          id: Date.now() + 1,
          type: "assistant",
          content: currentSessionId
            ? "I've updated your form based on your feedback. Check the preview to see the changes!"
            : "Perfect! I've created your form. You can see it in the preview panel. Would you like to make any adjustments?",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);

        // Add divider message
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 2,
              type: "divider",
              content: "Preview Updated",
              timestamp: new Date(),
            },
          ]);
        }, 500);
      } else {
        throw new Error(response.error || "Failed to generate form");
      }
    } catch (error) {
      console.error("Error generating form:", error);

      const errorMessage = {
        id: Date.now() + 1,
        type: "assistant",
        content:
          "I'm sorry, I encountered an error while processing your request. Please try again with a different description.",
        timestamp: new Date(),
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto gap-6 lg:gap-8 h-[calc(100vh-2rem)]">
        <ChatPanel
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />

        <PreviewPanel
          formSchema={formSchema}
          sessionId={currentSessionId}
          onNavigate={navigate}
        />
      </div>

      {isLoading && <LoadingOverlay message={loadingMessage} />}
    </div>
  );
};

export default FormBuilder;
