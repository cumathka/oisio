"use client";

import React, { useState } from "react";
import {
  Search,
  Sparkles,
  TrendingUp,
  Target,
  Clock,
  BarChart3,
  RefreshCw,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const GoogleAdSlot = ({
  format,
}: {
  format: "leaderboard" | "sidebar" | "rectangle";
}) => {
  const styles = {
    leaderboard: "w-full h-[90px] max-w-[728px] mx-auto",
    sidebar: "w-full h-[600px] max-w-[300px]",
    rectangle: "w-full h-[250px] max-w-[300px]",
  };

  return (
    <div
      className={`${styles[format]} bg-slate-900/50 border border-slate-800 rounded-lg flex items-center justify-center relative overflow-hidden group mb-6`}
    >
      <span className="text-slate-600 text-xs font-medium uppercase tracking-widest text-center px-4">
        Google AdSense Reklam Alanı
      </span>
      <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
};

export function FreeToolView({
  onAnalyze,
}: {
  onAnalyze: (url: string) => void;
}) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const features = [
    {
      title: "Organik Trafik Büyümesi",
      desc: "Sürdürülebilir ve kalıcı organik büyüme stratejileri ile trafiğinizi artırın.",
      icon: <TrendingUp className="h-5 w-5 text-emerald-400" />,
    },
    {
      title: "Daha Yüksek Dönüşüm (CRO)",
      desc: "Sadece trafik değil, doğrudan satışa dönüşen optimize edilmiş kullanıcı deneyimi.",
      icon: <Target className="h-5 w-5 text-indigo-400" />,
    },
    {
      title: "Yapay Zeka ile Otomasyon",
      desc: "AI destekli araçlarımız sayesinde manuel SEO işlerini otomatikleştirin.",
      icon: <Clock className="h-5 w-5 text-amber-400" />,
    },
    {
      title: "Veriye Dayalı Kararlar",
      desc: "Tahminlere değil, tamamen veriye dayalı kesin kararlarla stratejinizi yönetin.",
      icon: <BarChart3 className="h-5 w-5 text-blue-400" />,
    },
    {
      title: "Canlı Teknik SEO Denetimi",
      desc: "Arama motoru algoritmalarıyla eş zamanlı çalışan detaylı denetim algoritması.",
      icon: <RefreshCw className="h-5 w-5 text-rose-400" />,
    },
    {
      title: "Google Ads (SEA) RSA Analizi",
      desc: "Maliyetleri düşüren ve tıklamaları artıran profesyonel Google Ads içgörüleri.",
      icon: <Zap className="h-5 w-5 text-purple-400" />,
    },
  ];

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onAnalyze(url);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <header className="border-b border-slate-800/80 bg-[#0c121e]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 font-black text-white shadow-lg shadow-indigo-500/20">
              oi
            </div>
            <span className="font-bold text-lg tracking-tight">
              oiSio{" "}
              <span className="font-normal text-slate-400">Intelligence</span>
            </span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">
              Nasıl Çalışır?
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Özellikler
            </a>
            <a href="#" className="hover:text-white transition-colors">
              İletişim
            </a>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <GoogleAdSlot format="leaderboard" />
      </div>

      <main className="max-w-7xl mx-auto px-6 pb-24 border-b border-slate-800/50">
        <div className="text-center max-w-3xl mx-auto pt-12 pb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            Ücretsiz ve Otomatik <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">
              Yapay Zeka Dijital Pazarlama Analizi
            </span>
          </h1>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Sitenizi saniyeler içinde analiz edin, organik trafiğinizi artıracak
            veri odaklı kararlar alın. Herkes için tamamen ücretsiz.
          </p>

          <form
            onSubmit={handleAnalyze}
            className="relative max-w-2xl mx-auto group"
          >
            <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl blur-xl group-hover:bg-indigo-500/30 transition-all duration-300"></div>
            <div className="relative flex items-center bg-[#0d1424] border border-slate-700/80 rounded-2xl p-2 shadow-2xl overflow-hidden focus-within:border-indigo-500 transition-colors">
              <Search className="h-5 w-5 text-slate-500 ml-4 mr-2" />
              <input
                type="url"
                placeholder="Örn: https://siteniz.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500 px-2 py-4"
                required
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="rounded-xl px-8 py-4 h-auto text-base font-semibold shadow-lg"
              >
                {isLoading ? "Analiz Ediliyor..." : "Ücretsiz Analiz Et"}
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-[#0d1424]/50 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 hover:bg-[#0d1424] transition-all"
            >
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 inline-flex mb-4">
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

      <div className="bg-[#0b101a] py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-white mb-4">
              Analiz Süreci Nasıl Çalışır?
            </h2>
            <div className="prose prose-invert prose-indigo max-w-none text-slate-400">
              <p>
                oiSio zeka motoru sitenizi tarar, kod yapısını, içerik
                kalitesini ve UX hızını analiz eder. 108 farklı metrik üzerinden
                sitenizi değerlendirir.
              </p>
              <ul className="list-disc pl-5 mt-4 space-y-2 text-sm">
                <li>
                  Sıfır teknik bilgi gerektirir: Tek yapmanız gereken sitenizin
                  bağlantısını yapıştırmak.
                </li>
                <li>
                  Hatalarınızı (SEO, Dönüşüm, Reklam) net bir şekilde gösterir.
                </li>
                <li>Çözüm önerilerini detaylı kanıtları ile size sunar.</li>
              </ul>
              <p className="mt-4 text-sm leading-relaxed">
                Platformumuz tamamen <strong>Google AdSense</strong>{" "}
                sponsorlukları ile ayakta durmaktadır, bu yüzden ödeme duvarı
                veya ücretsiz deneme süresi bitti gibi sorunlar yaşamazsınız.
                Analiz sonuçlarınız derinlemesine raporlanacak ve doğrudan
                arayüzümüze yansıtılacaktır.
              </p>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <GoogleAdSlot format="rectangle" />
          </div>
        </div>
      </div>
    </div>
  );
}
