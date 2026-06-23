/**
 * GET /api/admin/support-cases
 * Fetch all support cases for admin dashboard
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
        case_id,
        name,
        email,
        phone,
        service_type,
        message,
        opposing_party,
        court_deadline,
        department,
        status,
        created_at
      FROM support_cases
      ORDER BY created_at DESC
      LIMIT 500
      `
    );

    logger.info("Admin: Support cases fetched", { count: result.rows.length });

    return NextResponse.json(
      {
        success: true,
        data: result.rows.map((row: Record<string, unknown>) => ({
          id: row.id,
          caseId: row.case_id,
          name: row.name,
          email: row.email,
          phone: row.phone,
          serviceType: row.service_type,
          message: row.message,
          opposingParty: row.opposing_party,
          courtDeadline: row.court_deadline
            ? new Date(String(row.court_deadline)).toISOString()
            : null,
          department: row.department,
          status: row.status,
          createdAt: new Date(String(row.created_at)).toISOString(),
        })),
        count: result.rows.length,
      },
      { headers: getRateLimitHeaders(rateLimitResult) }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    logger.error("Failed to fetch support cases", { error: message });
    return NextResponse.json(
      { error: "Failed to fetch support cases" },
      { status: 500, headers: getRateLimitHeaders(rateLimitResult) }
    );
  }
}
