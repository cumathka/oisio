'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Search, TrendingUp, Target, Clock, BarChart3, RefreshCw, Zap,
  CheckCircle2, ChevronRight, Heart, Coffee, Shield, Globe, Star,
  Users, ArrowUpRight, Copy, Check, Sparkles, Code2, Lock,
} from 'lucide-react';

// ─── TYPE DECLARATIONS ────────────────────────────────────────────────────────

type Lang = 'TR' | 'DE' | 'EN';

interface LangContent {
  nav: { works: string; features: string; pricing: string; blog: string };
  badge: string;
  h1a: string; h1b: string;
  subline: string;
  placeholder: string;
  cta: string;
  analyzing: string;
  trusts: string[];
  statsLabel: string[];
  statsValue: string[];
  featuresTitle: string;
  featuresSubtitle: string;
  features: { title: string; desc: string }[];
  howTitle: string;
  howSteps: { title: string; desc: string }[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
  donateTitle: string;
  donateSubtitle: string;
  donateBtn: string;
  cryptoLabel: string;
  ibanLabel: string;
  cryptoAddress: string;
  ibanValue: string;
  footerTagline: string;
  adSlotLabel: string;
}

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────

const TRANSLATIONS: Record<Lang, LangContent> = {
  TR: {
    nav: { works: 'Nasıl Çalışır?', features: 'Özellikler', pricing: 'Fiyatlar', blog: 'Blog' },
    badge: '🎉 Tamamen Ücretsiz — Kredi Kartı Gerekmez',
    h1a: 'Web Siteniz İçin',
    h1b: 'AI Destekli SEO Analizi',
    subline: 'Sitenizin organik görünürlüğünü, reklam performansını ve dönüşüm oranını 108 kriterle saniyeler içinde analiz edin. Herkes için, sonsuza dek ücretsiz.',
    placeholder: 'https://siteniz.com',
    cta: 'Ücretsiz Analiz Başlat',
    analyzing: 'Analiz Ediliyor',
    trusts: ['Teknik SEO Denetimi', 'Google Ads Kalite Skoru', 'Core Web Vitals', 'CRO Optimizasyonu'],
    statsLabel: ['Analiz Edilmiş Site', 'Tespit Edilen Sorun', 'Aktif Kullanıcı', 'Ortalama İyileşme'],
    statsValue: ['124K+', '2.4M+', '18K+', '+34%'],
    featuresTitle: 'Tek Araçla Her Şey',
    featuresSubtitle: 'Ayrı ayrı ücretli araçlar için harcamanıza gerek yok. oiSio tüm dijital pazarlama analiz ihtiyaçlarınızı tek çatı altında ücretsiz sunar.',
    features: [
      { title: 'Teknik SEO Motoru', desc: '108 kriterlik deterministik tarama ile eksik canonical, hatalı hreflang ve indexability sorunlarını anında tespit edin.' },
      { title: 'Core Web Vitals', desc: 'CLS, LCP ve FID metriklerini gerçek DOM telemetrisi ile ölçün. Google\'ın sıralama sinyallerini anlık izleyin.' },
      { title: 'Google Ads RSA Analizi', desc: 'Başlık ve açıklama uzunluk sınırlarını, politika ihlallerini ve RSA kalite skorunu otomatik hesaplayın.' },
      { title: 'Dönüşüm Optimizasyonu', desc: 'Mesaj-eşleşme skoru ve A/B test güven hesaplamaları ile hangi CTA\'nın daha fazla dönüştürdüğünü öğrenin.' },
      { title: 'Anahtar Kelime Zekası', desc: 'Organik trafik potansiyeli yüksek ticari niyetli anahtar kelimeleri rakip analiziyle birlikte keşfedin.' },
      { title: 'Güvenli Tarama (SSRF)', desc: 'RFC 1918 iç IP bloğu ve cloud metadata korumasıyla güvende kalın. Hiçbir tarama verisi üçüncü taraflarla paylaşılmaz.' },
    ],
    howTitle: 'Nasıl Çalışır?',
    howSteps: [
      { title: 'URL Girin', desc: 'Web sitenizin adresini yapıştırın. Kayıt veya giriş gerekmez.' },
      { title: 'AI Tarama Başlar', desc: 'Zeka motorumuz sitenizi 108 kriter üzerinden anlık olarak tarar.' },
      { title: 'Sonuçları Alın', desc: 'Detaylı raporu inceleyin, sorunları öncelik sırasıyla görün ve hemen harekete geçin.' },
    ],
    faqTitle: 'Sık Sorulan Sorular',
    faqs: [
      { q: 'Neden tamamen ücretsiz?', a: 'Platform Google AdSense reklam gelirleri ile ayakta durmaktadır. Siz analiz ediyorsunuz, biz reklamlardan kazanıyoruz.' },
      { q: 'Verilerim güvende mi?', a: 'Evet. Taranan siteler hakkında hiçbir veri üçüncü taraflarla paylaşılmaz. Tüm taramalar anonim ve anlıktır.' },
      { q: 'Ücretsiz sınır var mı?', a: 'Günlük analiz sınırı yoktur. İstediğiniz kadar site analiz edebilirsiniz.' },
    ],
    donateTitle: 'Bu Aracı Ücretsiz Tutmamıza Yardım Edin',
    donateSubtitle: 'Sunucu maliyetleri için gönüllü destek kabul ediyoruz. Her katkı platformu ayakta tutar ve reklam yoğunluğunu azaltır.',
    donateBtn: '☕  Kahve Ismarla',
    cryptoLabel: 'Kripto (USDT · TRC20)',
    ibanLabel: 'Banka Havalesi',
    cryptoAddress: 'TNPxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    ibanValue: 'TR12 0000 0000 0000 0000 00 · Cuma Kaya',
    footerTagline: 'Herkese ücretsiz, sonsuza dek açık kaynaklı dijital pazarlama zekası.',
    adSlotLabel: 'Reklam',
  },
  DE: {
    nav: { works: 'Wie es funktioniert', features: 'Funktionen', pricing: 'Preise', blog: 'Blog' },
    badge: '🎉 Völlig kostenlos — Keine Kreditkarte erforderlich',
    h1a: 'KI-gestützte SEO-Analyse',
    h1b: 'für Ihre Website',
    subline: 'Analysieren Sie die organische Sichtbarkeit, Anzeigenleistung und Konversionsrate Ihrer Website mit 108 Kriterien in Sekunden. Für alle, für immer kostenlos.',
    placeholder: 'https://ihre-website.de',
    cta: 'Kostenlose Analyse starten',
    analyzing: 'Wird analysiert',
    trusts: ['Technisches SEO-Audit', 'Google Ads Qualitätsscore', 'Core Web Vitals', 'CRO-Optimierung'],
    statsLabel: ['Analysierte Websites', 'Erkannte Probleme', 'Aktive Nutzer', 'Ø Verbesserung'],
    statsValue: ['124K+', '2,4M+', '18K+', '+34%'],
    featuresTitle: 'Alles in einem Tool',
    featuresSubtitle: 'Keine separaten kostenpflichtigen Tools mehr. oiSio bietet alle Anforderungen an digitales Marketing-Analyse kostenlos unter einem Dach.',
    features: [
      { title: 'Technische SEO-Engine', desc: 'Erkennen Sie sofort fehlende Canonical-Tags, fehlerhafte Hreflangs und Indexierungsprobleme mit 108 Prüfpunkten.' },
      { title: 'Core Web Vitals', desc: 'Messen Sie CLS, LCP und FID mit echten DOM-Telemetriedaten. Verfolgen Sie Googles Ranking-Signale in Echtzeit.' },
      { title: 'Google Ads RSA-Analyse', desc: 'Überprüfen Sie Titel- und Beschreibungslängen, Richtlinienverstöße und den RSA-Qualitätsscore automatisch.' },
      { title: 'Konversionsoptimierung', desc: 'Erfahren Sie mit Message-Match-Score und A/B-Testberechnungen, welcher CTA besser konvertiert.' },
      { title: 'Keyword-Intelligenz', desc: 'Entdecken Sie kommerzielle Keywords mit hohem organischen Traffic-Potenzial zusammen mit Wettbewerbsanalysen.' },
      { title: 'Sichere Crawling (SSRF)', desc: 'Geschützt durch RFC 1918 IP-Blockierung und Cloud-Metadata-Schutz. Keine Crawling-Daten werden mit Dritten geteilt.' },
    ],
    howTitle: 'Wie funktioniert es?',
    howSteps: [
      { title: 'URL eingeben', desc: 'Fügen Sie die Adresse Ihrer Website ein. Keine Registrierung oder Anmeldung erforderlich.' },
      { title: 'KI-Scan startet', desc: 'Unsere Intelligenz-Engine scannt Ihre Website sofort anhand von 108 Kriterien.' },
      { title: 'Ergebnisse erhalten', desc: 'Überprüfen Sie den detaillierten Bericht, sehen Sie Probleme nach Priorität und handeln Sie sofort.' },
    ],
    faqTitle: 'Häufig gestellte Fragen',
    faqs: [
      { q: 'Warum ist es völlig kostenlos?', a: 'Die Plattform wird durch Google AdSense-Werbeeinnahmen finanziert. Sie analysieren, wir verdienen durch Werbung.' },
      { q: 'Sind meine Daten sicher?', a: 'Ja. Keine Daten über gescannte Websites werden mit Dritten geteilt. Alle Scans sind anonym und sofortig.' },
      { q: 'Gibt es ein kostenloses Limit?', a: 'Es gibt kein tägliches Analyselimit. Sie können so viele Websites analysieren, wie Sie möchten.' },
    ],
    donateTitle: 'Helfen Sie uns, dieses Tool kostenlos zu halten',
    donateSubtitle: 'Wir akzeptieren freiwillige Unterstützung für Serverkosten. Jeder Beitrag hält die Plattform am Laufen und reduziert die Werbeintensität.',
    donateBtn: '☕  Kaffee spendieren',
    cryptoLabel: 'Krypto (USDT · TRC20)',
    ibanLabel: 'Banküberweisung',
    cryptoAddress: 'TNPxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    ibanValue: 'TR12 0000 0000 0000 0000 00 · Cuma Kaya',
    footerTagline: 'Kostenlose, für immer quelloffene digitale Marketing-Intelligenz für alle.',
    adSlotLabel: 'Werbung',
  },
  EN: {
    nav: { works: 'How it works', features: 'Features', pricing: 'Pricing', blog: 'Blog' },
    badge: '🎉 Completely Free — No Credit Card Required',
    h1a: 'AI-Powered SEO Analysis',
    h1b: 'for Your Website',
    subline: "Analyze your site's organic visibility, ad performance, and conversion rate across 108 criteria in seconds. For everyone, free forever.",
    placeholder: 'https://your-website.com',
    cta: 'Start Free Analysis',
    analyzing: 'Analyzing',
    trusts: ['Technical SEO Audit', 'Google Ads Quality Score', 'Core Web Vitals', 'CRO Optimization'],
    statsLabel: ['Sites Analyzed', 'Issues Found', 'Active Users', 'Avg. Improvement'],
    statsValue: ['124K+', '2.4M+', '18K+', '+34%'],
    featuresTitle: 'Everything in One Tool',
    featuresSubtitle: 'No need to pay for separate tools. oiSio offers all your digital marketing analysis needs under one roof, completely free.',
    features: [
      { title: 'Technical SEO Engine', desc: 'Instantly detect missing canonical tags, broken hreflangs and indexability issues with 108 deterministic checkpoints.' },
      { title: 'Core Web Vitals', desc: "Measure CLS, LCP and FID with real DOM telemetry. Track Google's ranking signals in real-time." },
      { title: 'Google Ads RSA Analysis', desc: 'Automatically check headline/description length limits, policy violations, and RSA quality scores.' },
      { title: 'Conversion Optimization', desc: 'Use message-match scoring and A/B test confidence calculators to learn which CTA converts more.' },
      { title: 'Keyword Intelligence', desc: 'Discover commercial-intent keywords with high organic traffic potential alongside competitor analysis.' },
      { title: 'Secure Crawling (SSRF)', desc: 'Protected by RFC 1918 IP blocking and cloud metadata shielding. No crawl data is ever shared with third parties.' },
    ],
    howTitle: 'How it works',
    howSteps: [
      { title: 'Enter your URL', desc: 'Paste your website address. No sign-up or login required.' },
      { title: 'AI Scan Starts', desc: 'Our intelligence engine instantly crawls your site across 108 criteria.' },
      { title: 'Get Results', desc: 'Review the detailed report, see issues ranked by priority and take action immediately.' },
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'Why is it completely free?', a: 'The platform is sustained by Google AdSense ad revenue. You analyze, we earn from ads.' },
      { q: 'Is my data safe?', a: 'Yes. No data about crawled sites is shared with third parties. All scans are anonymous and instant.' },
      { q: 'Is there a free limit?', a: 'There is no daily analysis limit. You can analyze as many websites as you want.' },
    ],
    donateTitle: 'Help Us Keep This Tool Free',
    donateSubtitle: 'We accept voluntary support for server costs. Every contribution keeps the platform alive and reduces ad density.',
    donateBtn: '☕  Buy us a Coffee',
    cryptoLabel: 'Crypto (USDT · TRC20)',
    ibanLabel: 'Bank Transfer',
    cryptoAddress: 'TNPxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    ibanValue: 'TR12 0000 0000 0000 0000 00 · Cuma Kaya',
    footerTagline: 'Free, forever open-source digital marketing intelligence for everyone.',
    adSlotLabel: 'Advertisement',
  },
};

// ─── STATIC DATA ──────────────────────────────────────────────────────────────

const FEATURE_ICONS = [
  <BarChart3 key="bar" className="h-5 w-5" />,
  <Zap key="zap" className="h-5 w-5" />,
  <Target key="target" className="h-5 w-5" />,
  <TrendingUp key="trend" className="h-5 w-5" />,
  <Globe key="globe" className="h-5 w-5" />,
  <Shield key="shield" className="h-5 w-5" />,
];

const FEATURE_ACCENT_COLORS = [
  'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  'text-amber-400 bg-amber-500/10 border-amber-500/20',
  'text-rose-400 bg-rose-500/10 border-rose-500/20',
  'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  'text-blue-400 bg-blue-500/10 border-blue-500/20',
  'text-purple-400 bg-purple-500/10 border-purple-500/20',
];

const TERMINAL_STEPS: Record<Lang, string[]> = {
  TR: [
    '▶  robots.txt ve sitemap.xml okunuyor...',
    '▶  DOM yapısı ve meta-tag hiyerarşisi inceleniyor...',
    '▶  Core Web Vitals ölçülüyor...',
    '▶  Google Ads RSA uyumluluğu kontrol ediliyor...',
    '▶  Anahtar kelime yoğunluğu hesaplanıyor...',
    '✓  108 kriter tarandı. Rapor oluşturuluyor...',
  ],
  DE: [
    '▶  robots.txt und sitemap.xml werden gelesen...',
    '▶  DOM-Struktur und Meta-Tag-Hierarchie werden analysiert...',
    '▶  Core Web Vitals werden gemessen...',
    '▶  Google Ads RSA-Konformität wird überprüft...',
    '▶  Keyword-Dichte wird berechnet...',
    '✓  108 Kriterien gescannt. Bericht wird erstellt...',
  ],
  EN: [
    '▶  Reading robots.txt and sitemap.xml...',
    '▶  Inspecting DOM structure and meta-tag hierarchy...',
    '▶  Measuring Core Web Vitals...',
    '▶  Checking Google Ads RSA compliance...',
    '▶  Calculating keyword density...',
    '✓  108 criteria scanned. Building report...',
  ],
};

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

const OiSioLogo = () => (
  <div className="flex items-center gap-2.5 group">
    <div className="relative w-9 h-9 shrink-0">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-emerald-400 opacity-90 group-hover:opacity-100 transition-opacity" />
      <div className="absolute inset-[1.5px] rounded-[10px] bg-[#0b0f1a] flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path d="M10 1 L2 5.5 L10 10 L18 5.5 Z" stroke="url(#lg1)" strokeWidth="1.6" strokeLinejoin="round" fill="none"/>
          <path d="M2 14.5 L10 19 L18 14.5" stroke="url(#lg1)" strokeWidth="1.6" strokeLinejoin="round" fill="none"/>
          <path d="M2 10 L10 14.5 L18 10" stroke="url(#lg2)" strokeWidth="1.6" strokeLinejoin="round" fill="none"/>
          <defs>
            <linearGradient id="lg1" x1="2" y1="1" x2="18" y2="19" gradientUnits="userSpaceOnUse">
              <stop stopColor="#818cf8"/>
              <stop offset="1" stopColor="#34d399"/>
            </linearGradient>
            <linearGradient id="lg2" x1="2" y1="10" x2="18" y2="10" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a78bfa"/>
              <stop offset="1" stopColor="#6ee7b7"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
    <span className="text-[1.25rem] font-extrabold tracking-tight leading-none">
      <span className="text-white">oiSio</span>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">.ai</span>
    </span>
  </div>
);

const AdSlot = ({ label, size }: { label: string; size: 'banner' | 'square' | 'leaderboard' }) => {
  const cls = {
    banner: 'h-[90px] w-full max-w-[728px]',
    square: 'h-[250px] w-full max-w-[300px]',
    leaderboard: 'h-[60px] w-full max-w-[970px]',
  }[size];

  return (
    <div className={`${cls} mx-auto border border-dashed border-slate-800 rounded-xl flex items-center justify-center bg-slate-950/40 relative overflow-hidden`}>
      <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-700">{label}</span>
      <div className="absolute top-1.5 right-2.5 text-[9px] text-slate-800 font-bold uppercase tracking-widest">AdSense</div>
    </div>
  );
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handle}
      className="ml-2 p-1 rounded-md text-slate-500 hover:text-slate-300 hover:bg-slate-700/40 transition-all"
      title="Copy"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export function FreeToolView({ onAnalyze }: { onAnalyze: (url: string) => void }) {
  const [lang, setLang] = useState<Lang>('DE');
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [termStep, setTermStep] = useState(-1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = TRANSLATIONS[lang];

  // Auto-detect language from browser
  useEffect(() => {
    const navLang = navigator.language.split('-')[0].toUpperCase();
    if (navLang === 'TR') setLang('TR');
    else if (navLang === 'DE') setLang('DE');
    else setLang('EN');
  }, []);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) { inputRef.current?.focus(); return; }
    setIsLoading(true);
    setTermStep(0);

    const steps = TERMINAL_STEPS[lang];
    steps.forEach((_, i) => {
      setTimeout(() => setTermStep(i), i * 420);
    });

    setTimeout(() => {
      setIsLoading(false);
      setTermStep(-1);
      onAnalyze(url.trim());
    }, steps.length * 420 + 300);
  };

  const LANG_FLAGS: Record<Lang, string> = { TR: '🇹🇷', DE: '🇩🇪', EN: '🇬🇧' };
  const LANG_LABELS: Record<Lang, string> = { TR: 'TR', DE: 'DE', EN: 'EN' };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 font-sans antialiased overflow-x-hidden">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.05] bg-[#070B14]/80 backdrop-blur-2xl">
        <div className="max-w-6xl mx-auto px-5 h-[4.25rem] flex items-center justify-between gap-4">
          <OiSioLogo />

          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-400">
            {Object.values(t.nav).map((label) => (
              <a key={label} href="#" className="px-3.5 py-2 rounded-lg hover:bg-white/5 hover:text-white transition-all">
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
              {(['DE', 'EN', 'TR'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`h-8 px-2.5 flex items-center gap-1.5 text-xs font-semibold rounded-lg transition-all ${
                    lang === l
                      ? 'bg-white/10 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <span className="text-base leading-none">{LANG_FLAGS[l]}</span>
                  <span className="hidden sm:inline">{LANG_LABELS[l]}</span>
                </button>
              ))}
            </div>

            <a
              href="#donate"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl hover:bg-amber-500/20 transition-all"
            >
              <Coffee className="h-3.5 w-3.5" />
              Support
            </a>
          </div>
        </div>
      </header>

      {/* ── TOP AD BANNER ───────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-5 pt-4">
        <AdSlot label={t.adSlotLabel} size="banner" />
      </div>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-600/[0.08] rounded-full blur-[160px]" />
          <div className="absolute top-20 -left-32 w-[500px] h-[400px] bg-emerald-600/[0.06] rounded-full blur-[120px]" />
          <div className="absolute top-20 -right-32 w-[400px] h-[400px] bg-violet-600/[0.07] rounded-full blur-[120px]" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-5 pt-16 pb-20 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-slate-300 mb-8 shadow-sm">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-70" />
              <span className="relative rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            {t.badge}
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-[4.5rem] font-black tracking-tight leading-[1.08] text-white mb-6 max-w-4xl mx-auto">
            {t.h1a}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400">
              {t.h1b}
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            {t.subline}
          </p>

          {/* ── SEARCH FORM ─────────────────────────────────────────────────── */}
          <form onSubmit={handleAnalyze} className="max-w-2xl mx-auto mb-8 group">
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-indigo-500/40 via-violet-500/30 to-emerald-500/30 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none" />

              <div className="relative flex items-center bg-white/[0.04] border border-white/[0.10] rounded-2xl p-2 shadow-2xl focus-within:border-white/20 transition-colors">
                <div className="flex items-center flex-1 min-w-0">
                  <Search className="h-5 w-5 text-slate-500 ml-3.5 mr-2.5 shrink-0" />
                  <input
                    ref={inputRef}
                    type="url"
                    placeholder={t.placeholder}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={isLoading}
                    className="flex-1 min-w-0 bg-transparent border-none outline-none text-white text-base md:text-lg placeholder-slate-600 py-4 pr-2"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="shrink-0 flex items-center gap-2 px-5 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white text-sm md:text-base font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
                >
                  {isLoading
                    ? <RefreshCw className="h-5 w-5 animate-spin" />
                    : <Sparkles className="h-5 w-5" />
                  }
                  <span className="hidden sm:inline">{isLoading ? t.analyzing + '...' : t.cta}</span>
                </button>
              </div>
            </div>

            {/* Terminal animation */}
            <div className={`mt-4 text-left transition-all duration-300 overflow-hidden ${isLoading ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="bg-black/70 border border-white/[0.07] rounded-xl p-4 font-mono text-xs text-slate-400 space-y-1.5">
                {TERMINAL_STEPS[lang].map((step, i) => (
                  <div
                    key={i}
                    className={`transition-all duration-200 ${
                      i <= termStep ? 'opacity-100 text-slate-300' : 'opacity-0 h-0 overflow-hidden'
                    } ${i === TERMINAL_STEPS[lang].length - 1 && i <= termStep ? 'text-emerald-400 font-semibold' : ''}`}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </form>

          {/* Trust pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 font-medium">
            {t.trusts.map((label) => (
              <div key={label} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500/60" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ───────────────────────────────────────────────────────── */}
      <div className="border-y border-white/[0.05] bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-5 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {t.statsValue.map((val, i) => (
            <div key={i}>
              <div className="text-3xl font-black text-white mb-1 tabular-nums">{val}</div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">{t.statsLabel[i]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MID BANNER AD ───────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-5 py-8">
        <AdSlot label={t.adSlotLabel} size="leaderboard" />
      </div>

      {/* ── FEATURES ────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.featuresTitle}</h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">{t.featuresSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.features.map((f, i) => (
            <div
              key={i}
              className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 border ${FEATURE_ACCENT_COLORS[i]}`}>
                {React.cloneElement(FEATURE_ICONS[i], { className: 'h-5 w-5' })}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="h-4 w-4 text-slate-600" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.04] py-20 bg-gradient-to-b from-transparent to-indigo-950/10">
        <div className="max-w-4xl mx-auto px-5">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-14">{t.howTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.howSteps.map((step, i) => (
              <div key={i} className="text-center flex flex-col items-center gap-4">
                <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-xl font-black text-white">
                  {i + 1}
                  {i < t.howSteps.length - 1 && (
                    <div className="hidden md:block absolute -right-[calc(50%+1rem)] top-1/2 -translate-y-1/2 w-[calc(100%+0.5rem)] h-px bg-gradient-to-r from-white/[0.12] to-transparent" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-5 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-10">{t.faqTitle}</h2>
        <div className="space-y-3">
          {t.faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-white hover:bg-white/[0.03] transition-colors"
              >
                {faq.q}
                <ChevronRight className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${openFaq === i ? 'rotate-90' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-sm text-slate-400 leading-relaxed border-t border-white/[0.04] pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── SECOND AD ───────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-5 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <AdSlot label={t.adSlotLabel} size="square" />
          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
              <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
              <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
              <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
              <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
              <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
            </div>
            <p className="text-slate-300 text-lg italic leading-relaxed mb-4">
              &quot;oiSio found 14 critical SEO issues on our website within seconds — issues we had missed for months. Completely free and incredibly accurate.&quot;
            </p>
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center text-xs font-bold text-white">M</div>
              <div>
                <div className="text-sm font-semibold text-white">Maximilian R.</div>
                <div className="text-xs text-slate-500">Head of Growth · Berlin</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── DONATION ────────────────────────────────────────────────────────── */}
      <section id="donate" className="border-t border-white/[0.05] bg-gradient-to-b from-transparent to-amber-950/10 py-20">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-6">
            <Heart className="h-7 w-7 text-amber-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">{t.donateTitle}</h2>
          <p className="text-slate-400 text-base leading-relaxed mb-10 max-w-xl mx-auto">{t.donateSubtitle}</p>

          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-4 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-base rounded-2xl shadow-xl shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 mb-10"
          >
            <Coffee className="h-5 w-5" />
            {t.donateBtn}
          </a>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Code2 className="h-4 w-4 text-indigo-400" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.cryptoLabel}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <code className="text-xs text-slate-300 font-mono truncate">{t.cryptoAddress}</code>
                <CopyButton text={t.cryptoAddress} />
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.ibanLabel}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <code className="text-xs text-slate-300 font-mono truncate">{t.ibanValue}</code>
                <CopyButton text={t.ibanValue} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.05] py-10">
        <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <OiSioLogo />
          <p className="text-center">{t.footerTagline}</p>
          <div className="flex items-center gap-4">
            {(['DE', 'EN', 'TR'] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`text-lg transition-all ${lang === l ? 'opacity-100 scale-110' : 'opacity-30 hover:opacity-70'}`}
                title={l}
              >
                {LANG_FLAGS[l]}
              </button>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
