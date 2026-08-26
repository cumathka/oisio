'use client';

import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Zap,
  Clock,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface PriorityAction {
  id: string;
  category: 'DO_FIRST' | 'PLAN' | 'OPTIONAL';
  title: string;
  what: string;
  why: string;
  impact: string;
  actionText: string;
  source: string;
  confidence: number;
  effort: 'Low (15m)' | 'Medium (2h)' | 'High (2d)';
}

export interface PriorityActionCardsProps {
  actions: PriorityAction[];
  onExecuteAction: (action: PriorityAction) => void;
  onOpenEvidence?: (action: PriorityAction) => void;
}

export function PriorityActionCards({
  actions,
  onExecuteAction,
  onOpenEvidence,
}: PriorityActionCardsProps) {
  const getCategoryBadge = (cat: PriorityAction['category']) => {
    switch (cat) {
      case 'DO_FIRST':
        return <Badge variant="danger" size="md" icon={<Zap className="w-3 h-3" />}>DO FIRST (Urgent)</Badge>;
      case 'PLAN':
        return <Badge variant="info" size="md" icon={<Clock className="w-3 h-3" />}>PLAN (Strategic)</Badge>;
      case 'OPTIONAL':
        return <Badge variant="warning" size="md" icon={<CheckCircle2 className="w-3 h-3" />}>OPTIONAL (Incremental)</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <span>Prioritized Growth Actions</span>
            <Badge variant="ai" size="sm">Decision Engine V2</Badge>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Ranked deterministically by Impact $\times$ Confidence $\div$ Effort. Grounded in actual crawl logs & Ads telemetry.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {actions.map((act) => (
          <Card
            key={act.id}
            variant="default"
            padding="md"
            className="flex flex-col justify-between hover:border-slate-700 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                {getCategoryBadge(act.category)}
                <span className="text-[10px] font-mono text-slate-400">{act.effort}</span>
              </div>

              <h4 className="text-sm font-semibold text-slate-200 line-clamp-2">
                {act.title}
              </h4>

              <div className="space-y-2 text-xs">
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 space-y-1.5">
                  <div>
                    <span className="text-slate-400 font-medium">WHAT: </span>
                    <span className="text-slate-200">{act.what}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">WHY: </span>
                    <span className="text-slate-300">{act.why}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <TrendingUpIcon className="w-3.5 h-3.5" />
                    Impact: {act.impact}
                  </span>
                  <span className="font-mono text-indigo-400">
                    {Math.round(act.confidence * 100)}% Conf.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between gap-2">
              {onOpenEvidence && (
                <button
                  onClick={() => onOpenEvidence(act)}
                  className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
                >
                  <span>Evidence</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}

              <Button
                size="sm"
                variant={act.category === 'DO_FIRST' ? 'primary' : 'secondary'}
                onClick={() => onExecuteAction(act)}
                icon={<Sparkles className="w-3 h-3 text-indigo-300" />}
              >
                {act.actionText}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function TrendingUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
    </svg>
  );
}
