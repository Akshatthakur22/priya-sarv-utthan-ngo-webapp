/**
 * GET /api/admin/applications/[id]/resume
 * Download resume for a job application (admin only)
 */

import { NextRequest, NextResponse } from "next/server";
import { getApplicationResume } from "@/services/job.service";
import { logger } from "@/lib/logger";
import { isAdminAuthorized } from "@/lib/admin-auth";
import { adminRateLimit, getRateLimitHeaders } from "@/lib/rate-limit";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const resume = await getApplicationResume(id);

    if (!resume) {
      return NextResponse.json(
        { error: "Resume not found" },
        { status: 404, headers: getRateLimitHeaders(rateLimitResult) }
      );
    }

    logger.info("Admin: Resume downloaded", { applicationId: id });

    return new NextResponse(new Uint8Array(resume.data), {
      status: 200,
      headers: {
        "Content-Type": resume.mimeType,
        "Content-Disposition": `attachment; filename="${resume.filename}"`,
        "Content-Length": String(resume.data.length),
        ...getRateLimitHeaders(rateLimitResult),
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    logger.error("Failed to download resume", { error: message });
    return NextResponse.json(
      { error: "Failed to download resume" },
      { status: 500, headers: getRateLimitHeaders(rateLimitResult) }
    );
  }
}
