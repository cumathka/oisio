"use client";

import React, { useState, useCallback } from "react";
import { FreeToolView } from "@/components/free-tool/FreeToolView";
import { DashboardPageContent, type AnalysisResult } from "./dashboard-view";

export default function AppEntry() {
  const [appState, setAppState] = useState<"landing" | "app">("landing");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const handleAnalyzeStart = useCallback(async (url: string, lang: string) => {
    setAnalysisLoading(true);
    setAnalysisError(null);
    setAppState("app");

    try {
      const resp = await fetch("/api/v1/deepseek-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, uiLang: lang }),
      });
      const data = await resp.json();
      if (resp.ok && data.success && data.analysis) {
        setAnalysisResult({ url, ...data.analysis, seoData: data.seoData });
      } else {
        setAnalysisError(data.error ?? "Analysis failed — check console.");
      }
    } catch (e) {
      setAnalysisError(e instanceof Error ? e.message : "Network error.");
    } finally {
      setAnalysisLoading(false);
    }
  }, []);

  const handleBack = useCallback(() => {
    setAppState("landing");
    setAnalysisResult(null);
    setAnalysisError(null);
  }, []);

  if (appState === "landing") {
    return <FreeToolView onAnalyze={handleAnalyzeStart} />;
  }

  return (
    <DashboardPageContent
      analysisResult={analysisResult}
      analysisLoading={analysisLoading}
      analysisError={analysisError}
      onBack={handleBack}
    />
  );
}
