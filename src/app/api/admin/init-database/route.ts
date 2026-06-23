/**
 * Database Initialization API Route
 *
 * POST /api/admin/init-database — initialize schema (admin key required)
 */

import { NextRequest, NextResponse } from "next/server";
import { initializeDatabase } from "@/lib/database";
import { isAdminAuthorized } from "@/lib/admin-auth";
import { adminRateLimit, getRateLimitHeaders } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const rateLimitResult = await adminRateLimit(request);
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
    );
  }

  try {
    if (!process.env.ADMIN_API_KEY) {
      console.error("[INIT-DB] ADMIN_API_KEY not configured");
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500, headers: getRateLimitHeaders(rateLimitResult) }
      );
    }

    if (!isAdminAuthorized(request)) {
      console.warn("[INIT-DB] Unauthorized initialization attempt");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: getRateLimitHeaders(rateLimitResult) }
      );
    }

    console.log("[INIT-DB] Starting database initialization (authorized)");

    await initializeDatabase();

    return NextResponse.json(
      {
        success: true,
        message: "Database schema initialized successfully",
        timestamp: new Date().toISOString(),
      },
      { status: 200, headers: getRateLimitHeaders(rateLimitResult) }
    );
  } catch {
    console.error("[INIT-DB] Initialization failed");

    return NextResponse.json(
      { success: false, error: "Database initialization failed" },
      { status: 500, headers: getRateLimitHeaders(rateLimitResult) }
    );
  }
}

/** Disabled in production — use POST with admin key only */
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    message: "Database Initialization API",
    usage: "POST /api/admin/init-database with x-admin-key header",
    note: "This endpoint is disabled in production",
  });
}
