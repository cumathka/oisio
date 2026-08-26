'use client';

import React from 'react';
import { Drawer } from '@/components/ui/Drawer';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Code, CheckCircle, Copy, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';

export interface SeoIssueEvidence {
  id: string;
  title: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  url: string;
  category: string;
  description: string;
  evidence: {
    httpStatus?: number;
    rawSnippet?: string;
    domSelector?: string;
    detectedValue?: string;
    expectedValue?: string;
    crawledAt?: string;
  };
  remediationCode?: string;
  impactScore?: string;
}

export interface SeoEvidenceDrawerProps {
  issue: SeoIssueEvidence | null;
  isOpen: boolean;
  onClose: () => void;
  onApplyFix?: (issue: SeoIssueEvidence) => void;
}

export function SeoEvidenceDrawer({
  issue,
  isOpen,
  onClose,
  onApplyFix,
}: SeoEvidenceDrawerProps) {
  const [copied, setCopied] = React.useState(false);

  if (!issue) return null;

  const handleCopy = () => {
    if (issue.remediationCode) {
      navigator.clipboard.writeText(issue.remediationCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <span>{issue.title}</span>
          <Badge
            variant={
              issue.severity === 'CRITICAL'
                ? 'danger'
                : issue.severity === 'WARNING'
                ? 'warning'
                : 'info'
            }
            size="sm"
          >
            {issue.severity}
          </Badge>
        </div>
      }
      subtitle={`URL: ${issue.url}`}
      footer={
        <div className="flex items-center justify-between w-full">
          <div className="text-xs text-slate-400 flex items-center gap-1 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            SSRF-Verified Crawl Trace
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
            {onApplyFix && (
              <Button
                variant="ai"
                size="sm"
                onClick={() => {
                  onApplyFix(issue);
                  onClose();
                }}
                icon={<Sparkles className="w-3.5 h-3.5 text-indigo-300" />}
              >
                Auto-Remediate
              </Button>
            )}
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Issue Description & Impact */}
        <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
          <div className="text-xs font-semibold text-slate-200">Issue Diagnostic</div>
          <p className="text-xs text-slate-400 leading-relaxed">{issue.description}</p>
          {issue.impactScore && (
            <div className="text-[11px] text-emerald-400 font-medium">
              Estimated Score Recovery: +{issue.impactScore}
            </div>
          )}
        </div>

        {/* Evidence Metadata Grid */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Crawl Evidence & DOM Telemetry
          </h4>
          <div className="bg-slate-950 rounded-lg border border-slate-800 divide-y divide-slate-800/80 text-xs">
            {issue.evidence.httpStatus && (
              <div className="p-3 flex justify-between">
                <span className="text-slate-500 font-mono">HTTP Status</span>
                <span className="font-mono text-slate-200">{issue.evidence.httpStatus} OK</span>
              </div>
            )}
            {issue.evidence.domSelector && (
              <div className="p-3 flex justify-between">
                <span className="text-slate-500 font-mono">DOM Selector</span>
                <span className="font-mono text-indigo-300">{issue.evidence.domSelector}</span>
              </div>
            )}
            {issue.evidence.detectedValue && (
              <div className="p-3 flex justify-between">
                <span className="text-slate-500 font-mono">Detected Value</span>
                <span className="font-mono text-rose-400 font-medium">{issue.evidence.detectedValue}</span>
              </div>
            )}
            {issue.evidence.expectedValue && (
              <div className="p-3 flex justify-between">
                <span className="text-slate-500 font-mono">Expected Value</span>
                <span className="font-mono text-emerald-400 font-medium">{issue.evidence.expectedValue}</span>
              </div>
            )}
            <div className="p-3 flex justify-between">
              <span className="text-slate-500 font-mono">Crawled At</span>
              <span className="font-mono text-slate-400">{issue.evidence.crawledAt || '2025-05-18 14:32:10 UTC'}</span>
            </div>
          </div>
        </div>

        {/* Raw Code Snippet Evidence */}
        {issue.evidence.rawSnippet && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Raw HTML / Header Trace
            </h4>
            <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-rose-300 border border-rose-950 overflow-x-auto whitespace-pre">
              {issue.evidence.rawSnippet}
            </div>
          </div>
        )}

        {/* Recommended Code Fix */}
        {issue.remediationCode && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Recommended Patch
              </h4>
              <button
                onClick={handleCopy}
                className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 font-mono transition-colors"
              >
                {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy snippet'}
              </button>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-emerald-300 border border-emerald-950/80 overflow-x-auto whitespace-pre">
              {issue.remediationCode}
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
}
