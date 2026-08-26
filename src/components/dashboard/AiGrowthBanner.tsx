'use client';

import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface AiGrowthBannerProps {
  onAskCopilot?: (prompt: string) => void;
}

export function AiGrowthBanner({ onAskCopilot }: AiGrowthBannerProps) {
  const suggestedPrompt = "Analyze the Swiss German search intent gap for our top 5 B2B keywords and generate 3 localized RSA headlines.";

  return (
    <Card variant="ai" padding="md" className="relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 flex-shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-100">
                Proactive Opportunity Detected (Swiss DACH Market)
              </h3>
              <Badge variant="ai" size="sm">Evidence Grounded</Badge>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              Swiss users searching for <span className="font-mono text-indigo-300">"Marketing Automatisierung Schweiz"</span> show a <span className="text-emerald-400 font-semibold">+42% higher conversion rate</span> on German landing pages with explicit CHF pricing than generic Euro SaaS pages.
            </p>
            <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-0.5">
              <span className="flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                Source: GSC Query Aggregates + GAds Conv. API
              </span>
              <span>•</span>
              <span className="text-indigo-300 font-mono">Confidence: 96%</span>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0">
          <Button
            size="sm"
            variant="ai"
            onClick={() => onAskCopilot && onAskCopilot(suggestedPrompt)}
            iconRight={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Execute with Copilot
          </Button>
        </div>
      </div>
    </Card>
  );
}
