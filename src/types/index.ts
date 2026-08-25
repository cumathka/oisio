import { z } from "zod";

export type SupportedLocale = "en" | "de" | "tr" | "fr" | "it" | "es";
export type SupportedCurrency = "CHF" | "EUR" | "USD" | "GBP" | "TRY";

export const SupportedLocaleEnum = z.enum(["en", "de", "tr", "fr", "it", "es"]);
export const SupportedCurrencyEnum = z.enum([
  "CHF",
  "EUR",
  "USD",
  "GBP",
  "TRY",
]);

export const ImpactLevelEnum = z.enum(["HIGH", "MEDIUM", "LOW"]);
export const EffortLevelEnum = z.enum(["HIGH", "MEDIUM", "LOW"]);
export const PriorityActionEnum = z.enum([
  "DO_FIRST",
  "PLAN",
  "OPTIONAL",
  "IGNORE",
]);
export const ConfidenceLevelEnum = z.enum(["HIGH", "MEDIUM", "LOW"]);
export const DataSourceEnum = z.enum([
  "CRAWLER",
  "SEARCH_CONSOLE",
  "ADS_API",
  "ESTIMATE",
]);

export interface SEOSubScores {
  technical: number;
  onPage: number;
  content: number;
  internalLinking: number;
  authority: number;
}

export interface SEOScoreWeights {
  technicalWeight: number;
  onPageWeight: number;
  contentWeight: number;
  internalLinkingWeight: number;
  authorityWeight: number;
}

export interface SEOScoreResult {
  overallScore: number;
  subScores: SEOSubScores;
  breakdownSummary: string;
}

export interface RSAPolicyViolation {
  field: "headline" | "description";
  index: number;
  rule: string;
  message: string;
  severity: "CRITICAL" | "WARNING";
}

export interface RSACheckResult {
  isValid: boolean;
  qualityScore: number; // 0 - 100
  headlinesCount: number;
  descriptionsCount: number;
  characterLengths: {
    headlines: {
      text: string;
      length: number;
      maxAllowed: number;
      isOverLimit: boolean;
    }[];
    descriptions: {
      text: string;
      length: number;
      maxAllowed: number;
      isOverLimit: boolean;
    }[];
  };
  policyViolations: RSAPolicyViolation[];
}

export interface AIRecommendationItem {
  id: string;
  title: string;
  description: string;
  impact: z.infer<typeof ImpactLevelEnum>;
  effort: z.infer<typeof EffortLevelEnum>;
  priority: z.infer<typeof PriorityActionEnum>;
  source: z.infer<typeof DataSourceEnum>;
  confidence: z.infer<typeof ConfidenceLevelEnum>;
  evidence: string;
  suggestedAction: "FIX" | "GENERATE" | "CREATE_TASK" | "IGNORE";
}
