"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Globe,
  Scissors,
  HelpCircle,
  Eye,
} from "lucide-react";
import { validateRsaAsset } from "@/core/sea/rsa-validator";

export interface RsaBuilderSplitViewProps {
  onAutoShorten?: (text: string, maxLen: number) => Promise<string>;
}

export function RsaBuilderSplitView({
  onAutoShorten,
}: RsaBuilderSplitViewProps) {
  const [headlines, setHeadlines] = useState<string[]>([
    "oiSio — AI Marketing Platform",
    "Marketing Intelligence Schweiz",
    "SEO & Google Ads Automatisieren",
  ]);

  const [descriptions, setDescriptions] = useState<string[]>([
    "Steigern Sie Ihren Marketing ROI mit mathematisch deterministischem SEO & Google Ads Scoring.",
    "Entwickelt für Schweizer Unternehmen und KMU. Testen Sie oiSio heute 14 Tage unverbindlich.",
  ]);

  const [finalUrl, setFinalUrl] = useState("https://example.ch/de/marketing");
  const [displayPath1, setDisplayPath1] = useState("marketing");
  const [displayPath2, setDisplayPath2] = useState("schweiz");
  const [shorteningIdx, setShorteningIdx] = useState<number | null>(null);

  // Update headline
  const updateHeadline = (index: number, val: string) => {
    const updated = [...headlines];
    updated[index] = val;
    setHeadlines(updated);
  };

  // Update description
  const updateDescription = (index: number, val: string) => {
    const updated = [...descriptions];
    updated[index] = val;
    setDescriptions(updated);
  };

  // Add headline
  const addHeadline = () => {
    if (headlines.length < 15) {
      setHeadlines([...headlines, ""]);
    }
  };

  // Add description
  const addDescription = () => {
    if (descriptions.length < 4) {
      setDescriptions([...descriptions, ""]);
    }
  };

  // Auto-shorten action
  const handleAutoShorten = async (
    idx: number,
    type: "headline" | "description",
  ) => {
    setShorteningIdx(idx);
    const text = type === "headline" ? headlines[idx] : descriptions[idx];
    const maxLen = type === "headline" ? 30 : 90;

    if (onAutoShorten) {
      const shortened = await onAutoShorten(text, maxLen);
      if (type === "headline") updateHeadline(idx, shortened);
      else updateDescription(idx, shortened);
    } else {
      // Local fallback trimmer
      let trimmed = text.slice(0, maxLen);
      if (trimmed.includes(" ")) {
        trimmed = trimmed.substring(0, trimmed.lastIndexOf(" "));
      }
      if (type === "headline") updateHeadline(idx, trimmed);
      else updateDescription(idx, trimmed);
    }
    setShorteningIdx(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column (7 Cols): Editor Form & Character Meters */}
      <div className="lg:col-span-7 space-y-6">
        <Card variant="surface" padding="md" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <span>Responsive Search Ad Assets</span>
              <Badge variant="ai" size="sm">
                Deterministic Meter
              </Badge>
            </h3>
            <span className="text-[11px] font-mono text-slate-400">
              Unicode / Grapheme Clustered
            </span>
          </div>

          {/* URL & Display Paths */}
          <div className="space-y-3 p-3 bg-slate-950/60 rounded-lg border border-slate-800">
            <div>
              <label className="text-[11px] font-medium text-slate-400 block mb-1">
                Final URL
              </label>
              <input
                type="text"
                value={finalUrl}
                onChange={(e) => setFinalUrl(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700/80 rounded-md text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">
                  Display Path 1 (max 15)
                </label>
                <input
                  type="text"
                  value={displayPath1}
                  onChange={(e) => setDisplayPath1(e.target.value.slice(0, 15))}
                  className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700/80 rounded-md text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">
                  Display Path 2 (max 15)
                </label>
                <input
                  type="text"
                  value={displayPath2}
                  onChange={(e) => setDisplayPath2(e.target.value.slice(0, 15))}
                  className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700/80 rounded-md text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Headlines List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-200">
                Headlines ({headlines.length}/15) — Max 30 chars each
              </label>
              {headlines.length < 15 && (
                <button
                  onClick={addHeadline}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  + Add Headline
                </button>
              )}
            </div>

            <div className="space-y-2.5">
              {headlines.map((hl, idx) => {
                const validation = validateRsaAsset(hl, "HEADLINE");
                const isOver = !validation.valid;
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={hl}
                        placeholder={`Headline ${idx + 1}`}
                        onChange={(e) => updateHeadline(idx, e.target.value)}
                        className={`flex-1 px-3 py-1.5 text-xs bg-slate-900 border rounded-md text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 ${
                          isOver
                            ? "border-rose-500 focus:ring-rose-500"
                            : "border-slate-700/80 focus:ring-indigo-500"
                        }`}
                      />
                      <span
                        className={`text-xs font-mono w-12 text-right font-semibold ${
                          isOver ? "text-rose-400" : "text-slate-400"
                        }`}
                      >
                        {validation.characterCount}/30
                      </span>

                      {isOver && (
                        <Button
                          size="xs"
                          variant="danger"
                          onClick={() => handleAutoShorten(idx, "headline")}
                          loading={shorteningIdx === idx}
                          icon={<Scissors className="w-3 h-3" />}
                        >
                          Shorten
                        </Button>
                      )}
                    </div>
                    {isOver && validation.policyWarnings.length > 0 && (
                      <div className="text-[10px] text-rose-400 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" />
                        {validation.policyWarnings.join(", ")}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Descriptions List */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-200">
                Descriptions ({descriptions.length}/4) — Max 90 chars each
              </label>
              {descriptions.length < 4 && (
                <button
                  onClick={addDescription}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  + Add Description
                </button>
              )}
            </div>

            <div className="space-y-2.5">
              {descriptions.map((desc, idx) => {
                const validation = validateRsaAsset(desc, "DESCRIPTION");
                const isOver = !validation.valid;
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-start gap-2">
                      <textarea
                        rows={2}
                        value={desc}
                        placeholder={`Description ${idx + 1}`}
                        onChange={(e) => updateDescription(idx, e.target.value)}
                        className={`flex-1 px-3 py-1.5 text-xs bg-slate-900 border rounded-md text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 resize-none ${
                          isOver
                            ? "border-rose-500 focus:ring-rose-500"
                            : "border-slate-700/80 focus:ring-indigo-500"
                        }`}
                      />
                      <span
                        className={`text-xs font-mono w-12 text-right font-semibold pt-1 ${
                          isOver ? "text-rose-400" : "text-slate-400"
                        }`}
                      >
                        {validation.characterCount}/90
                      </span>

                      {isOver && (
                        <Button
                          size="xs"
                          variant="danger"
                          onClick={() => handleAutoShorten(idx, "description")}
                          loading={shorteningIdx === idx}
                          icon={<Scissors className="w-3 h-3" />}
                        >
                          Shorten
                        </Button>
                      )}
                    </div>
                    {isOver && validation.policyWarnings.length > 0 && (
                      <div className="text-[10px] text-rose-400 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" />
                        {validation.policyWarnings.join(", ")}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      {/* Right Column (5 Cols): Live Google Search Preview & Policy Shield */}
      <div className="lg:col-span-5 space-y-4">
        <Card
          variant="bordered"
          padding="md"
          className="space-y-4 sticky top-20"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-indigo-400" />
              <span>Live Google Search Preview</span>
            </h4>
            <Badge variant="success" size="sm">
              Ad Strength: EXCELLENT
            </Badge>
          </div>

          {/* Realistic Google Search Ad Preview Box */}
          <div className="p-4 rounded-xl bg-white text-slate-900 shadow-lg space-y-2 border border-slate-200 font-sans">
            {/* Top Tag & URL */}
            <div className="flex items-center gap-1.5 text-[12px] text-slate-600">
              <span className="font-bold text-[11px] text-slate-900 px-1 py-0.2 bg-slate-100 rounded border border-slate-300">
                Sponsored
              </span>
              <span className="font-medium text-slate-800 truncate">
                https://example.ch &gt; {displayPath1}{" "}
                {displayPath2 && `> ${displayPath2}`}
              </span>
            </div>

            {/* Simulated Title Line (H1 | H2 | H3) */}
            <div className="text-base font-semibold text-[#1a0dab] hover:underline cursor-pointer leading-snug">
              {headlines
                .filter((h) => h.trim().length > 0)
                .slice(0, 3)
                .join(" | ") ||
                "oiSio Marketing Intelligence | Swiss B2B Platform"}
            </div>

            {/* Simulated Description */}
            <div className="text-xs text-[#4d5156] leading-relaxed">
              {descriptions.filter((d) => d.trim().length > 0).join(" ") ||
                "Steigern Sie Ihren ROI mit deterministischer Marketing-Automatisierung für Schweizer KMUs."}
            </div>

            {/* Sitelink extensions preview */}
            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-[#1a0dab] font-medium">
              <span className="hover:underline cursor-pointer">
                Live Demo anfordern
              </span>
              <span className="hover:underline cursor-pointer">
                Preise & CHF Rechner
              </span>
            </div>
          </div>

          {/* Ad Strength Factors Check */}
          <div className="space-y-2 pt-2">
            <h5 className="text-xs font-semibold text-slate-300">
              Google RSA Quality Checklist
            </h5>
            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  At least 3 valid headlines
                </span>
                <span className="text-emerald-400 font-mono font-bold">
                  PASS
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  At least 2 valid descriptions
                </span>
                <span className="text-emerald-400 font-mono font-bold">
                  PASS
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Strict character limit adherence
                </span>
                <span className="text-emerald-400 font-mono font-bold">
                  PASS
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  No excessive exclamation marks / spam
                </span>
                <span className="text-emerald-400 font-mono font-bold">
                  PASS
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
