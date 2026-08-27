"use client";

import React, { useState } from "react";
import { FreeToolView } from "@/components/free-tool/FreeToolView";
import { DashboardPageContent } from "./dashboard-view";

export default function AppEntry() {
  const [appState, setAppState] = useState<"landing" | "app">("landing");

  // When a user enters a URL on the free tool, we simulate the analysis loading
  // and then transition them to the deep Dashboard UI, keeping them on the same page.
  const handleAnalyzeStart = (url: string) => {
    // In a real app we'd pass the URL to global state or context to fetch live data.
    // For now, we transition to our complex enterprise dashboard view we built.
    setAppState("app");
  };

  if (appState === "landing") {
    return <FreeToolView onAnalyze={handleAnalyzeStart} />;
  }

  return <DashboardPageContent />;
}
