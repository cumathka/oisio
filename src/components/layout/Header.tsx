"use client";

import React from "react";
import {
  Search,
  Bot,
  Globe,
  Coins,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";
import { Dropdown } from "@/components/ui/Dropdown";
import { Button } from "@/components/ui/Button";

export interface HeaderProps {
  currentProject: string;
  onChangeProject: (projectId: string) => void;
  currentLanguage: string;
  onChangeLanguage: (lang: string) => void;
  currentCurrency: string;
  onChangeCurrency: (currency: string) => void;
  dateRange: string;
  onChangeDateRange: (range: string) => void;
  onOpenCommandPalette: () => void;
  onToggleCopilot: () => void;
  copilotOpen: boolean;
  onRunAudit: () => void;
  isAuditing?: boolean;
}

export function Header({
  currentProject,
  onChangeProject,
  currentLanguage,
  onChangeLanguage,
  currentCurrency,
  onChangeCurrency,
  dateRange,
  onChangeDateRange,
  onOpenCommandPalette,
  onToggleCopilot,
  copilotOpen,
  onRunAudit,
  isAuditing = false,
}: HeaderProps) {
  const projectOptions = [
    {
      value: "swiss-saas",
      label: "Swiss SaaS Demo",
      subtitle: "https://example.ch",
    },
    {
      value: "medtech-zurich",
      label: "MedTech Diagnostics",
      subtitle: "https://medtech.ch",
    },
    {
      value: "alp-retail",
      label: "Alps E-Commerce",
      subtitle: "https://shop.ch",
    },
  ];

  const languageOptions = [
    { value: "de", label: "🌐 Deutsch (DE)", subtitle: "German" },
    { value: "en", label: "🌐 English (US)", subtitle: "English" },
    { value: "tr", label: "🌐 Türkçe (TR)", subtitle: "Turkish" },
    { value: "fr", label: "🌐 Français (FR)", subtitle: "French" },
    { value: "it", label: "🌐 Italiano (IT)", subtitle: "Italian" },
    { value: "es", label: "🌐 Español (ES)", subtitle: "Spanish" },
  ];

  const currencyOptions = [
    { value: "CHF", label: "CHF (Fr.)" },
    { value: "EUR", label: "EUR (€)" },
    { value: "USD", label: "USD ($)" },
    { value: "GBP", label: "GBP (£)" },
    { value: "TRY", label: "TRY (₺)" },
  ];

  const dateRangeOptions = [
    { value: "7d", label: "Last 7 Days" },
    { value: "28d", label: "Last 28 Days" },
    { value: "90d", label: "Last 90 Days" },
    { value: "12m", label: "Last 12 Months" },
  ];

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-20">
      {/* Left section: Project Switcher & Command Search */}
      <div className="flex items-center gap-3">
        <Dropdown
          options={projectOptions}
          value={currentProject}
          onChange={onChangeProject}
          icon={<Layers className="w-3.5 h-3.5 text-indigo-400" />}
          size="sm"
        />

        {/* Search / Command Palette shortcut button */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <Search className="w-3.5 h-3.5 text-slate-500" />
          <span>Quick actions & search...</span>
          <span className="font-mono text-[10px] px-1.5 py-0.2 bg-slate-800 rounded text-slate-400 border border-slate-700">
            ⌘K
          </span>
        </button>
      </div>

      {/* Right section: Date range, Language, Currency, Audit & Copilot triggers */}
      <div className="flex items-center gap-2.5">
        {/* Date Range Selector */}
        <div className="hidden lg:block">
          <Dropdown
            options={dateRangeOptions}
            value={dateRange}
            onChange={onChangeDateRange}
            icon={<Calendar className="w-3.5 h-3.5 text-slate-400" />}
            size="sm"
          />
        </div>

        {/* Language selector */}
        <Dropdown
          options={languageOptions}
          value={currentLanguage}
          onChange={onChangeLanguage}
          size="sm"
        />

        {/* Currency selector */}
        <div className="hidden sm:block">
          <Dropdown
            options={currencyOptions}
            value={currentCurrency}
            onChange={onChangeCurrency}
            size="sm"
          />
        </div>

        {/* Instant Audit Button */}
        <Button
          variant="secondary"
          size="sm"
          onClick={onRunAudit}
          loading={isAuditing}
          icon={<ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
          className="hidden md:inline-flex"
        >
          Audit Site
        </Button>

        {/* AI Copilot Toggle */}
        <Button
          variant={copilotOpen ? "ai" : "outline"}
          size="sm"
          onClick={onToggleCopilot}
          icon={<Sparkles className="w-3.5 h-3.5 text-indigo-300" />}
        >
          <span className="hidden sm:inline">AI Copilot</span>
        </Button>
      </div>
    </header>
  );
}
