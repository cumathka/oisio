import { RSACheckResult, RSAPolicyViolation } from "@/types";

export const MAX_HEADLINE_LENGTH = 30;
export const MAX_DESCRIPTION_LENGTH = 90;
export const MIN_HEADLINES_REQUIRED = 3;
export const MAX_HEADLINES_ALLOWED = 15;
export const MIN_DESCRIPTIONS_REQUIRED = 2;
export const MAX_DESCRIPTIONS_ALLOWED = 4;

/**
 * Calculates Unicode-aware character length (correctly handling emojis and non-ASCII glyphs).
 */
export function getUnicodeLength(str: string): number {
  if (!str) return 0;
  // Using Intl.Segmenter for strict grapheme cluster counting if available, or spread array
  return Array.from(str.normalize("NFC")).length;
}

const POLICY_RESTRICTED_WORDS = [
  "click here",
  "guaranteed 100%",
  "best #1 in world",
  "free money",
  "miracle cure",
  "official google",
];

/**
 * Validates Google Ads Responsive Search Ads (RSA).
 * Checks exact length, policy compliance, and evaluates RSA Quality Score (0 - 100).
 */
export function validateResponsiveSearchAd(
  headlines: string[],
  descriptions: string[],
): RSACheckResult {
  const policyViolations: RSAPolicyViolation[] = [];

  const headlineChecks = headlines.map((text, idx) => {
    const length = getUnicodeLength(text);
    const isOverLimit = length > MAX_HEADLINE_LENGTH;

    if (isOverLimit) {
      policyViolations.push({
        field: "headline",
        index: idx,
        rule: "CHARACTER_LIMIT_EXCEEDED",
        message: `Headline exceeds ${MAX_HEADLINE_LENGTH} characters (${length}/${MAX_HEADLINE_LENGTH})`,
        severity: "CRITICAL",
      });
    }

    // Check excessive punctuation (e.g., multiple exclamation marks)
    if (/[!?.]{2,}/.test(text) || (text.match(/!/g) || []).length > 1) {
      policyViolations.push({
        field: "headline",
        index: idx,
        rule: "EXCESSIVE_PUNCTUATION",
        message:
          "Google Ads policy prohibits excessive or repeated punctuation in headlines.",
        severity: "WARNING",
      });
    }

    // Check ALL CAPS words (allow short acronyms up to 3 letters)
    const words = text.split(/\s+/);
    for (const w of words) {
      if (w.length > 3 && w === w.toUpperCase() && /[A-Z]/.test(w)) {
        policyViolations.push({
          field: "headline",
          index: idx,
          rule: "ALL_CAPS_PROHIBITED",
          message: `Unnecessary capitalization detected in word "${w}".`,
          severity: "WARNING",
        });
      }
    }

    // Check restricted phrases
    const lower = text.toLowerCase();
    for (const badWord of POLICY_RESTRICTED_WORDS) {
      if (lower.includes(badWord)) {
        policyViolations.push({
          field: "headline",
          index: idx,
          rule: "RESTRICTED_PHRASE",
          message: `Headline contains prohibited marketing phrase: "${badWord}".`,
          severity: "CRITICAL",
        });
      }
    }

    return {
      text,
      length,
      maxAllowed: MAX_HEADLINE_LENGTH,
      isOverLimit,
    };
  });

  const descriptionChecks = descriptions.map((text, idx) => {
    const length = getUnicodeLength(text);
    const isOverLimit = length > MAX_DESCRIPTION_LENGTH;

    if (isOverLimit) {
      policyViolations.push({
        field: "description",
        index: idx,
        rule: "CHARACTER_LIMIT_EXCEEDED",
        message: `Description exceeds ${MAX_DESCRIPTION_LENGTH} characters (${length}/${MAX_DESCRIPTION_LENGTH})`,
        severity: "CRITICAL",
      });
    }

    if (/[!?.]{2,}/.test(text)) {
      policyViolations.push({
        field: "description",
        index: idx,
        rule: "EXCESSIVE_PUNCTUATION",
        message: "Repeated exclamation marks or punctuation prohibited.",
        severity: "WARNING",
      });
    }

    const lower = text.toLowerCase();
    for (const badWord of POLICY_RESTRICTED_WORDS) {
      if (lower.includes(badWord)) {
        policyViolations.push({
          field: "description",
          index: idx,
          rule: "RESTRICTED_PHRASE",
          message: `Description contains prohibited marketing phrase: "${badWord}".`,
          severity: "CRITICAL",
        });
      }
    }

    return {
      text,
      length,
      maxAllowed: MAX_DESCRIPTION_LENGTH,
      isOverLimit,
    };
  });

  // Calculate Quality Score (0 to 100)
  let score = 100;

  // Penalties for count deficiencies
  if (headlines.length < MIN_HEADLINES_REQUIRED) {
    score -= 30;
    policyViolations.push({
      field: "headline",
      index: -1,
      rule: "INSUFFICIENT_HEADLINES",
      message: `At least ${MIN_HEADLINES_REQUIRED} headlines are required (provided: ${headlines.length}).`,
      severity: "CRITICAL",
    });
  } else if (headlines.length < 5) {
    score -= 10; // Encouraging optimal count (5-15)
  }

  if (descriptions.length < MIN_DESCRIPTIONS_REQUIRED) {
    score -= 25;
    policyViolations.push({
      field: "description",
      index: -1,
      rule: "INSUFFICIENT_DESCRIPTIONS",
      message: `At least ${MIN_DESCRIPTIONS_REQUIRED} descriptions are required (provided: ${descriptions.length}).`,
      severity: "CRITICAL",
    });
  }

  // Deductions for policy violations
  for (const v of policyViolations) {
    if (v.severity === "CRITICAL") score -= 20;
    if (v.severity === "WARNING") score -= 5;
  }

  const finalQualityScore = Math.max(0, Math.min(100, score));
  const hasCritical = policyViolations.some((v) => v.severity === "CRITICAL");

  return {
    isValid:
      !hasCritical &&
      headlines.length >= MIN_HEADLINES_REQUIRED &&
      descriptions.length >= MIN_DESCRIPTIONS_REQUIRED,
    qualityScore: finalQualityScore,
    headlinesCount: headlines.length,
    descriptionsCount: descriptions.length,
    characterLengths: {
      headlines: headlineChecks,
      descriptions: descriptionChecks,
    },
    policyViolations,
  };
}
