/**
 * GET /api/admin/applications
 * Fetch all job applications for admin dashboard
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
        name,
        email,
        phone,
        role,
        cover_letter,
        created_at
      FROM applications
      ORDER BY created_at DESC
      LIMIT 500
      `
    );

    logger.info("Admin: Applications fetched", { count: result.rows.length });

    return NextResponse.json({
      success: true,
      data: result.rows.map((row: any) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        phone: row.phone,
        role: row.role,
        coverLetter: row.cover_letter,
        createdAt: new Date(row.created_at).toISOString(),
      })),
      count: result.rows.length,
    });
  } catch (error: any) {
    logger.error("Failed to fetch applications", { error: error.message });
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
