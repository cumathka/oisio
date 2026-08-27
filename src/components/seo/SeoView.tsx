"use client";

import React, { useState } from "react";
import { TechnicalAuditView } from "./TechnicalAuditView";
import { KeywordIntelligenceTable } from "./KeywordIntelligenceTable";
import { ContentOpportunityBoard } from "./ContentOpportunityBoard";
import { SeoEvidenceDrawer, SeoIssueEvidence } from "./SeoEvidenceDrawer";
import { Tabs } from "@/components/ui/Tabs";
import { SearchCheck, Key, BookOpen, BarChart3 } from "lucide-react";

export interface SeoViewProps {
  currency: string;
  onRunAudit: () => void;
  isAuditing?: boolean;
  onAskCopilot?: (prompt: string) => void;
}

export function SeoView({
  currency,
  onRunAudit,
  isAuditing,
  onAskCopilot,
}: SeoViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<
    "technical" | "keywords" | "content"
  >("technical");
  const [selectedEvidenceIssue, setSelectedEvidenceIssue] =
    useState<SeoIssueEvidence | null>(null);

  return (
    <div className="space-y-6">
      {/* Sub navigation for SEO suite */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <Tabs
          items={[
            {
              id: "technical",
              label: "Technical SEO Audit",
              icon: <SearchCheck className="w-3.5 h-3.5" />,
            },
            {
              id: "keywords",
              label: "Keyword Intelligence",
              icon: <Key className="w-3.5 h-3.5" />,
            },
            {
              id: "content",
              label: "Content Pipeline & Funnel",
              icon: <BookOpen className="w-3.5 h-3.5" />,
            },
          ]}
          activeId={activeSubTab}
          onChange={(id) => setActiveSubTab(id as any)}
          variant="segmented"
        />
      </div>

      {/* View switching */}
      {activeSubTab === "technical" && (
        <TechnicalAuditView
          onOpenEvidence={(issue) => setSelectedEvidenceIssue(issue)}
          onRunAudit={onRunAudit}
          isAuditing={isAuditing}
        />
      )}

      {activeSubTab === "keywords" && (
        <KeywordIntelligenceTable currency={currency} />
      )}

      {activeSubTab === "content" && (
        <ContentOpportunityBoard onAskCopilot={onAskCopilot} />
      )}

      {/* Slide-over Evidence Drawer */}
      <SeoEvidenceDrawer
        issue={selectedEvidenceIssue}
        isOpen={!!selectedEvidenceIssue}
        onClose={() => setSelectedEvidenceIssue(null)}
        onApplyFix={(issue) => {
          if (onAskCopilot) {
            onAskCopilot(
              `Fix this technical SEO issue: ${issue.title} on URL: ${issue.url}. Remediation code: ${issue.remediationCode}`,
            );
          }
        }}
      />
    </div>
  );
}
