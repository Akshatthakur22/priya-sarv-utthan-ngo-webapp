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
    // ✅ SECURITY: Verify API key before allowing database initialization
    const apiKey = request.headers.get("x-api-key");
    const expectedKey = process.env.ADMIN_API_KEY;

    if (!expectedKey) {
      console.error("[INIT-DB] ADMIN_API_KEY not configured in environment");
      return NextResponse.json(
        { 
          error: "Server misconfiguration", 
          message: "ADMIN_API_KEY not set" 
        },
        { status: 500 }
      );
    }

    if (!apiKey || apiKey !== expectedKey) {
      console.warn("[INIT-DB] Unauthorized database initialization attempt", {
        ip: request.headers.get("x-forwarded-for") || "unknown",
        hasKey: !!apiKey,
      });

      return NextResponse.json(
        { 
          error: "Unauthorized", 
          message: "Invalid or missing API key" 
        },
        { status: 401 }
      );
    }

    console.log("[INIT-DB] Starting database initialization (authorized)...");

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
      security: "✅ PROTECTED - Requires valid API key",
      usage: {
        method: "POST",
        url: "/api/admin/init-database",
        headers: {
          "x-api-key": "your-admin-api-key-here (set ADMIN_API_KEY env var)",
          "Content-Type": "application/json",
        },
        example: `curl -X POST http://localhost:3000/api/admin/init-database \\
  -H "x-api-key: your-key" \\
  -H "Content-Type: application/json"`,
      },
      status: "Ready (secured)",
    },
    { status: 200 }
  );
}
