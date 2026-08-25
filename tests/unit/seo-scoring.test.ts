import { describe, expect, it } from "vitest";
import {
  calculateDeterministicSEOScore,
  DEFAULT_SEO_WEIGHTS,
} from "@/core/seo/scoring";

describe("Deterministic SEO Score Engine", () => {
  it("calculates weighted score accurately based on standard weights", () => {
    // Technical: 30%, On-Page: 25%, Content: 20%, Internal Linking: 10%, Authority: 15%
    const subScores = {
      technical: 80,
      onPage: 70,
      content: 90,
      internalLinking: 60,
      authority: 50,
    };
    // Expected = 80*0.30 (24) + 70*0.25 (17.5) + 90*0.20 (18) + 60*0.10 (6) + 50*0.15 (7.5) = 73
    const result = calculateDeterministicSEOScore(subScores);

    expect(result.overallScore).toBe(73);
    expect(result.subScores).toEqual(subScores);
    expect(result.breakdownSummary).toContain("Moderate health");
  });

  it("clamps values correctly between 0 and 100", () => {
    const result = calculateDeterministicSEOScore({
      technical: 120,
      onPage: -10,
      content: 100,
      internalLinking: 50,
      authority: 80,
    });

    expect(result.subScores.technical).toBe(100);
    expect(result.subScores.onPage).toBe(0);
  });

  it("throws error if weights do not sum to 1.0", () => {
    const invalidWeights = {
      ...DEFAULT_SEO_WEIGHTS,
      technicalWeight: 0.5, // total > 1.0
    };

    expect(() =>
      calculateDeterministicSEOScore(
        {
          technical: 80,
          onPage: 80,
          content: 80,
          internalLinking: 80,
          authority: 80,
        },
        invalidWeights,
      ),
    ).toThrow(/weights must equal 1.0/);
  });
});
