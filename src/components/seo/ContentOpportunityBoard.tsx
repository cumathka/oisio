"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Sparkles, Layers, ArrowRight, TrendingUp } from "lucide-react";

export interface ContentCluster {
  id: string;
  stage: "TOFU" | "MOFU" | "BOFU";
  title: string;
  targetKeyword: string;
  volume: string;
  estTraffic: string;
  readiness: "Missing" | "Thin Content" | "Needs Update";
  impact: string;
}

export function ContentOpportunityBoard({
  onAskCopilot,
}: {
  onAskCopilot?: (prompt: string) => void;
}) {
  const clusters: ContentCluster[] = [
    {
      id: "c-1",
      stage: "TOFU",
      title: "Was ist Marketing Intelligence? (Complete Guide 2025)",
      targetKeyword: "marketing intelligence definition schweiz",
      volume: "1.8K/mo",
      estTraffic: "+450 Clicks",
      readiness: "Missing",
      impact: "High Brand Discovery",
    },
    {
      id: "c-2",
      stage: "MOFU",
      title: "Top 7 Marketing Automation Tools im Schweizer KMU Vergleich",
      targetKeyword: "marketing automation tools kmu schweiz",
      volume: "950/mo",
      estTraffic: "+280 Leads",
      readiness: "Thin Content",
      impact: "Consideration Stage Lift",
    },
    {
      id: "c-3",
      stage: "BOFU",
      title: "oiSio vs HubSpot Pricing & ROI Calculator for Swiss Francs",
      targetKeyword: "oisio hubspot alternative schweiz",
      volume: "620/mo",
      estTraffic: "+85 Demos",
      readiness: "Missing",
      impact: "Direct Revenue Conversion",
    },
  ];

  const getStageBadge = (stage: ContentCluster["stage"]) => {
    switch (stage) {
      case "TOFU":
        return (
          <Badge variant="purple" size="sm">
            TOFU • Awareness
          </Badge>
        );
      case "MOFU":
        return (
          <Badge variant="info" size="sm">
            MOFU • Consideration
          </Badge>
        );
      case "BOFU":
        return (
          <Badge variant="success" size="sm">
            BOFU • Decision
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <span>Topic Clusters & Content Funnel Pipeline</span>
            <Badge variant="ai" size="sm">
              Topic Authority Model
            </Badge>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Target high-intent search gaps across Top-of-Funnel (TOFU) to
            Bottom-of-Funnel (BOFU).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {clusters.map((c) => (
          <Card
            key={c.id}
            variant="default"
            padding="md"
            className="flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                {getStageBadge(c.stage)}
                <Badge
                  variant={c.readiness === "Missing" ? "danger" : "warning"}
                  size="sm"
                >
                  {c.readiness}
                </Badge>
              </div>

              <h4 className="text-xs font-semibold text-slate-200 leading-snug">
                {c.title}
              </h4>

              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Target:</span>
                  <span className="font-mono text-slate-200 truncate max-w-[160px]">
                    {c.targetKeyword}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Search Potential:</span>
                  <span className="font-mono text-emerald-400">
                    {c.volume} ({c.estTraffic})
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 mt-4 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-medium">
                {c.impact}
              </span>
              <Button
                size="xs"
                variant="ai"
                onClick={() =>
                  onAskCopilot &&
                  onAskCopilot(
                    `Draft a high-ranking content outline for: "${c.title}" targeting ${c.targetKeyword}`,
                  )
                }
                icon={<Sparkles className="w-3 h-3 text-indigo-300" />}
              >
                Outline Post
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
