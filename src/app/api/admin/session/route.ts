import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthorized } from "@/lib/admin-auth";
import { adminRateLimit, getRateLimitHeaders } from "@/lib/rate-limit";

/** Verify admin API key before unlocking the dashboard UI */
export async function GET(request: NextRequest) {
  const rateLimitResult = await adminRateLimit(request);
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please try again later." },
      { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
    );
  }

  if (!isAdminAuthorized(request)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401, headers: getRateLimitHeaders(rateLimitResult) }
    );
  }

  return NextResponse.json({ ok: true }, { headers: getRateLimitHeaders(rateLimitResult) });
}
