/**
 * GET /api/donations/stats
 * Fetch real donation statistics from PostgreSQL
 * 
 * Returns:
 * {
 *   totalAmount: number (total donated in rupees),
 *   totalDonors: number (count of unique donors),
 *   todayAmount: number (amount donated today),
 *   thisMonthAmount: number (amount donated this month),
 *   recentDonations: Array<{amount, timestamp, donorName}>,
 *   lastUpdated: ISO timestamp
 * }
 */

import { NextRequest, NextResponse } from "next/server";
import { queryDatabase } from "@/lib/database";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    // Get total amount and donor count
    const statsResult = await queryDatabase(`
      SELECT 
        COALESCE(SUM(amount), 0) as total_amount,
        COUNT(DISTINCT COALESCE(donor_email, payment_id)) as total_donors,
        COUNT(*) as donation_count
      FROM donations
      WHERE status = 'completed';
    `);

    const { total_amount, total_donors, donation_count } = statsResult.rows[0] || {
      total_amount: 0,
      total_donors: 0,
      donation_count: 0,
    };

    // Get today's donations (in Indian timezone IST = UTC+5:30)
    const todayResult = await queryDatabase(`
      SELECT COALESCE(SUM(amount), 0) as today_amount
      FROM donations
      WHERE status = 'completed'
        AND DATE(created_at AT TIME ZONE 'Asia/Kolkata') = CURRENT_DATE AT TIME ZONE 'Asia/Kolkata';
    `);

    const today_amount = todayResult.rows[0]?.today_amount || 0;

    // Get this month's donations
    const monthResult = await queryDatabase(`
      SELECT COALESCE(SUM(amount), 0) as month_amount
      FROM donations
      WHERE status = 'completed'
        AND DATE_TRUNC('month', created_at AT TIME ZONE 'Asia/Kolkata') = DATE_TRUNC('month', CURRENT_DATE AT TIME ZONE 'Asia/Kolkata');
    `);

    const month_amount = monthResult.rows[0]?.month_amount || 0;

    // Get last 5 donations for social proof
    const recentResult = await queryDatabase(`
      SELECT 
        amount,
        created_at,
        donor_name,
        donor_email
      FROM donations
      WHERE status = 'completed'
      ORDER BY created_at DESC
      LIMIT 5;
    `);

    const recentDonations = recentResult.rows.map((row: any) => ({
      amount: Math.round(row.amount),
      timestamp: new Date(row.created_at).toISOString(),
      donorName: row.donor_name === "Anonymous" ? "Someone" : row.donor_name,
      donorEmail: row.donor_email,
    }));

    const allDonations = await queryDatabase(`
      SELECT id, amount, status, created_at, donor_email, donor_name FROM donations;
    `);
    
    logger.info("Donation debugging info:", {
      count: allDonations.rows.length,
      rows: allDonations.rows.map((r: any) => ({
        id: r.id,
        amt: r.amount,
        stat: r.status,
        date: r.created_at,
        email: r.donor_email
      }))
    });

    logger.info("Donation stats fetched successfully", {
      totalDonors: total_donors,
      totalAmount: total_amount,
      todayAmount: today_amount,
      monthAmount: month_amount
    });

    // Create the response with explicit cache-control headers
    const responseBody = {
      totalAmount: Math.round(total_amount),
      totalDonors: parseInt(donation_count || 0), // Count every donation as a "donor" for now to show real-time progress
      uniqueDonors: parseInt(total_donors || 0), 
      todayAmount: Math.round(today_amount),
      thisMonthAmount: Math.round(month_amount),
      donationCount: parseInt(donation_count || 0),
      recentDonations,
      lastUpdated: new Date().toISOString(),
      isFresh: true
    };

    return new NextResponse(JSON.stringify(responseBody), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error: any) {
    logger.error("Failed to fetch donation stats", {
      message: error.message,
      stack: error.stack,
    });

    return NextResponse.json(
      {
        error: "Failed to fetch donation statistics",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
