/**
 * GET /api/admin/applications/[id]/resume
 * Download resume for a job application (admin only)
 */

import { NextRequest, NextResponse } from "next/server";
import { getApplicationResume } from "@/services/job.service";
import { logger } from "@/lib/logger";

async function verifyAdminKey(request: NextRequest): Promise<boolean> {
  const apiKey = request.headers.get("x-admin-key");
  const expectedKey = process.env.ADMIN_API_KEY;
  return Boolean(expectedKey && apiKey && apiKey === expectedKey);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await verifyAdminKey(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const resume = await getApplicationResume(id);

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    logger.info("Admin: Resume downloaded", { applicationId: id, filename: resume.filename });

    return new NextResponse(new Uint8Array(resume.data), {
      status: 200,
      headers: {
        "Content-Type": resume.mimeType,
        "Content-Disposition": `attachment; filename="${resume.filename}"`,
        "Content-Length": String(resume.data.length),
      },
    });
  } catch (error: any) {
    logger.error("Failed to download resume", { error: error.message });
    return NextResponse.json({ error: "Failed to download resume" }, { status: 500 });
  }
}
