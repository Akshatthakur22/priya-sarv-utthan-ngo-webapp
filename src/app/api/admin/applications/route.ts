/**
 * GET /api/admin/applications
 * Fetch all job applications for admin dashboard
 */

import { NextRequest, NextResponse } from "next/server";
import { getApplications } from "@/services/job.service";
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

    const applications = await getApplications();

    logger.info("Admin: Applications fetched", { count: applications.length });

    return NextResponse.json({
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
    });
  } catch (error: any) {
    logger.error("Failed to fetch applications", { error: error.message });
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
