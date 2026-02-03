import { NextResponse } from "next/server";
import { applyToJob, getJobs } from "@/services/job.service";
import nodemailer from "nodemailer";
import { db } from "@/lib/db";

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "priyasarvuthan@gmail.com",
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// Generate application ID
function generateApplicationId(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `APP-${dateStr}-${random}`;
}

// Send email notification for job application
async function sendApplicationEmail(application: {
  id: string;
  applicant: string;
  email: string;
  jobId: string;
  coverLetter?: string;
  applicationId: string;
}) {
  // Find job title
  const job = db.jobs.find((j) => j.id === application.jobId);
  const jobTitle = job?.title || "Unknown Position";
  const jobLocation = job?.location || "Indore";

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #f97316 0%, #f59e0b 100%); border-radius: 16px 16px 0 0; padding: 32px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">
        📋 New Job Application
      </h1>
      <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">
        Application ID: <strong>${application.applicationId}</strong>
      </p>
    </div>
    
    <!-- Content -->
    <div style="background: white; padding: 32px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
      
      <!-- Position Applied -->
      <div style="background: linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%); border-radius: 12px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #f97316;">
        <p style="margin: 0 0 4px 0; font-size: 12px; color: #9a3412; text-transform: uppercase; font-weight: 600;">Position Applied For</p>
        <p style="margin: 0; font-size: 20px; color: #1f2937; font-weight: 700;">${jobTitle}</p>
        <p style="margin: 4px 0 0 0; font-size: 14px; color: #6b7280;">📍 ${jobLocation}</p>
      </div>
      
      <!-- Applicant Details -->
      <h3 style="color: #1f2937; margin: 0 0 16px 0; font-size: 16px; font-weight: 600; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">
        👤 Applicant Information
      </h3>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; width: 120px;">
            <span style="color: #6b7280; font-size: 14px;">Full Name</span>
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
            <span style="color: #1f2937; font-size: 14px; font-weight: 600;">${application.applicant}</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
            <span style="color: #6b7280; font-size: 14px;">Email</span>
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
            <a href="mailto:${application.email}" style="color: #f97316; font-size: 14px; text-decoration: none; font-weight: 500;">${application.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0;">
            <span style="color: #6b7280; font-size: 14px;">Applied On</span>
          </td>
          <td style="padding: 12px 0;">
            <span style="color: #1f2937; font-size: 14px;">${new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
          </td>
        </tr>
      </table>
      
      ${application.coverLetter ? `
      <!-- Cover Letter -->
      <h3 style="color: #1f2937; margin: 0 0 12px 0; font-size: 16px; font-weight: 600; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">
        ✉️ Cover Letter
      </h3>
      <div style="background: #f9fafb; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid #e5e7eb;">
        <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${application.coverLetter}</p>
      </div>
      ` : `
      <div style="background: #fef3c7; border-radius: 12px; padding: 16px; margin-bottom: 24px; text-align: center;">
        <p style="margin: 0; color: #92400e; font-size: 14px;">⚠️ No cover letter provided</p>
      </div>
      `}
      
      <!-- Quick Actions -->
      <div style="background: #f0fdf4; border-radius: 12px; padding: 20px; text-align: center; border: 1px solid #bbf7d0;">
        <p style="margin: 0 0 12px 0; color: #166534; font-size: 14px; font-weight: 600;">Quick Actions</p>
        <a href="mailto:${application.email}?subject=Re: Your Application for ${jobTitle} - Priya Sarv Utthan Seva Sansthan&body=Dear ${application.applicant},%0D%0A%0D%0AThank you for your interest in volunteering with us.%0D%0A%0D%0A" 
           style="display: inline-block; background: linear-gradient(135deg, #f97316 0%, #f59e0b 100%); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
          📧 Reply to Applicant
        </a>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; padding: 24px 0;">
      <p style="color: #9ca3af; font-size: 12px; margin: 0;">
        Priya Sarv Utthan Seva Sansthan | Indore, MP
      </p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await transporter.sendMail({
      from: `"PSUSS Careers" <${process.env.EMAIL_USER || "priyasarvuthan@gmail.com"}>`,
      to: process.env.EMAIL_USER || "priyasarvuthan@gmail.com",
      subject: `📋 New Application: ${jobTitle} - ${application.applicant}`,
      html: htmlContent,
    });
    console.log(`✅ Application email sent for: ${application.applicant}`);
  } catch (error) {
    console.error("❌ Failed to send application email:", error);
  }
}

export async function GET() {
  const jobs = await getJobs({ publicOnly: true });
  return NextResponse.json({ ok: true, jobs });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const applicationId = generateApplicationId();
    
    const application = await applyToJob({
      applicant: body.applicant,
      email: body.email,
      jobId: body.jobId,
      coverLetter: body.coverLetter
    });

    // Send email notification (non-blocking)
    sendApplicationEmail({
      ...application,
      applicationId,
    });

    return NextResponse.json({ ok: true, application, applicationId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to apply";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
