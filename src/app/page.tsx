'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { DashboardView } from '@/components/dashboard/DashboardView';
import { SeoView } from '@/components/seo/SeoView';
import { AdsView } from '@/components/ads/AdsView';
import { CroView } from '@/components/cro/CroView';
import { DecisionMatrixView } from '@/components/ai/DecisionMatrixView';
import { ReportsView } from '@/components/reports/ReportsView';
import { SettingsView } from '@/components/settings/SettingsView';
import { MarketingCopilotDrawer } from '@/components/ai/MarketingCopilotDrawer';
import { ChannelScore } from '@/components/dashboard/HealthScoreHero';
import { PriorityAction } from '@/components/dashboard/PriorityActionCards';
import { SeoIssueEvidence, SeoEvidenceDrawer } from '@/components/seo/SeoEvidenceDrawer';

export default function DashboardPage() {
  const [activeView, setActiveView] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [copilotPrompt, setCopilotPrompt] = useState('');
  const [selectedEvidenceIssue, setSelectedEvidenceIssue] = useState<SeoIssueEvidence | null>(null);

  // Global Context Controls
  const [project, setProject] = useState('swiss-saas');
  const [language, setLanguage] = useState('de');
  const [currency, setCurrency] = useState('CHF');
  const [dateRange, setDateRange] = useState('28d');

  // Audit state
  const [isAuditing, setIsAuditing] = useState(false);

  // Keyboard shortcut listener for Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const overallScore = 74;
  const channels: ChannelScore[] = [
    { name: 'Technical SEO', score: 88, weight: '30%', status: 'good' },
    { name: 'Google Ads (SEA)', score: 94, weight: '25%', status: 'good' },
    { name: 'Content & Keywords', score: 62, weight: '20%', status: 'warning' },
    { name: 'Conversion & CRO', score: 58, weight: '25%', status: 'warning' },
  ];

  const priorityActions: PriorityAction[] = [
    {
      id: 'act-1',
      category: 'DO_FIRST',
      title: 'Fix Missing Canonical Tags on Multi-Currency Pages',
      what: 'Hreflang exists for /pricing?currency=EUR without rel="canonical" to default CHF.',
      why: 'Duplicate indexing detected by Googlebot in Swiss and DACH regions.',
      impact: '+4.5 SEO Health Points',
      actionText: 'View & Fix Code',
      source: 'oiSio Crawler Diagnostic',
      confidence: 0.98,
      effort: 'Low (15m)',
    },
    {
      id: 'act-2',
      category: 'PLAN',
      title: 'Launch Swiss-German B2B Content Topic Cluster',
      what: 'Create 3 BOFU comparison pages for "Marketing Automatisierung Schweiz".',
      why: 'High commercial intent (3,800/mo) with 42% higher conversion potential.',
      impact: '+85 Qualified Leads / Mo',
      actionText: 'Generate Post Outlines',
      source: 'Google Search Console Aggregates',
      confidence: 0.94,
      effort: 'Medium (2h)',
    },
    {
      id: 'act-3',
      category: 'OPTIONAL',
      title: 'Add Descriptive Alt Text to 6 Product Graphics',
      what: 'Feature gallery images lack descriptive alt attributes.',
      why: 'Improves accessibility compliance and Google Image indexation.',
      impact: '+1.5 SEO Health Points',
      actionText: 'Auto-Generate Alt Tags',
      source: 'Accessibility Inspector',
      confidence: 0.88,
      effort: 'Low (15m)',
    },
  ];

  const handleRunAudit = async () => {
    setIsAuditing(true);
    try {
      await fetch('/api/v1/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: 'https://example.ch' }),
      });
    } catch {
      // Handled
    } finally {
      setTimeout(() => setIsAuditing(false), 800);
    }
  };

  const handleAskCopilot = (prompt: string) => {
    setCopilotPrompt(prompt);
    setCopilotOpen(true);
  };

  const handleExecuteAction = (action: PriorityAction) => {
    if (action.id === 'act-1') {
      setSelectedEvidenceIssue({
        id: 'crit-canonical',
        title: 'Missing canonical tag on multi-currency localized pages',
        severity: 'CRITICAL',
        url: 'https://example.ch/pricing?currency=EUR',
        category: 'Indexability & Crawling',
        description: 'The parameter URL contains self-referencing hreflang but lacks an explicit rel="canonical" pointing to the canonical Swiss Franc (CHF) base URL.',
        evidence: {
          httpStatus: 200,
          rawSnippet: '<link rel="alternate" hreflang="de-CH" href="https://example.ch/pricing" />\n<!-- Missing canonical -->',
          domSelector: 'head > link[rel="canonical"]',
          detectedValue: 'null',
          expectedValue: 'https://example.ch/pricing',
        },
        remediationCode: '<link rel="canonical" href="https://example.ch/pricing" />',
        impactScore: '4.5 pts',
      });
    } else if (action.id === 'act-2') {
      setActiveView('seo');
    } else {
      handleAskCopilot(`Help me resolve: ${action.title}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <div className="flex flex-1 overflow-hidden">
        {/* Collapsible Left Sidebar */}
        <Sidebar
          activeView={activeView}
          onSelectView={setActiveView}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex"
        />

        {/* Main Application Container */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto pb-16 lg:pb-0">
          {/* Top Header */}
          <Header
            currentProject={project}
            onChangeProject={setProject}
            currentLanguage={language}
            onChangeLanguage={setLanguage}
            currentCurrency={currency}
            onChangeCurrency={setCurrency}
            dateRange={dateRange}
            onChangeDateRange={setDateRange}
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
            onToggleCopilot={() => setCopilotOpen(!copilotOpen)}
            copilotOpen={copilotOpen}
            onRunAudit={handleRunAudit}
            isAuditing={isAuditing}
          />

          {/* Dynamic Main Workspace View */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {activeView === 'overview' && (
              <DashboardView
                overallScore={overallScore}
                channels={channels}
                priorityActions={priorityActions}
                currency={currency}
                onNavigate={setActiveView}
                onExecuteAction={handleExecuteAction}
                onOpenEvidence={(action) => handleExecuteAction(action)}
                onAskCopilot={handleAskCopilot}
              />
            )}

            {activeView === 'seo' && (
              <SeoView
                currency={currency}
                onRunAudit={handleRunAudit}
                isAuditing={isAuditing}
                onAskCopilot={handleAskCopilot}
              />
            )}

            {activeView === 'ads' && <AdsView currency={currency} />}

            {activeView === 'cro' && <CroView onAskCopilot={handleAskCopilot} />}

            {activeView === 'ai' && (
              <DecisionMatrixView
                onExecute={(task) => {
                  if (task.channel === 'SEO') setActiveView('seo');
                  else if (task.channel === 'SEA') setActiveView('ads');
                  else if (task.channel === 'CRO') setActiveView('cro');
                }}
              />
            )}

            {activeView === 'reports' && <ReportsView />}

            {activeView === 'settings' && <SettingsView />}
          </main>
        </div>
      </div>

      {/* Global Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={setActiveView}
        onRunAudit={handleRunAudit}
        onOpenCopilot={() => setCopilotOpen(true)}
      />

      {/* Slide-over Evidence Drawer for Deep Traces */}
      <SeoEvidenceDrawer
        issue={selectedEvidenceIssue}
        isOpen={!!selectedEvidenceIssue}
        onClose={() => setSelectedEvidenceIssue(null)}
        onApplyFix={(iss) => handleAskCopilot(`Fix issue: ${iss.title}`)}
      />

      {/* Omnipresent AI Marketing Copilot */}
      <MarketingCopilotDrawer
        isOpen={copilotOpen}
        onClose={() => setCopilotOpen(false)}
        initialPrompt={copilotPrompt}
      />

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeView={activeView}
        onSelectView={setActiveView}
        onOpenCopilot={() => setCopilotOpen(true)}
      />
    </div>
  );
}

