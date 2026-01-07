import { NextResponse } from "next/server";
import { applyToJob, getJobs } from "@/services/job.service";

export async function GET() {
  const jobs = await getJobs({ publicOnly: true });
  return NextResponse.json({ ok: true, jobs });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const application = await applyToJob({
      applicant: body.applicant,
      email: body.email,
      jobId: body.jobId,
      coverLetter: body.coverLetter
    });
    return NextResponse.json({ ok: true, application });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to apply";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
