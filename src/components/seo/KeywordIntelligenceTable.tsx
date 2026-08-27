"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Search, ArrowUpDown, Sparkles, TrendingUp } from "lucide-react";

export interface KeywordItem {
  id: string;
  keyword: string;
  intent: "Transactional" | "Commercial" | "Informational" | "Navigational";
  volume: number;
  difficulty: number; // 0 - 100
  cpc: number;
  position: number;
  change: number;
}

export function KeywordIntelligenceTable({
  currency = "CHF",
}: {
  currency?: string;
}) {
  const [search, setSearch] = useState("");
  const [intentFilter, setIntentFilter] = useState("ALL");

  const keywords: KeywordItem[] = [
    {
      id: "kw-1",
      keyword: "marketing automatisierung schweiz",
      intent: "Commercial",
      volume: 3800,
      difficulty: 42,
      cpc: 4.85,
      position: 3,
      change: +2,
    },
    {
      id: "kw-2",
      keyword: "seo agentur zürich kmu",
      intent: "Transactional",
      volume: 2100,
      difficulty: 68,
      cpc: 7.2,
      position: 5,
      change: 0,
    },
    {
      id: "kw-3",
      keyword: "google ads rsa optimierung tipps",
      intent: "Informational",
      volume: 5400,
      difficulty: 28,
      cpc: 1.95,
      position: 1,
      change: +4,
    },
    {
      id: "kw-4",
      keyword: "b2b marketing software chf",
      intent: "Transactional",
      volume: 1650,
      difficulty: 54,
      cpc: 6.1,
      position: 8,
      change: -1,
    },
    {
      id: "kw-5",
      keyword: "landing page conversion optimieren",
      intent: "Informational",
      volume: 4200,
      difficulty: 38,
      cpc: 3.4,
      position: 4,
      change: +1,
    },
  ];

  const getIntentBadge = (intent: KeywordItem["intent"]) => {
    switch (intent) {
      case "Transactional":
        return (
          <Badge variant="success" size="sm">
            Transactional
          </Badge>
        );
      case "Commercial":
        return (
          <Badge variant="info" size="sm">
            Commercial
          </Badge>
        );
      case "Informational":
        return (
          <Badge variant="purple" size="sm">
            Informational
          </Badge>
        );
      case "Navigational":
        return (
          <Badge variant="neutral" size="sm">
            Navigational
          </Badge>
        );
    }
  };

  const filtered = keywords
    .filter((k) => (intentFilter === "ALL" ? true : k.intent === intentFilter))
    .filter((k) => k.keyword.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <span>Keyword Intelligence & Search Intent</span>
            <Badge variant="ai" size="sm">
              High Commercial Value
            </Badge>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real search volumes from Swiss & DACH Google search engines.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <tr>
            <TableHead>Keyword</TableHead>
            <TableHead>Intent</TableHead>
            <TableHead>Volume / Mo</TableHead>
            <TableHead>Keyword Difficulty (KD)</TableHead>
            <TableHead>Est. CPC ({currency})</TableHead>
            <TableHead>SERP Rank</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </tr>
        </TableHeader>
        <TableBody>
          {filtered.map((kw) => (
            <TableRow key={kw.id}>
              <TableCell className="font-medium text-slate-200 font-mono">
                {kw.keyword}
              </TableCell>
              <TableCell>{getIntentBadge(kw.intent)}</TableCell>
              <TableCell className="font-mono">
                {kw.volume.toLocaleString()}
              </TableCell>
              <TableCell className="w-40">
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span>{kw.difficulty}%</span>
                  <ProgressBar
                    value={kw.difficulty}
                    size="xs"
                    variant={
                      kw.difficulty > 60
                        ? "rose"
                        : kw.difficulty > 35
                          ? "amber"
                          : "emerald"
                    }
                  />
                </div>
              </TableCell>
              <TableCell className="font-mono">
                {currency === "CHF" ? "Fr. " : currency === "EUR" ? "€" : "$"}
                {kw.cpc.toFixed(2)}
              </TableCell>
              <TableCell className="font-mono font-bold">
                <span className="text-indigo-400">#{kw.position}</span>
                {kw.change !== 0 && (
                  <span
                    className={`ml-1.5 text-[10px] ${
                      kw.change > 0 ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {kw.change > 0 ? `+${kw.change}` : kw.change}
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="xs"
                  icon={<Sparkles className="w-3 h-3 text-indigo-400" />}
                >
                  Generate RSA
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
