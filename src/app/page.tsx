"use client";

import React, { useState } from "react";
import {
  Activity,
  ShieldCheck,
  TrendingUp,
  Search,
  Sparkles,
  Layers,
  ArrowUpRight,
  Globe,
  Sliders,
  DollarSign,
  Send,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";
import { translations } from "@/lib/i18n/translations";

type LocaleKey = keyof typeof translations;

export default function DashboardPage() {
  const [currentLocale, setCurrentLocale] = useState<LocaleKey>("en");
  const [currency, setCurrency] = useState("CHF");
  const [activeTab, setActiveTab] = useState<
    "overview" | "audit" | "rsa" | "copilot"
  >("overview");

  const [auditUrl, setAuditUrl] = useState("https://example.ch");
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<any>(null);
  const [auditError, setAuditError] = useState<string | null>(null);

  const [headlines, setHeadlines] = useState<string[]>([
    "Top SEO Agentur Zürich",
    "Boost Your Organic Reach",
    "Data-Driven Growth Strategies",
  ]);
  const [descriptions, setDescriptions] = useState<string[]>([
    "Scale your business with AI-powered marketing intelligence and proven SEO strategies.",
    "Request your free audit today. Trusted by top SaaS companies across Switzerland.",
  ]);
  const [rsaValidation, setRsaValidation] = useState<any>(null);

  const [chatMessages, setChatMessages] = useState<
    { role: "user" | "assistant"; text: string; confidence?: string }[]
  >([
    {
      role: "assistant",
      text: "Hello! I am your AI Marketing Copilot. Ask me anything regarding your SEO health, Google Ads budgets, or CRO recommendations.",
      confidence: "High",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  const t = translations[currentLocale] || translations.en;

  const handleRunAudit = async () => {
    setIsAuditing(true);
    setAuditError(null);
    try {
      const res = await fetch("/api/v1/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: auditUrl }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAuditError(data.error || data.reason || "Audit failed");
      } else {
        setAuditResult(data);
      }
    } catch (err: any) {
      setAuditError(err.message || "Network error");
    } finally {
      setIsAuditing(false);
    }
  };

  const handleValidateRSA = async () => {
    try {
      const res = await fetch("/api/v1/campaigns/validate-rsa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ headlines, descriptions }),
      });
      const data = await res.json();
      setRsaValidation(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const userText = chatInput;
    setChatMessages((prev) => [...prev, { role: "user", text: userText }]);
    setChatInput("");
    setIsChatLoading(true);

    try {
      const res = await fetch("/api/v1/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });
      const data = await res.json();
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.reply, confidence: data.confidence },
      ]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Failed to communicate with AI Copilot." },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#080c14] text-slate-100">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-slate-800/80 bg-[#0c121e]/90 px-6 backdrop-blur-md">
        <div className="flex items-center space-x-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 font-black text-white shadow-lg shadow-indigo-500/20">
            oi
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              oiSio{" "}
              <span className="text-[10px] uppercase font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                v1.0 Pro
              </span>
            </h1>
            <p className="text-xs text-slate-400">{t.tagline}</p>
          </div>
        </div>

        {/* Global Controls: Locales & Currency */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center rounded-lg border border-slate-800 bg-slate-900/60 p-1">
            <Globe className="h-4 w-4 text-slate-400 ml-1 mr-2" />
            {(["en", "de", "tr", "fr", "it", "es"] as LocaleKey[]).map(
              (loc) => (
                <button
                  key={loc}
                  onClick={() => setCurrentLocale(loc)}
                  className={`px-2 py-1 text-xs font-medium rounded-md uppercase transition-all ${
                    currentLocale === loc
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {loc}
                </button>
              ),
            )}
          </div>

          <div className="flex items-center rounded-lg border border-slate-800 bg-slate-900/60 p-1">
            <DollarSign className="h-4 w-4 text-slate-400 ml-1 mr-1" />
            {["CHF", "EUR", "USD", "GBP", "TRY"].map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                  currency === curr
                    ? "bg-slate-700 text-indigo-300 font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {curr}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-800/80 bg-[#0a0f1a] p-4 flex flex-col justify-between">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "overview"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
              }`}
            >
              <Activity className="h-4 w-4" />
              Executive Dashboard
            </button>
            <button
              onClick={() => setActiveTab("audit")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "audit"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
              }`}
            >
              <Search className="h-4 w-4" />
              {t.quickAuditTab}
            </button>
            <button
              onClick={() => setActiveTab("rsa")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "rsa"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
              }`}
            >
              <Sliders className="h-4 w-4" />
              {t.rsaValidatorTab}
            </button>
            <button
              onClick={() => setActiveTab("copilot")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "copilot"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              {t.copilotTab}
            </button>
          </nav>

          <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/20 p-3.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              SSRF & AI Guard Active
            </div>
            <p className="mt-1 text-[11px] text-slate-400">
              RFC 1918 & Cloud IMDS safe. Prompt quarantine enabled.
            </p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          {/* TAB 1: EXECUTIVE DASHBOARD */}
          {activeTab === "overview" && (
            <div className="space-y-8 max-w-7xl mx-auto">
              {/* Header Hero Metric */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-indigo-950/40 p-8 shadow-2xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                      Overall Performance Index
                    </span>
                    <h2 className="text-3xl font-bold tracking-tight text-white mt-1">
                      {t.marketingHealth}
                    </h2>
                    <p className="mt-2 text-sm text-slate-400 max-w-xl">
                      {t.healthDescription}
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-500/10 px-8 py-4 shadow-inner">
                      <span className="text-4xl font-extrabold text-indigo-300">
                        74
                        <span className="text-lg font-normal text-slate-400">
                          /100
                        </span>
                      </span>
                      <span className="text-xs font-medium text-emerald-400 mt-1 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" /> +12% vs last crawl
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sub Score Bars */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4 pt-6 border-t border-slate-800/80">
                  <div className="rounded-xl bg-slate-900/60 p-3.5 border border-slate-800">
                    <span className="text-xs text-slate-400">
                      {t.technicalSeo}
                    </span>
                    <div className="text-xl font-bold text-slate-100 mt-1">
                      84<span className="text-xs text-slate-500">/100</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full"
                        style={{ width: "84%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="rounded-xl bg-slate-900/60 p-3.5 border border-slate-800">
                    <span className="text-xs text-slate-400">
                      {t.onPageSeo}
                    </span>
                    <div className="text-xl font-bold text-slate-100 mt-1">
                      78<span className="text-xs text-slate-500">/100</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-indigo-500 h-full rounded-full"
                        style={{ width: "78%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="rounded-xl bg-slate-900/60 p-3.5 border border-slate-800">
                    <span className="text-xs text-slate-400">
                      {t.googleAdsQuality}
                    </span>
                    <div className="text-xl font-bold text-slate-100 mt-1">
                      76<span className="text-xs text-slate-500">/100</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-blue-500 h-full rounded-full"
                        style={{ width: "76%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="rounded-xl bg-slate-900/60 p-3.5 border border-slate-800">
                    <span className="text-xs text-slate-400">
                      {t.contentAuthority}
                    </span>
                    <div className="text-xl font-bold text-slate-100 mt-1">
                      70<span className="text-xs text-slate-500">/100</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-amber-500 h-full rounded-full"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="rounded-xl bg-slate-900/60 p-3.5 border border-slate-800">
                    <span className="text-xs text-slate-400">{t.croScore}</span>
                    <div className="text-xl font-bold text-slate-100 mt-1">
                      64<span className="text-xs text-slate-500">/100</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-rose-500 h-full rounded-full"
                        style={{ width: "64%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Priority Action Matrix (What Matters Most) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-400" />
                    {t.criticalActionsTitle}
                  </h3>
                  <span className="text-xs text-slate-400">
                    Sorted by AI Impact / Effort Decision Engine
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Action 1 */}
                  <div className="rounded-xl border border-slate-800 bg-[#0d1424] p-5 hover:border-slate-700 transition-all">
                    <div className="flex items-start justify-between">
                      <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                        {t.doFirst}
                      </span>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span>
                          {t.confidence}:{" "}
                          <strong className="text-emerald-400">{t.high}</strong>
                        </span>
                        <span>•</span>
                        <span>
                          {t.source}:{" "}
                          <strong className="text-slate-300">Crawler</strong>
                        </span>
                      </div>
                    </div>
                    <h4 className="mt-3 text-base font-semibold text-white">
                      Generate Local Service Landing Page (Zürich / DACH)
                    </h4>
                    <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                      High commercial search intent detected with low organic
                      presence. Creating a dedicated localized page will capture
                      active buyers.
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3">
                      <span className="text-xs text-slate-500">
                        Evidence: 88% commercial intent, missing dedicated URL
                      </span>
                      <button className="flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-all">
                        Execute <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Action 2 */}
                  <div className="rounded-xl border border-slate-800 bg-[#0d1424] p-5 hover:border-slate-700 transition-all">
                    <div className="flex items-start justify-between">
                      <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                        {t.doFirst}
                      </span>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span>
                          {t.confidence}:{" "}
                          <strong className="text-emerald-400">{t.high}</strong>
                        </span>
                        <span>•</span>
                        <span>
                          {t.source}:{" "}
                          <strong className="text-slate-300">Crawler</strong>
                        </span>
                      </div>
                    </div>
                    <h4 className="mt-3 text-base font-semibold text-white">
                      Fix 14 Canonical and Missing Meta Descriptions
                    </h4>
                    <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                      14 crawled pages have duplicate or missing meta
                      descriptions, hurting search snippet click-through rate.
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3">
                      <span className="text-xs text-slate-500">
                        Evidence: 14 URLs returned status 200 with empty
                        &lt;meta&gt;
                      </span>
                      <button className="flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-all">
                        Fix Now <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Action 3 */}
                  <div className="rounded-xl border border-slate-800 bg-[#0d1424] p-5 hover:border-slate-700 transition-all">
                    <div className="flex items-start justify-between">
                      <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20">
                        {t.plan}
                      </span>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span>
                          {t.confidence}:{" "}
                          <strong className="text-emerald-400">{t.high}</strong>
                        </span>
                        <span>•</span>
                        <span>
                          {t.source}:{" "}
                          <strong className="text-slate-300">
                            Google Ads API
                          </strong>
                        </span>
                      </div>
                    </div>
                    <h4 className="mt-3 text-base font-semibold text-white">
                      Deploy High-Intent Google Search Ads Campaign
                    </h4>
                    <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                      Bridge the organic authority gap with tightly structured
                      RSA ads targeting high-converting search keywords.
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3">
                      <span className="text-xs text-slate-500">
                        Est. volume: 3,400/mo, Competitor CPC: {currency} 2.40
                      </span>
                      <button className="flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-all">
                        Review Plan <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Action 4 */}
                  <div className="rounded-xl border border-slate-800 bg-[#0d1424] p-5 hover:border-slate-700 transition-all">
                    <div className="flex items-start justify-between">
                      <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                        {t.doFirst}
                      </span>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span>
                          {t.confidence}:{" "}
                          <strong className="text-amber-400">{t.medium}</strong>
                        </span>
                        <span>•</span>
                        <span>
                          {t.source}:{" "}
                          <strong className="text-slate-300">
                            CRO Benchmark
                          </strong>
                        </span>
                      </div>
                    </div>
                    <h4 className="mt-3 text-base font-semibold text-white">
                      A/B Test Primary Landing Page Call-to-Action
                    </h4>
                    <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                      Change generic "Contact" button to value-focused "Request
                      Free Marketing Audit".
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3">
                      <span className="text-xs text-slate-500">
                        Expected conversion lift: +28%
                      </span>
                      <button className="flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-all">
                        Create Test <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INSTANT AUDIT */}
          {activeTab === "audit" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Security-Guarded SEO Audit
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Protected against SSRF, internal IP scanning, and prompt
                  injections.
                </p>
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  value={auditUrl}
                  onChange={(e) => setAuditUrl(e.target.value)}
                  placeholder={t.enterUrl}
                  className="flex-1 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
                <button
                  onClick={handleRunAudit}
                  disabled={isAuditing}
                  className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  {isAuditing ? t.analyzing : t.startAudit}
                </button>
              </div>

              {auditError && (
                <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 text-rose-400 flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                  <div className="text-sm">
                    <strong>Security Alert:</strong> {auditError}
                  </div>
                </div>
              )}

              {auditResult && (
                <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {auditResult.hostname}
                      </h3>
                      <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                        <ShieldCheck className="h-3.5 w-3.5" /> Verified IP:{" "}
                        {auditResult.ip}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400">
                        Marketing Health
                      </span>
                      <div className="text-2xl font-extrabold text-indigo-400">
                        {auditResult.marketingHealthScore}/100
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="rounded-xl bg-slate-900/80 p-3 border border-slate-800">
                      <span className="text-xs text-slate-400">
                        Technical SEO
                      </span>
                      <div className="text-lg font-bold text-white mt-1">
                        {auditResult.subScores.technical}/100
                      </div>
                    </div>
                    <div className="rounded-xl bg-slate-900/80 p-3 border border-slate-800">
                      <span className="text-xs text-slate-400">
                        SEA Quality
                      </span>
                      <div className="text-lg font-bold text-white mt-1">
                        {auditResult.subScores.sea}/100
                      </div>
                    </div>
                    <div className="rounded-xl bg-slate-900/80 p-3 border border-slate-800">
                      <span className="text-xs text-slate-400">
                        Content Authority
                      </span>
                      <div className="text-lg font-bold text-white mt-1">
                        {auditResult.subScores.content}/100
                      </div>
                    </div>
                    <div className="rounded-xl bg-slate-900/80 p-3 border border-slate-800">
                      <span className="text-xs text-slate-400">CRO Score</span>
                      <div className="text-lg font-bold text-white mt-1">
                        {auditResult.subScores.cro}/100
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-white">
                      Deterministic Rule Findings
                    </h4>
                    {auditResult.recommendations.map((rec: any) => (
                      <div
                        key={rec.id}
                        className="rounded-xl border border-slate-800 bg-slate-900/50 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-indigo-400">
                            {rec.priority}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Confidence: {rec.confidence}
                          </span>
                        </div>
                        <h5 className="font-semibold text-white mt-1 text-sm">
                          {rec.title}
                        </h5>
                        <p className="text-xs text-slate-400 mt-1">
                          {rec.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: RSA VALIDATOR */}
          {activeTab === "rsa" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {t.rsaValidatorTab}
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Enforces strict Google Ads character bounds (Headlines &le;
                  30, Descriptions &le; 90) and policy restrictions.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-white">
                    Headlines (Max 30 characters each)
                  </h3>
                  {headlines.map((headline, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Headline {idx + 1}</span>
                        <span
                          className={
                            headline.length > 30
                              ? "text-rose-400 font-bold"
                              : "text-slate-400"
                          }
                        >
                          {headline.length} / 30
                        </span>
                      </div>
                      <input
                        type="text"
                        value={headline}
                        onChange={(e) => {
                          const newHeadlines = [...headlines];
                          newHeadlines[idx] = e.target.value;
                          setHeadlines(newHeadlines);
                        }}
                        className={`w-full rounded-xl border bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:outline-none ${
                          headline.length > 30
                            ? "border-rose-500"
                            : "border-slate-800 focus:border-indigo-500"
                        }`}
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <h3 className="text-sm font-semibold text-white">
                    Descriptions (Max 90 characters each)
                  </h3>
                  {descriptions.map((desc, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Description {idx + 1}</span>
                        <span
                          className={
                            desc.length > 90
                              ? "text-rose-400 font-bold"
                              : "text-slate-400"
                          }
                        >
                          {desc.length} / 90
                        </span>
                      </div>
                      <textarea
                        rows={2}
                        value={desc}
                        onChange={(e) => {
                          const newDescs = [...descriptions];
                          newDescs[idx] = e.target.value;
                          setDescriptions(newDescs);
                        }}
                        className={`w-full rounded-xl border bg-slate-900/80 px-4 py-2.5 text-sm text-white focus:outline-none ${
                          desc.length > 90
                            ? "border-rose-500"
                            : "border-slate-800 focus:border-indigo-500"
                        }`}
                      />
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleValidateRSA}
                  className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-all"
                >
                  {t.checkAd}
                </button>

                {rsaValidation && (
                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">
                        RSA Quality Score
                      </span>
                      <span className="text-lg font-bold text-indigo-400">
                        {rsaValidation.qualityScore}/100
                      </span>
                    </div>
                    {rsaValidation.policyViolations?.length > 0 ? (
                      <div className="space-y-2">
                        {rsaValidation.policyViolations.map(
                          (v: any, i: number) => (
                            <div
                              key={i}
                              className="text-xs text-rose-400 flex items-center gap-1.5"
                            >
                              <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" />
                              <span>{v.message}</span>
                            </div>
                          ),
                        )}
                      </div>
                    ) : (
                      <div className="text-xs text-emerald-400 flex items-center gap-1.5">
                        <ShieldCheck className="h-4 w-4" /> Fully compliant with
                        Google Ads policies and character limits.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: MARKETING COPILOT */}
          {activeTab === "copilot" && (
            <div className="max-w-4xl mx-auto h-[calc(100vh-10rem)] flex flex-col rounded-2xl border border-slate-800 bg-[#0d1424] overflow-hidden">
              <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-indigo-400" />
                  <h3 className="font-bold text-white text-sm">
                    Marketing Intelligence Copilot
                  </h3>
                </div>
                <span className="text-xs text-slate-400">
                  Model Tier: GPT-4o-mini / Claude 3.5 Sonnet
                </span>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-xl rounded-2xl p-4 text-sm whitespace-pre-line leading-relaxed ${
                        msg.role === "user"
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-900/90 text-slate-200 border border-slate-800"
                      }`}
                    >
                      {msg.text}
                    </div>
                    {msg.confidence && (
                      <span className="text-[10px] text-slate-500 mt-1 px-1">
                        Confidence: {msg.confidence}
                      </span>
                    )}
                  </div>
                ))}
                {isChatLoading && (
                  <div className="text-xs text-slate-400 animate-pulse">
                    Copilot is reasoning over marketing data...
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={t.copilotPlaceholder}
                  className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isChatLoading}
                  className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
