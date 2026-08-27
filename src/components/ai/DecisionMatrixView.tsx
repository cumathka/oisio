"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import {
  Sparkles,
  Zap,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Filter,
} from "lucide-react";
import { DecisionCategory } from "@/core/ai/decision-matrix";

export interface DecisionTask {
  id: string;
  title: string;
  impact: number; // 1 - 10
  effort: number; // 1 - 10
  category: DecisionCategory;
  channel: "SEO" | "SEA" | "CRO" | "CONTENT";
  summary: string;
  confidence: number;
}

export function DecisionMatrixView({
  onExecute,
}: {
  onExecute?: (task: DecisionTask) => void;
}) {
  const [filterChannel, setFilterChannel] = useState<string>("ALL");

  const tasks: DecisionTask[] = [
    {
      id: "d-1",
      title: "Fix Missing Canonical URLs on Multi-Currency Pages",
      impact: 9,
      effort: 2,
      category: "DO_FIRST",
      channel: "SEO",
      summary:
        "Prevents duplicate indexing in Swiss & EU Google SERPs with 10 min code fix.",
      confidence: 0.98,
    },
    {
      id: "d-2",
      title: "Prune 4 Underperforming RSA Headlines with Low CTR (< 1.2%)",
      impact: 8,
      effort: 1,
      category: "DO_FIRST",
      channel: "SEA",
      summary:
        "Instantly increases Google Ads Ad Strength to EXCELLENT and lowers CPC.",
      confidence: 0.95,
    },
    {
      id: "d-3",
      title: "Implement Multi-Language Dynamic Subdirectory Architecture",
      impact: 9,
      effort: 8,
      category: "PLAN",
      channel: "SEO",
      summary:
        "Migrate to /de/, /fr/, /it/ subpaths for full Swiss multilingual topical authority.",
      confidence: 0.92,
    },
    {
      id: "d-4",
      title: "Redesign Pricing Page with Sticky Currency Toggle (CHF / EUR)",
      impact: 8,
      effort: 7,
      category: "PLAN",
      channel: "CRO",
      summary:
        "Directly impacts checkout conversion rate for Swiss corporate purchasers.",
      confidence: 0.89,
    },
    {
      id: "d-5",
      title: "Add Alt Tags to Secondary Blog Illustrations",
      impact: 3,
      effort: 2,
      category: "OPTIONAL",
      channel: "CONTENT",
      summary: "Minor accessibility & Google Image SEO improvement.",
      confidence: 0.85,
    },
    {
      id: "d-6",
      title: "Rewrite 50 Historical Press Releases for 2021 Backlinks",
      impact: 2,
      effort: 9,
      category: "IGNORE",
      channel: "SEO",
      summary: "High effort with negligible organic rank or conversion return.",
      confidence: 0.96,
    },
  ];

  const filtered = tasks.filter(
    (t) => filterChannel === "ALL" || t.channel === filterChannel,
  );

  const quadrants = [
    {
      category: "DO_FIRST" as DecisionCategory,
      title: "Quadrant 1: DO FIRST",
      subtitle: "High Impact • Low Effort (Quick Wins)",
      badgeVariant: "danger" as const,
      icon: Zap,
      borderColor: "border-emerald-500/30",
      bgColor: "bg-emerald-950/10",
    },
    {
      category: "PLAN" as DecisionCategory,
      title: "Quadrant 2: PLAN",
      subtitle: "High Impact • High Effort (Strategic Bets)",
      badgeVariant: "info" as const,
      icon: Clock,
      borderColor: "border-blue-500/30",
      bgColor: "bg-blue-950/10",
    },
    {
      category: "OPTIONAL" as DecisionCategory,
      title: "Quadrant 3: OPTIONAL",
      subtitle: "Low Impact • Low Effort (Fill-ins)",
      badgeVariant: "warning" as const,
      icon: CheckCircle2,
      borderColor: "border-amber-500/30",
      bgColor: "bg-amber-950/10",
    },
    {
      category: "IGNORE" as DecisionCategory,
      title: "Quadrant 4: IGNORE",
      subtitle: "Low Impact • High Effort (Time Wasters)",
      badgeVariant: "neutral" as const,
      icon: XCircle,
      borderColor: "border-slate-800",
      bgColor: "bg-slate-950/40",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <span>AI Opportunity Decision Matrix</span>
            <Badge variant="ai" size="sm">
              Eisenhower + ICE Model
            </Badge>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Every marketing initiative is plotted mathematically by Impact
            (1-10) vs Effort (1-10) with verified truthfulness grounding.
          </p>
        </div>

        <Tabs
          items={[
            { id: "ALL", label: "All Channels" },
            { id: "SEO", label: "SEO" },
            { id: "SEA", label: "Google Ads" },
            { id: "CRO", label: "CRO" },
          ]}
          activeId={filterChannel}
          onChange={setFilterChannel}
          variant="segmented"
        />
      </div>

      {/* 2x2 Quadrant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quadrants.map((quad) => {
          const quadTasks = filtered.filter(
            (t) => t.category === quad.category,
          );
          const Icon = quad.icon;

          return (
            <div
              key={quad.category}
              className={`p-4 rounded-xl border ${quad.borderColor} ${quad.bgColor} flex flex-col justify-between min-h-[220px]`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-slate-200" />
                    <div>
                      <h3 className="text-xs font-bold text-slate-100">
                        {quad.title}
                      </h3>
                      <p className="text-[10px] text-slate-400">
                        {quad.subtitle}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
                    {quadTasks.length}{" "}
                    {quadTasks.length === 1 ? "task" : "tasks"}
                  </span>
                </div>

                <div className="space-y-2">
                  {quadTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-200 line-clamp-1">
                          {task.title}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
                          {task.channel}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        {task.summary}
                      </p>

                      <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-slate-500">
                        <span>
                          Impact: {task.impact}/10 • Effort: {task.effort}/10
                        </span>
                        {task.category !== "IGNORE" && (
                          <button
                            onClick={() => onExecute && onExecute(task)}
                            className="text-indigo-400 hover:text-indigo-300 font-sans font-medium"
                          >
                            Execute →
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {quadTasks.length === 0 && (
                    <div className="p-4 text-center text-xs text-slate-500">
                      No initiatives currently in this quadrant.
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
