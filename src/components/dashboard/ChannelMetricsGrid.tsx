'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  TrendingUp,
  Search,
  MousePointerClick,
  Percent,
  ArrowUpRight,
  DollarSign,
} from 'lucide-react';

export interface MetricCardItem {
  id: string;
  title: string;
  value: string;
  subtext: string;
  change: string;
  isPositive: boolean;
  channel: string;
}

export function ChannelMetricsGrid({ currency = 'CHF' }: { currency?: string }) {
  const metrics: MetricCardItem[] = [
    {
      id: 'organic-traffic',
      title: 'SEO Organic Impressions',
      value: '142.8K',
      subtext: '4.2k Clicks (CTR 2.9%)',
      change: '+14.2%',
      isPositive: true,
      channel: 'SEO Suite',
    },
    {
      id: 'ad-spend',
      title: `Google Ads Cost (${currency})`,
      value: `${currency === 'CHF' ? 'Fr. ' : currency === 'EUR' ? '€' : '$'}3,420`,
      subtext: 'Avg. CPC 1.84 • ROAS 4.8x',
      change: '+8.1%',
      isPositive: true,
      channel: 'SEA Suite',
    },
    {
      id: 'rsa-score',
      title: 'RSA Ad Strength',
      value: '94.2%',
      subtext: '12 Active Ads • 0 Policy Warnings',
      change: '+4.0%',
      isPositive: true,
      channel: 'SEA Suite',
    },
    {
      id: 'cro-rate',
      title: 'Landing Page Conv. Rate',
      value: '3.82%',
      subtext: 'Target 4.50% • 3 Tests Running',
      change: '-0.3%',
      isPositive: false,
      channel: 'CRO Suite',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m) => (
        <Card key={m.id} variant="default" padding="sm" className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium">{m.title}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
              {m.channel}
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-xl font-bold font-mono text-slate-100">{m.value}</span>
            <span
              className={`text-xs font-mono font-semibold flex items-center gap-0.5 ${
                m.isPositive ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {m.change}
            </span>
          </div>

          <p className="text-[11px] text-slate-400 truncate">{m.subtext}</p>
        </Card>
      ))}
    </div>
  );
}
