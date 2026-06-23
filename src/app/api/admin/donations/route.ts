/**
 * GET /api/admin/donations
 * Fetch all donations for admin dashboard
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
        order_id,
        payment_id,
        amount,
        currency,
        donor_name,
        donor_email,
        donor_phone,
        donor_message,
        status,
        created_at
      FROM donations
      WHERE status = 'completed'
      ORDER BY created_at DESC
      LIMIT 500
      `
    );

    logger.info("Admin: Donations fetched", { count: result.rows.length });

    return NextResponse.json(
      {
        success: true,
        data: result.rows.map((row: Record<string, unknown>) => ({
          id: row.id,
          orderId: row.order_id,
          paymentId: row.payment_id,
          amount: parseFloat(String(row.amount)),
          currency: row.currency,
          donorName: row.donor_name || "Anonymous",
          donorEmail: row.donor_email,
          donorPhone: row.donor_phone,
          donorMessage: row.donor_message,
          status: row.status,
          createdAt: new Date(String(row.created_at)).toISOString(),
        })),
        count: result.rows.length,
      },
      { headers: getRateLimitHeaders(rateLimitResult) }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    logger.error("Failed to fetch donations", { error: message });
    return NextResponse.json(
      { error: "Failed to fetch donations" },
      { status: 500, headers: getRateLimitHeaders(rateLimitResult) }
    );
  }
}
