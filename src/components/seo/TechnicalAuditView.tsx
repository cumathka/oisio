"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Search,
  Filter,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { SeoIssueEvidence } from "./SeoEvidenceDrawer";

export interface TechnicalAuditViewProps {
  onOpenEvidence: (issue: SeoIssueEvidence) => void;
  onRunAudit: () => void;
  isAuditing?: boolean;
}

export function TechnicalAuditView({
  onOpenEvidence,
  onRunAudit,
  isAuditing = false,
}: TechnicalAuditViewProps) {
  const [activeTab, setActiveTab] = useState<"critical" | "warning" | "passed">(
    "critical",
  );
  const [searchFilter, setSearchFilter] = useState("");

  const issues: SeoIssueEvidence[] = [
    {
      id: "crit-canonical",
      title: "Missing canonical tag on multi-currency localized pages",
      severity: "CRITICAL",
      url: "https://example.ch/pricing?currency=EUR",
      category: "Indexability & Crawling",
      description:
        'The parameter URL contains self-referencing hreflang but lacks an explicit rel="canonical" pointing to the canonical Swiss Franc (CHF) base URL, causing duplicate indexing risk.',
      evidence: {
        httpStatus: 200,
        rawSnippet:
          '<link rel="alternate" hreflang="de-CH" href="https://example.ch/pricing" />\n<!-- Missing: <link rel="canonical" href="https://example.ch/pricing" /> -->',
        domSelector: 'head > link[rel="canonical"]',
        detectedValue: "null (missing)",
        expectedValue: "https://example.ch/pricing",
      },
      remediationCode:
        '<link rel="canonical" href="https://example.ch/pricing" />',
      impactScore: "4.5 pts",
    },
    {
      id: "crit-noindex",
      title:
        "Accidental noindex directive detected on German high-converting landing page",
      severity: "CRITICAL",
      url: "https://example.ch/de/features/automation",
      category: "Indexing & Robots",
      description:
        "A meta robots tag with noindex, nofollow was detected in production, preventing search engines from indexing a prime B2B conversion page.",
      evidence: {
        httpStatus: 200,
        rawSnippet: '<meta name="robots" content="noindex, nofollow" />',
        domSelector: 'head > meta[name="robots"]',
        detectedValue: "noindex, nofollow",
        expectedValue: "index, follow",
      },
      remediationCode:
        '<meta name="robots" content="index, follow, max-image-preview:large" />',
      impactScore: "8.0 pts",
    },
    {
      id: "crit-cls",
      title: "Cumulative Layout Shift (CLS 0.28) on Hero Section",
      severity: "CRITICAL",
      url: "https://example.ch/de",
      category: "Core Web Vitals",
      description:
        "Dynamic WebFont loading without size-adjust causes headline shift during initial render, failing Google Core Web Vitals thresholds.",
      evidence: {
        httpStatus: 200,
        rawSnippet:
          '@font-face { font-family: "CustomInter"; src: url("/fonts/Inter.woff2"); }',
        domSelector: "body > main > section.hero",
        detectedValue: "CLS: 0.28 (Needs Improvement)",
        expectedValue: "CLS: < 0.10 (Good)",
      },
      remediationCode: "font-display: swap;\nfont-size-adjust: 0.52;",
      impactScore: "3.5 pts",
    },
    {
      id: "warn-h1",
      title: "Multiple H1 headings detected on blog template",
      severity: "WARNING",
      url: "https://example.ch/blog/ai-marketing-trends-2025",
      category: "On-Page Structure",
      description:
        "Page contains two <h1> elements: site banner title and article headline.",
      evidence: {
        httpStatus: 200,
        domSelector: "h1",
        detectedValue: "2 elements found",
        expectedValue: "1 unique h1 per page",
      },
      remediationCode: "Change header logo text from <h1> to <div> or <span>.",
      impactScore: "1.5 pts",
    },
    {
      id: "warn-image-alt",
      title: "6 Product images missing descriptive alt text",
      severity: "WARNING",
      url: "https://example.ch/products",
      category: "Accessibility & SEO",
      description:
        "Images in the feature gallery lack alt attributes, lowering image search rankings and accessibility score.",
      evidence: {
        httpStatus: 200,
        domSelector: "div.feature-grid img",
        detectedValue: '<img src="/assets/dash.png" />',
        expectedValue:
          '<img src="/assets/dash.png" alt="oiSio Dashboard Interface" />',
      },
      remediationCode:
        '<Image src="/assets/dash.png" alt="oiSio Marketing Intelligence Dashboard Overview" />',
      impactScore: "2.0 pts",
    },
    {
      id: "pass-https",
      title: "SSL/TLS Certificate valid with HSTS Preload header",
      severity: "INFO",
      url: "https://example.ch",
      category: "Security & Protocol",
      description:
        "Strict-Transport-Security header is properly configured with max-age=31536000 and includeSubDomains.",
      evidence: {
        httpStatus: 200,
        rawSnippet:
          "Strict-Transport-Security: max-age=31536000; includeSubDomains; preload",
        detectedValue: "max-age=31536000",
        expectedValue: "HSTS Enabled",
      },
    },
    {
      id: "pass-robots",
      title: "Robots.txt reachable and valid syntax",
      severity: "INFO",
      url: "https://example.ch/robots.txt",
      category: "Crawling",
      description:
        "Robots.txt is parsed with 0 syntax errors and references sitemap.xml.",
      evidence: {
        httpStatus: 200,
        rawSnippet:
          "User-agent: *\nAllow: /\nSitemap: https://example.ch/sitemap.xml",
        detectedValue: "Valid",
        expectedValue: "Valid",
      },
    },
  ];

  const filteredIssues = issues
    .filter((iss) => {
      if (activeTab === "critical") return iss.severity === "CRITICAL";
      if (activeTab === "warning") return iss.severity === "WARNING";
      if (activeTab === "passed") return iss.severity === "INFO";
      return true;
    })
    .filter(
      (iss) =>
        iss.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        iss.url.toLowerCase().includes(searchFilter.toLowerCase()) ||
        iss.category.toLowerCase().includes(searchFilter.toLowerCase()),
    );

  const counts = {
    critical: issues.filter((i) => i.severity === "CRITICAL").length,
    warning: issues.filter((i) => i.severity === "WARNING").length,
    passed: issues.filter((i) => i.severity === "INFO").length,
  };

  return (
    <div className="space-y-4">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <span>Technical SEO Diagnostics</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
              108 Checks Total
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Deterministic crawler telemetry with zero hallucination. Click any
            issue to view exact DOM/HTTP evidence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={onRunAudit}
            loading={isAuditing}
            icon={<Zap className="w-3.5 h-3.5 text-indigo-400" />}
          >
            Re-crawl Now
          </Button>
        </div>
      </div>

      {/* Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <Tabs
          items={[
            {
              id: "critical",
              label: "Critical Issues",
              count: counts.critical,
            },
            { id: "warning", label: "Warnings", count: counts.warning },
            { id: "passed", label: "Passed Tests", count: counts.passed },
          ]}
          activeId={activeTab}
          onChange={(id) => setActiveTab(id as any)}
          variant="segmented"
        />

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Filter issues..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full sm:w-60 pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Issue list */}
      <div className="space-y-2.5">
        {filteredIssues.map((issue) => (
          <Card
            key={issue.id}
            variant="interactive"
            padding="sm"
            onClick={() => onOpenEvidence(issue)}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3 min-w-0">
              <div className="mt-0.5 flex-shrink-0">
                {issue.severity === "CRITICAL" && (
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                )}
                {issue.severity === "WARNING" && (
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                )}
                {issue.severity === "INFO" && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
              </div>

              <div className="min-w-0 space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-slate-200">
                    {issue.title}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono px-1.5 py-0.2 rounded bg-slate-950 border border-slate-800">
                    {issue.category}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono truncate">
                  {issue.url}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              {issue.impactScore && (
                <span className="hidden sm:inline text-xs font-mono text-emerald-400 font-medium">
                  +{issue.impactScore}
                </span>
              )}
              <Button
                variant="ghost"
                size="xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenEvidence(issue);
                }}
                iconRight={<ExternalLink className="w-3 h-3 text-slate-400" />}
              >
                View Evidence
              </Button>
            </div>
          </Card>
        ))}

        {filteredIssues.length === 0 && (
          <div className="p-8 text-center text-xs text-slate-500 bg-slate-900/40 rounded-xl border border-slate-800">
            No issues found matching your filter criteria.
          </div>
        )}
      </div>
    </div>
  );
}
