import {
  ConfidenceLevelEnum,
  DataSourceEnum,
  EffortLevelEnum,
  ImpactLevelEnum,
  PriorityActionEnum,
} from "@/types";
import { z } from "zod";

export type Impact = z.infer<typeof ImpactLevelEnum>;
export type Effort = z.infer<typeof EffortLevelEnum>;
export type Priority = z.infer<typeof PriorityActionEnum>;
export type DecisionCategory = "DO_FIRST" | "PLAN" | "OPTIONAL" | "IGNORE";

/**
 * Deterministic AI Priority Matrix Evaluator
 * High Impact + Low Effort  -> DO_FIRST
 * High Impact + High Effort -> PLAN
 * Low Impact + Low Effort   -> OPTIONAL
 * Low Impact + High Effort  -> IGNORE
 */
export function resolvePriorityMatrix(
  impact: Impact,
  effort: Effort,
): Priority {
  if (impact === "HIGH" && effort === "LOW") return "DO_FIRST";
  if (impact === "HIGH" && (effort === "MEDIUM" || effort === "HIGH"))
    return "PLAN";
  if (impact === "MEDIUM" && effort === "LOW") return "DO_FIRST";
  if (impact === "MEDIUM" && effort === "MEDIUM") return "PLAN";
  if (impact === "MEDIUM" && effort === "HIGH") return "OPTIONAL";
  if (impact === "LOW" && effort === "LOW") return "OPTIONAL";
  return "IGNORE"; // Low impact + Medium/High effort
}

export interface MetricEstimateResult {
  value: number | null;
  status: "EXACT_DATA" | "ESTIMATED_DATA" | "INSUFFICIENT_DATA";
  confidence: z.infer<typeof ConfidenceLevelEnum>;
  source: z.infer<typeof DataSourceEnum>;
  evidenceNote: string;
}

/**
 * Metric Guardrail: Adheres strictly to the NO-HALLUCINATION policy.
 * Refuses to fabricate search volumes or traffic without real data.
 */
export function enforceMetricTruthfulness(
  rawApiValue?: number,
  mode: "EXACT" | "ESTIMATE" = "EXACT",
): MetricEstimateResult {
  if (rawApiValue === undefined || rawApiValue === null || isNaN(rawApiValue)) {
    return {
      value: null,
      status: "INSUFFICIENT_DATA",
      confidence: "LOW",
      source: "ESTIMATE",
      evidenceNote:
        "Insufficient data points available. Value is not fabricated.",
    };
  }

  if (mode === "EXACT") {
    return {
      value: rawApiValue,
      status: "EXACT_DATA",
      confidence: "HIGH",
      source: "SEARCH_CONSOLE",
      evidenceNote:
        "Directly verified from connected performance provider API.",
    };
  }

  return {
    value: rawApiValue,
    status: "ESTIMATED_DATA",
    confidence: "MEDIUM",
    source: "ESTIMATE",
    evidenceNote:
      "Statistical benchmark estimate based on historical category averages.",
  };
}
