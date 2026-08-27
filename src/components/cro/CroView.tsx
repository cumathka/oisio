"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  TrendingUp,
  Split,
  MousePointer,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export function CroView({
  onAskCopilot,
}: {
  onAskCopilot?: (prompt: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <span>Conversion Rate & Landing Page Friction</span>
            <Badge variant="ai" size="sm">
              Message Match V2
            </Badge>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Identify copy drop-off, form abandonment, and Ad-to-Lander headline
            dissonance.
          </p>
        </div>

        <Button
          variant="ai"
          size="sm"
          onClick={() =>
            onAskCopilot &&
            onAskCopilot(
              "Generate 3 A/B test hypotheses for improving our demo request form conversion rate.",
            )
          }
          icon={<Sparkles className="w-3.5 h-3.5 text-indigo-300" />}
        >
          Generate A/B Test
        </Button>
      </div>

      {/* Message Match Checkers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card variant="surface" padding="md" className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-200">
              Ad-to-Page Message Match
            </h3>
            <Badge variant="success" size="sm">
              92% Match Score
            </Badge>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 font-mono text-[10px]">
                Google Ads RSA Headline:
              </span>
              <div className="text-slate-200 font-medium">
                "Marketing Intelligence Schweiz — oiSio"
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 font-mono text-[10px]">
                Landing Page H1 Heading:
              </span>
              <div className="text-emerald-400 font-medium">
                "Die führende Schweizer Marketing Intelligence Plattform"
              </div>
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            Strong keyword consistency between search intent, ad copy, and
            above-the-fold headline.
          </p>
        </Card>

        <Card variant="surface" padding="md" className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-200">
              Form Friction Diagnostic
            </h3>
            <Badge variant="warning" size="sm">
              Friction Detected
            </Badge>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Form Fields:</span>
                <span className="font-mono text-amber-400 font-semibold">
                  8 Fields (Recommended: 4)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Field Drop-off Hotspot:</span>
                <span className="font-mono text-rose-400">
                  "Annual Marketing Budget" (64% drop)
                </span>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            Removing the mandatory phone number and annual spend fields is
            projected to lift submissions by{" "}
            <span className="text-emerald-400 font-semibold">+28%</span>.
          </p>
        </Card>
      </div>

      {/* Active Experiments */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <span>Active A/B Test Experiments</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
            2 Running
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card variant="default" padding="md" className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200">
                Test #1: Hero CTA Button Copy
              </span>
              <Badge variant="info" size="sm">
                Confidence: 89%
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                <div className="text-[10px] text-slate-500 font-mono">
                  Control (A)
                </div>
                <div className="font-medium text-slate-300 mt-1">
                  "Kostenlos testen"
                </div>
                <div className="text-slate-400 mt-2 font-mono text-[11px]">
                  CR: 3.4%
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-indigo-500/30">
                <div className="text-[10px] text-indigo-400 font-mono">
                  Variant (B)
                </div>
                <div className="font-medium text-indigo-200 mt-1">
                  "Live Demo buchen (CHF)"
                </div>
                <div className="text-emerald-400 font-bold mt-2 font-mono text-[11px]">
                  CR: 4.8% (+41%)
                </div>
              </div>
            </div>
            <ProgressBar value={89} size="xs" variant="indigo" />
          </Card>

          <Card variant="default" padding="md" className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200">
                Test #2: Multi-Currency Pricing Sticky Header
              </span>
              <Badge variant="info" size="sm">
                Confidence: 94%
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                <div className="text-[10px] text-slate-500 font-mono">
                  Control (A)
                </div>
                <div className="font-medium text-slate-300 mt-1">
                  EUR Static Prices
                </div>
                <div className="text-slate-400 mt-2 font-mono text-[11px]">
                  CR: 2.1%
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-emerald-500/30">
                <div className="text-[10px] text-emerald-400 font-mono">
                  Variant (B)
                </div>
                <div className="font-medium text-emerald-200 mt-1">
                  Auto CHF Geo-Toggle
                </div>
                <div className="text-emerald-400 font-bold mt-2 font-mono text-[11px]">
                  CR: 3.9% (+85%)
                </div>
              </div>
            </div>
            <ProgressBar value={94} size="xs" variant="emerald" />
          </Card>
        </div>
      </div>
    </div>
  );
}
