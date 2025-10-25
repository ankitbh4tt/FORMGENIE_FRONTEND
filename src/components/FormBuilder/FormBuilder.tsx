"use client";

import * as React from 'react';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChatPanel from "./ChatPanel";
import PreviewPanel from "./PreviewPanel";
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
  const {
    getUserForms,
    generateFormSchema,
    amendFormSchema,
    getSessionSchema,
  } = useApi();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "assistant",
      content:
        "Hello! I'm your AI form assistant. Describe the form you'd like to create and I'll build it for you in real-time.",
      timestamp: new Date(),
    },
  ]);

  const [currentSessionId, setCurrentSessionId] = useState<string | null | undefined>(sessionId || null);
  const [formSchema, setFormSchema] = useState<FormField[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [activeView, setActiveView] = useState<'chat' | 'preview'>('chat');

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
          setIsGenerating(false);
        });
    }
  }, [sessionId, formSchema.length, isLoading, navigate, getSessionSchema]);

  const handleSendMessage = async (message: string) => {
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
    setIsGenerating(true);

    try {
      let response;

      if (currentSessionId) {
        // Amend existing form
        response = await amendFormSchema(message, currentSessionId);
      } else {
        // Generate new form
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
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Mobile View Toggle */}
      <div className="lg:hidden sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
        <div className="flex">
          <button
            onClick={() => setActiveView('chat')}
            className={`flex-1 py-4 px-6 font-semibold text-sm transition-all duration-200 border-b-2 ${
              activeView === 'chat'
                ? 'border-purple-600 text-purple-600 bg-purple-50'
                : 'border-transparent text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="material-symbols-outlined text-base mr-2 align-middle">chat</span>
            Chat
          </button>
          <button
            onClick={() => setActiveView('preview')}
            className={`flex-1 py-4 px-6 font-semibold text-sm transition-all duration-200 border-b-2 relative ${
              activeView === 'preview'
                ? 'border-purple-600 text-purple-600 bg-purple-50'
                : 'border-transparent text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="material-symbols-outlined text-base mr-2 align-middle">visibility</span>
            Preview
            {formSchema.length > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full"></span>
            )}
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto gap-6 lg:gap-8 h-[calc(100vh-2rem)] lg:h-[calc(100vh-2rem)]">
          {/* Chat Panel */}
          <div className={`${
            activeView === 'chat' ? 'flex' : 'hidden'
          } lg:flex flex-1 min-h-[calc(100vh-8rem)] lg:min-h-0`}>
            <ChatPanel
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          </div>

          {/* Preview Panel */}
          <div className={`${
            activeView === 'preview' ? 'flex' : 'hidden'
          } lg:flex flex-1 min-h-[calc(100vh-8rem)] lg:min-h-0`}>
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
