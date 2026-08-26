"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  LayoutDashboard,
  SearchCheck,
  Megaphone,
  TrendingUp,
  Bot,
  FileText,
  Settings,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (viewId: string) => void;
  onRunAudit?: () => void;
  onOpenCopilot?: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: "Navigation" | "Actions" | "Tools";
  action: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onNavigate,
  onRunAudit,
  onOpenCopilot,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: CommandItem[] = [
    {
      id: "nav-overview",
      title: "Overview Dashboard",
      description: "View total health score and top priority actions",
      icon: <LayoutDashboard className="w-4 h-4 text-indigo-400" />,
      category: "Navigation",
      action: () => {
        onNavigate("overview");
        onClose();
      },
    },
    {
      id: "nav-seo",
      title: "SEO Suite & Audit",
      description:
        "Technical audits, keyword intelligence, and content clusters",
      icon: <SearchCheck className="w-4 h-4 text-emerald-400" />,
      category: "Navigation",
      action: () => {
        onNavigate("seo");
        onClose();
      },
    },
    {
      id: "nav-ads",
      title: "Google Ads & RSA Builder",
      description: "Campaign wizard and responsive search ad builder",
      icon: <Megaphone className="w-4 h-4 text-amber-400" />,
      category: "Navigation",
      action: () => {
        onNavigate("ads");
        onClose();
      },
    },
    {
      id: "nav-cro",
      title: "CRO & Landing Page Friction",
      description: "Message match analysis and A/B test experiments",
      icon: <TrendingUp className="w-4 h-4 text-purple-400" />,
      category: "Navigation",
      action: () => {
        onNavigate("cro");
        onClose();
      },
    },
    {
      id: "nav-ai",
      title: "AI Priority Matrix",
      description: "4-quadrant impact vs effort decision matrix",
      icon: <Sparkles className="w-4 h-4 text-indigo-400" />,
      category: "Navigation",
      action: () => {
        onNavigate("ai");
        onClose();
      },
    },
    {
      id: "action-audit",
      title: "Run Instant SEO Security Audit",
      description: "Execute SSRF-guarded crawler & deterministic audit",
      icon: <ShieldAlert className="w-4 h-4 text-rose-400" />,
      category: "Actions",
      action: () => {
        if (onRunAudit) onRunAudit();
        onClose();
      },
    },
    {
      id: "action-copilot",
      title: "Open Marketing Copilot",
      description: "Ask AI questions regarding your marketing data",
      icon: <Bot className="w-4 h-4 text-indigo-400" />,
      category: "Actions",
      action: () => {
        if (onOpenCopilot) onOpenCopilot();
        onClose();
      },
    },
    {
      id: "nav-reports",
      title: "White-Label Reports",
      description: "Generate client PDF report with brand voice",
      icon: <FileText className="w-4 h-4 text-slate-400" />,
      category: "Tools",
      action: () => {
        onNavigate("reports");
        onClose();
      },
    },
    {
      id: "nav-settings",
      title: "Workspace Settings & Integrations",
      description: "Manage RBAC permissions and connected accounts",
      icon: <Settings className="w-4 h-4 text-slate-400" />,
      category: "Tools",
      action: () => {
        onNavigate("settings");
        onClose();
      },
    },
  ];

  const filtered = commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, filtered, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-start justify-center p-4 pt-20 text-center sm:p-0">
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        <div className="relative w-full max-w-xl transform overflow-hidden rounded-xl bg-slate-900 border border-slate-700 shadow-2xl text-left transition-all z-10">
          {/* Search Input */}
          <div className="relative flex items-center border-b border-slate-800 px-4 py-3">
            <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
            <input
              type="text"
              className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
              placeholder="Search views, actions, commands (e.g. 'audit', 'seo', 'ads')..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              ESC
            </span>
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                No commands matching &ldquo;{query}&rdquo;
              </div>
            ) : (
              <div className="space-y-1">
                {filtered.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-colors ${
                        isSelected
                          ? "bg-indigo-600/20 text-indigo-200 border border-indigo-500/30"
                          : "text-slate-300 hover:bg-slate-800/60 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="p-1.5 rounded-md bg-slate-950/60 border border-slate-800">
                          {item.icon}
                        </span>
                        <div>
                          <div className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                            {item.title}
                            <span className="text-[10px] text-slate-500 font-normal">
                              ({item.category})
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            {item.description}
                          </div>
                        </div>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 text-slate-500 ${isSelected ? "opacity-100 text-indigo-400" : "opacity-0"}`}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="border-t border-slate-800 bg-slate-950/60 px-4 py-2 text-[11px] text-slate-500 flex items-center justify-between">
            <div className="flex items-center gap-3 font-mono">
              <span>↑↓ to navigate</span>
              <span>↵ to select</span>
              <span>esc to close</span>
            </div>
            <span className="text-indigo-400">oiSio Intelligence</span>
          </div>
        </div>
      </div>
    </div>
  );
}
