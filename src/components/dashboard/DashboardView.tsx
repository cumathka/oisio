'use client';

import React from 'react';
import { HealthScoreHero, ChannelScore } from './HealthScoreHero';
import { PriorityActionCards, PriorityAction } from './PriorityActionCards';
import { ChannelMetricsGrid } from './ChannelMetricsGrid';
import { AiGrowthBanner } from './AiGrowthBanner';

export interface DashboardViewProps {
  overallScore: number;
  channels: ChannelScore[];
  priorityActions: PriorityAction[];
  currency: string;
  onNavigate: (viewId: string) => void;
  onExecuteAction: (action: PriorityAction) => void;
  onOpenEvidence: (action: PriorityAction) => void;
  onAskCopilot: (prompt: string) => void;
}

export function DashboardView({
  overallScore,
  channels,
  priorityActions,
  currency,
  onNavigate,
  onExecuteAction,
  onOpenEvidence,
  onAskCopilot,
}: DashboardViewProps) {
  return (
    <div className="space-y-6">
      {/* 1. Health Score Hero & Channel Mini Bars */}
      <HealthScoreHero
        overallScore={overallScore}
        channels={channels}
        onExploreChannel={(ch) => {
          if (ch.includes('SEO') || ch.includes('Technical')) onNavigate('seo');
          else if (ch.includes('SEA') || ch.includes('Ads')) onNavigate('ads');
          else if (ch.includes('CRO')) onNavigate('cro');
          else onNavigate('seo');
        }}
      />

      {/* 2. Proactive AI Opportunity Insight Banner */}
      <AiGrowthBanner onAskCopilot={onAskCopilot} />

      {/* 3. Top 3 Priority Actions Matrix (DO FIRST / PLAN / OPTIONAL) */}
      <PriorityActionCards
        actions={priorityActions}
        onExecuteAction={onExecuteAction}
        onOpenEvidence={onOpenEvidence}
      />

      {/* 4. Compact 4-channel live metrics */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-100">Performance Snapshot</h3>
        <ChannelMetricsGrid currency={currency} />
      </div>
    </div>
  );
}
