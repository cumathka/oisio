import { NextRequest, NextResponse } from "next/server";
import { validateSafeCrawlerUrl } from "@/core/security/ssrf-guard";

const DEEPSEEK_API = "https://api.deepseek.com/v1/chat/completions";

// ─── SEO DATA EXTRACTION ──────────────────────────────────────────────────────
function extractSeoData(html: string) {
  const getAttr = (pattern: RegExp) => (html.match(pattern) || [])[1] || "";

  const lang =
    getAttr(/<html[^>]+lang=["']([^"']+)["']/i) ||
    getAttr(/<html[^>]+lang=([^\s>]+)/i);
  const title = getAttr(/<title[^>]*>([^<]{1,200})<\/title>/i);
  const description =
    getAttr(
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']{0,400})["']/i,
    ) ||
    getAttr(
      /<meta[^>]+content=["']([^"']{0,400})["'][^>]+name=["']description["']/i,
    );
  const canonical =
    getAttr(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ||
    getAttr(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  const robots =
    getAttr(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i) ||
    getAttr(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']robots["']/i);
  const ogTitle =
    getAttr(
      /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']{0,200})["']/i,
    ) ||
    getAttr(
      /<meta[^>]+content=["']([^"']{0,200})["'][^>]+property=["']og:title["']/i,
    );
  const ogDescription =
    getAttr(
      /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']{0,400})["']/i,
    ) ||
    getAttr(
      /<meta[^>]+content=["']([^"']{0,400})["'][^>]+property=["']og:description["']/i,
    );

  // H1-H3 headings
  const h1s: string[] = [];
  const h2s: string[] = [];
  const h1Regex = /<h1[^>]*>([\s\S]{0,200}?)<\/h1>/gi;
  const h2Regex = /<h2[^>]*>([\s\S]{0,200}?)<\/h2>/gi;
  let m;
  while ((m = h1Regex.exec(html)) !== null && h1s.length < 3) {
    h1s.push(
      m[1]
        .replace(/<[^>]+>/g, "")
        .trim()
        .slice(0, 120),
    );
  }
  while ((m = h2Regex.exec(html)) !== null && h2s.length < 6) {
    h2s.push(
      m[1]
        .replace(/<[^>]+>/g, "")
        .trim()
        .slice(0, 120),
    );
  }

  // Image alt audit
  const imgTotal = (html.match(/<img[\s>/]/gi) || []).length;
  const imgWithAlt = (html.match(/<img[^>]+alt=["'][^"']+["']/gi) || []).length;
  const imgMissingAlt = Math.max(0, imgTotal - imgWithAlt);

  // Schema markup presence
  const hasSchema =
    html.includes("application/ld+json") || html.includes("schema.org");

  // Hreflang detection
  const hreflangLangs: string[] = [];
  const hrefLangRegex = /<link[^>]+hreflang=["']([^"']+)["']/gi;
  while ((m = hrefLangRegex.exec(html)) !== null && hreflangLangs.length < 10) {
    hreflangLangs.push(m[1]);
  }

  // Viewport meta
  const hasViewport = /<meta[^>]+name=["']viewport["']/i.test(html);

  // Count internal-ish links
  const linkCount = (html.match(/<a\s/gi) || []).length;

  return {
    lang: lang.slice(0, 10),
    title: title.slice(0, 200),
    description: description.slice(0, 400),
    canonical: canonical.slice(0, 300),
    robots: robots.slice(0, 100),
    ogTitle: ogTitle.slice(0, 200),
    ogDescription: ogDescription.slice(0, 400),
    h1s,
    h2s,
    imgTotal,
    imgMissingAlt,
    hasSchema,
    hreflangLangs,
    hasViewport,
    linkCount,
  };
}

// ─── DEEPSEEK PROMPT ──────────────────────────────────────────────────────────
function buildPrompt(
  url: string,
  seoData: ReturnType<typeof extractSeoData>,
  fetchError: string,
  uiLang: string,
) {
  const langNames: Record<string, string> = {
    TR: "Turkish",
    DE: "German",
    EN: "English",
    FR: "French",
    ES: "Spanish",
    IT: "Italian",
    NL: "Dutch",
    PT: "Portuguese",
    PL: "Polish",
    RU: "Russian",
    ZH: "Chinese (Simplified)",
    JA: "Japanese",
    AR: "Arabic",
  };
  const responseLang = langNames[uiLang.toUpperCase()] ?? "English";
  return `You are a senior SEO analyst. Analyze this website's SEO data and return a JSON report.
⚠️ IMPORTANT: Write ALL text fields (titles, details, feedback, aiInsight, technicalSummary) in ${responseLang}. Only "language", "languageName", "languageNative" fields are fixed — those describe the website's language, not your response language.

URL: ${url}
HTML lang attribute: "${seoData.lang}"
Title (${seoData.title.length} chars): "${seoData.title}"
Meta Description (${seoData.description.length} chars): "${seoData.description}"
Canonical URL: "${seoData.canonical}"
Robots meta: "${seoData.robots}"
OG Title: "${seoData.ogTitle}"
OG Description: "${seoData.ogDescription}"
H1 Tags: ${JSON.stringify(seoData.h1s)}
H2 Tags (first 6): ${JSON.stringify(seoData.h2s)}
Total Images: ${seoData.imgTotal}, Missing Alt Text: ${seoData.imgMissingAlt}
Has Schema Markup: ${seoData.hasSchema}
Hreflang Languages: ${seoData.hreflangLangs.join(", ") || "none"}
Has Viewport Meta: ${seoData.hasViewport}
Total Links: ${seoData.linkCount}
${fetchError ? `⚠️ Page could not be fetched (${fetchError}) — analyze from URL alone.` : ""}

Return ONLY valid JSON (no markdown, no backticks, no explanation):
{
  "language": "ISO 639-1 code (e.g. tr, de, en, fr, es)",
  "languageName": "Full name in English (e.g. Turkish, German)",
  "languageNative": "Full name in native script (e.g. Türkçe, Deutsch)",
  "seoScore": <integer 0-100>,
  "healthScore": <integer 0-100>,
  "issues": [
    { "severity": "critical|warning|info", "title": "short issue title", "detail": "1 sentence explanation", "impact": "+X pts" }
  ],
  "keywords": [
    { "keyword": "keyword phrase", "intent": "Commercial|Informational|Navigational|Transactional", "difficulty": "Low|Medium|High", "opportunity": "High|Medium|Low" }
  ],
  "recommendations": [
    { "priority": "DO_FIRST|PLAN|OPTIONAL", "title": "action title (max 60 chars)", "detail": "why this matters", "effort": "Low|Medium|High", "impact": "e.g. +12 leads/mo or +3.5 SEO pts" }
  ],
  "titleAnalysis": { "length": <number>, "isOptimal": <boolean>, "score": <0-100>, "feedback": "short feedback" },
  "descriptionAnalysis": { "length": <number>, "isOptimal": <boolean>, "score": <0-100>, "feedback": "short feedback" },
  "channelScores": { "technical": <0-100, technical SEO health>, "content": <0-100, content quality>, "onPage": <0-100, on-page optimization>, "ux": <0-100, UX and mobile signals> },
  "technicalSummary": "2-3 sentences about technical SEO state",
  "aiInsight": "1 key actionable insight with a specific, quantified opportunity"
}`;
}

// ─── ROUTE HANDLER ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, uiLang } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Valid URL is required." },
        { status: 400 },
      );
    }

    // 1. SSRF Guard
    const ssrfCheck = await validateSafeCrawlerUrl(url);
    if (!ssrfCheck.isSafe) {
      return NextResponse.json(
        {
          error:
            "Security validation failed: Target URL points to an untrusted or private network.",
          reason: ssrfCheck.reason,
        },
        { status: 403 },
      );
    }

    // 2. Fetch the page (10s timeout, 60KB cap)
    let html = "";
    let fetchError = "";
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 10000);
      try {
        const resp = await fetch(url, {
          signal: controller.signal,
          headers: {
            "User-Agent": "oiSio-Bot/1.0 SEO Audit (+https://oisio.ai/bot)",
            Accept: "text/html,application/xhtml+xml",
          },
          redirect: "follow",
        });
        const text = await resp.text();
        html = text.slice(0, 60000);
      } finally {
        clearTimeout(timer);
      }
    } catch (err) {
      fetchError = err instanceof Error ? err.message : "Fetch failed";
    }

    // 3. Extract SEO data
    const seoData = extractSeoData(html);

    // 4. Call DeepSeek
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "DeepSeek API key not configured." },
        { status: 500 },
      );
    }

    const dsResp = await fetch(DEEPSEEK_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: buildPrompt(
              url,
              seoData,
              fetchError,
              typeof uiLang === "string" ? uiLang : "EN",
            ),
          },
        ],
        temperature: 0.1,
        max_tokens: 2500,
        response_format: { type: "json_object" },
      }),
    });

    if (!dsResp.ok) {
      const errText = await dsResp.text();
      return NextResponse.json(
        { error: `DeepSeek API error: ${dsResp.status}`, detail: errText },
        { status: 502 },
      );
    }

    const dsData = await dsResp.json();
    const rawContent: string = dsData?.choices?.[0]?.message?.content ?? "";

    let analysis: Record<string, unknown>;
    try {
      const cleaned = rawContent.replace(/^```[a-z]*\n?|\n?```$/g, "").trim();
      analysis = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        {
          error: "Failed to parse DeepSeek response",
          raw: rawContent.slice(0, 500),
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      url,
      hostname: ssrfCheck.hostname,
      fetchedOk: !fetchError,
      seoData,
      analysis,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
