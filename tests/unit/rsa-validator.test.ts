import { describe, expect, it } from "vitest";
import {
  getUnicodeLength,
  validateResponsiveSearchAd,
} from "@/core/sea/rsa-validator";

describe("Google Ads RSA & Character Limit Validator", () => {
  it("counts unicode characters accurately", () => {
    expect(getUnicodeLength("Zürich SEO Agentur")).toBe(18);
    expect(getUnicodeLength("Pazarlama 🚀")).toBe(11);
  });

  it("validates compliant headlines and descriptions", () => {
    const headlines = [
      "Top SEO Agency Zurich",
      "Boost Your Organic Growth",
      "Expert Google Ads Audits",
      "Data-Driven CRO Solutions",
    ];
    const descriptions = [
      "Scale your business with AI-powered marketing intelligence and proven SEO strategies.",
      "Get your free technical audit today. Trusted by high-growth European SaaS businesses.",
    ];

    const result = validateResponsiveSearchAd(headlines, descriptions);
    expect(result.isValid).toBe(true);
    expect(result.qualityScore).toBeGreaterThanOrEqual(90);
    expect(result.policyViolations.length).toBe(0);
  });

  it("flags character limit violations and excessive punctuation", () => {
    const headlines = [
      "This headline is way too long and clearly exceeds thirty characters", // >30
      "Best SEO Service!!!", // excessive exclamation marks
      "FREE MONEY TODAY", // prohibited phrase + all caps
    ];
    const descriptions = ["Short desc 1", "Short desc 2"];

    const result = validateResponsiveSearchAd(headlines, descriptions);
    expect(result.isValid).toBe(false);
    expect(
      result.policyViolations.some(
        (v) => v.rule === "CHARACTER_LIMIT_EXCEEDED",
      ),
    ).toBe(true);
    expect(
      result.policyViolations.some((v) => v.rule === "EXCESSIVE_PUNCTUATION"),
    ).toBe(true);
    expect(
      result.policyViolations.some((v) => v.rule === "RESTRICTED_PHRASE"),
    ).toBe(true);
  });
});
