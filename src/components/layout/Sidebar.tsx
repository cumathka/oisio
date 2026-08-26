"use client";

import React from "react";
import {
  LayoutDashboard,
  SearchCheck,
  Megaphone,
  TrendingUp,
  Sparkles,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeVariant?: "success" | "warning" | "danger" | "info" | "ai";
}

export interface NavGroup {
  group: string;
  items: NavItem[];
}

export interface SidebarProps {
  activeView: string;
  onSelectView: (id: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  className?: string;
}

export const navigationGroups: NavGroup[] = [
  {
    group: "CORE PLATFORM",
    items: [{ id: "overview", label: "Command Center", icon: LayoutDashboard }],
  },
  {
    group: "GROWTH SUITE",
    items: [
      {
        id: "seo",
        label: "SEO & Audit",
        icon: SearchCheck,
        badge: "3 Critical",
        badgeVariant: "danger",
      },
      {
        id: "ads",
        label: "Google Ads & RSA",
        icon: Megaphone,
        badge: "98% Q-Score",
        badgeVariant: "success",
      },
      { id: "cro", label: "CRO & Friction", icon: TrendingUp },
      {
        id: "ai",
        label: "AI Decision Matrix",
        icon: Sparkles,
        badge: "New",
        badgeVariant: "ai",
      },
    ],
  },
  {
    group: "MANAGEMENT",
    items: [
      { id: "reports", label: "White-Label Reports", icon: FileText },
      { id: "settings", label: "Settings & RBAC", icon: Settings },
    ],
  },
];

export function Sidebar({
  activeView,
  onSelectView,
  collapsed,
  onToggleCollapse,
  className = "",
}: SidebarProps) {
  return (
    <aside
      className={`relative flex flex-col border-r border-slate-800/80 bg-slate-950 transition-all duration-200 z-30 ${
        collapsed ? "w-16" : "w-64"
      } ${className}`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-indigo-950/50">
            <span className="font-extrabold text-sm text-white tracking-wider">
              oi
            </span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-slate-100 flex items-center gap-1.5">
                oiSio
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-950/80 text-indigo-400 border border-indigo-800/50">
                  PRO
                </span>
              </span>
              <span className="text-[10px] text-slate-400 truncate">
                Marketing Intelligence
              </span>
            </div>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={onToggleCollapse}
          className="p-1 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors hidden lg:flex items-center justify-center"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation list */}
      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
        {navigationGroups.map((grp) => (
          <div key={grp.group} className="space-y-1">
            {!collapsed && (
              <div className="px-3 text-[10px] font-bold text-slate-500 tracking-wider">
                {grp.group}
              </div>
            )}
            <div className="space-y-0.5">
              {grp.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectView(item.id)}
                    title={collapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? "bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-sm"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-indigo-400" : "text-slate-400"}`}
                    />
                    {!collapsed && (
                      <span className="flex-1 text-left truncate">
                        {item.label}
                      </span>
                    )}
                    {!collapsed && item.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                          item.badgeVariant === "danger"
                            ? "bg-rose-500/15 text-rose-400 border border-rose-500/20"
                            : item.badgeVariant === "success"
                              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                              : "bg-indigo-500/15 text-indigo-300 border border-indigo-500/20"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Workspace Footer Status */}
      {!collapsed && (
        <div className="p-3 m-2 rounded-xl bg-slate-900/90 border border-slate-800/80">
          <div className="flex items-center justify-between text-[11px] mb-1.5 text-slate-300">
            <span className="flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              SSRF Guard Active
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">100%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
            <div className="bg-emerald-500 h-full w-full rounded-full" />
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 font-mono">
            <span>Audit Quota: 84/100</span>
            <Zap className="w-3 h-3 text-amber-400" />
          </div>
        </div>
      )}
    </aside>
  );
}
