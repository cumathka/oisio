'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FileText, Download, Send, Sparkles, CheckCircle2 } from 'lucide-react';

export function ReportsView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <span>Executive White-Label Reports</span>
            <Badge variant="ai" size="sm">Brand Voice AI</Badge>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Export comprehensive PDF & client-facing executive summaries with custom logo, color branding, and verified metrics.
          </p>
        </div>

        <Button
          variant="ai"
          size="sm"
          icon={<Download className="w-3.5 h-3.5 text-white" />}
        >
          Generate Monthly PDF Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card variant="surface" padding="md" className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-200">Scheduled Report Automation</h3>
            <Badge variant="success" size="sm">Active (Weekly)</Badge>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every Monday at 08:00 CET, an automated health audit and keyword shift report is dispatched to stakeholders.
          </p>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 font-mono">
            Recipients: ceo@example.ch, marketing@example.ch
          </div>
        </Card>

        <Card variant="surface" padding="md" className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-200">White-Label Branding Config</h3>
            <Badge variant="neutral" size="sm">Configured</Badge>
          </div>
          <div className="space-y-2 text-xs text-slate-400">
            <div className="flex justify-between">
              <span>Agency Name:</span>
              <span className="text-slate-200 font-medium">oiSio Growth Lab AG</span>
            </div>
            <div className="flex justify-between">
              <span>Report Language:</span>
              <span className="text-slate-200 font-medium">Deutsch (Schweiz)</span>
            </div>
            <div className="flex justify-between">
              <span>Currency:</span>
              <span className="text-slate-200 font-medium">CHF (Fr.)</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
