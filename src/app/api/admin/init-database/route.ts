/**
 * Database Initialization API Route
 * 
 * This endpoint should be called once to initialize the database schema.
 * Run only during deployment/setup, not on every app start.
 * 
 * Usage:
 * POST /api/admin/init-database
 * 
 * Authentication should be added before deploying to production!
 */

import { NextRequest, NextResponse } from "next/server";
import { initializeDatabase } from "@/lib/database";

export async function POST(request: NextRequest) {
  try {
    // ⚠️ TODO: Add authentication here before production deployment
    // Example: Check for API key header
    // const apiKey = request.headers.get("x-api-key");
    // if (apiKey !== process.env.ADMIN_API_KEY) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    console.log("[INIT-DB] Starting database initialization...");

    await initializeDatabase();

    return NextResponse.json(
      {
        success: true,
        message: "Database schema initialized successfully",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[INIT-DB] Initialization failed:", error.message);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Database initialization failed",
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint - Shows status and documentation
 */
export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      message: "Database Initialization API",
      description: "POST to this endpoint to initialize database schema",
      warning:
        "⚠️ This endpoint should be protected with authentication in production",
      usage: {
        method: "POST",
        url: "/api/admin/init-database",
        authentication: "TODO: Add authentication header check",
      },
      status: "Ready",
    },
    { status: 200 }
  );
}
