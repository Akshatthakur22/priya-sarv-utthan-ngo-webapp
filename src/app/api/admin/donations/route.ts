/**
 * GET /api/admin/donations
 * Fetch all donations for admin dashboard
 * Protected with API key
 */

import { NextRequest, NextResponse } from "next/server";
import { queryDatabase } from "@/lib/database";
import { logger } from "@/lib/logger";

async function verifyAdminKey(request: NextRequest): Promise<boolean> {
  const apiKey = request.headers.get("x-admin-key");
  const expectedKey = process.env.ADMIN_API_KEY;
  
  if (!expectedKey || !apiKey || apiKey !== expectedKey) {
    return false;
  }
  return true;
}

export async function GET(request: NextRequest) {
  try {
    // Verify admin key
    if (!(await verifyAdminKey(request))) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Fetch all donations with most recent first
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

    return NextResponse.json({
      success: true,
      data: result.rows.map((row: any) => ({
        id: row.id,
        orderId: row.order_id,
        paymentId: row.payment_id,
        amount: parseFloat(row.amount),
        currency: row.currency,
        donorName: row.donor_name || "Anonymous",
        donorEmail: row.donor_email,
        donorPhone: row.donor_phone,
        donorMessage: row.donor_message,
        status: row.status,
        createdAt: new Date(row.created_at).toISOString(),
      })),
      count: result.rows.length,
    });
  } catch (error: any) {
    logger.error("Failed to fetch donations", { error: error.message });
    return NextResponse.json(
      { error: "Failed to fetch donations" },
      { status: 500 }
    );
  }
}
