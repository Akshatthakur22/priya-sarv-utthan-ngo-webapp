/**
 * GET /api/admin/applications
 * Fetch all job applications for admin dashboard
 */

import { NextRequest, NextResponse } from "next/server";
import { getApplications } from "@/services/job.service";
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

    const applications = await getApplications();

    logger.info("Admin: Applications fetched", { count: applications.length });

    return NextResponse.json(
      {
        success: true,
        data: applications.map((app) => ({
          id: app.id,
          name: app.applicant,
          email: app.email,
          role: app.jobId,
          coverLetter: app.coverLetter,
          resumeFilename: app.resumeFilename,
          hasResume: app.hasResume,
          createdAt: app.createdAt,
        })),
        count: applications.length,
      },
      { headers: getRateLimitHeaders(rateLimitResult) }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    logger.error("Failed to fetch applications", { error: message });
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500, headers: getRateLimitHeaders(rateLimitResult) }
    );
  }
}
