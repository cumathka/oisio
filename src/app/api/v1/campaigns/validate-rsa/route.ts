import { NextRequest, NextResponse } from "next/server";
import { validateResponsiveSearchAd } from "@/core/sea/rsa-validator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { headlines = [], descriptions = [] } = body;

    const validationResult = validateResponsiveSearchAd(
      headlines,
      descriptions,
    );
    return NextResponse.json({
      success: true,
      ...validationResult,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
