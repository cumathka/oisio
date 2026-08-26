"use client";

import React from "react";
import {
  LayoutDashboard,
  SearchCheck,
  Megaphone,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export interface MobileNavProps {
  activeView: string;
  onSelectView: (view: string) => void;
  onOpenCopilot: () => void;
}

export function MobileNav({
  activeView,
  onSelectView,
  onOpenCopilot,
}: MobileNavProps) {
  const items = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "seo", label: "SEO", icon: SearchCheck },
    { id: "ads", label: "Google Ads", icon: Megaphone },
    { id: "cro", label: "CRO", icon: TrendingUp },
    { id: "ai", label: "Copilot", icon: Sparkles, action: onOpenCopilot },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 h-14 bg-slate-950/95 border-t border-slate-800 backdrop-blur-lg flex items-center justify-around px-2 z-40">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              if (item.action) {
                item.action();
              } else {
                onSelectView(item.id);
              }
            }}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
              isActive
                ? "text-indigo-400"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Icon
              className={`w-4 h-4 ${isActive ? "text-indigo-400" : "text-slate-400"}`}
            />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
