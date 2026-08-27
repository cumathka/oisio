"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Search,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  X,
  ArrowUpRight,
  Copy,
  Check,
  Heart,
  Coffee,
  Code2,
  Lock,
  Star,
  Menu,
  ChevronRight,
  BarChart3,
  Target,
  PenTool,
  Rss,
  Monitor,
  Bot,
  Eye,
  Link2,
  Gauge,
  Cpu,
  Layout,
  ShoppingBag,
  Database,
  Zap,
  Shield,
  Globe,
} from "lucide-react";

// ─── TYPES ───────────────────────────────────────────────────────────────────
type Lang = "TR" | "DE" | "EN";
const FLAGS: Record<Lang, string> = { TR: "🇹🇷", DE: "🇩🇪", EN: "🇬🇧" };

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  TR: {
    nav: ["Araçlar", "Karşılaştır", "SSS"],
    badge: "15 Premium SEO Aracı • Tamamen Ücretsiz",
    h1a: "SEO Sorunlarınızı",
    h1b: "Tek Sistemde Çözün",
    sub: "Semrush veya Ahrefs'e aylık yüzlerce dolar ödemek zorunda değilsiniz. oiSio, rakiplerin ücretli sunduğu tüm analiz ve otomasyon araçlarını kalıcı olarak ücretsiz sunar.",
    placeholder: "https://siteniz.com",
    cta: "Ücretsiz Analiz Başlat",
    cta_sub: "Kayıt yok • Kredi kartı yok • Sonsuza ücretsiz",
    analyzing: "Analiz ediliyor",
    tools_title: "Her Şey Dahil — Ücretsiz",
    tools_sub:
      "Rakip platformların aylık yüzlerce dolara sattığı tüm araçlar, oiSio'da sonsuza ücretsiz.",
    compare_title: "Neden oiSio?",
    compare_sub: "Aylık €99–499 ödemeden aynı kalitede analiz.",
    compare_feature: "Özellik",
    stats: ["Analiz Edildi", "Hata Tespit", "Aktif Kullanıcı", "Dil Desteği"],
    faq_title: "Sıkça Sorulanlar",
    donate_title: "Bu Aracı Ücretsiz Tut",
    donate_sub:
      "Sunucu maliyetleri için gönüllü destek kabul ediyoruz. Her bağış platformu ayakta tutar.",
    donate_btn: "☕  Kahve Ismarla",
    crypto_label: "Kripto (USDT · TRC20)",
    iban_label: "Banka Havalesi",
    footer_tag: "Herkes için ücretsiz dijital pazarlama zekası.",
    ad_label: "Reklam",
    faqs: [
      {
        q: "Neden tamamen ücretsiz?",
        a: "Platform Google AdSense reklam gelirleriyle desteklenmektedir. Kullanıcılar analiz ederken biz reklam geliri elde ederiz.",
      },
      {
        q: "Veri gizliliğim nasıl korunuyor?",
        a: "Taranan hiçbir veri üçüncü taraflarla paylaşılmaz. SSRF koruması ile iç ağ taramaları tamamen engellenir.",
      },
      {
        q: "Ücretli planlara geçecek misiniz?",
        a: "Hayır. Temel araçlar sonsuza dek ücretsiz kalacak.",
      },
      {
        q: "Kaç dil destekleniyor?",
        a: "99 dilde SEO analizi ve içerik oluşturma desteği mevcuttur.",
      },
    ],
  },
  DE: {
    nav: ["Tools", "Vergleichen", "FAQ"],
    badge: "15 Premium SEO-Tools • Völlig kostenlos",
    h1a: "Alle SEO-Probleme",
    h1b: "In Einem System Lösen",
    sub: "Sie müssen nicht monatlich hunderte Euro für Semrush oder Ahrefs bezahlen. oiSio bietet alle Analyse- und Automatisierungstools der Konkurrenz dauerhaft kostenlos an.",
    placeholder: "https://ihre-website.de",
    cta: "Kostenlose Analyse starten",
    cta_sub: "Keine Anmeldung • Keine Kreditkarte • Für immer kostenlos",
    analyzing: "Wird analysiert",
    tools_title: "Alles Inklusive — Kostenlos",
    tools_sub:
      "Alle Tools, die Konkurrenzplattformen monatlich für hunderte Euro verkaufen, sind bei oiSio für immer kostenlos.",
    compare_title: "Warum oiSio?",
    compare_sub: "Gleiche Qualität ohne monatliche €99–499.",
    compare_feature: "Funktion",
    stats: [
      "Analysierte Seiten",
      "Erkannte Fehler",
      "Aktive Nutzer",
      "Sprachen",
    ],
    faq_title: "Häufige Fragen",
    donate_title: "Helfen Sie, es kostenlos zu halten",
    donate_sub:
      "Wir akzeptieren freiwillige Unterstützung für Serverkosten. Jeder Beitrag hält die Plattform am Laufen.",
    donate_btn: "☕  Kaffee spendieren",
    crypto_label: "Krypto (USDT · TRC20)",
    iban_label: "Banküberweisung",
    footer_tag: "Kostenlose Marketing-Intelligenz für alle.",
    ad_label: "Werbung",
    faqs: [
      {
        q: "Warum ist es kostenlos?",
        a: "Die Plattform wird durch Google AdSense-Werbeeinnahmen finanziert.",
      },
      {
        q: "Wie wird meine Datenprivatsphäre geschützt?",
        a: "Keine Daten werden mit Dritten geteilt. SSRF-Schutz blockiert interne Netzwerkscans.",
      },
      {
        q: "Wird es kostenpflichtige Pläne geben?",
        a: "Nein. Die Basistools bleiben für immer kostenlos.",
      },
      {
        q: "Wie viele Sprachen werden unterstützt?",
        a: "99 Sprachen werden für SEO-Analyse und Content-Erstellung unterstützt.",
      },
    ],
  },
  EN: {
    nav: ["Tools", "Compare", "FAQ"],
    badge: "15 Premium SEO Tools • Completely Free",
    h1a: "Solve All Your SEO",
    h1b: "Problems in One System",
    sub: "You don't need to pay hundreds of dollars a month for Semrush or Ahrefs. oiSio permanently offers all the analysis and automation tools that competitors charge for, completely free.",
    placeholder: "https://your-website.com",
    cta: "Start Free Analysis",
    cta_sub: "No sign-up • No credit card • Free forever",
    analyzing: "Analyzing",
    tools_title: "Everything Included — Free",
    tools_sub:
      "Every tool that competing platforms sell for hundreds per month is permanently free on oiSio.",
    compare_title: "Why oiSio?",
    compare_sub: "Same quality analysis without the €99–499/month bill.",
    compare_feature: "Feature",
    stats: ["Sites Analyzed", "Issues Found", "Active Users", "Languages"],
    faq_title: "Frequently Asked Questions",
    donate_title: "Keep This Tool Free",
    donate_sub:
      "We accept voluntary support for server costs. Every donation keeps the platform alive.",
    donate_btn: "☕  Buy us a Coffee",
    crypto_label: "Crypto (USDT · TRC20)",
    iban_label: "Bank Transfer",
    footer_tag: "Free digital marketing intelligence for everyone.",
    ad_label: "Advertisement",
    faqs: [
      {
        q: "Why is it free?",
        a: "The platform is funded by Google AdSense revenue. Users analyze, we earn through ads.",
      },
      {
        q: "How is my privacy protected?",
        a: "No scanned data is shared with third parties. SSRF protection blocks all internal network scans.",
      },
      {
        q: "Will you add paid plans?",
        a: "No. Core tools will remain free forever.",
      },
      {
        q: "How many languages are supported?",
        a: "SEO analysis and content creation in 99 languages.",
      },
    ],
  },
};

const TERMINAL: Record<Lang, string[]> = {
  TR: [
    "▶  robots.txt ve sitemap taranıyor…",
    "▶  DOM ve meta hiyerarşisi analiz ediliyor…",
    "▶  Core Web Vitals ölçülüyor…",
    "▶  Rakip sıralamaları kontrol ediliyor…",
    "▶  Backlink profili inceleniyor…",
    "✓  108 kriter tamamlandı — rapor hazırlanıyor…",
  ],
  DE: [
    "▶  robots.txt und Sitemap werden gecrawlt…",
    "▶  DOM-Struktur wird analysiert…",
    "▶  Core Web Vitals werden gemessen…",
    "▶  Konkurrenz-Rankings werden überprüft…",
    "▶  Backlink-Profil wird untersucht…",
    "✓  108 Kriterien abgeschlossen — Bericht wird erstellt…",
  ],
  EN: [
    "▶  Crawling robots.txt and sitemap…",
    "▶  Analyzing DOM structure and meta tags…",
    "▶  Measuring Core Web Vitals…",
    "▶  Checking competitor rankings…",
    "▶  Inspecting backlink profile…",
    "✓  108 criteria complete — building report…",
  ],
};

const TOOLS = [
  {
    icon: "spider",
    color: "#818cf8",
    bg: "rgba(99,102,241,0.08)",
    tag: { TR: "Teknik", DE: "Technisch", EN: "Technical" },
    title: { TR: "SEO Spider", DE: "SEO Spider", EN: "SEO Spider" },
    desc: {
      TR: "108 kriterde tarama — kırık link, eksik meta, canonical.",
      DE: "108 Kriterien — defekte Links, fehlende Meta-Tags.",
      EN: "108 criteria — broken links, missing meta, canonical.",
    },
  },
  {
    icon: "barchart",
    color: "#a78bfa",
    bg: "rgba(139,92,246,0.08)",
    tag: { TR: "Analiz", DE: "Analyse", EN: "Analysis" },
    title: {
      TR: "Rakip Analizi",
      DE: "Wettbewerbsanalyse",
      EN: "Competitor Analysis",
    },
    desc: {
      TR: "Rakip sıralama boşluklarını ve güçlü yönleri analiz et.",
      DE: "Ranking-Lücken und Stärken der Konkurrenten analysieren.",
      EN: "Analyze competitor ranking gaps and strengths.",
    },
  },
  {
    icon: "target",
    color: "#60a5fa",
    bg: "rgba(59,130,246,0.08)",
    tag: { TR: "Analiz", DE: "Analyse", EN: "Analysis" },
    title: {
      TR: "Anahtar Kelime",
      DE: "Keyword Analyse",
      EN: "Keyword Intelligence",
    },
    desc: {
      TR: "Ticari niyetli kelimeler — hacim ve rekabet skoru.",
      DE: "Kommerzielle Keywords mit Suchvolumen.",
      EN: "Commercial-intent keywords with volume and scores.",
    },
  },
  {
    icon: "pen",
    color: "#34d399",
    bg: "rgba(16,185,129,0.08)",
    tag: { TR: "İçerik", DE: "Content", EN: "Content" },
    title: {
      TR: "AI İçerik Yazarı",
      DE: "KI Content Writer",
      EN: "AI Content Writer",
    },
    desc: {
      TR: "99+ dilde SEO uyumlu özgün içerik otomatik üret.",
      DE: "SEO-kompatible Inhalte in 99+ Sprachen erstellen.",
      EN: "Generate SEO-compliant content in 99+ languages.",
    },
  },
  {
    icon: "rss",
    color: "#2dd4bf",
    bg: "rgba(20,184,166,0.08)",
    tag: { TR: "İçerik", DE: "Content", EN: "Content" },
    title: {
      TR: "Otomatik SEO Blog",
      DE: "Auto SEO Blog",
      EN: "Auto SEO Blog",
    },
    desc: {
      TR: "Haftalık içerik planı ve yayın otomasyonu.",
      DE: "Wöchentlicher Content-Plan und Automatisierung.",
      EN: "Weekly content calendar and publish automation.",
    },
  },
  {
    icon: "monitor",
    color: "#fbbf24",
    bg: "rgba(245,158,11,0.08)",
    tag: { TR: "İzleme", DE: "Monitoring", EN: "Monitoring" },
    title: { TR: "Uptime İzleme", DE: "Uptime Monitor", EN: "Uptime Monitor" },
    desc: {
      TR: "7/24 izle, kesintide SMS ve e-posta al.",
      DE: "24/7 überwachen, sofortige SMS/E-Mail bei Ausfall.",
      EN: "Monitor 24/7, get instant SMS & email on downtime.",
    },
  },
  {
    icon: "bot",
    color: "#f87171",
    bg: "rgba(239,68,68,0.08)",
    tag: { TR: "İzleme", DE: "Monitoring", EN: "Monitoring" },
    title: {
      TR: "AI Bot Takibi",
      DE: "KI Bot Tracking",
      EN: "AI Bot Tracking",
    },
    desc: {
      TR: "ChatGPT, Gemini, Perplexity tarama sıklığını izle.",
      DE: "ChatGPT, Gemini, Perplexity-Crawls verfolgen.",
      EN: "Track ChatGPT, Gemini & Perplexity crawl frequency.",
    },
  },
  {
    icon: "eye",
    color: "#f472b6",
    bg: "rgba(236,72,153,0.08)",
    tag: { TR: "İzleme", DE: "Monitoring", EN: "Monitoring" },
    title: {
      TR: "Etkileşim Takibi",
      DE: "Interaktions-Tracking",
      EN: "Interaction Tracking",
    },
    desc: {
      TR: "Kullanıcıların sayfada nereye tıkladığını gör.",
      DE: "Sehen, wo Nutzer auf der Seite klicken.",
      EN: "See where users click and how they navigate.",
    },
  },
  {
    icon: "link",
    color: "#fb923c",
    bg: "rgba(249,115,22,0.08)",
    tag: { TR: "Otorite", DE: "Autorität", EN: "Authority" },
    title: {
      TR: "Backlink Analizi",
      DE: "Backlink Analyse",
      EN: "Backlink Analysis",
    },
    desc: {
      TR: "Mevcut backlinkleri analiz et, yeni fırsatlar bul.",
      DE: "Bestehende Backlinks analysieren, neue Chancen finden.",
      EN: "Analyze existing backlinks and find new opportunities.",
    },
  },
  {
    icon: "gauge",
    color: "#22d3ee",
    bg: "rgba(6,182,212,0.08)",
    tag: { TR: "Performans", DE: "Performance", EN: "Performance" },
    title: {
      TR: "Core Web Vitals",
      DE: "Core Web Vitals",
      EN: "Core Web Vitals",
    },
    desc: {
      TR: "LCP, CLS, FID — gerçek DOM telemetrisi.",
      DE: "LCP, CLS, FID — echte DOM-Telemetrie.",
      EN: "LCP, CLS, FID measured with real DOM telemetry.",
    },
  },
  {
    icon: "cpu",
    color: "#c084fc",
    bg: "rgba(168,85,247,0.08)",
    tag: { TR: "Reklam", DE: "Werbung", EN: "Advertising" },
    title: { TR: "Google Ads RSA", DE: "Google Ads RSA", EN: "Google Ads RSA" },
    desc: {
      TR: "Başlık limitleri, politika ihlali ve kalite skoru.",
      DE: "Titellimits, Richtlinienverstöße, Qualitätsscore.",
      EN: "Headline limits, policy violations, quality score.",
    },
  },
  {
    icon: "layout",
    color: "#a3e635",
    bg: "rgba(132,204,22,0.08)",
    tag: { TR: "Entegrasyon", DE: "Integration", EN: "Integration" },
    title: { TR: "WordPress SEO", DE: "WordPress SEO", EN: "WordPress SEO" },
    desc: {
      TR: "WordPress sitenizi tek tıkla senkronize et.",
      DE: "WordPress-Site mit einem Klick synchronisieren.",
      EN: "Sync your WordPress site in one click.",
    },
  },
  {
    icon: "shop",
    color: "#e879f9",
    bg: "rgba(217,70,239,0.08)",
    tag: { TR: "Entegrasyon", DE: "Integration", EN: "Integration" },
    title: {
      TR: "Shopify & Wix SEO",
      DE: "Shopify & Wix SEO",
      EN: "Shopify & Wix SEO",
    },
    desc: {
      TR: "E-ticaret sayfalarını otomatik SEO ile üst sıralara taşı.",
      DE: "E-Commerce-Seiten mit Auto-SEO nach oben bringen.",
      EN: "Lift e-commerce pages to top rankings automatically.",
    },
  },
  {
    icon: "db",
    color: "#38bdf8",
    bg: "rgba(14,165,233,0.08)",
    tag: { TR: "Veri", DE: "Daten", EN: "Data" },
    title: { TR: "GSC & GA4", DE: "GSC & GA4", EN: "GSC & GA4" },
    desc: {
      TR: "Search Console ve Analytics tek panelde.",
      DE: "Search Console und Analytics in einem Dashboard.",
      EN: "Search Console and Analytics in one dashboard.",
    },
  },
  {
    icon: "code",
    color: "#94a3b8",
    bg: "rgba(100,116,139,0.08)",
    tag: { TR: "Geliştirici", DE: "Entwickler", EN: "Developer" },
    title: {
      TR: "API & MCP Server",
      DE: "API & MCP Server",
      EN: "API & MCP Server",
    },
    desc: {
      TR: "REST API veya MCP protokolü ile tam erişim.",
      DE: "Vollständiger Zugriff per REST API oder MCP.",
      EN: "Full access via REST API or MCP protocol.",
    },
  },
];

const CMP_ROWS: Record<Lang, string[]> = {
  TR: [
    "Teknik SEO Tarama",
    "Anahtar Kelime Analizi",
    "Rakip Analizi",
    "AI İçerik Üretimi",
    "Uptime İzleme",
    "Google Ads RSA",
    "Backlink Analizi",
    "Core Web Vitals",
    "API Erişimi",
    "Ücretsiz",
  ],
  DE: [
    "Technisches SEO Crawling",
    "Keyword-Analyse",
    "Wettbewerbsanalyse",
    "KI-Content-Erstellung",
    "Uptime-Monitoring",
    "Google Ads RSA",
    "Backlink-Analyse",
    "Core Web Vitals",
    "API-Zugang",
    "Kostenlos",
  ],
  EN: [
    "Technical SEO Crawling",
    "Keyword Analysis",
    "Competitor Analysis",
    "AI Content Generation",
    "Uptime Monitoring",
    "Google Ads RSA",
    "Backlink Analysis",
    "Core Web Vitals",
    "API Access",
    "Free",
  ],
};

// ─── LOGO ─────────────────────────────────────────────────────────────────────
function OiSioLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className={`relative shrink-0 ${compact ? "w-8 h-8" : "w-10 h-10"}`}>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-emerald-400" />
        <div className="absolute inset-[1.5px] rounded-[10px] bg-[#050810] flex items-center justify-center">
          <svg
            width={compact ? 14 : 18}
            height={compact ? 14 : 18}
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10 1L2 5.5L10 10L18 5.5Z"
              stroke="url(#lg1)"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path
              d="M2 14.5L10 19L18 14.5"
              stroke="url(#lg1)"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path
              d="M2 10L10 14.5L18 10"
              stroke="url(#lg2)"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient
                id="lg1"
                x1="2"
                y1="1"
                x2="18"
                y2="19"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#818cf8" />
                <stop offset="1" stopColor="#34d399" />
              </linearGradient>
              <linearGradient
                id="lg2"
                x1="2"
                y1="10"
                x2="18"
                y2="10"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#a78bfa" />
                <stop offset="1" stopColor="#6ee7b7" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <span
        className={`font-black tracking-tight ${compact ? "text-base" : "text-xl"}`}
      >
        <span className="text-white">oiSio</span>
        <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
          .ai
        </span>
      </span>
    </div>
  );
}

// ─── TOOL ICON ────────────────────────────────────────────────────────────────
function ToolIcon({ name, color }: { name: string; color: string }) {
  const cls = `h-5 w-5`;
  const style = { color };
  if (name === "spider")
    return (
      <svg
        className={cls}
        style={style}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 9 L12 3M12 15 L12 21M9 10.5 L3 7M15 13.5 L21 17M9 13.5 L3 17M15 10.5 L21 7" />
      </svg>
    );
  if (name === "barchart") return <BarChart3 className={cls} style={style} />;
  if (name === "target") return <Target className={cls} style={style} />;
  if (name === "pen") return <PenTool className={cls} style={style} />;
  if (name === "rss") return <Rss className={cls} style={style} />;
  if (name === "monitor") return <Monitor className={cls} style={style} />;
  if (name === "bot") return <Bot className={cls} style={style} />;
  if (name === "eye") return <Eye className={cls} style={style} />;
  if (name === "link") return <Link2 className={cls} style={style} />;
  if (name === "gauge") return <Gauge className={cls} style={style} />;
  if (name === "cpu") return <Cpu className={cls} style={style} />;
  if (name === "layout") return <Layout className={cls} style={style} />;
  if (name === "shop") return <ShoppingBag className={cls} style={style} />;
  if (name === "db") return <Database className={cls} style={style} />;
  return <Code2 className={cls} style={style} />;
}

// ─── AD SLOT ─────────────────────────────────────────────────────────────────
function AdSlot({ label, h }: { label: string; h: string }) {
  return (
    <div
      className={`w-full ${h} flex items-center justify-center border border-dashed border-white/[0.05] rounded-2xl bg-white/[0.015]`}
    >
      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/15">
        {label} · Google AdSense
      </span>
    </div>
  );
}

// ─── COPY BUTTON ─────────────────────────────────────────────────────────────
function CopyBtn({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text).catch(() => {});
        setDone(true);
        setTimeout(() => setDone(false), 2000);
      }}
      className="p-1.5 rounded-lg transition-colors hover:bg-white/10 text-white/25 hover:text-white/60"
    >
      {done ? (
        <Check className="h-3.5 w-3.5 text-emerald-400" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export function FreeToolView({
  onAnalyze,
}: {
  onAnalyze: (url: string) => void;
}) {
  const [lang, setLang] = useState<Lang>("DE");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [termStep, setTermStep] = useState(-1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = T[lang];

  useEffect(() => {
    const l = navigator.language.split("-")[0].toUpperCase();
    setLang(l === "TR" ? "TR" : l === "DE" ? "DE" : "EN");
  }, []);

  const handleAnalyze = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!url.trim()) {
        inputRef.current?.focus();
        return;
      }
      setLoading(true);
      setTermStep(0);
      const steps = TERMINAL[lang];
      steps.forEach((_, i) => setTimeout(() => setTermStep(i), i * 450));
      setTimeout(
        () => {
          setLoading(false);
          setTermStep(-1);
          onAnalyze(url.trim());
        },
        steps.length * 450 + 400,
      );
    },
    [url, lang, onAnalyze],
  );

  const allTags = [...new Set(TOOLS.map((x) => x.tag[lang]))];
  const filteredTools = activeTag
    ? TOOLS.filter((x) => x.tag[lang] === activeTag)
    : TOOLS;

  return (
    <div
      className="min-h-screen text-slate-100 font-sans antialiased overflow-x-hidden"
      style={{
        background:
          "linear-gradient(160deg,#050810 0%,#07091a 40%,#050810 100%)",
      }}
    >
      {/* noise texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50">
        {/* glass bar */}
        <div className="mx-4 mt-3 rounded-2xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-2xl shadow-2xl shadow-black/40">
          <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between gap-4">
            <OiSioLogo />

            {/* desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {t.nav.map((item, i) => (
                <a
                  key={i}
                  href={["#tools", "#compare", "#faq"][i]}
                  className="px-4 py-1.5 text-sm font-medium text-white/50 hover:text-white rounded-xl hover:bg-white/[0.06] transition-all duration-150"
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {/* lang pills */}
              <div className="hidden sm:flex gap-0.5 p-0.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                {(["DE", "EN", "TR"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`h-7 px-3 text-xs font-bold rounded-[10px] transition-all ${lang === l ? "bg-white/[0.12] text-white" : "text-white/35 hover:text-white/70"}`}
                  >
                    {FLAGS[l]} {l}
                  </button>
                ))}
              </div>
              <a
                href="#donate"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl hover:bg-amber-500/15 transition-all"
              >
                ☕ Support
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/[0.06]"
              >
                {mobileOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* mobile drawer */}
        {mobileOpen && (
          <div className="md:hidden mx-4 mt-1.5 rounded-2xl border border-white/[0.07] bg-[#07091a]/95 backdrop-blur-2xl p-4 space-y-1 shadow-2xl">
            {t.nav.map((item, i) => (
              <a
                key={i}
                href={["#tools", "#compare", "#faq"][i]}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all"
              >
                {item}
              </a>
            ))}
            <div className="flex gap-2 pt-2 border-t border-white/[0.05]">
              {(["DE", "EN", "TR"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLang(l);
                    setMobileOpen(false);
                  }}
                  className={`flex-1 py-2 text-sm font-bold rounded-xl border transition-all ${lang === l ? "border-indigo-500/40 bg-indigo-500/10 text-white" : "border-white/[0.08] text-white/30"}`}
                >
                  {FLAGS[l]} {l}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ── TOP AD ─────────────────────────────────────────────────────────── */}
      <div className="pt-24 pb-3 px-5 max-w-4xl mx-auto">
        <AdSlot label={t.ad_label} h="h-[70px]" />
      </div>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-10 pb-24 overflow-hidden">
        {/* ambient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full opacity-[0.12]"
            style={{
              background:
                "radial-gradient(ellipse, #6366f1 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-[-100px] -left-[200px] w-[600px] h-[500px] rounded-full opacity-[0.07]"
            style={{
              background:
                "radial-gradient(ellipse, #8b5cf6 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-0 -right-[200px] w-[500px] h-[600px] rounded-full opacity-[0.06]"
            style={{
              background:
                "radial-gradient(ellipse, #10b981 0%, transparent 70%)",
            }}
          />
          {/* grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-5 text-center">
          {/* live badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-60" />
              <span className="relative rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-xs font-semibold text-white/60">
              {t.badge}
            </span>
          </div>

          {/* headline */}
          <h1 className="text-[clamp(2.6rem,7vw,5.5rem)] font-black tracking-tight leading-[1.05] mb-6">
            <span className="text-white">{t.h1a}</span>
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                {t.h1b}
              </span>
              {/* underline glow */}
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-indigo-500/0 via-violet-500/60 to-emerald-500/0" />
            </span>
          </h1>

          <p className="text-white/45 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            {t.sub}
          </p>

          {/* search input */}
          <form
            onSubmit={handleAnalyze}
            className="relative max-w-2xl mx-auto group"
          >
            {/* animated border gradient */}
            <div className="absolute -inset-px rounded-[22px] bg-gradient-to-r from-indigo-500/0 via-violet-500/0 to-emerald-500/0 group-focus-within:from-indigo-500/60 group-focus-within:via-violet-500/50 group-focus-within:to-emerald-500/50 transition-all duration-500 blur-[2px] pointer-events-none" />
            <div className="relative flex items-center gap-2 bg-white/[0.05] border border-white/[0.10] group-focus-within:border-transparent rounded-[20px] p-2 shadow-[0_8px_40px_rgba(0,0,0,0.4)] transition-all">
              <Search className="h-5 w-5 text-white/25 ml-3 shrink-0" />
              <input
                ref={inputRef}
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={t.placeholder}
                disabled={loading}
                className="flex-1 min-w-0 bg-transparent outline-none text-white text-base md:text-lg placeholder-white/20 py-3.5 pr-2"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="shrink-0 flex items-center gap-2 px-5 py-3.5 rounded-[14px] font-bold text-sm md:text-base text-white transition-all active:scale-95 disabled:opacity-50"
                style={{
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                }}
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                <span className="hidden sm:block">
                  {loading ? `${t.analyzing}…` : t.cta}
                </span>
              </button>
            </div>

            {/* terminal */}
            <div
              className={`mt-3 overflow-hidden transition-all duration-400 ${loading ? "max-h-56 opacity-100" : "max-h-0 opacity-0"}`}
            >
              <div className="text-left bg-black/60 border border-white/[0.06] rounded-2xl px-5 py-4 font-mono text-xs space-y-1.5 backdrop-blur-sm">
                <div className="flex items-center gap-2 pb-2 border-b border-white/[0.05]">
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                  <span className="ml-2 text-white/20 text-[10px]">
                    oiSio.ai — analysis engine
                  </span>
                </div>
                {TERMINAL[lang].map((step, i) => (
                  <div
                    key={i}
                    className={`transition-all duration-300 ${i <= termStep ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"} ${i === TERMINAL[lang].length - 1 && i <= termStep ? "text-emerald-400 font-bold" : "text-white/40"}`}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </form>

          <p className="mt-4 text-[11px] text-white/20 font-medium tracking-wide">
            {t.cta_sub}
          </p>

          {/* floating trust chips */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {[
              {
                icon: <Shield className="h-3.5 w-3.5" />,
                label: "SSRF Protected",
              },
              {
                icon: <Globe className="h-3.5 w-3.5" />,
                label: "99 Languages",
              },
              { icon: <Zap className="h-3.5 w-3.5" />, label: "108 Criteria" },
            ].map((c, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold text-white/40 bg-white/[0.03] border border-white/[0.06] rounded-full"
              >
                <span className="text-indigo-400">{c.icon}</span>
                {c.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────────────── */}
      <div
        className="border-y border-white/[0.05]"
        style={{
          background:
            "linear-gradient(90deg,rgba(99,102,241,0.04),rgba(139,92,246,0.04),rgba(16,185,129,0.04))",
        }}
      >
        <div className="max-w-4xl mx-auto px-5 py-7 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {["124K+", "2.4M+", "18K+", "99+"].map((v, i) => (
            <div key={i} className="space-y-1">
              <div className="text-3xl font-black text-white tabular-nums">
                {v}
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-widest text-white/30">
                {t.stats[i]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TOOLS ──────────────────────────────────────────────────────────── */}
      <section id="tools" className="max-w-7xl mx-auto px-5 py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            {t.tools_title}
          </h2>
          <p className="text-white/40 text-base md:text-lg max-w-xl mx-auto">
            {t.tools_sub}
          </p>
        </div>

        {/* filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-4 py-1.5 text-xs font-bold rounded-full border transition-all ${!activeTag ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-300" : "border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/20"}`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`px-4 py-1.5 text-xs font-bold rounded-full border transition-all ${activeTag === tag ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-300" : "border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/20"}`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filteredTools.map((tool, i) => (
            <button
              key={i}
              onClick={() => onAnalyze("https://example.com")}
              className="group relative text-left p-5 rounded-2xl border border-white/[0.06] overflow-hidden transition-all duration-300 hover:border-white/[0.14] hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-black/30"
              style={{ background: "rgba(255,255,255,0.025)" }}
            >
              {/* color accent bg on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{ background: tool.bg }}
              />
              {/* top-right tag */}
              <span
                className="absolute top-3.5 right-3.5 text-[9px] font-bold uppercase tracking-widest"
                style={{ color: `${tool.color}70` }}
              >
                {tool.tag[lang]}
              </span>
              {/* icon in circle */}
              <div
                className="relative mb-4 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: tool.bg,
                  border: `1px solid ${tool.color}25`,
                }}
              >
                <ToolIcon name={tool.icon} color={tool.color} />
              </div>
              <h3 className="relative text-sm font-bold text-white mb-1.5 pr-8">
                {tool.title[lang]}
              </h3>
              <p className="relative text-xs text-white/35 leading-relaxed">
                {tool.desc[lang]}
              </p>
              <div
                className="relative mt-3 flex items-center gap-1 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: tool.color }}
              >
                <span>
                  {lang === "TR"
                    ? "Başlat"
                    : lang === "DE"
                      ? "Starten"
                      : "Launch"}
                </span>
                <ArrowUpRight className="h-3 w-3" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── MID AD ─────────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-5 pb-14">
        <AdSlot label={t.ad_label} h="h-[60px]" />
      </div>

      {/* ── COMPARE ────────────────────────────────────────────────────────── */}
      <section id="compare" className="py-20 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-3">
              {t.compare_title}
            </h2>
            <p className="text-white/35 text-lg">{t.compare_sub}</p>
          </div>
          <div
            className="rounded-2xl overflow-hidden border border-white/[0.07] shadow-2xl"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[580px]">
                <thead>
                  <tr className="border-b border-white/[0.07]">
                    <th className="text-left py-4 px-6 text-white/40 font-semibold w-44">
                      {t.compare_feature}
                    </th>
                    <th className="py-4 px-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <OiSioLogo compact />
                        <span className="text-[9px] font-black text-emerald-400 tracking-widest uppercase">
                          FREE
                        </span>
                      </div>
                    </th>
                    {[
                      ["Semrush", "€119/mo"],
                      ["Ahrefs", "€99/mo"],
                      ["KAF AI", "€49/mo"],
                    ].map(([name, price]) => (
                      <th key={name} className="py-4 px-4 text-center">
                        <span className="text-white/40 font-semibold text-xs">
                          {name}
                        </span>
                        <br />
                        <span className="text-[10px] text-white/25">
                          {price}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CMP_ROWS[lang].map((row, i) => {
                    const isLast = i === CMP_ROWS[lang].length - 1;
                    return (
                      <tr
                        key={i}
                        className={`border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors ${isLast ? "bg-emerald-500/[0.04]" : ""}`}
                      >
                        <td className="py-3.5 px-6 text-white/55 font-medium">
                          {row}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <CheckCircle2
                            className={`h-4 w-4 mx-auto ${isLast ? "text-emerald-400" : "text-emerald-500/70"}`}
                          />
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {isLast ? (
                            <X className="h-4 w-4 mx-auto text-rose-500/50" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 mx-auto text-white/20" />
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {isLast || i >= 4 ? (
                            <X className="h-4 w-4 mx-auto text-rose-500/40" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 mx-auto text-white/20" />
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {isLast || i >= 8 ? (
                            <X className="h-4 w-4 mx-auto text-rose-500/40" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 mx-auto text-white/20" />
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: "Maximilian R.",
              role: "Head of Growth · Berlin",
              quote:
                "oiSio found 14 critical SEO issues in seconds — issues we missed for months. Completely free and incredibly accurate.",
              avatar: "M",
            },
            {
              name: "Selin K.",
              role: "E-commerce Manager · İstanbul",
              quote:
                "Semrush için ayda 500 TL ödüyordum. oiSio her şeyi ücretsiz veriyor, hatta daha fazlası var.",
              avatar: "S",
            },
            {
              name: "Thomas W.",
              role: "Freelance SEO · Wien",
              quote:
                "Das Keyword-Tool ist auf Augenhöhe mit Ahrefs — und kostet null Euro. Unglaublich.",
              avatar: "T",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="relative p-5 rounded-2xl border border-white/[0.06] overflow-hidden"
              style={{ background: "rgba(255,255,255,0.025)" }}
            >
              <div className="absolute top-4 right-5 text-4xl font-black text-white/[0.03] leading-none">
                "
              </div>
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="h-3.5 w-3.5 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
              <p className="text-sm text-white/50 leading-relaxed mb-4">
                {item.quote}
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white"
                  style={{
                    background: "linear-gradient(135deg,#6366f1,#10b981)",
                  }}
                >
                  {item.avatar}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    {item.name}
                  </div>
                  <div className="text-[10px] text-white/30">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section id="faq" className="max-w-2xl mx-auto px-5 py-12 pb-20">
        <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-8 tracking-tight">
          {t.faq_title}
        </h2>
        <div className="space-y-2">
          {t.faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden border border-white/[0.06]"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-white hover:bg-white/[0.03] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronRight
                  className={`h-4 w-4 shrink-0 text-white/25 transition-transform duration-200 ${openFaq === i ? "rotate-90" : ""}`}
                />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-sm text-white/40 leading-relaxed border-t border-white/[0.04] pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA + AD ────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <AdSlot label={t.ad_label} h="h-[250px]" />
        <div>
          <h3 className="text-2xl font-black text-white tracking-tight mb-3">
            {t.tools_title}
          </h3>
          <p className="text-white/40 text-sm leading-relaxed mb-6">{t.sub}</p>
          <form onSubmit={handleAnalyze} className="flex gap-2">
            <input
              type="url"
              placeholder={t.placeholder}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 min-w-0 bg-white/[0.05] border border-white/[0.10] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-indigo-500/50 transition-colors"
              required
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl font-bold text-sm text-white transition-all active:scale-95 whitespace-nowrap"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
            >
              {t.cta}
            </button>
          </form>
        </div>
      </section>

      {/* ── DONATE ─────────────────────────────────────────────────────────── */}
      <section
        id="donate"
        className="py-20 border-t border-white/[0.04]"
        style={{
          background:
            "linear-gradient(180deg,transparent,rgba(217,119,6,0.04),transparent)",
        }}
      >
        <div className="max-w-lg mx-auto px-5 text-center">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 border border-amber-500/20"
            style={{ background: "rgba(245,158,11,0.08)" }}
          >
            <Heart className="h-7 w-7 text-amber-400" />
          </div>
          <h2 className="text-2xl font-black text-white mb-3">
            {t.donate_title}
          </h2>
          <p className="text-white/40 text-sm leading-relaxed mb-8">
            {t.donate_sub}
          </p>
          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-black text-amber-950 transition-all hover:scale-105 active:scale-95 mb-8 shadow-xl shadow-amber-500/20"
            style={{ background: "linear-gradient(135deg,#f59e0b,#fbbf24)" }}
          >
            <Coffee className="h-5 w-5" /> {t.donate_btn}
          </a>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {[
              {
                label: t.crypto_label,
                val: "TNPxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                icon: <Code2 className="h-3.5 w-3.5 text-indigo-400" />,
              },
              {
                label: t.iban_label,
                val: "TR12 0000 0000 0000 0000 00 · Cuma Kaya",
                icon: <Lock className="h-3.5 w-3.5 text-emerald-400" />,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="p-4 rounded-xl border border-white/[0.06]"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  {item.icon}
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <code className="text-[11px] text-white/50 font-mono truncate flex-1">
                    {item.val}
                  </code>
                  <CopyBtn text={item.val} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.04] py-8">
        <div className="max-w-7xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <OiSioLogo compact />
          <p className="text-xs text-white/20 font-medium">{t.footer_tag}</p>
          <div className="flex gap-2">
            {(["DE", "EN", "TR"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`w-8 h-8 rounded-lg text-base transition-all border ${lang === l ? "opacity-100 border-white/20 bg-white/[0.06]" : "opacity-25 border-transparent hover:opacity-60"}`}
              >
                {FLAGS[l]}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
