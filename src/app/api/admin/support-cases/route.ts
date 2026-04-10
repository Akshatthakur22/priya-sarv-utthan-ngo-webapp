/**
 * GET /api/admin/support-cases
 * Fetch all support cases for admin dashboard
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
    if (!(await verifyAdminKey(request))) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
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

    return NextResponse.json({
      success: true,
      data: result.rows.map((row: any) => ({
        id: row.id,
        caseId: row.case_id,
        name: row.name,
        email: row.email,
        phone: row.phone,
        serviceType: row.service_type,
        message: row.message,
        opposingParty: row.opposing_party,
        courtDeadline: row.court_deadline ? new Date(row.court_deadline).toISOString() : null,
        department: row.department,
        status: row.status,
        createdAt: new Date(row.created_at).toISOString(),
      })),
      count: result.rows.length,
    });
  } catch (error: any) {
    logger.error("Failed to fetch support cases", { error: error.message });
    return NextResponse.json(
      { error: "Failed to fetch support cases" },
      { status: 500 }
    );
  }
}
