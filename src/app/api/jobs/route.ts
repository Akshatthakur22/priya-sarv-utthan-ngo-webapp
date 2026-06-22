import { NextResponse } from "next/server";
import { applyToJob, getApplicationResume, getJobById, getJobs } from "@/services/job.service";
import { sendAdminJobApplicationNotification } from "@/lib/email";
import { logger } from "@/lib/logger";
import { parseResumeFromFormData, ResumeFile } from "@/lib/resume-storage";
import { validateRequest, jobApplicationSchema, sanitizeString, sanitizeEmail } from "@/lib/validation";
import { jobsRateLimit, getRateLimitHeaders } from "@/lib/rate-limit";

function generateApplicationId(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `APP-${dateStr}-${random}`;
}

export async function GET() {
  const jobs = await getJobs({ publicOnly: true });
  return NextResponse.json({ ok: true, jobs });
}

export async function POST(request: Request) {
  try {
    const rateLimitResult = await jobsRateLimit(request as any);
    if (!rateLimitResult.success) {
      logger.warn("Jobs API rate limit exceeded", {
        ip: request.headers.get("x-forwarded-for") || "unknown",
        retryAfter: rateLimitResult.retryAfter,
      });

      return NextResponse.json(
        {
          ok: false,
          error: "Too many job applications. Please try again later.",
          retryAfter: rateLimitResult.retryAfter,
        },
        {
          status: 429,
          headers: getRateLimitHeaders(rateLimitResult),
        }
      );
    }

    const contentType = request.headers.get("content-type") || "";
    const applicationId = generateApplicationId();

    let validatedData;
    let resume: ResumeFile | undefined;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      resume = await parseResumeFromFormData(formData);
      validatedData = validateRequest(jobApplicationSchema, {
        applicant: sanitizeString(String(formData.get("applicant") || "")),
        email: sanitizeEmail(String(formData.get("email") || "")),
        jobId: String(formData.get("jobId") || ""),
        coverLetter: formData.get("coverLetter")
          ? sanitizeString(String(formData.get("coverLetter")))
          : undefined,
      });
    } else {
      const body = await request.json();
      validatedData = validateRequest(jobApplicationSchema, {
        applicant: sanitizeString(body.applicant),
        email: sanitizeEmail(body.email),
        jobId: body.jobId,
        coverLetter: body.coverLetter ? sanitizeString(body.coverLetter) : undefined,
      });
    }

    const application = await applyToJob({ ...validatedData, resume });
    const job = await getJobById(validatedData.jobId);
    const emailResume = resume || (application.hasResume ? await getApplicationResume(application.id) : null);

    // Notify admin — awaited so email is not dropped on serverless
    const adminEmailSent = await sendAdminJobApplicationNotification({
      applicationId,
      applicant: validatedData.applicant,
      email: validatedData.email,
      jobTitle: job?.title || "Unknown Position",
      jobLocation: job?.location || "Indore",
      coverLetter: validatedData.coverLetter,
      hasResume: application.hasResume,
      resume: emailResume ?? undefined,
    });

    if (!adminEmailSent) {
      logger.warn("Admin notification email was not sent", { applicationId });
    } else {
      logger.info("Admin notification email sent", { applicationId });
    }

    logger.formSubmission("job_application", validatedData);
    logger.info("Job application submitted successfully", {
      applicant: validatedData.applicant,
      jobId: validatedData.jobId,
      applicationId,
    });

    return NextResponse.json(
      { ok: true, application, applicationId },
      { headers: getRateLimitHeaders(rateLimitResult) }
    );
  } catch (error: any) {
    if (error.name === "ValidationError") {
      logger.warn("Job application validation failed", { errors: error.errors });
      return NextResponse.json(
        { ok: false, error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    const message = error instanceof Error ? error.message : "Unable to apply";
    if (message === "Job not found") {
      return NextResponse.json({ ok: false, error: message }, { status: 404 });
    }
    if (message === "This position is no longer accepting applications") {
      return NextResponse.json({ ok: false, error: message }, { status: 410 });
    }

    logger.apiError("POST", "/api/jobs", error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
