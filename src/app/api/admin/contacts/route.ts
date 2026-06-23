/**
 * GET /api/admin/contacts
 * Fetch all contact messages for admin dashboard
 */

import { NextRequest, NextResponse } from "next/server";
import { queryDatabase } from "@/lib/database";
import { logger } from "@/lib/logger";
import { isAdminAuthorized } from "@/lib/admin-auth";
import { adminRateLimit, getRateLimitHeaders } from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  const rateLimitResult = await adminRateLimit(request);
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
    );
  }

  try {
    if (!isAdminAuthorized(request)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: getRateLimitHeaders(rateLimitResult) }
      );
    }

    const result = await queryDatabase(
      `
      SELECT 
        id,
        name,
        email,
        message,
        created_at
      FROM contacts
      ORDER BY created_at DESC
      LIMIT 500
      `
    );

    logger.info("Admin: Contacts fetched", { count: result.rows.length });

    return NextResponse.json(
      {
        success: true,
        data: result.rows.map((row: Record<string, unknown>) => ({
          id: row.id,
          name: row.name,
          email: row.email,
          message: row.message,
          createdAt: new Date(String(row.created_at)).toISOString(),
        })),
        count: result.rows.length,
      },
      { headers: getRateLimitHeaders(rateLimitResult) }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    logger.error("Failed to fetch contacts", { error: message });
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500, headers: getRateLimitHeaders(rateLimitResult) }
    );
  }
}
