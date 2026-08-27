"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Sparkles,
  TrendingUp,
  Target,
  Clock,
  BarChart3,
  RefreshCw,
  Zap,
  CheckCircle2,
  ChevronRight,
  Heart,
  Coffee,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

// --- LOGO COMPONENT ---
const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-emerald-500 rounded-xl shadow-lg shadow-indigo-500/20 overflow-hidden">
      <div className="absolute inset-[2px] bg-[#0c121e] rounded-[10px] flex items-center justify-center z-10">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="url(#gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 17L12 22L22 17"
            stroke="url(#gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12L12 17L22 12"
            stroke="url(#gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient
              id="gradient"
              x1="2"
              y1="2"
              x2="22"
              y2="22"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#818cf8" />
              <stop offset="1" stopColor="#34d399" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
    <span className="font-extrabold text-2xl tracking-tight text-white flex items-center">
      oiSio
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400 ml-1">
        .ai
      </span>
    </span>
  </div>
);

// --- MOCK AD COMPONENT ---
const GoogleAdSlot = ({
  format,
  adText,
}: {
  format: "leaderboard" | "sidebar" | "rectangle";
  adText: string;
}) => {
  const styles = {
    leaderboard: "w-full h-[90px] max-w-[728px] mx-auto",
    sidebar: "w-full h-[600px] max-w-[300px]",
    rectangle: "w-full h-[250px] max-w-[300px]",
  };

  return (
    <div
      className={`${styles[format]} bg-[#0a0f18] border border-slate-800/80 rounded-xl flex flex-col items-center justify-center relative overflow-hidden group shadow-inner mb-6`}
    >
      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest px-4 truncate mb-1">
        {adText}
      </span>
      <div className="text-slate-700 text-xs px-4 text-center">
        Google AdSense
      </div>
      <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
};

// --- TRANSLATIONS ---
type Lang = "TR" | "DE" | "EN";

const content = {
  TR: {
    works: "Nasıl Çalışır?",
    features: "Özellikler",
    contact: "İletişim",
    badge: "Herkes için, sonsuza dek ücretsiz! ⚡️",
    titleMain: "Ücretsiz ve Otomatik",
    titleGradient: "Yapay Zeka SEO Analizi",
    desc: "Sitenizin SEO, hız ve dönüşüm kalitesini saniyeler içinde analiz edin. Organik trafiğinizi artıracak veri odaklı kararlar alın. Ödeme duvarı yok.",
    placeholder: "Örn: https://siteniz.com",
    btn: "Ücretsiz Analiz Et",
    analyzing: "Analiz Ediliyor...",
    adText: "Sponsorlu Reklam Alanı",
    trust1: "108 Kontrol Noktası",
    trust2: "Anında SSRF Taraması",
    trust3: "Yapay Zeka Destekli",
    processTitle: "Analiz Süreci Nasıl Çalışır?",
    processDesc:
      "oiSio zeka motoru sitenizi tarar, kod yapısını, içerik kalitesini ve UX hızını analiz eder.",
    bullets: [
      "Sıfır teknik bilgi gerektirir: Tek yapmanız gereken sitenizin bağlantısını yapıştırmak.",
      "Hatalarınızı (SEO, Dönüşüm, Reklam) net bir şekilde gösterir.",
      "Çözüm önerilerini detaylı kanıtları ile size sunar.",
    ],
    footNote:
      "Platformumuz tamamen Google AdSense sponsorlukları ile ayakta durmaktadır. Üyelik ya da kredi kartı gerekmez!",
    f1Title: "Organik Trafik Büyümesi",
    f1Desc:
      "Sürdürülebilir ve kalıcı organik büyüme stratejileri ile trafiğinizi artırın.",
    f2Title: "Daha Yüksek Dönüşüm (CRO)",
    f2Desc:
      "Sadece trafik değil, doğrudan satışa dönüşen optimize edilmiş kullanıcı deneyimi.",
    f3Title: "Yapay Zeka ile Otomasyon",
    f3Desc:
      "AI destekli araçlarımız sayesinde manuel SEO işlerini otomatikleştirin.",
    f4Title: "Veriye Dayalı Kararlar",
    f4Desc:
      "Tahminlere değil, tamamen veriye dayalı kesin kararlarla stratejinizi yönetin.",
    f5Title: "Canlı Teknik SEO Denetimi",
    f5Desc:
      "Arama motoru algoritmalarıyla eş zamanlı çalışan detaylı denetim algoritması.",
    f6Title: "Google Ads (SEA) RSA Analizi",
    f6Desc:
      "Maliyetleri düşüren ve tıklamaları artıran profesyonel Google Ads içgörüleri.",
    donationTitle: "Bu Araç Tamamen Ücretsiz Kalsın",
    donationDesc:
      "Projeyi yaşatmak, reklamları azaltmak veya bir kahve ısmarlamak isterseniz bize destek olabilirsiniz. Bütün destekler şeffaf olarak sunucu masraflarına aktarılır.",
    donateBtn: "Bize Bir Kahve Ismarla",
    cryptoAddress: "USDT (TRC20): TXYZabc123...dummyAddress",
    ibanStr: "IBAN: TR00 0000 0000 0000 0000 0000 00 (Cuma Kaya)",
  },
  DE: {
    works: "Wie es funktioniert?",
    features: "Eigenschaften",
    contact: "Kontakt",
    badge: "Für alle, immer kostenlos! ⚡️",
    titleMain: "Kostenlose & Automatische",
    titleGradient: "KI SEO Analyse",
    desc: "Analysieren Sie die SEO-, Geschwindigkeits- und Konversionsqualität Ihrer Website in Sekunden. Keine versteckten Kosten.",
    placeholder: "z.B: https://ihre-website.de",
    btn: "Kostenlos Analysieren",
    analyzing: "Wird analysiert...",
    adText: "Gesponserter Werbebereich",
    trust1: "108 Prüfpunkte",
    trust2: "Sofortiger SSRF-Scan",
    trust3: "KI-gestützt",
    processTitle: "Wie funktioniert der Analyseprozess?",
    processDesc:
      "Die oiSio-Intelligenz-Engine crawlt Ihre Site und analysiert Code, Content-Qualität und UX-Geschwindigkeit.",
    bullets: [
      "Kein technisches Wissen erforderlich: Fügen Sie einfach Ihren Link ein.",
      "Zeigt Fehler (SEO, Conversion, Ads) klar strukturiert an.",
      "Bietet detaillierte Lösungsvorschläge mit Beweisen.",
    ],
    footNote:
      "Unsere Plattform wird vollständig durch Google AdSense-Sponsoring finanziert. Keine Kreditkarte erforderlich!",
    f1Title: "Organisches Traffic-Wachstum",
    f1Desc:
      "Steigern Sie Ihren Traffic mit nachhaltigen und dauerhaften Wachstumsstrategien.",
    f2Title: "Höhere Conversion-Raten",
    f2Desc:
      "Nicht nur Traffic, sondern optimierte UX, die sich direkt in Verkäufe niederschlägt.",
    f3Title: "Automatisierung durch KI",
    f3Desc:
      "Automatisieren Sie manuelle SEO-Aufgaben durch unsere KI-gestützten Tools.",
    f4Title: "Datengetriebene Entscheidungen",
    f4Desc:
      "Verwalten Sie Ihre Strategie mit fundierten, datengestützten Entscheidungen.",
    f5Title: "Live technisches SEO-Audit",
    f5Desc:
      "Detaillierter Audit-Algorithmus, der synchron zu Suchmaschinen-Algorithmen arbeitet.",
    f6Title: "Google Ads (SEA) RSA Analyse",
    f6Desc:
      "Professionelle Google Ads-Insights, die Kosten senken und Klicks erhöhen.",
    donationTitle: "Unterstützen Sie unser kostenloses Tool",
    donationDesc:
      "Wenn Sie das Projekt am Leben erhalten, Werbung reduzieren oder uns einen Kaffee spendieren möchten, können Sie uns unterstützen. Alle Spenden fließen direkt in unsere Serverkosten.",
    donateBtn: "Spendieren Sie uns einen Kaffee",
    cryptoAddress: "USDT (TRC20): TXYZabc123...dummyAddress",
    ibanStr: "IBAN: DE00 0000 0000 0000 0000 00 (Cuma Kaya)",
  },
  EN: {
    works: "How it works?",
    features: "Features",
    contact: "Contact",
    badge: "Free for everyone, forever! ⚡️",
    titleMain: "Free & Automated",
    titleGradient: "AI SEO Analysis",
    desc: "Analyze your website's SEO, speed, and conversion quality in seconds. Make data-driven decisions to boost organic traffic. No paywalls.",
    placeholder: "e.g: https://your-website.com",
    btn: "Analyze for Free",
    analyzing: "Analyzing...",
    adText: "Sponsored Advertisement",
    trust1: "108 Checkpoints",
    trust2: "Instant SSRF Scan",
    trust3: "AI-Powered",
    processTitle: "How Does the Analysis Work?",
    processDesc:
      "The oiSio intelligence engine crawls your site, analyzing code structure, content quality, and UX speed.",
    bullets: [
      "Zero technical knowledge required: Just paste your link.",
      "Clearly highlights errors (SEO, Conversion, Ads).",
      "Provides detailed solutions with exact DOM evidence.",
    ],
    footNote:
      "Our platform is fully supported by Google AdSense. No account or credit card required!",
    f1Title: "Organic Traffic Growth",
    f1Desc:
      "Increase your traffic with sustainable and permanent organic growth strategies.",
    f2Title: "Higher Conversion Rates",
    f2Desc:
      "Optimized user experience that translates directly into sales, not just traffic.",
    f3Title: "AI Automation",
    f3Desc: "Automate manual SEO tasks thanks to our AI-supported tools.",
    f4Title: "Data-Driven Decisions",
    f4Desc:
      "Manage your strategy with precise, data-driven decisions rather than guesses.",
    f5Title: "Live Technical SEO Audit",
    f5Desc:
      "Detailed audit algorithm working synchronously with search engine algorithms.",
    f6Title: "Google Ads (SEA) RSA Analysis",
    f6Desc:
      "Professional Google Ads insights that reduce costs and increase clicks.",
    donationTitle: "Keep This Tool Free Forever",
    donationDesc:
      "If you'd like to support the project, reduce ads, or simply buy us a coffee, you can contribute below. All support goes directly towards our server costs.",
    donateBtn: "Buy Us a Coffee",
    cryptoAddress: "USDT (TRC20): TXYZabc123...dummyAddress",
    ibanStr: "IBAN: CH00 0000 0000 0000 0000 00 (Cuma Kaya)",
  },
};

export function FreeToolView({
  onAnalyze,
}: {
  onAnalyze: (url: string) => void;
}) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lang, setLang] = useState<Lang>("DE");

  const [processingStep, setProcessingStep] = useState("");

  const t = content[lang];

  const features = [
    {
      title: t.f1Title,
      desc: t.f1Desc,
      icon: <TrendingUp className="h-5 w-5 text-emerald-400" />,
    },
    {
      title: t.f2Title,
      desc: t.f2Desc,
      icon: <Target className="h-5 w-5 text-indigo-400" />,
    },
    {
      title: t.f3Title,
      desc: t.f3Desc,
      icon: <Clock className="h-5 w-5 text-amber-400" />,
    },
    {
      title: t.f4Title,
      desc: t.f4Desc,
      icon: <BarChart3 className="h-5 w-5 text-blue-400" />,
    },
    {
      title: t.f5Title,
      desc: t.f5Desc,
      icon: <RefreshCw className="h-5 w-5 text-rose-400" />,
    },
    {
      title: t.f6Title,
      desc: t.f6Desc,
      icon: <Zap className="h-5 w-5 text-purple-400" />,
    },
  ];

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setIsLoading(true);

    // Simulate terminal/processing effect (My personal touch)
    setProcessingStep("Crawling robots.txt...");
    setTimeout(() => setProcessingStep("Evaluating DOM structure..."), 600);
    setTimeout(
      () => setProcessingStep("Running Core Web Vitals check..."),
      1200,
    );
    setTimeout(() => setProcessingStep("Compiling AI results..."), 1800);

    setTimeout(() => {
      setIsLoading(false);
      setProcessingStep("");
      onAnalyze(url);
    }, 2400);
  };

  return (
    <div className="min-h-screen bg-[#06080F] text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* HEADER WITH LANGUAGE SWITCHER (FLAGS) */}
      <header className="border-b border-slate-800/60 bg-[#06080F]/90 backdrop-blur-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo />

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
              <a href="#" className="hover:text-white transition-colors">
                {t.works}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {t.features}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {t.contact}
              </a>
            </nav>

            {/* Language Flags */}
            <div className="flex items-center gap-1.5 bg-[#0a0f18] border border-slate-800 p-1.5 rounded-full shadow-inner">
              {(["DE", "EN", "TR"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`h-7 w-7 text-lg flex items-center justify-center rounded-full transition-all duration-300 ${
                    lang === l
                      ? "bg-slate-800 scale-110 shadow-md ring-1 ring-slate-700"
                      : "opacity-40 hover:opacity-100 grayscale hover:grayscale-0 hover:bg-slate-800/50"
                  }`}
                  title={l}
                >
                  {l === "TR" ? "🇹🇷" : l === "DE" ? "🇩🇪" : "🇬🇧"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* TOP AD BANNER */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <GoogleAdSlot format="leaderboard" adText={t.adText} />
      </div>

      <main className="max-w-7xl mx-auto px-6 pb-24 border-b border-slate-800/50">
        {/* HERO SECTION WITH "MY TOUCH" EFFECTS */}
        <div className="text-center max-w-4xl mx-auto pt-10 pb-16 relative">
          {/* Subtle glowing background orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 mb-6 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {t.badge}
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            {t.titleMain} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400">
              {t.titleGradient}
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
            {t.desc}
          </p>

          <form
            onSubmit={handleAnalyze}
            className="relative max-w-2xl mx-auto group"
          >
            <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl blur-xl group-focus-within:bg-indigo-500/30 transition-all duration-300"></div>

            <div className="relative flex flex-col sm:flex-row items-center bg-[#0d1424]/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-2 shadow-2xl overflow-hidden focus-within:border-indigo-500 transition-colors">
              <div className="flex-1 flex items-center w-full">
                <Search className="h-6 w-6 text-slate-500 ml-4 mr-2" />
                <input
                  type="url"
                  placeholder={t.placeholder}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-white text-lg placeholder-slate-500 px-2 py-4 sm:py-5"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto rounded-xl px-8 py-4 sm:py-5 h-auto text-base font-semibold shadow-lg shrink-0 mt-2 sm:mt-0 transition-transform active:scale-95"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    <span>{t.analyzing}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>{t.btn}</span>
                    <ChevronRight className="h-5 w-5" />
                  </div>
                )}
              </Button>
            </div>

            {/* Animated Processing Terminal text */}
            <div
              className={`mt-4 text-sm font-mono text-indigo-400 transition-opacity duration-300 h-6 ${isLoading ? "opacity-100" : "opacity-0"}`}
            >
              {processingStep && `> ${processingStep}`}
            </div>
          </form>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500/70" />{" "}
              {t.trust1}
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500/70" />{" "}
              {t.trust2}
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500/70" />{" "}
              {t.trust3}
            </div>
          </div>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 relative z-10">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-[#0a0f18]/80 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 hover:bg-[#0d1424] transition-all group"
            >
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 inline-flex mb-4 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* MID-PAGE AD & EXPLANATION SECTION */}
      <div className="bg-[#0b101a] py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-12 items-center">
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-amber-400" />
              {t.processTitle}
            </h2>
            <div className="prose prose-invert prose-indigo max-w-none text-slate-400">
              <p className="text-lg leading-relaxed">{t.processDesc}</p>
              <ul className="list-none mt-6 space-y-4">
                {t.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 bg-[#0a0f18]/50 border border-slate-800/40 shadow-sm p-4 rounded-xl"
                  >
                    <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0" />
                    <span className="text-sm md:text-base leading-relaxed">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 p-5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-200 text-sm leading-relaxed">
                <span className="font-bold mr-1">💡 Note:</span> {t.footNote}
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <GoogleAdSlot format="rectangle" adText={t.adText} />
          </div>
        </div>
      </div>

      {/* DONATION & SUPPORT FOOTER */}
      <footer className="border-t border-slate-800/60 bg-[#06080F] py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 max-w-xl">
            <div className="flex items-center gap-2 mb-4 text-emerald-400">
              <Heart className="h-5 w-5" />
              <h3 className="font-bold text-lg text-white">
                {t.donationTitle}
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {t.donationDesc}
            </p>
            <div className="flex flex-col gap-3 text-xs text-slate-500 font-mono">
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 w-fit select-all hover:border-slate-600 transition-colors">
                {t.cryptoAddress}
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 w-fit select-all hover:border-slate-600 transition-colors">
                {t.ibanStr}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center shrink-0">
            <Button className="rounded-xl px-6 py-6 h-auto text-base font-bold shadow-lg shadow-amber-500/20 bg-amber-500 hover:bg-amber-400 text-amber-950 flex items-center gap-2 transition-transform hover:scale-105">
              <Coffee className="h-5 w-5" />
              {t.donateBtn}
            </Button>
            <span className="mt-4 text-xs text-slate-600 text-center max-w-[200px]">
              oiSio is voluntarily maintained. Thank you for your support.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
