'use client';

import React from 'react';
import { ShieldCheck, ArrowUpRight, Sparkles, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';

export interface ChannelScore {
  name: string;
  score: number;
  weight: string;
  status: 'good' | 'warning' | 'danger';
}

export interface HealthScoreHeroProps {
  overallScore: number;
  previousScore?: number;
  channels: ChannelScore[];
  onExploreChannel?: (channelName: string) => void;
}

export function HealthScoreHero({
  overallScore = 74,
  previousScore = 69,
  channels,
  onExploreChannel,
}: HealthScoreHeroProps) {
  const diff = overallScore - previousScore;

  return (
    <Card variant="surface" className="relative overflow-hidden border-indigo-900/40">
      {/* Background ambient gradient */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
        {/* Left: Overall Health Score */}
        <div className="flex items-center gap-5">
          <div className="relative flex items-center justify-center">
            {/* Circular or Compact Gauge */}
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-900/60 to-slate-900 border border-indigo-500/30 flex flex-col items-center justify-center shadow-lg shadow-indigo-950/50">
              <span className="text-3xl font-extrabold text-white tracking-tight font-mono">
                {overallScore}
              </span>
              <span className="text-[10px] uppercase font-semibold text-indigo-300 tracking-wider">
                / 100 Health
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-100">Overall Marketing Health</h2>
              <Badge variant="success" size="sm" icon={<TrendingUp className="w-3 h-3" />}>
                +{diff}% vs last month
              </Badge>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Based on <span className="text-slate-200 font-medium">108 deterministic checkpoints</span> across Technical SEO, Google Ads RSA compliance, Landing Page friction, and Content depth.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <Badge variant="ai" size="sm" icon={<Sparkles className="w-3 h-3" />}>
                Deterministic Scoring Engine Active
              </Badge>
            </div>
          </div>
        </div>

        {/* Right: Channel Breakdown Bars */}
        <div className="w-full lg:w-96 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {channels.map((ch) => (
            <div
              key={ch.name}
              onClick={() => onExploreChannel && onExploreChannel(ch.name)}
              className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-slate-300">{ch.name}</span>
                <span className="font-mono font-bold text-slate-200">{ch.score}%</span>
              </div>
              <ProgressBar
                value={ch.score}
                size="xs"
                variant={ch.score >= 80 ? 'emerald' : ch.score >= 60 ? 'amber' : 'rose'}
              />
              <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1 font-mono">
                <span>Weight: {ch.weight}</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
