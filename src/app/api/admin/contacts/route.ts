/**
 * GET /api/admin/contacts
 * Fetch all contact messages for admin dashboard
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
        message,
        created_at
      FROM contacts
      ORDER BY created_at DESC
      LIMIT 500
      `
    );

    logger.info("Admin: Contacts fetched", { count: result.rows.length });

    return NextResponse.json({
      success: true,
      data: result.rows.map((row: any) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        message: row.message,
        createdAt: new Date(row.created_at).toISOString(),
      })),
      count: result.rows.length,
    });
  } catch (error: any) {
    logger.error("Failed to fetch contacts", { error: error.message });
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}
