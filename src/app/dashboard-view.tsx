"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  Search,
  Megaphone,
  MousePointerClick,
  Brain,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Globe,
  RefreshCw,
  X,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Target,
  FileText,
  Bell,
  Command,
  Sparkles,
  Eye,
  Link2,
  Code2,
  Gauge,
  PenTool,
  Bot,
  Star,
  Activity,
  Users,
  DollarSign,
  MousePointer2,
  Lock,
  ChevronDown,
  Filter,
  Download,
  Plus,
} from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
type View = "overview" | "seo" | "ads" | "cro" | "ai" | "reports" | "settings";

export interface AnalysisResult {
  url: string;
  language?: string;
  languageName?: string;
  languageNative?: string;
  seoScore?: number;
  healthScore?: number;
  issues?: Array<{
    severity: "critical" | "warning" | "info";
    title: string;
    detail: string;
    impact: string;
  }>;
  keywords?: Array<{
    keyword: string;
    intent: "Commercial" | "Informational" | "Navigational" | "Transactional";
    difficulty: "Low" | "Medium" | "High";
    opportunity?: "High" | "Medium" | "Low";
  }>;
  recommendations?: Array<{
    priority: "DO_FIRST" | "PLAN" | "OPTIONAL";
    title: string;
    detail: string;
    effort: "Low" | "Medium" | "High";
    impact: string;
  }>;
  titleAnalysis?: {
    length: number;
    isOptimal: boolean;
    score: number;
    feedback: string;
  };
  descriptionAnalysis?: {
    length: number;
    isOptimal: boolean;
    score: number;
    feedback: string;
  };
  channelScores?: {
    technical?: number;
    content?: number;
    onPage?: number;
    ux?: number;
  };
  technicalSummary?: string;
  aiInsight?: string;
  seoData?: {
    lang: string;
    title: string;
    description: string;
    imgMissingAlt: number;
    hasSchema: boolean;
    hreflangLangs: string[];
    hasViewport: boolean;
  };
}

// ─── SPARKLINE (pure SVG) ─────────────────────────────────────────────────────
function Sparkline({
  data,
  color,
  fill,
}: {
  data: number[];
  color: string;
  fill?: string;
}) {
  const w = 120,
    h = 36;
  const min = Math.min(...data),
    max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  });
  const path = `M ${pts.join(" L ")}`;
  const area = `M ${pts[0]} L ${pts.join(" L ")} L ${w},${h} L 0,${h} Z`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      {fill && <path d={area} fill={fill} opacity={0.15} />}
      <path
        d={path}
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── MINI BAR CHART ──────────────────────────────────────────────────────────
function MiniBar({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data) || 1;
  return (
    <div className="flex items-end gap-0.5 h-8">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm transition-all"
          style={{
            height: `${(v / max) * 100}%`,
            background: color,
            opacity: i === data.length - 1 ? 1 : 0.4,
          }}
        />
      ))}
    </div>
  );
}

// ─── HEALTH RING ─────────────────────────────────────────────────────────────
function HealthRing({ score }: { score: number }) {
  const r = 54,
    circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 80 ? "#34d399" : score >= 60 ? "#fbbf24" : "#f87171";
  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      <svg
        width="144"
        height="144"
        viewBox="0 0 144 144"
        className="absolute inset-0 -rotate-90"
      >
        <circle
          cx="72"
          cy="72"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="10"
        />
        <circle
          cx="72"
          cy="72"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 8px ${color}60)` }}
        />
      </svg>
      <div className="text-center z-10">
        <div className="text-4xl font-black text-white leading-none">
          {score}
        </div>
        <div className="text-[11px] text-white/40 font-semibold mt-1">/100</div>
      </div>
    </div>
  );
}

// ─── CARD ────────────────────────────────────────────────────────────────────
function Card({
  children,
  className = "",
  glow,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl border border-white/[0.07] overflow-hidden ${className}`}
      style={{ background: "rgba(255,255,255,0.025)" }}
    >
      {glow && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at top left, ${glow}, transparent 60%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}

// ─── BADGE ────────────────────────────────────────────────────────────────────
function Badge({
  label,
  color,
}: {
  label: string;
  color: "emerald" | "amber" | "rose" | "indigo" | "violet";
}) {
  const map = {
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    rose: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    violet: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-md border ${map[color]}`}
    >
      {label}
    </span>
  );
}

// ─── METRIC CARD ─────────────────────────────────────────────────────────────
function MetricCard({
  icon,
  label,
  value,
  change,
  positive,
  sparkData,
  color,
  currency,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  positive: boolean;
  sparkData: number[];
  color: string;
  currency?: string;
}) {
  return (
    <Card>
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div
              className="p-2 rounded-xl border border-white/[0.06]"
              style={{ background: `${color}15` }}
            >
              <div style={{ color }}>{icon}</div>
            </div>
            <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">
              {label}
            </span>
          </div>
          <div
            className={`flex items-center gap-1 text-xs font-bold ${positive ? "text-emerald-400" : "text-rose-400"}`}
          >
            {positive ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            {change}
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-black text-white leading-none">
              {value}
            </div>
            {currency && (
              <div className="text-[11px] text-white/30 mt-1">{currency}</div>
            )}
          </div>
          <Sparkline data={sparkData} color={color} fill={color} />
        </div>
      </div>
    </Card>
  );
}

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const SPARK_SEO = [32, 38, 35, 42, 45, 50, 48, 55, 60, 58, 65, 70, 68, 74];
const SPARK_ADS = [
  120, 115, 130, 125, 140, 135, 145, 150, 148, 160, 155, 162, 170, 168,
];
const SPARK_CTR = [
  2.1, 2.3, 2.2, 2.5, 2.4, 2.7, 2.6, 2.8, 2.9, 2.7, 3.0, 2.9, 3.1, 3.2,
];
const SPARK_CONV = [
  3.4, 3.5, 3.3, 3.6, 3.5, 3.7, 3.6, 3.8, 3.7, 3.9, 3.8, 3.9, 3.8, 3.82,
];
const WEEKLY_CLICKS = [820, 940, 880, 1020, 980, 1100, 1050];
const WEEKLY_IMPR = [38, 42, 40, 48, 46, 52, 50];

const SEO_ISSUES = [
  {
    id: 1,
    sev: "critical",
    title: "Missing canonical tags on multi-currency pages",
    url: "/pricing?currency=EUR",
    impact: "+4.5 pts",
  },
  {
    id: 2,
    sev: "critical",
    title: "3 pages returning 404 still linked internally",
    url: "/blog/old-post-1",
    impact: "+3.2 pts",
  },
  {
    id: 3,
    sev: "warning",
    title: "LCP > 2.5s on 6 landing pages",
    url: "/features/...",
    impact: "+2.1 pts",
  },
  {
    id: 4,
    sev: "warning",
    title: "Duplicate H1 tags on product pages",
    url: "/products/...",
    impact: "+1.8 pts",
  },
  {
    id: 5,
    sev: "info",
    title: "6 images missing alt text",
    url: "Multiple pages",
    impact: "+1.5 pts",
  },
];

const KEYWORDS = [
  {
    kw: "marketing automation",
    vol: 18100,
    pos: 8,
    chg: -2,
    intent: "Commercial",
  },
  { kw: "SEO tool free", vol: 9900, pos: 3, chg: 4, intent: "Navigational" },
  {
    kw: "Semrush alternative",
    vol: 6600,
    pos: 5,
    chg: 2,
    intent: "Commercial",
  },
  {
    kw: "backlink checker",
    vol: 5400,
    pos: 12,
    chg: -1,
    intent: "Informational",
  },
  {
    kw: "keyword research tool",
    vol: 4800,
    pos: 6,
    chg: 1,
    intent: "Commercial",
  },
  {
    kw: "core web vitals check",
    vol: 3200,
    pos: 4,
    chg: 3,
    intent: "Informational",
  },
];

const ADS_CAMPAIGNS = [
  {
    name: "Brand Keywords DE",
    spend: "1,240",
    roas: "6.2x",
    ctr: "8.4%",
    str: 96,
    status: "active",
  },
  {
    name: "Competitor Comparison",
    spend: "980",
    roas: "4.8x",
    ctr: "5.1%",
    str: 91,
    status: "active",
  },
  {
    name: "DACH Free Trial",
    spend: "720",
    roas: "3.9x",
    ctr: "4.3%",
    str: 88,
    status: "active",
  },
  {
    name: "Feature Remarketing",
    spend: "480",
    roas: "7.1x",
    ctr: "6.8%",
    str: 94,
    status: "paused",
  },
];

const CRO_TESTS = [
  {
    name: "CTA Button Color — Hero",
    variant: "Green vs Indigo",
    status: "running",
    lift: "+12.4%",
    conf: "84%",
  },
  {
    name: "Pricing Page Layout",
    variant: "3-col vs 2-col",
    status: "running",
    lift: "+7.8%",
    conf: "71%",
  },
  {
    name: "Onboarding Flow Step 2",
    variant: "Short vs Long",
    status: "won",
    lift: "+21.3%",
    conf: "97%",
  },
];

// ─── VIEWS ───────────────────────────────────────────────────────────────────

function OverviewView({ ar }: { ar?: AnalysisResult | null }) {
  const healthScore = ar?.healthScore ?? 74;
  const aiInsight =
    ar?.aiInsight ??
    'Swiss users searching "Marketing Automatisierung Schweiz" convert +42% higher on German landing pages with explicit CHF pricing.';
  const recs = ar?.recommendations ?? [
    {
      priority: "DO_FIRST" as const,
      title: "Fix Missing Canonical Tags on Multi-Currency Pages",
      detail: "Effort: 15 min",
      effort: "Low" as const,
      impact: "+4.5 SEO pts",
    },
    {
      priority: "PLAN" as const,
      title: "Launch Swiss-German B2B Content Topic Cluster",
      detail: "Effort: 2 hours",
      effort: "Medium" as const,
      impact: "+85 leads/mo",
    },
    {
      priority: "OPTIONAL" as const,
      title: "Add Alt Text to Product Graphics",
      detail: "Effort: 15 min",
      effort: "Low" as const,
      impact: "+1.5 SEO pts",
    },
  ];
  const recColor: Record<string, "rose" | "amber" | "indigo"> = {
    DO_FIRST: "rose",
    PLAN: "amber",
    OPTIONAL: "indigo",
  };

  // Channel bars: use real channelScores from DeepSeek when available
  const channels = ar?.channelScores
    ? [
        { label: "Technical SEO", score: ar.channelScores.technical ?? 0, color: "#818cf8" },
        { label: "Content Quality", score: ar.channelScores.content ?? 0, color: "#fbbf24" },
        { label: "On-Page SEO", score: ar.channelScores.onPage ?? 0, color: "#34d399" },
        { label: "UX & Mobile", score: ar.channelScores.ux ?? 0, color: "#f87171" },
      ]
    : [
        { label: "Technical SEO", score: 88, color: "#818cf8" },
        { label: "Google Ads", score: 94, color: "#34d399" },
        { label: "Content", score: 62, color: "#fbbf24" },
        { label: "Conversion", score: 58, color: "#f87171" },
      ];

  // Critical / warning / info issue counts from real analysis
  const criticalCount = ar?.issues?.filter((i) => i.severity === "critical").length ?? 0;
  const issueCount = ar?.issues?.length ?? 0;
  const kwCount = ar?.keywords?.length ?? 0;

  // Keyword intent distribution for the chart (replaces hardcoded weekly clicks when real data)
  const intentCounts = ar?.keywords
    ? (() => {
        const counts: Record<string, number> = {};
        for (const kw of ar.keywords) {
          counts[kw.intent] = (counts[kw.intent] ?? 0) + 1;
        }
        return counts;
      })()
    : null;

  return (
    <div className="space-y-6">
      {/* top grid: real AI metrics when ar available, demo when not */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {ar ? (
          <>
            <MetricCard
              icon={<Gauge className="h-4 w-4" />}
              label="SEO Score"
              value={`${ar.seoScore ?? 0}/100`}
              change={ar.seoScore && ar.seoScore >= 70 ? "Good" : ar.seoScore && ar.seoScore >= 50 ? "Average" : "Needs Work"}
              positive={(ar.seoScore ?? 0) >= 70}
              sparkData={SPARK_SEO}
              color="#818cf8"
            />
            <MetricCard
              icon={<Activity className="h-4 w-4" />}
              label="Health Score"
              value={`${ar.healthScore ?? 0}/100`}
              change={(ar.healthScore ?? 0) >= 70 ? "Healthy" : (ar.healthScore ?? 0) >= 50 ? "Average" : "Critical"}
              positive={(ar.healthScore ?? 0) >= 70}
              sparkData={SPARK_ADS}
              color="#34d399"
            />
            <MetricCard
              icon={<AlertTriangle className="h-4 w-4" />}
              label="Critical Issues"
              value={`${criticalCount}`}
              change={`${issueCount} total`}
              positive={criticalCount === 0}
              sparkData={SPARK_CTR}
              color={criticalCount > 0 ? "#f87171" : "#34d399"}
            />
            <MetricCard
              icon={<Search className="h-4 w-4" />}
              label="Keywords Found"
              value={`${kwCount}`}
              change="opportunities"
              positive={kwCount > 0}
              sparkData={SPARK_CONV}
              color="#fbbf24"
            />
          </>
        ) : (
          <>
            <MetricCard
              icon={<Globe className="h-4 w-4" />}
              label="SEO Impressions"
              value="142.8K"
              change="+14.2%"
              positive
              sparkData={SPARK_SEO}
              color="#818cf8"
            />
            <MetricCard
              icon={<DollarSign className="h-4 w-4" />}
              label="Ads Spend"
              value="3,420"
              change="+8.1%"
              positive
              sparkData={SPARK_ADS}
              color="#fbbf24"
              currency="CHF / month"
            />
            <MetricCard
              icon={<MousePointer2 className="h-4 w-4" />}
              label="Click-Through Rate"
              value="3.2%"
              change="+0.3%"
              positive
              sparkData={SPARK_CTR}
              color="#34d399"
            />
            <MetricCard
              icon={<Users className="h-4 w-4" />}
              label="Conversion Rate"
              value="3.82%"
              change="-0.3%"
              positive={false}
              sparkData={SPARK_CONV}
              color="#f87171"
            />
          </>
        )}
      </div>

      {/* health + channels + chart/insight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Health Score */}
        <Card
          glow="rgba(99,102,241,0.08)"
          className="flex flex-col items-center justify-center p-7 gap-4"
        >
          <div className="text-xs font-bold uppercase tracking-widest text-white/30">
            Overall Health
            {ar?.language && (
              <span className="ml-2 text-indigo-400 normal-case font-semibold">
                · {ar.languageName ?? ar.language.toUpperCase()}
              </span>
            )}
          </div>
          <HealthRing score={healthScore} />
          <div className="w-full space-y-2.5">
            {channels.map((c) => (
              <div key={c.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/50">{c.label}</span>
                  <span className="font-bold text-white">{c.score}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${c.score}%`, background: c.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Keywords intent chart (real) OR Weekly traffic (demo) */}
        {ar && intentCounts && Object.keys(intentCounts).length > 0 ? (
          <Card className="p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-bold text-white">Keyword Intents</h3>
                <p className="text-xs text-white/35 mt-0.5">
                  From AI analysis · {kwCount} keywords
                </p>
              </div>
              <Badge label="Keywords" color="indigo" />
            </div>
            <div className="flex items-end gap-2 h-28">
              {Object.entries(intentCounts).map(([intent, count], i) => {
                const maxVal = Math.max(...Object.values(intentCounts));
                const colors = ["#6366f1", "#34d399", "#fbbf24", "#f87171"];
                return (
                  <div key={intent} className="flex-1 flex flex-col items-center gap-1.5">
                    <div
                      className="w-full rounded-t-lg transition-all"
                      style={{
                        height: `${(count / maxVal) * 90}%`,
                        background: colors[i % colors.length],
                      }}
                    />
                    <span className="text-[9px] text-white/40 font-semibold text-center leading-tight">
                      {intent.slice(0, 4)}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-white/35">
                Total: <strong className="text-white">{kwCount}</strong> keywords
              </span>
              <span className="text-indigo-400 font-bold">AI Analysis</span>
            </div>
          </Card>
        ) : (
          <Card className="p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-bold text-white">Weekly Clicks</h3>
                <p className="text-xs text-white/35 mt-0.5">
                  Organic search · last 7 days
                </p>
              </div>
              <Badge label="Demo" color="amber" />
            </div>
            <div className="flex items-end gap-2 h-28">
              {WEEKLY_CLICKS.map((v, i) => {
                const max = Math.max(...WEEKLY_CLICKS);
                const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div
                      className="w-full rounded-t-lg transition-all"
                      style={{
                        height: `${(v / max) * 90}%`,
                        background: i === 6 ? "#6366f1" : "rgba(99,102,241,0.25)",
                      }}
                    />
                    <span className="text-[9px] text-white/25 font-semibold">
                      {days[i]}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-white/35">
                Total: <strong className="text-white">6,790</strong>
              </span>
              <span className="text-white/25 font-bold">Connect GSC →</span>
            </div>
          </Card>
        )}

        {/* AI Insights */}
        <Card glow="rgba(139,92,246,0.07)" className="p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20">
              <Sparkles className="h-4 w-4 text-violet-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">AI Insight</h3>
              <p className="text-[11px] text-white/35">
                {ar ? "DeepSeek · Real analysis" : "Deterministic · 96% confidence"}
              </p>
            </div>
          </div>
          <div className="flex-1 bg-violet-500/[0.05] border border-violet-500/10 rounded-xl p-4">
            <p className="text-xs text-white/60 leading-relaxed">{aiInsight}</p>
          </div>
          <div className="space-y-2">
            {[
              {
                label: "Source",
                val: ar ? "DeepSeek AI Analysis" : "Demo Data",
              },
              { label: "Language", val: ar?.languageName ?? "–" },
              {
                label: "SEO Score",
                val: ar?.seoScore != null ? `${ar.seoScore}/100` : "–",
              },
            ].map((r) => (
              <div key={r.label} className="flex justify-between text-[11px]">
                <span className="text-white/35">{r.label}</span>
                <span className="text-white font-semibold">{r.val}</span>
              </div>
            ))}
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-violet-300 bg-violet-500/10 border border-violet-500/20 hover:bg-violet-500/20 transition-all">
            <Sparkles className="h-3.5 w-3.5" /> Create content plan
          </button>
        </Card>
      </div>

      {/* Priority Actions */}
      <Card>
        <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Priority Actions</h3>
            <p className="text-xs text-white/35 mt-0.5">
              {ar
                ? "Real AI analysis · DeepSeek"
                : "Ranked by Impact × Confidence ÷ Effort"}
            </p>
          </div>
          <Badge label={`${recs.length} open`} color="amber" />
        </div>
        <div className="divide-y divide-white/[0.04]">
          {recs.slice(0, 5).map((a, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors"
            >
              <Badge
                label={a.priority.replace("_", " ")}
                color={recColor[a.priority] ?? "indigo"}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate">
                  {a.title}
                </p>
                <p className="text-[11px] text-white/35 mt-0.5">{a.detail}</p>
              </div>
              <div className="shrink-0 text-right hidden sm:block">
                <div className="text-xs font-bold text-emerald-400">
                  {a.impact}
                </div>
              </div>
              <button className="shrink-0 p-2 rounded-xl text-white/30 hover:text-white hover:bg-white/[0.06] transition-all">
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function SeoView({ ar }: { ar?: AnalysisResult | null }) {
  const [tab, setTab] = useState<"audit" | "keywords">("audit");
  const realIssues = ar?.issues;
  const realKeywords = ar?.keywords;
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-1 p-1 bg-white/[0.03] border border-white/[0.06] rounded-xl w-fit">
        {(["audit", "keywords"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-xs font-bold rounded-lg capitalize transition-all ${tab === t ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"}`}
          >
            {t === "audit" ? "Technical Audit" : "Keyword Intelligence"}
          </button>
        ))}
      </div>

      {tab === "audit" && (
        <Card>
          <div className="p-5 border-b border-white/[0.06] flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-sm font-bold text-white">Technical Issues</h3>
              <p className="text-xs text-white/35 mt-0.5">
                {ar
                  ? "DeepSeek AI · real-time analysis"
                  : "108-criteria crawl · last run 2h ago"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                label={`${(realIssues ?? SEO_ISSUES).filter((i) => ("severity" in i ? i.severity : (i as { sev: string }).sev) === "critical").length} critical`}
                color="rose"
              />
              <Badge
                label={`${(realIssues ?? SEO_ISSUES).filter((i) => ("severity" in i ? i.severity : (i as { sev: string }).sev) === "warning").length} warnings`}
                color="amber"
              />
              <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white/60 hover:text-white bg-white/[0.04] border border-white/[0.08] rounded-xl hover:bg-white/[0.08] transition-all">
                <RefreshCw className="h-3.5 w-3.5" /> Re-run
              </button>
            </div>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {(
              realIssues ??
              SEO_ISSUES.map((i) => ({
                severity: i.sev as "critical" | "warning" | "info",
                title: i.title,
                detail: i.url,
                impact: i.impact,
              }))
            ).map((issue, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors"
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${issue.severity === "critical" ? "bg-rose-500" : issue.severity === "warning" ? "bg-amber-500" : "bg-indigo-500"}`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium">
                    {issue.title}
                  </p>
                  <p className="text-[11px] text-white/35 mt-0.5 font-mono truncate">
                    {issue.detail}
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="text-xs font-bold text-emerald-400">
                    {issue.impact}
                  </span>
                </div>
                <button className="shrink-0 p-2 rounded-xl text-white/30 hover:text-white hover:bg-white/[0.06] transition-all">
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === "keywords" && (
        <Card>
          <div className="p-5 border-b border-white/[0.06]">
            <h3 className="text-sm font-bold text-white">Keyword Rankings</h3>
            <p className="text-xs text-white/35 mt-0.5">
              {ar
                ? "DeepSeek AI keyword analysis"
                : "Live GSC data · top 6 by volume"}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.04]">
                  {[
                    "Keyword",
                    ar ? "Difficulty" : "Volume",
                    ar ? "Opportunity" : "Position",
                    ar ? "" : "Change",
                    "Intent",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left py-3 px-5 text-[11px] font-bold uppercase tracking-widest text-white/30"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {(
                  realKeywords ??
                  KEYWORDS.map((k) => ({
                    keyword: k.kw,
                    intent: k.intent as
                      | "Commercial"
                      | "Informational"
                      | "Navigational"
                      | "Transactional",
                    difficulty: (k.chg > 0 ? "Medium" : "High") as
                      | "Low"
                      | "Medium"
                      | "High",
                    opportunity: "Medium" as "High" | "Medium" | "Low",
                  }))
                ).map((kw, i) => (
                  <tr
                    key={i}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3.5 px-5 text-white font-medium">
                      {kw.keyword}
                    </td>
                    <td className="py-3.5 px-5">
                      <Badge
                        label={kw.difficulty}
                        color={
                          kw.difficulty === "Low"
                            ? "emerald"
                            : kw.difficulty === "Medium"
                              ? "amber"
                              : "rose"
                        }
                      />
                    </td>
                    <td className="py-3.5 px-5">
                      <Badge
                        label={kw.opportunity ?? "Medium"}
                        color={
                          kw.opportunity === "High"
                            ? "emerald"
                            : kw.opportunity === "Medium"
                              ? "indigo"
                              : "amber"
                        }
                      />
                    </td>
                    <td className="py-3.5 px-5" />
                    <td className="py-3.5 px-5">
                      <Badge
                        label={kw.intent}
                        color={
                          kw.intent === "Commercial" ||
                          kw.intent === "Transactional"
                            ? "indigo"
                            : kw.intent === "Navigational"
                              ? "emerald"
                              : "violet"
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

function AdsView() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Spend",
            value: "3,420",
            sub: "CHF / month",
            color: "#fbbf24",
          },
          {
            label: "Avg. ROAS",
            value: "4.8×",
            sub: "Return on ad spend",
            color: "#34d399",
          },
          {
            label: "RSA Strength",
            value: "94.2%",
            sub: "12 active ads",
            color: "#818cf8",
          },
          {
            label: "Policy Issues",
            value: "0",
            sub: "All ads compliant",
            color: "#34d399",
          },
        ].map((m, i) => (
          <Card key={i} className="p-5">
            <div className="text-[11px] font-bold uppercase tracking-widest text-white/30 mb-2">
              {m.label}
            </div>
            <div className="text-2xl font-black text-white mb-1">{m.value}</div>
            <div className="text-[11px] text-white/35">{m.sub}</div>
            <div className="mt-3">
              <MiniBar
                data={[3, 5, 4, 7, 6, 8, 9].map((x) => x * 10)}
                color={m.color}
              />
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Active Campaigns</h3>
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-xl hover:bg-indigo-500/15 transition-all">
            <Plus className="h-3.5 w-3.5" /> New Campaign
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.04]">
                {[
                  "Campaign",
                  "Spend (CHF)",
                  "ROAS",
                  "CTR",
                  "RSA Str.",
                  "Status",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left py-3 px-5 text-[11px] font-bold uppercase tracking-widest text-white/30"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {ADS_CAMPAIGNS.map((c, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-5 text-white font-medium">
                    {c.name}
                  </td>
                  <td className="py-3.5 px-5 text-white/60 tabular-nums">
                    {c.spend}
                  </td>
                  <td className="py-3.5 px-5 text-emerald-400 font-bold">
                    {c.roas}
                  </td>
                  <td className="py-3.5 px-5 text-white/60">{c.ctr}</td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 max-w-[60px] h-1.5 rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full bg-indigo-500"
                          style={{ width: `${c.str}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-white">
                        {c.str}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-5">
                    <Badge
                      label={c.status}
                      color={c.status === "active" ? "emerald" : "amber"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function CroView() {
  return (
    <div className="space-y-5">
      {/* Funnel */}
      <Card className="p-6">
        <h3 className="text-sm font-bold text-white mb-5">Conversion Funnel</h3>
        <div className="space-y-3">
          {[
            { stage: "Visitors", count: "48,200", pct: 100, color: "#818cf8" },
            {
              stage: "Engaged (>30s)",
              count: "22,400",
              pct: 46,
              color: "#a78bfa",
            },
            {
              stage: "Signup Intent",
              count: "8,100",
              pct: 17,
              color: "#fbbf24",
            },
            {
              stage: "Trial Started",
              count: "1,840",
              pct: 3.8,
              color: "#34d399",
            },
            { stage: "Paid", count: "440", pct: 0.9, color: "#10b981" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="w-32 text-xs text-white/50 font-medium shrink-0">
                {s.stage}
              </span>
              <div className="flex-1 h-7 rounded-lg overflow-hidden bg-white/[0.04] relative">
                <div
                  className="absolute inset-y-0 left-0 rounded-lg flex items-center px-3 transition-all duration-700"
                  style={{
                    width: `${s.pct}%`,
                    background: `${s.color}30`,
                    borderRight: `2px solid ${s.color}`,
                  }}
                ></div>
              </div>
              <span className="w-20 text-xs font-bold text-white text-right tabular-nums">
                {s.count}
              </span>
              <span className="w-12 text-[11px] text-white/35 text-right">
                {s.pct}%
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* A/B Tests */}
      <Card>
        <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">A/B Tests</h3>
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl hover:bg-emerald-500/15 transition-all">
            <Plus className="h-3.5 w-3.5" /> New Test
          </button>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {CRO_TESTS.map((t, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{t.name}</p>
                <p className="text-[11px] text-white/35 mt-0.5">{t.variant}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-black text-emerald-400">
                  {t.lift}
                </div>
                <div className="text-[10px] text-white/30">conf. {t.conf}</div>
              </div>
              <Badge
                label={t.status}
                color={t.status === "won" ? "emerald" : "indigo"}
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function AiView() {
  const tasks = [
    {
      ch: "SEO",
      title: "Create Swiss-German topic cluster",
      impact: "+85 leads",
      conf: 94,
      effort: "2h",
      urgency: "high",
    },
    {
      ch: "ADS",
      title: "Increase DACH retargeting budget by 20%",
      impact: "+28% ROAS",
      conf: 91,
      effort: "15m",
      urgency: "medium",
    },
    {
      ch: "CRO",
      title: "Shorten onboarding flow step 2",
      impact: "+21% trial",
      conf: 97,
      effort: "1d",
      urgency: "high",
    },
    {
      ch: "SEO",
      title: "Build 3 BOFU comparison pages",
      impact: "+40 signups",
      conf: 88,
      effort: "3d",
      urgency: "medium",
    },
    {
      ch: "ADS",
      title: "Pause 2 under-performing ad groups",
      impact: "-18% waste",
      conf: 93,
      effort: "15m",
      urgency: "low",
    },
  ];
  return (
    <div className="space-y-5">
      <Card glow="rgba(139,92,246,0.05)" className="p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20">
            <Brain className="h-5 w-5 text-violet-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">AI Decision Matrix</h3>
            <p className="text-xs text-white/35">
              Ranked by Impact × Confidence ÷ Effort
            </p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 text-[11px] font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1.5 rounded-xl">
            <Sparkles className="h-3 w-3" /> 5 opportunities
          </div>
        </div>
        <div className="space-y-3">
          {tasks.map((t, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-3.5 rounded-xl border border-white/[0.05] hover:border-white/[0.10] hover:bg-white/[0.02] transition-all"
            >
              <span
                className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg"
                style={{
                  background:
                    t.ch === "SEO"
                      ? "rgba(99,102,241,0.15)"
                      : t.ch === "ADS"
                        ? "rgba(251,191,36,0.15)"
                        : "rgba(52,211,153,0.15)",
                  color:
                    t.ch === "SEO"
                      ? "#818cf8"
                      : t.ch === "ADS"
                        ? "#fbbf24"
                        : "#34d399",
                }}
              >
                {t.ch}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {t.title}
                </p>
                <p className="text-[11px] text-white/35 mt-0.5">
                  Effort: {t.effort}
                </p>
              </div>
              <div className="text-right shrink-0 hidden sm:block">
                <div className="text-xs font-bold text-emerald-400">
                  {t.impact}
                </div>
                <div className="text-[10px] text-white/30">{t.conf}% conf.</div>
              </div>
              <Badge
                label={t.urgency}
                color={
                  t.urgency === "high"
                    ? "rose"
                    : t.urgency === "medium"
                      ? "amber"
                      : "indigo"
                }
              />
              <button className="shrink-0 p-2 rounded-xl text-white/30 hover:text-white hover:bg-white/[0.06] transition-all">
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ReportsView() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            title: "Monthly SEO Report",
            sub: "Aug 2026 · PDF ready",
            icon: <FileText className="h-5 w-5" />,
            color: "#818cf8",
          },
          {
            title: "Ads Performance Report",
            sub: "Aug 2026 · PDF ready",
            icon: <BarChart2 className="h-5 w-5" />,
            color: "#fbbf24",
          },
          {
            title: "Executive Summary",
            sub: "Aug 2026 · PDF ready",
            icon: <Sparkles className="h-5 w-5" />,
            color: "#34d399",
          },
        ].map((r, i) => (
          <Card
            key={i}
            className="p-5 hover:border-white/[0.14] transition-colors cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="p-2.5 rounded-xl border border-white/[0.06]"
                style={{ background: `${r.color}15`, color: r.color }}
              >
                {r.icon}
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-white/[0.06] text-white/40 hover:text-white">
                <Download className="h-4 w-4" />
              </button>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">{r.title}</h3>
            <p className="text-[11px] text-white/35">{r.sub}</p>
          </Card>
        ))}
      </div>
      <Card className="p-6">
        <h3 className="text-sm font-bold text-white mb-4">Scheduled Reports</h3>
        <div className="space-y-3">
          {[
            {
              name: "Weekly SEO Digest",
              freq: "Every Monday 09:00",
              recipient: "team@company.com",
              status: "active",
            },
            {
              name: "Monthly Performance",
              freq: "1st of month 08:00",
              recipient: "ceo@company.com",
              status: "active",
            },
            {
              name: "Ads Alert (anomaly)",
              freq: "On trigger",
              recipient: "ads@company.com",
              status: "active",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-3.5 rounded-xl border border-white/[0.05] hover:bg-white/[0.02] transition-colors"
            >
              <Bell className="h-4 w-4 text-white/30 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{s.name}</p>
                <p className="text-[11px] text-white/30 mt-0.5">
                  {s.freq} · {s.recipient}
                </p>
              </div>
              <Badge label={s.status} color="emerald" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="space-y-5 max-w-2xl">
      {[
        {
          title: "Workspace",
          items: [
            { label: "Project Name", value: "Swiss SaaS Demo", type: "text" },
            { label: "Website URL", value: "https://example.ch", type: "text" },
            {
              label: "Default Language",
              value: "Deutsch (DE)",
              type: "select",
            },
            { label: "Currency", value: "CHF", type: "select" },
          ],
        },
        {
          title: "Security",
          items: [
            {
              label: "SSRF Guard",
              value: "Active — RFC 1918 + IMDS blocked",
              type: "info",
            },
            { label: "Token Encryption", value: "AES-256-GCM", type: "info" },
            { label: "Prompt Injection Guard", value: "Enabled", type: "info" },
          ],
        },
      ].map((section) => (
        <Card key={section.title}>
          <div className="p-5 border-b border-white/[0.06]">
            <h3 className="text-sm font-bold text-white">{section.title}</h3>
          </div>
          <div className="p-5 space-y-4">
            {section.items.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-4"
              >
                <label className="text-sm text-white/50 font-medium">
                  {item.label}
                </label>
                {item.type === "info" ? (
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" /> {item.value}
                  </div>
                ) : (
                  <div className="text-sm text-white font-medium bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 min-w-0 max-w-xs">
                    {item.value}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
const NAV_ITEMS: {
  id: View;
  icon: React.ReactNode;
  label: string;
  badge?: string;
}[] = [
  {
    id: "overview",
    icon: <LayoutDashboard className="h-4.5 w-4.5" />,
    label: "Overview",
  },
  {
    id: "seo",
    icon: <Search className="h-4.5 w-4.5" />,
    label: "SEO & Audit",
    badge: "3",
  },
  {
    id: "ads",
    icon: <Megaphone className="h-4.5 w-4.5" />,
    label: "Google Ads",
  },
  {
    id: "cro",
    icon: <MousePointerClick className="h-4.5 w-4.5" />,
    label: "CRO",
  },
  { id: "ai", icon: <Brain className="h-4.5 w-4.5" />, label: "AI Matrix" },
  {
    id: "reports",
    icon: <BarChart2 className="h-4.5 w-4.5" />,
    label: "Reports",
  },
  {
    id: "settings",
    icon: <Settings className="h-4.5 w-4.5" />,
    label: "Settings",
  },
];

function Sidebar({
  active,
  onSelect,
  collapsed,
  onToggle,
  onBack,
}: {
  active: View;
  onSelect: (v: View) => void;
  collapsed: boolean;
  onToggle: () => void;
  onBack?: () => void;
}) {
  return (
    <aside
      className={`hidden lg:flex flex-col shrink-0 border-r border-white/[0.06] transition-all duration-300 ${collapsed ? "w-[60px]" : "w-[220px]"}`}
      style={{ background: "rgba(5,8,16,0.9)", backdropFilter: "blur(20px)" }}
    >
      {/* logo area */}
      <div
        className={`flex items-center gap-3 h-16 border-b border-white/[0.06] px-4 ${collapsed ? "justify-center" : ""}`}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-3 group"
          title="Ana sayfaya dön"
        >
          {/* Logo mark */}
          <div className="relative shrink-0 w-8 h-8">
            {/* outer ring */}
            <div className="absolute inset-0 rounded-[10px] bg-gradient-to-br from-indigo-500 via-violet-600 to-emerald-400" />
            <div className="absolute inset-[1.5px] rounded-[8px] bg-[#050810]" />
            {/* inner SVG */}
            <svg
              className="absolute inset-0 m-auto"
              width="18"
              height="18"
              viewBox="0 0 22 22"
              fill="none"
            >
              {/* Diamond top */}
              <path
                d="M11 2L4 6.5V11"
                stroke="#818cf8"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 2L18 6.5V11"
                stroke="#818cf8"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Diamond mid */}
              <path
                d="M4 11L11 15.5L18 11"
                stroke="url(#lg_mid)"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Diamond bottom */}
              <path
                d="M4 15.5L11 20L18 15.5"
                stroke="#34d399"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Center dot */}
              <circle cx="11" cy="11" r="1.5" fill="url(#lg_dot)" />
              <defs>
                <linearGradient
                  id="lg_mid"
                  x1="4"
                  y1="11"
                  x2="18"
                  y2="15"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#a78bfa" />
                  <stop offset="1" stopColor="#6ee7b7" />
                </linearGradient>
                <linearGradient
                  id="lg_dot"
                  x1="9.5"
                  y1="9.5"
                  x2="12.5"
                  y2="12.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#6366f1" />
                  <stop offset="1" stopColor="#34d399" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          {!collapsed && (
            <span className="font-black text-base tracking-tight group-hover:opacity-80 transition-opacity">
              <span className="text-white">oiSio</span>
              <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                .ai
              </span>
            </span>
          )}
        </button>
      </div>

      {/* nav items */}
      <nav className="flex-1 py-4 px-2 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-sm font-medium transition-all group relative ${isActive ? "bg-indigo-500/15 text-white" : "text-white/40 hover:text-white hover:bg-white/[0.05]"}`}
            >
              <span
                className={`shrink-0 ${isActive ? "text-indigo-400" : "text-white/40 group-hover:text-white/70"}`}
              >
                {item.icon}
              </span>
              {!collapsed && (
                <span className="flex-1 text-left text-xs font-semibold">
                  {item.label}
                </span>
              )}
              {!collapsed && item.badge && (
                <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-rose-500/20 text-rose-400 border border-rose-500/20">
                  {item.badge}
                </span>
              )}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r bg-indigo-400" />
              )}
            </button>
          );
        })}
      </nav>

      {/* collapse toggle */}
      <div className="border-t border-white/[0.06] p-2">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-white/30 hover:text-white hover:bg-white/[0.05] transition-all text-xs font-medium"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

// ─── LOADING SKELETON ────────────────────────────────────────────────────────
function AnalysisLoadingOverlay() {
  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-5 bg-[#050810]/80 backdrop-blur-sm">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20" />
        <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 border-r-violet-500 border-b-emerald-500 border-l-transparent animate-spin" />
        <div className="absolute inset-3 rounded-full bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-violet-400 animate-pulse" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-bold text-white">DeepSeek AI Analyzing…</p>
        <p className="text-xs text-white/40 mt-1">
          Fetching page · Extracting SEO signals · Building report
        </p>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-indigo-400/60 animate-bounce"
            style={{ animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── MAIN SHELL ───────────────────────────────────────────────────────────────
export function DashboardPageContent({
  analysisResult,
  analysisLoading,
  analysisError,
  onBack,
}: {
  analysisResult?: AnalysisResult | null;
  analysisLoading?: boolean;
  analysisError?: string | null;
  onBack?: () => void;
}) {
  const [active, setActive] = useState<View>("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const PAGE_TITLES: Record<View, string> = {
    overview: "Command Center",
    seo: "SEO & Audit",
    ads: "Google Ads & RSA",
    cro: "CRO & Friction",
    ai: "AI Decision Matrix",
    reports: "Reports",
    settings: "Settings",
  };

  return (
    <div
      className="min-h-screen flex font-sans antialiased"
      style={{
        background:
          "linear-gradient(160deg,#050810 0%,#07091a 50%,#050810 100%)",
      }}
    >
      {/* noise overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Sidebar */}
      <Sidebar
        active={active}
        onSelect={setActive}
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        onBack={onBack}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header
          className="h-16 border-b border-white/[0.06] flex items-center px-5 gap-4 shrink-0 sticky top-0 z-20"
          style={{
            background: "rgba(5,8,16,0.85)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* mobile menu */}
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="lg:hidden p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/[0.06]"
          >
            {mobileNavOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <LayoutDashboard className="h-4 w-4" />
            )}
          </button>

          <div>
            <h1 className="text-sm font-bold text-white">
              {PAGE_TITLES[active]}
            </h1>
            <p className="text-[11px] text-white/30 font-medium truncate max-w-[240px]">
              {analysisResult?.url
                ? analysisResult.url
                    .replace(/^https?:\/\//, "")
                    .replace(/\/$/, "")
                : "Analyze a URL to see real data"}
            </p>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1.5 rounded-xl">
              <Shield className="h-3 w-3" /> SSRF Active
            </div>
            <button className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white/50 bg-white/[0.04] border border-white/[0.08] rounded-xl hover:bg-white/[0.08] transition-all">
              <RefreshCw className="h-3.5 w-3.5" /> Re-run Audit
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-violet-300 bg-violet-500/10 border border-violet-500/20 rounded-xl hover:bg-violet-500/15 transition-all">
              <Sparkles className="h-3.5 w-3.5" />
              <span className="hidden sm:block">AI Copilot</span>
            </button>
          </div>
        </header>

        {/* Mobile nav overlay */}
        {mobileNavOpen && (
          <div
            className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileNavOpen(false)}
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-64 border-r border-white/[0.07] p-3"
              style={{ background: "#050810" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 px-2 pt-2 flex items-center justify-between">
                <button
                  onClick={onBack}
                  className="flex items-center gap-2 group"
                >
                  <span className="font-black text-lg">
                    <span className="text-white">oiSio</span>
                    <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                      .ai
                    </span>
                  </span>
                </button>
                <button
                  onClick={onBack}
                  className="text-[10px] font-bold text-white/30 hover:text-white/70 px-2 py-1 rounded-lg hover:bg-white/[0.06] transition-all"
                >
                  ← Ana sayfa
                </button>
              </div>
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActive(item.id);
                    setMobileNavOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-0.5 transition-all ${active === item.id ? "bg-indigo-500/15 text-white" : "text-white/40 hover:text-white hover:bg-white/[0.05]"}`}
                >
                  <span className={active === item.id ? "text-indigo-400" : ""}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Page content */}
        <main className="relative flex-1 overflow-y-auto p-5 lg:p-7">
          {analysisLoading && <AnalysisLoadingOverlay />}
          <div className="max-w-7xl mx-auto">
            {analysisError && (
              <div className="mb-5 flex items-start gap-3 p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-rose-400" />
                <div>
                  <p className="text-sm font-bold text-rose-300">Analysis Failed</p>
                  <p className="text-xs text-rose-400/80 mt-0.5">{analysisError}</p>
                </div>
              </div>
            )}
            {active === "overview" && <OverviewView ar={analysisResult} />}
            {active === "seo" && <SeoView ar={analysisResult} />}
            {active === "ads" && <AdsView />}
            {active === "cro" && <CroView />}
            {active === "ai" && <AiView />}
            {active === "reports" && <ReportsView />}
            {active === "settings" && <SettingsView />}
          </div>
        </main>
      </div>
    </div>
  );
}
