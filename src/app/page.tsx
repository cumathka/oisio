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

  const handleAnalyzeStart = useCallback(async (url: string) => {
    setAnalysisLoading(true);
    setAppState("app");

    try {
      const resp = await fetch("/api/v1/deepseek-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (resp.ok) {
        const data = await resp.json();
        if (data.success && data.analysis) {
          setAnalysisResult({ url, ...data.analysis, seoData: data.seoData });
        }
      }
    } catch {
      // Dashboard shows demo data on API failure
    } finally {
      setAnalysisLoading(false);
    }
  }, []);

  if (appState === "landing") {
    return <FreeToolView onAnalyze={handleAnalyzeStart} />;
  }

  return (
    <DashboardPageContent
      analysisResult={analysisResult}
      analysisLoading={analysisLoading}
    />
  );
}
