import { describe, expect, it } from "vitest";
import {
  enforceMetricTruthfulness,
  resolvePriorityMatrix,
} from "@/core/ai/decision-matrix";

describe("AI Decision & Prioritization Matrix", () => {
  it("correctly maps Impact and Effort combinations to Priority Actions", () => {
    expect(resolvePriorityMatrix("HIGH", "LOW")).toBe("DO_FIRST");
    expect(resolvePriorityMatrix("HIGH", "HIGH")).toBe("PLAN");
    expect(resolvePriorityMatrix("LOW", "LOW")).toBe("OPTIONAL");
    expect(resolvePriorityMatrix("LOW", "HIGH")).toBe("IGNORE");
    expect(resolvePriorityMatrix("MEDIUM", "LOW")).toBe("DO_FIRST");
    expect(resolvePriorityMatrix("MEDIUM", "MEDIUM")).toBe("PLAN");
  });

  it("enforces No-Hallucination policy when data is missing or estimated", () => {
    const missingCheck = enforceMetricTruthfulness(undefined);
    expect(missingCheck.status).toBe("INSUFFICIENT_DATA");
    expect(missingCheck.value).toBeNull();

    const exactCheck = enforceMetricTruthfulness(4500, "EXACT");
    expect(exactCheck.status).toBe("EXACT_DATA");
    expect(exactCheck.value).toBe(4500);
    expect(exactCheck.confidence).toBe("HIGH");
  });
});
