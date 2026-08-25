import { SEOScoreResult, SEOScoreWeights, SEOSubScores } from "@/types";

export const DEFAULT_SEO_WEIGHTS: SEOScoreWeights = {
  technicalWeight: 0.3, // 30%
  onPageWeight: 0.25, // 25%
  contentWeight: 0.2, // 20%
  internalLinkingWeight: 0.1, // 10%
  authorityWeight: 0.15, // 15%
};

/**
 * Deterministic SEO Score Calculator
 * Adheres strictly to mathematical formula without hallucinated values.
 */
export function calculateDeterministicSEOScore(
  subScores: SEOSubScores,
  weights: SEOScoreWeights = DEFAULT_SEO_WEIGHTS,
): SEOScoreResult {
  // Clamp all subscores between 0 and 100
  const clamp = (val: number) => Math.max(0, Math.min(100, Math.round(val)));

  const clampedScores: SEOSubScores = {
    technical: clamp(subScores.technical),
    onPage: clamp(subScores.onPage),
    content: clamp(subScores.content),
    internalLinking: clamp(subScores.internalLinking),
    authority: clamp(subScores.authority),
  };

  const totalWeight =
    weights.technicalWeight +
    weights.onPageWeight +
    weights.contentWeight +
    weights.internalLinkingWeight +
    weights.authorityWeight;

  if (Math.abs(totalWeight - 1.0) > 0.001) {
    throw new Error(
      `Total SEO score weights must equal 1.0 (current sum: ${totalWeight})`,
    );
  }

  const rawWeightedScore =
    clampedScores.technical * weights.technicalWeight +
    clampedScores.onPage * weights.onPageWeight +
    clampedScores.content * weights.contentWeight +
    clampedScores.internalLinking * weights.internalLinkingWeight +
    clampedScores.authority * weights.authorityWeight;

  const overallScore = Math.round(rawWeightedScore);

  let breakdownSummary = "";
  if (overallScore >= 80) {
    breakdownSummary =
      "Strong overall SEO foundation. Focus on authority and micro-optimizations.";
  } else if (overallScore >= 60) {
    breakdownSummary =
      "Moderate health. Technical or on-page bottlenecks need remediation.";
  } else {
    breakdownSummary =
      "Critical SEO deficiencies detected across key technical and content pillars.";
  }

  return {
    overallScore,
    subScores: clampedScores,
    breakdownSummary,
  };
}
