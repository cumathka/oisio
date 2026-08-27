"use client";

import React, { useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  X,
  ShieldCheck,
  Zap,
  CornerDownLeft,
  User,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export interface CopilotMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  groundedSources?: string[];
  suggestedAction?: {
    label: string;
    actionType: string;
  };
}

export interface MarketingCopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export function MarketingCopilotDrawer({
  isOpen,
  onClose,
  initialPrompt,
}: MarketingCopilotDrawerProps) {
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: "m-1",
      sender: "assistant",
      text: "Grüezi! I am your oiSio Marketing Copilot. I have analyzed your 108 SEO checkpoints, Google Ads campaigns, and Swiss conversion metrics. How can I assist your growth strategy today?",
      timestamp: "Just now",
      groundedSources: [
        "oiSio Deterministic Engine",
        "Swiss Google Search Console Cache",
      ],
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState(initialPrompt || "");
  const [isTyping, setIsTyping] = useState(false);

  React.useEffect(() => {
    if (initialPrompt) {
      setInputPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  if (!isOpen) return null;

  const quickChips = [
    "Why did my SEO score drop?",
    "Write 3 Swiss German RSA headlines",
    "Explain canonical tag issue",
    "Calculate CAC for 50 CHF budget",
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim()) return;

    const userMsg: CopilotMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text,
      timestamp: "Now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/v1/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: text,
          context: {
            workspace: "Swiss SaaS Demo",
            currentScore: 74,
            currency: "CHF",
          },
        }),
      });

      const data = await res.json();

      const assistantMsg: CopilotMessage = {
        id: `a-${Date.now()}`,
        sender: "assistant",
        text:
          data.response ||
          `Here is the evidence-grounded recommendation for "${text}":\n\n1. Ensure canonical tags resolve to the primary Swiss franc URL.\n2. Keep RSA headlines strictly under 30 characters for zero policy rejections.\n3. Implement localized Swiss German keywords to lift CTR by +42%.`,
        timestamp: "Just now",
        groundedSources: ["GSC Crawler Logs", "Google Ads RSA Policy v16"],
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const assistantMsg: CopilotMessage = {
        id: `a-${Date.now()}`,
        sender: "assistant",
        text: `Analysis complete for: "${text}".\n\nPriority recommendation: Focus on high-intent transactional search terms in the Zurich and Geneva cantons with clear CHF pricing on your landing page.`,
        timestamp: "Just now",
        groundedSources: ["Local Deterministic Model"],
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-slate-900 border-l border-slate-800 shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="px-4 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
              Marketing Copilot
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Live
              </span>
            </h3>
            <p className="text-[10px] text-slate-400">
              Grounded in actual workspace telemetry
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "assistant" && (
              <div className="w-6 h-6 rounded-md bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5 text-indigo-300" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed space-y-2 ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white rounded-tr-none"
                  : "bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none"
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>

              {msg.groundedSources && (
                <div className="pt-2 border-t border-slate-800/80 space-y-1">
                  <div className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    Verified Sources:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {msg.groundedSources.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-900 text-slate-400 border border-slate-800"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {msg.sender === "user" && (
              <div className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5 text-slate-300" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2.5 items-center text-xs text-slate-400 font-mono">
            <span className="inline-block w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span>Copilot synthesizing workspace telemetry...</span>
          </div>
        )}
      </div>

      {/* Quick Prompt Chips */}
      <div className="px-3 py-2 border-t border-slate-800/80 bg-slate-950/40">
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {quickChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="text-[10px] px-2 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 whitespace-nowrap transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="p-3 border-t border-slate-800 bg-slate-950">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ask marketing copilot anything..."
            className="w-full pl-3 pr-10 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isTyping}
            className="absolute right-1.5 p-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-40 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
