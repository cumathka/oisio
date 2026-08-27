"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
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
  Shield,
  Globe,
  Star,
  ArrowUpRight,
  Copy,
  Check,
  Sparkles,
  Code2,
  Lock,
  Activity,
  FileText,
  Link2,
  Eye,
  Bot,
  Layout,
  ShoppingBag,
  Layers,
  ChevronDown,
  Menu,
  X,
  Cpu,
  Database,
  BarChart,
  Gauge,
  PenTool,
  Rss,
  Monitor,
  Smartphone,
} from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type Lang = "TR" | "DE" | "EN";

const FLAGS: Record<Lang, string> = { TR: "🇹🇷", DE: "🇩🇪", EN: "🇬🇧" };
const LANG_LABELS: Record<Lang, string> = { TR: "TR", DE: "DE", EN: "EN" };

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────

const T = {
  TR: {
    nav_tools: "Araçlar",
    nav_compare: "Karşılaştır",
    nav_about: "Neden oiSio?",
    badge: "Tüm premium SEO araçları • Tamamen ücretsiz",
    h1: "SEO Sorunlarınızı\nTek Sistemde Çözün",
    sub: "KAF, Semrush veya Ahrefs'e aylık yüzlerce dolar ödemek zorunda değilsiniz. oiSio, rakiplerin ücretli sunduğu tüm analiz ve otomasyon araçlarını kalıcı olarak ücretsiz sunar.",
    placeholder: "https://siteniz.com adresini girin…",
    cta: "Ücretsiz Analiz Başlat",
    cta_sub: "Kayıt gerekmez • Kredi kartı yok • Sonsuza ücretsiz",
    analyzing: "Analiz Ediliyor",
    tools_title: "Tüm Araçlar — Ücretsiz",
    tools_sub:
      "oiSio, rakip ücretli platformların sunduğu her aracı size ücretsiz sunar.",
    compare_title: "oiSio vs. Ücretli Alternatifler",
    compare_sub: "Neden aylık €99–499 ödeyin?",
    compare_feature: "Özellik",
    stats: [
      "Analiz Edilmiş",
      "Tespit Edilen Hata",
      "Aktif Kullanıcı",
      "Desteklenen Dil",
    ],
    faq_title: "Sık Sorulan Sorular",
    donate_title: "Bu Aracı Ücretsiz Tutun",
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
        a: "Hayır. Temel araçlar sonsuza dek ücretsiz kalacak. Gelecekte yalnızca ekstra kurumsal özellikler için isteğe bağlı pro plan sunulabilir.",
      },
      {
        q: "Kaç dil destekleniyor?",
        a: "99 dilde SEO analizi ve içerik oluşturma desteği mevcuttur.",
      },
    ],
  },
  DE: {
    nav_tools: "Tools",
    nav_compare: "Vergleichen",
    nav_about: "Warum oiSio?",
    badge: "Alle Premium SEO-Tools • Völlig kostenlos",
    h1: "Alle SEO-Probleme\nIn Einem System Lösen",
    sub: "Sie müssen nicht monatlich hunderte Euro für KAF, Semrush oder Ahrefs bezahlen. oiSio bietet alle Analyse- und Automatisierungstools der Konkurrenz dauerhaft kostenlos an.",
    placeholder: "https://ihre-website.de eingeben…",
    cta: "Kostenlose Analyse starten",
    cta_sub: "Keine Anmeldung • Keine Kreditkarte • Für immer kostenlos",
    analyzing: "Wird analysiert",
    tools_title: "Alle Tools — Kostenlos",
    tools_sub:
      "oiSio stellt Ihnen alle Tools kostenlos bereit, die kostenpflichtige Konkurrenzplattformen anbieten.",
    compare_title: "oiSio vs. Kostenpflichtige Alternativen",
    compare_sub: "Warum monatlich €99–499 bezahlen?",
    compare_feature: "Funktion",
    stats: [
      "Analysierte Websites",
      "Erkannte Fehler",
      "Aktive Nutzer",
      "Unterstützte Sprachen",
    ],
    faq_title: "Häufig gestellte Fragen",
    donate_title: "Helfen Sie, dieses Tool kostenlos zu halten",
    donate_sub:
      "Wir akzeptieren freiwillige Unterstützung für Serverkosten. Jeder Beitrag hält die Plattform am Laufen.",
    donate_btn: "☕  Kaffee spendieren",
    crypto_label: "Krypto (USDT · TRC20)",
    iban_label: "Banküberweisung",
    footer_tag: "Kostenlose digitale Marketing-Intelligenz für alle.",
    ad_label: "Werbung",
    faqs: [
      {
        q: "Warum ist es völlig kostenlos?",
        a: "Die Plattform wird durch Google AdSense-Werbeeinnahmen finanziert. Benutzer analysieren, wir verdienen durch Werbung.",
      },
      {
        q: "Wie wird meine Datenprivatsphäre geschützt?",
        a: "Keine gescannten Daten werden mit Dritten geteilt. SSRF-Schutz blockiert vollständig interne Netzwerkscans.",
      },
      {
        q: "Werden Sie auf kostenpflichtige Pläne umsteigen?",
        a: "Nein. Die Basistools bleiben für immer kostenlos. In Zukunft könnte es optional einen Pro-Plan nur für zusätzliche Unternehmensfunktionen geben.",
      },
      {
        q: "Wie viele Sprachen werden unterstützt?",
        a: "SEO-Analyse und Content-Erstellung werden in 99 Sprachen unterstützt.",
      },
    ],
  },
  EN: {
    nav_tools: "Tools",
    nav_compare: "Compare",
    nav_about: "Why oiSio?",
    badge: "All premium SEO tools • Completely free",
    h1: "Solve All Your SEO\nProblems in One System",
    sub: "You don't need to pay hundreds of dollars a month for KAF, Semrush or Ahrefs. oiSio permanently offers all the analysis and automation tools that competitors charge for, completely free.",
    placeholder: "Enter https://your-website.com…",
    cta: "Start Free Analysis",
    cta_sub: "No sign-up • No credit card • Free forever",
    analyzing: "Analyzing",
    tools_title: "All Tools — Free",
    tools_sub:
      "oiSio gives you every tool that competing paid platforms offer, completely free of charge.",
    compare_title: "oiSio vs. Paid Alternatives",
    compare_sub: "Why pay €99–499/month?",
    compare_feature: "Feature",
    stats: [
      "Sites Analyzed",
      "Issues Detected",
      "Active Users",
      "Languages Supported",
    ],
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
        q: "Why is it completely free?",
        a: "The platform is supported by Google AdSense revenue. Users analyze, we earn from ads.",
      },
      {
        q: "How is my data privacy protected?",
        a: "No scanned data is shared with third parties. SSRF protection completely blocks internal network scans.",
      },
      {
        q: "Will you switch to paid plans?",
        a: "No. Core tools will remain free forever. In the future, an optional pro plan may be offered only for extra enterprise features.",
      },
      {
        q: "How many languages are supported?",
        a: "SEO analysis and content creation support is available in 99 languages.",
      },
    ],
  },
};

// ─── TOOLS CATALOG ────────────────────────────────────────────────────────────

interface Tool {
  icon: React.ReactNode;
  color: string;
  glow: string;
  titleKey: string;
  descKey: string;
  tag?: string;
}

const TOOL_CATALOG: Record<Lang, Tool[]> = {
  TR: [
    {
      icon: <Spider />,
      color: "text-indigo-400",
      glow: "from-indigo-500/20",
      titleKey: "SEO Spider",
      descKey:
        "Sitenizi 108 kriterde tara, kırık linkler, eksik meta ve canonical sorunlarını tespit et.",
      tag: "Teknik SEO",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      color: "text-violet-400",
      glow: "from-violet-500/20",
      titleKey: "Rakip Analizi",
      descKey:
        "Rakiplerinizin sıralama boşluklarını ve güçlü yönlerini tam olarak analiz edin.",
      tag: "Analiz",
    },
    {
      icon: <Target className="h-6 w-6" />,
      color: "text-blue-400",
      glow: "from-blue-500/20",
      titleKey: "Anahtar Kelime Analizi",
      descKey:
        "Ticari niyetli kelimeleri arama hacmi ve rekabet skoru ile birlikte keşfedin.",
      tag: "Analiz",
    },
    {
      icon: <PenTool className="h-6 w-6" />,
      color: "text-emerald-400",
      glow: "from-emerald-500/20",
      titleKey: "AI İçerik Yazarı",
      descKey:
        "99+ dilde SEO uyumlu, özgün içerik ve blog yazıları otomatik oluşturun.",
      tag: "İçerik",
    },
    {
      icon: <Rss className="h-6 w-6" />,
      color: "text-teal-400",
      glow: "from-teal-500/20",
      titleKey: "Otomatik SEO Blog",
      descKey:
        "Hedef anahtar kelimelerinize göre haftalık içerik planı ve yayın otomasyonu.",
      tag: "İçerik",
    },
    {
      icon: <Monitor className="h-6 w-6" />,
      color: "text-amber-400",
      glow: "from-amber-500/20",
      titleKey: "Uptime İzleme",
      descKey:
        "Sitenizi 7/24 izleyin, kesinti anında SMS ve e-posta bildirimleri alın.",
      tag: "İzleme",
    },
    {
      icon: <Bot className="h-6 w-6" />,
      color: "text-rose-400",
      glow: "from-rose-500/20",
      titleKey: "AI Bot Takibi",
      descKey:
        "ChatGPT, Gemini ve Perplexity'nin sitenizi ne sıklıkla taradığını izleyin.",
      tag: "İzleme",
    },
    {
      icon: <Eye className="h-6 w-6" />,
      color: "text-pink-400",
      glow: "from-pink-500/20",
      titleKey: "Etkileşim Takibi",
      descKey:
        "Kullanıcıların sayfanızda nereye tıkladığını ve nasıl gezindiğini görün.",
      tag: "İzleme",
    },
    {
      icon: <Link2 className="h-6 w-6" />,
      color: "text-orange-400",
      glow: "from-orange-500/20",
      titleKey: "Backlink Analizi",
      descKey:
        "Mevcut backlinklerinizi analiz edin, kaliteli bağlantı fırsatlarını keşfedin.",
      tag: "Otorite",
    },
    {
      icon: <Gauge className="h-6 w-6" />,
      color: "text-cyan-400",
      glow: "from-cyan-500/20",
      titleKey: "Core Web Vitals",
      descKey:
        "LCP, CLS, FID metriklerini gerçek DOM telemetrisi ile anlık ölçün.",
      tag: "Performans",
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      color: "text-purple-400",
      glow: "from-purple-500/20",
      titleKey: "Google Ads RSA",
      descKey:
        "Başlık ve açıklama sınırlarını, politika ihlallerini ve RSA kalite skorunu kontrol edin.",
      tag: "Reklam",
    },
    {
      icon: <Layout className="h-6 w-6" />,
      color: "text-lime-400",
      glow: "from-lime-500/20",
      titleKey: "WordPress SEO",
      descKey:
        "WordPress sitenizi tek tıkla oiSio ile senkronize edin ve otomatik optimize edin.",
      tag: "Entegrasyon",
    },
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      color: "text-fuchsia-400",
      glow: "from-fuchsia-500/20",
      titleKey: "Shopify & Wix SEO",
      descKey:
        "E-ticaret mağazanızın ürün sayfalarını otomatik SEO ile üst sıralara taşıyın.",
      tag: "Entegrasyon",
    },
    {
      icon: <Database className="h-6 w-6" />,
      color: "text-sky-400",
      glow: "from-sky-500/20",
      titleKey: "GSC & GA4 Entegrasyonu",
      descKey:
        "Google Search Console ve Analytics verilerini tek panelden görüntüleyin.",
      tag: "Veri",
    },
    {
      icon: <Code2 className="h-6 w-6" />,
      color: "text-slate-400",
      glow: "from-slate-500/20",
      titleKey: "API & MCP Server",
      descKey:
        "Tüm oiSio verilerine REST API veya MCP protokolü ile programatik erişim.",
      tag: "Geliştirici",
    },
  ],
  DE: [
    {
      icon: <Spider />,
      color: "text-indigo-400",
      glow: "from-indigo-500/20",
      titleKey: "SEO Spider",
      descKey:
        "Crawlen Sie Ihre Website nach 108 Kriterien und erkennen Sie defekte Links, fehlende Meta-Tags und Canonical-Probleme.",
      tag: "Technisches SEO",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      color: "text-violet-400",
      glow: "from-violet-500/20",
      titleKey: "Wettbewerbsanalyse",
      descKey:
        "Analysieren Sie die Ranking-Lücken und Stärken Ihrer Konkurrenten vollständig.",
      tag: "Analyse",
    },
    {
      icon: <Target className="h-6 w-6" />,
      color: "text-blue-400",
      glow: "from-blue-500/20",
      titleKey: "Keyword Analyse",
      descKey:
        "Entdecken Sie kommerzielle Keywords mit Suchvolumen und Wettbewerbsscores.",
      tag: "Analyse",
    },
    {
      icon: <PenTool className="h-6 w-6" />,
      color: "text-emerald-400",
      glow: "from-emerald-500/20",
      titleKey: "KI Content Writer",
      descKey:
        "Erstellen Sie SEO-kompatible, originelle Inhalte und Blog-Artikel in 99+ Sprachen.",
      tag: "Content",
    },
    {
      icon: <Rss className="h-6 w-6" />,
      color: "text-teal-400",
      glow: "from-teal-500/20",
      titleKey: "Automatischer SEO Blog",
      descKey:
        "Wöchentlicher Content-Plan und Publishing-Automatisierung basierend auf Ihren Ziel-Keywords.",
      tag: "Content",
    },
    {
      icon: <Monitor className="h-6 w-6" />,
      color: "text-amber-400",
      glow: "from-amber-500/20",
      titleKey: "Uptime Monitor",
      descKey:
        "Überwachen Sie Ihre Website 24/7 und erhalten Sie sofortige SMS- und E-Mail-Benachrichtigungen.",
      tag: "Monitoring",
    },
    {
      icon: <Bot className="h-6 w-6" />,
      color: "text-rose-400",
      glow: "from-rose-500/20",
      titleKey: "KI Bot Tracking",
      descKey:
        "Verfolgen Sie, wie oft ChatGPT, Gemini und Perplexity Ihre Website crawlen.",
      tag: "Monitoring",
    },
    {
      icon: <Eye className="h-6 w-6" />,
      color: "text-pink-400",
      glow: "from-pink-500/20",
      titleKey: "Interaktions-Tracking",
      descKey:
        "Sehen Sie, wo Benutzer auf Ihrer Seite klicken und wie sie navigieren.",
      tag: "Monitoring",
    },
    {
      icon: <Link2 className="h-6 w-6" />,
      color: "text-orange-400",
      glow: "from-orange-500/20",
      titleKey: "Backlink Analyse",
      descKey:
        "Analysieren Sie Ihre bestehenden Backlinks und entdecken Sie qualitativ hochwertige Linkmöglichkeiten.",
      tag: "Autorität",
    },
    {
      icon: <Gauge className="h-6 w-6" />,
      color: "text-cyan-400",
      glow: "from-cyan-500/20",
      titleKey: "Core Web Vitals",
      descKey:
        "Messen Sie LCP, CLS, FID-Metriken sofort mit echter DOM-Telemetrie.",
      tag: "Performance",
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      color: "text-purple-400",
      glow: "from-purple-500/20",
      titleKey: "Google Ads RSA",
      descKey:
        "Überprüfen Sie Titel-/Beschreibungslimits, Richtlinienverstöße und RSA-Qualitätsscore.",
      tag: "Werbung",
    },
    {
      icon: <Layout className="h-6 w-6" />,
      color: "text-lime-400",
      glow: "from-lime-500/20",
      titleKey: "WordPress SEO",
      descKey:
        "Synchronisieren Sie Ihre WordPress-Site mit einem Klick mit oiSio und optimieren Sie automatisch.",
      tag: "Integration",
    },
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      color: "text-fuchsia-400",
      glow: "from-fuchsia-500/20",
      titleKey: "Shopify & Wix SEO",
      descKey:
        "Bringen Sie die Produktseiten Ihres E-Commerce-Shops mit automatischem SEO in die Spitzenpositionen.",
      tag: "Integration",
    },
    {
      icon: <Database className="h-6 w-6" />,
      color: "text-sky-400",
      glow: "from-sky-500/20",
      titleKey: "GSC & GA4 Integration",
      descKey:
        "Zeigen Sie Google Search Console und Analytics-Daten in einem einzigen Dashboard an.",
      tag: "Daten",
    },
    {
      icon: <Code2 className="h-6 w-6" />,
      color: "text-slate-400",
      glow: "from-slate-500/20",
      titleKey: "API & MCP Server",
      descKey:
        "Programmatischer Zugriff auf alle oiSio-Daten über REST API oder MCP-Protokoll.",
      tag: "Entwickler",
    },
  ],
  EN: [
    {
      icon: <Spider />,
      color: "text-indigo-400",
      glow: "from-indigo-500/20",
      titleKey: "SEO Spider",
      descKey:
        "Crawl your site across 108 criteria — detect broken links, missing meta tags, and canonical issues instantly.",
      tag: "Technical SEO",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      color: "text-violet-400",
      glow: "from-violet-500/20",
      titleKey: "Competitor Analysis",
      descKey:
        "Fully analyze competitors' ranking gaps and strengths to steal their traffic.",
      tag: "Analysis",
    },
    {
      icon: <Target className="h-6 w-6" />,
      color: "text-blue-400",
      glow: "from-blue-500/20",
      titleKey: "Keyword Intelligence",
      descKey:
        "Discover commercial-intent keywords with search volume and competition scores.",
      tag: "Analysis",
    },
    {
      icon: <PenTool className="h-6 w-6" />,
      color: "text-emerald-400",
      glow: "from-emerald-500/20",
      titleKey: "AI Content Writer",
      descKey:
        "Auto-generate SEO-compliant, original content and blog posts in 99+ languages.",
      tag: "Content",
    },
    {
      icon: <Rss className="h-6 w-6" />,
      color: "text-teal-400",
      glow: "from-teal-500/20",
      titleKey: "Auto SEO Blog",
      descKey:
        "Weekly content calendar and publish automation based on your target keywords.",
      tag: "Content",
    },
    {
      icon: <Monitor className="h-6 w-6" />,
      color: "text-amber-400",
      glow: "from-amber-500/20",
      titleKey: "Uptime Monitor",
      descKey:
        "Monitor your site 24/7 and receive instant SMS and email notifications on downtime.",
      tag: "Monitoring",
    },
    {
      icon: <Bot className="h-6 w-6" />,
      color: "text-rose-400",
      glow: "from-rose-500/20",
      titleKey: "AI Bot Tracking",
      descKey:
        "Track how often ChatGPT, Gemini and Perplexity crawl your website.",
      tag: "Monitoring",
    },
    {
      icon: <Eye className="h-6 w-6" />,
      color: "text-pink-400",
      glow: "from-pink-500/20",
      titleKey: "Interaction Tracking",
      descKey:
        "See where users click on your page and how they navigate through your funnel.",
      tag: "Monitoring",
    },
    {
      icon: <Link2 className="h-6 w-6" />,
      color: "text-orange-400",
      glow: "from-orange-500/20",
      titleKey: "Backlink Analysis",
      descKey:
        "Analyze your existing backlinks and discover high-quality link-building opportunities.",
      tag: "Authority",
    },
    {
      icon: <Gauge className="h-6 w-6" />,
      color: "text-cyan-400",
      glow: "from-cyan-500/20",
      titleKey: "Core Web Vitals",
      descKey:
        "Measure LCP, CLS, FID metrics in real-time with genuine DOM telemetry.",
      tag: "Performance",
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      color: "text-purple-400",
      glow: "from-purple-500/20",
      titleKey: "Google Ads RSA",
      descKey:
        "Check headline/description limits, policy violations, and RSA quality score automatically.",
      tag: "Advertising",
    },
    {
      icon: <Layout className="h-6 w-6" />,
      color: "text-lime-400",
      glow: "from-lime-500/20",
      titleKey: "WordPress SEO",
      descKey:
        "Sync your WordPress site with oiSio in one click and optimize automatically.",
      tag: "Integration",
    },
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      color: "text-fuchsia-400",
      glow: "from-fuchsia-500/20",
      titleKey: "Shopify & Wix SEO",
      descKey:
        "Lift your e-commerce product pages to top rankings with automatic SEO.",
      tag: "Integration",
    },
    {
      icon: <Database className="h-6 w-6" />,
      color: "text-sky-400",
      glow: "from-sky-500/20",
      titleKey: "GSC & GA4 Integration",
      descKey:
        "View Google Search Console and Analytics data from a single unified dashboard.",
      tag: "Data",
    },
    {
      icon: <Code2 className="h-6 w-6" />,
      color: "text-slate-400",
      glow: "from-slate-500/20",
      titleKey: "API & MCP Server",
      descKey:
        "Programmatic access to all oiSio data via REST API or MCP protocol.",
      tag: "Developer",
    },
  ],
};

const COMPARE_FEATURES: Record<Lang, string[]> = {
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

const TERMINAL_STEPS: Record<Lang, string[]> = {
  TR: [
    "▶  robots.txt ve sitemap taranıyor…",
    "▶  DOM yapısı ve meta hiyerarşisi analiz ediliyor…",
    "▶  Core Web Vitals ölçülüyor…",
    "▶  Rakip sıralamaları kontrol ediliyor…",
    "▶  Backlink profili inceleniyor…",
    "✓  108 kriter tamamlandı. Rapor hazırlanıyor…",
  ],
  DE: [
    "▶  robots.txt und Sitemap werden gecrawlt…",
    "▶  DOM-Struktur und Meta-Hierarchie werden analysiert…",
    "▶  Core Web Vitals werden gemessen…",
    "▶  Konkurrenz-Rankings werden überprüft…",
    "▶  Backlink-Profil wird untersucht…",
    "✓  108 Kriterien abgeschlossen. Bericht wird erstellt…",
  ],
  EN: [
    "▶  Crawling robots.txt and sitemap…",
    "▶  Analyzing DOM structure and meta hierarchy…",
    "▶  Measuring Core Web Vitals…",
    "▶  Checking competitor rankings…",
    "▶  Inspecting backlink profile…",
    "✓  108 criteria complete. Building report…",
  ],
};

// ─── SVG LOGO ─────────────────────────────────────────────────────────────────

function Spider() {
  return (
    <svg
      className="h-6 w-6"
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
}

function OiSioLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const s =
    size === "lg"
      ? { wrap: "w-12 h-12", text: "text-2xl", svg: 20 }
      : size === "sm"
        ? { wrap: "w-7 h-7", text: "text-base", svg: 13 }
        : { wrap: "w-10 h-10", text: "text-xl", svg: 17 };
  return (
    <div className="flex items-center gap-2.5 group select-none">
      <div className={`relative ${s.wrap} shrink-0`}>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-emerald-400 opacity-90" />
        <div className="absolute inset-[1.5px] rounded-[10px] bg-[#04060D] flex items-center justify-center">
          <svg width={s.svg} height={s.svg} viewBox="0 0 20 20" fill="none">
            <path
              d="M10 1 L2 5.5 L10 10 L18 5.5 Z"
              stroke="url(#g1)"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <path
              d="M2 14.5 L10 19 L18 14.5"
              stroke="url(#g1)"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <path
              d="M2 10 L10 14.5 L18 10"
              stroke="url(#g2)"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient
                id="g1"
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
                id="g2"
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
      <span className={`font-extrabold tracking-tight leading-none ${s.text}`}>
        <span className="text-white">oiSio</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">
          .ai
        </span>
      </span>
    </div>
  );
}

// ─── UTILITY COMPONENTS ───────────────────────────────────────────────────────

function AdSlot({
  label,
  size,
}: {
  label: string;
  size: "banner" | "leaderboard" | "square";
}) {
  const cls = {
    banner: "h-[90px] w-full max-w-[728px]",
    leaderboard: "h-[60px] w-full max-w-[970px]",
    square: "h-[250px] w-full max-w-[300px]",
  }[size];
  return (
    <div
      className={`${cls} mx-auto border border-dashed border-white/[0.06] rounded-xl flex items-center justify-center bg-white/[0.02]`}
    >
      <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">
        {label} · Google AdSense
      </span>
    </div>
  );
}

function CopyBtn({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text).catch(() => {});
        setDone(true);
        setTimeout(() => setDone(false), 2000);
      }}
      className="ml-2 p-1.5 rounded-lg hover:bg-white/10 transition-all text-white/30 hover:text-white/70"
    >
      {done ? (
        <Check className="h-3.5 w-3.5 text-emerald-400" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export function FreeToolView({
  onAnalyze,
}: {
  onAnalyze: (url: string) => void;
}) {
  const [lang, setLang] = useState<Lang>("DE");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [termStep, setTermStep] = useState(-1);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = T[lang];
  const tools = TOOL_CATALOG[lang];
  const cmpFeatures = COMPARE_FEATURES[lang];

  useEffect(() => {
    const l = navigator.language.split("-")[0].toUpperCase();
    setLang(l === "TR" ? "TR" : l === "DE" ? "DE" : "EN");
  }, []);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      inputRef.current?.focus();
      return;
    }
    setLoading(true);
    setTermStep(0);
    const steps = TERMINAL_STEPS[lang];
    steps.forEach((_, i) => setTimeout(() => setTermStep(i), i * 440));
    setTimeout(
      () => {
        setLoading(false);
        setTermStep(-1);
        onAnalyze(url.trim());
      },
      steps.length * 440 + 400,
    );
  };

  return (
    <div className="min-h-screen bg-[#04060D] text-slate-100 font-sans antialiased overflow-x-hidden">
      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.05] bg-[#04060D]/85 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-5 h-[4.5rem] flex items-center justify-between gap-4">
          <OiSioLogo />

          <nav className="hidden lg:flex items-center gap-1 text-sm text-white/60 font-medium">
            <a
              href="#tools"
              className="px-3.5 py-2 rounded-lg hover:bg-white/[0.05] hover:text-white transition-all"
            >
              {t.nav_tools}
            </a>
            <a
              href="#compare"
              className="px-3.5 py-2 rounded-lg hover:bg-white/[0.05] hover:text-white transition-all"
            >
              {t.nav_compare}
            </a>
            <a
              href="#faq"
              className="px-3.5 py-2 rounded-lg hover:bg-white/[0.05] hover:text-white transition-all"
            >
              {t.nav_about}
            </a>
            <a
              href="#donate"
              className="px-3.5 py-2 rounded-lg hover:bg-white/[0.05] hover:text-white transition-all"
            >
              Support
            </a>
          </nav>

          <div className="flex items-center gap-2">
            {/* Lang switcher */}
            <div className="hidden sm:flex items-center gap-0.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
              {(["DE", "EN", "TR"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`h-8 px-2.5 flex items-center gap-1.5 text-xs font-semibold rounded-lg transition-all ${lang === l ? "bg-white/10 text-white" : "text-white/40 hover:text-white/80"}`}
                >
                  <span>{FLAGS[l]}</span>
                  <span>{LANG_LABELS[l]}</span>
                </button>
              ))}
            </div>
            <a
              href="#donate"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl hover:bg-amber-500/20 transition-all"
            >
              <Coffee className="h-3.5 w-3.5" /> Support
            </a>
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden p-2 text-white/50 hover:text-white"
            >
              {mobileMenu ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="lg:hidden border-t border-white/[0.05] bg-[#04060D] px-5 py-4 space-y-1">
            {[t.nav_tools, t.nav_compare, t.nav_about, "Support"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  onClick={() => setMobileMenu(false)}
                  className="block px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/[0.05]"
                >
                  {item}
                </a>
              ),
            )}
            <div className="flex gap-2 pt-2">
              {(["DE", "EN", "TR"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLang(l);
                    setMobileMenu(false);
                  }}
                  className={`flex-1 py-2 text-sm font-bold rounded-xl border transition-all ${lang === l ? "border-indigo-500/50 bg-indigo-500/10 text-white" : "border-white/10 text-white/40"}`}
                >
                  {FLAGS[l]} {LANG_LABELS[l]}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ── TOP AD ──────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-5 pt-5">
        <AdSlot label={t.ad_label} size="banner" />
      </div>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-20">
        {/* Multi-layer glow orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-indigo-600/[0.09] rounded-full blur-[180px]" />
          <div className="absolute top-0 -left-40 w-[600px] h-[500px] bg-violet-600/[0.07] rounded-full blur-[140px]" />
          <div className="absolute top-10 -right-40 w-[500px] h-[400px] bg-emerald-600/[0.06] rounded-full blur-[130px]" />
          <div
            className="absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-5 text-center">
          {/* Floating badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-white/70 shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-70" />
              <span className="relative rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            {t.badge}
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(2.8rem,7vw,5.5rem)] font-black tracking-tight leading-[1.06] text-white mb-7 whitespace-pre-line">
            {t.h1.split("\n")[0]}
            {"\n"}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400">
              {t.h1.split("\n")[1]}
            </span>
          </h1>

          <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            {t.sub}
          </p>

          {/* Search */}
          <form
            onSubmit={handleAnalyze}
            className="max-w-2xl mx-auto mb-4 group"
          >
            <div className="relative">
              <div className="absolute -inset-[1px] rounded-[18px] bg-gradient-to-r from-indigo-500/50 via-violet-500/40 to-emerald-500/40 opacity-0 group-focus-within:opacity-100 blur-sm transition-opacity duration-400 pointer-events-none" />
              <div className="relative flex items-center bg-white/[0.05] border border-white/[0.10] rounded-2xl p-2 shadow-2xl transition-colors focus-within:border-white/[0.18]">
                <Search className="h-5 w-5 text-white/30 ml-3.5 mr-2 shrink-0" />
                <input
                  ref={inputRef}
                  type="url"
                  placeholder={t.placeholder}
                  value={url}
                  disabled={loading}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 min-w-0 bg-transparent outline-none text-white text-lg placeholder-white/25 py-4 pr-2"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="shrink-0 flex items-center gap-2 px-6 py-4 bg-indigo-600 hover:bg-indigo-500 active:scale-95 disabled:opacity-60 text-white font-bold rounded-xl shadow-xl shadow-indigo-600/20 transition-all text-sm md:text-base"
                >
                  {loading ? (
                    <RefreshCw className="h-5 w-5 animate-spin" />
                  ) : (
                    <Sparkles className="h-5 w-5" />
                  )}
                  <span className="hidden sm:inline">
                    {loading ? `${t.analyzing}…` : t.cta}
                  </span>
                </button>
              </div>
            </div>

            {/* Terminal */}
            <div
              className={`mt-4 text-left transition-all duration-300 overflow-hidden ${loading ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
            >
              <div className="bg-black/70 border border-white/[0.06] rounded-2xl p-5 font-mono text-xs space-y-2">
                {TERMINAL_STEPS[lang].map((step, i) => (
                  <div
                    key={i}
                    className={`transition-all duration-200 ${i <= termStep ? "opacity-100" : "opacity-0 h-0 overflow-hidden"} ${i === TERMINAL_STEPS[lang].length - 1 && i <= termStep ? "text-emerald-400 font-bold" : "text-white/50"}`}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </form>

          <p className="text-xs text-white/25 font-medium">{t.cta_sub}</p>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────────────────────── */}
      <div className="border-y border-white/[0.05] bg-white/[0.015]">
        <div className="max-w-5xl mx-auto px-5 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {["124K+", "2.4M+", "18K+", "99+"].map((v, i) => (
            <div key={i}>
              <div className="text-3xl md:text-4xl font-black text-white tabular-nums">
                {v}
              </div>
              <div className="text-xs text-white/35 mt-1 font-medium uppercase tracking-wide">
                {t.stats[i]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TOOLS GRID ──────────────────────────────────────────────────────── */}
      <section id="tools" className="max-w-7xl mx-auto px-5 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            {t.tools_title}
          </h2>
          <p className="text-white/45 text-lg max-w-2xl mx-auto">
            {t.tools_sub}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {tools.map((tool, i) => (
            <div
              key={i}
              onClick={() => onAnalyze("https://example.com")}
              className="group relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.06] transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Glow on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${tool.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
              />
              {/* Tag */}
              <div className="absolute top-3.5 right-3.5 text-[9px] font-bold uppercase tracking-widest text-white/25">
                {tool.tag}
              </div>
              <div className={`mb-3 ${tool.color}`}>{tool.icon}</div>
              <h3 className="text-sm font-bold text-white mb-1.5 pr-10">
                {tool.titleKey}
              </h3>
              <p className="text-xs text-white/40 leading-relaxed line-clamp-3">
                {tool.descKey}
              </p>
              <div className="absolute bottom-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="h-4 w-4 text-white/40" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MID AD ──────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-5 pb-10">
        <AdSlot label={t.ad_label} size="leaderboard" />
      </div>

      {/* ── COMPARISON TABLE ────────────────────────────────────────────────── */}
      <section
        id="compare"
        className="border-t border-white/[0.04] bg-gradient-to-b from-transparent to-indigo-950/10 py-20"
      >
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
              {t.compare_title}
            </h2>
            <p className="text-white/40 text-lg">{t.compare_sub}</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/[0.07] shadow-2xl">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-white/[0.07] bg-white/[0.02]">
                  <th className="text-left py-4 px-5 font-semibold text-white/50 w-48">
                    {t.compare_feature}
                  </th>
                  <th className="py-4 px-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <OiSioLogo size="sm" />
                      <span className="text-[10px] text-emerald-400 font-bold">
                        FREE
                      </span>
                    </div>
                  </th>
                  <th className="py-4 px-4 text-center text-white/50 font-semibold">
                    Semrush
                    <br />
                    <span className="text-xs text-white/30">€119/mo</span>
                  </th>
                  <th className="py-4 px-4 text-center text-white/50 font-semibold">
                    Ahrefs
                    <br />
                    <span className="text-xs text-white/30">€99/mo</span>
                  </th>
                  <th className="py-4 px-4 text-center text-white/50 font-semibold">
                    KAF AI
                    <br />
                    <span className="text-xs text-white/30">€49/mo</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {cmpFeatures.map((feat, i) => (
                  <tr
                    key={i}
                    className={`border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors ${i === cmpFeatures.length - 1 ? "bg-emerald-500/[0.05]" : ""}`}
                  >
                    <td className="py-3.5 px-5 text-white/60 font-medium">
                      {feat}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <CheckCircle2
                        className={`h-5 w-5 mx-auto ${i === cmpFeatures.length - 1 ? "text-emerald-400" : "text-emerald-500"}`}
                      />
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {i === cmpFeatures.length - 1 ? (
                        <X className="h-4 w-4 mx-auto text-rose-500/60" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 mx-auto text-white/20" />
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {i === cmpFeatures.length - 1 ? (
                        <X className="h-4 w-4 mx-auto text-rose-500/60" />
                      ) : i >= 4 ? (
                        <X className="h-4 w-4 mx-auto text-rose-500/40" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 mx-auto text-white/20" />
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {i === cmpFeatures.length - 1 ? (
                        <X className="h-4 w-4 mx-auto text-rose-500/60" />
                      ) : i >= 8 ? (
                        <X className="h-4 w-4 mx-auto text-rose-500/40" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 mx-auto text-white/20" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ─────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            name: "Maximilian R.",
            role: "Head of Growth · Berlin",
            quote:
              '"oiSio found 14 critical SEO issues in seconds — issues we had missed for months. Completely free and incredibly accurate."',
          },
          {
            name: "Selin K.",
            role: "E-commerce Manager · İstanbul",
            quote:
              '"Semrush için ayda 500 TL ödüyordum. oiSio her şeyi ücretsiz veriyor. Hatta daha fazlası var."',
          },
          {
            name: "Thomas W.",
            role: "Freelance SEO · Wien",
            quote:
              '"Das Backlink- und Keyword-Tool ist auf Augenhöhe mit Ahrefs — und kostet null Euro. Unglaublich."',
          },
        ].map((t2, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
          >
            <div className="flex gap-0.5 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star
                  key={j}
                  className="h-4 w-4 text-amber-400 fill-amber-400"
                />
              ))}
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-5 italic">
              {t2.quote}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center text-xs font-bold text-white">
                {t2.name[0]}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  {t2.name}
                </div>
                <div className="text-xs text-white/35">{t2.role}</div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section id="faq" className="max-w-3xl mx-auto px-5 py-12 pb-20">
        <h2 className="text-3xl font-black text-white text-center mb-10 tracking-tight">
          {t.faq_title}
        </h2>
        <div className="space-y-2">
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
                <ChevronRight
                  className={`h-4 w-4 shrink-0 text-white/30 transition-transform ${openFaq === i ? "rotate-90" : ""}`}
                />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 pt-2 text-sm text-white/45 leading-relaxed border-t border-white/[0.04]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── SQUARE AD + SECOND SEARCH CTA ───────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <AdSlot label={t.ad_label} size="square" />
        <div className="text-center lg:text-left">
          <h3 className="text-3xl font-black text-white tracking-tight mb-4">
            {t.tools_title}
          </h3>
          <p className="text-white/45 mb-7 leading-relaxed">{t.sub}</p>
          <form onSubmit={handleAnalyze} className="flex gap-2">
            <input
              type="url"
              placeholder={t.placeholder}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 min-w-0 bg-white/[0.05] border border-white/[0.10] rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/25 outline-none focus:border-indigo-500 transition-colors"
              required
            />
            <button
              type="submit"
              className="px-5 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95 whitespace-nowrap"
            >
              {t.cta}
            </button>
          </form>
        </div>
      </section>

      {/* ── DONATION ────────────────────────────────────────────────────────── */}
      <section
        id="donate"
        className="border-t border-white/[0.05] bg-gradient-to-b from-transparent via-amber-950/10 to-transparent py-20"
      >
        <div className="max-w-2xl mx-auto px-5 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-6">
            <Heart className="h-8 w-8 text-amber-400" />
          </div>
          <h2 className="text-3xl font-black text-white mb-3 tracking-tight">
            {t.donate_title}
          </h2>
          <p className="text-white/45 leading-relaxed mb-10">{t.donate_sub}</p>

          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-amber-950 font-black text-base rounded-2xl shadow-2xl shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 mb-10"
          >
            <Coffee className="h-5 w-5" />
            {t.donate_btn}
          </a>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {[
              {
                label: t.crypto_label,
                val: "TNPxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                icon: <Code2 className="h-4 w-4 text-indigo-400" />,
              },
              {
                label: t.iban_label,
                val: "TR12 0000 0000 0000 0000 00 · Cuma Kaya",
                icon: <Lock className="h-4 w-4 text-emerald-400" />,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-2.5">
                  {item.icon}
                  <span className="text-[10px] font-bold text-white/35 uppercase tracking-widest">
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <code className="flex-1 text-xs text-white/60 font-mono truncate">
                    {item.val}
                  </code>
                  <CopyBtn text={item.val} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.05] py-10">
        <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-5 text-xs text-white/25 font-medium">
          <OiSioLogo size="sm" />
          <p>{t.footer_tag}</p>
          <div className="flex items-center gap-3">
            {(["DE", "EN", "TR"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`text-lg transition-all ${lang === l ? "opacity-100 scale-110" : "opacity-20 hover:opacity-60"}`}
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
