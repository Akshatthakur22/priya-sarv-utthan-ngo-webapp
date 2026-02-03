import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Generate a unique Case ID
function generateCaseId(): string {
  const prefix = "PSU";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `#${prefix}-${timestamp.slice(-4)}${random}`;
}

// Format date for display
function formatDate(dateStr: string): string {
  if (!dateStr) return "Not specified";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function POST(req: NextRequest) {
  try {
    // Check for required environment variable
    if (!process.env.EMAIL_APP_PASSWORD) {
      console.error("EMAIL_APP_PASSWORD environment variable is not set");
      return NextResponse.json(
        { error: "Email service not configured. Please contact support." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const {
      name,
      phone,
      email,
      message,
      serviceType,
      opposingParty,
      courtDeadline,
      department,
    } = body;

    // Validation
    if (!name || !phone || !message || !serviceType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const caseId = generateCaseId();
    const submittedAt = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });

    // Build conditional fields HTML
    let conditionalFields = "";
    if (serviceType === "Legal") {
      conditionalFields = `
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-weight: 600;">Opposing Party</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #f3f4f6; color: #111827;">${opposingParty || "Not specified"}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-weight: 600;">Court Deadline</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #f3f4f6; color: #111827; ${courtDeadline ? "font-weight: bold; color: #dc2626;" : ""}">${formatDate(courtDeadline)}</td>
        </tr>
      `;
    } else if (serviceType === "Grievance") {
      conditionalFields = `
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-weight: 600;">Department</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: bold;">${department || "Not specified"}</td>
        </tr>
      `;
    }

    // Professional HTML Email Template
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #f97316 0%, #f59e0b 100%); padding: 32px; border-radius: 16px 16px 0 0; text-align: center;">
      <h1 style="margin: 0; color: white; font-size: 24px; font-weight: 800;">📋 New Case Report</h1>
      <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Priya Sarva Utthaan Seva Sansthan</p>
    </div>
    
    <!-- Case ID Banner -->
    <div style="background: #fff7ed; padding: 20px; text-align: center; border-left: 1px solid #fed7aa; border-right: 1px solid #fed7aa;">
      <p style="margin: 0 0 4px; color: #9a3412; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Case ID</p>
      <p style="margin: 0; color: #c2410c; font-size: 28px; font-weight: 800;">${caseId}</p>
      <p style="margin: 8px 0 0; color: #78716c; font-size: 12px;">${submittedAt}</p>
    </div>
    
    <!-- Service Type Badge -->
    <div style="background: white; padding: 20px; text-align: center; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">
      <span style="display: inline-block; background: ${serviceType === "Legal" ? "#dbeafe" : serviceType === "Grievance" ? "#fee2e2" : "#ffedd5"}; color: ${serviceType === "Legal" ? "#1e40af" : serviceType === "Grievance" ? "#991b1b" : "#9a3412"}; padding: 8px 20px; border-radius: 999px; font-size: 14px; font-weight: 700;">
        ${serviceType === "Legal" ? "⚖️ Legal Aid Request" : serviceType === "Grievance" ? "🚨 Grievance Report" : "💛 Welfare Support"}
      </span>
    </div>
    
    <!-- Contact Details Table -->
    <div style="background: white; padding: 0; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td colspan="2" style="padding: 16px; background: #f9fafb; color: #374151; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
            Contact Information
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-weight: 600; width: 140px;">Name</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: bold;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-weight: 600;">WhatsApp</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #f3f4f6;">
            <a href="https://wa.me/${phone.replace(/\D/g, "")}" style="color: #16a34a; font-weight: bold; text-decoration: none;">${phone}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-weight: 600;">Email</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #f3f4f6; color: #111827;">${email || "Not provided"}</td>
        </tr>
        ${conditionalFields}
      </table>
    </div>
    
    <!-- Issue Description -->
    <div style="background: white; padding: 0; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 16px; background: #f9fafb; color: #374151; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
            Issue Description
          </td>
        </tr>
        <tr>
          <td style="padding: 20px; color: #374151; line-height: 1.6; font-size: 15px; white-space: pre-wrap;">${message}</td>
        </tr>
      </table>
    </div>
    
    <!-- Action Button -->
    <div style="background: white; padding: 24px; text-align: center; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">
      <a href="https://wa.me/${phone.replace(/\D/g, "")}?text=Namaste%20${encodeURIComponent(name)}%2C%20we%20received%20your%20case%20${encodeURIComponent(caseId)}.%20Our%20team%20will%20assist%20you%20shortly." 
         style="display: inline-block; background: #16a34a; color: white; padding: 14px 32px; border-radius: 999px; text-decoration: none; font-weight: 700; font-size: 14px;">
        💬 Reply on WhatsApp
      </a>
    </div>
    
    <!-- Footer -->
    <div style="background: #1f2937; padding: 24px; border-radius: 0 0 16px 16px; text-align: center;">
      <p style="margin: 0; color: #9ca3af; font-size: 12px;">
        Priya Sarva Utthaan Seva Sansthan<br>
        69B, Mangal Marg, Gandhi Nagar, Indore
      </p>
      <p style="margin: 12px 0 0; color: #6b7280; font-size: 11px;">
        This is an automated case report. Please respond within 24 hours.
      </p>
    </div>
    
  </div>
</body>
</html>
    `;

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "priyasarvuthan@gmail.com",
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"PSU Case System" <${process.env.EMAIL_USER || "priyasarvuthan@gmail.com"}>`,
      to: process.env.EMAIL_USER || "priyasarvuthan@gmail.com",
      subject: `[${caseId}] New ${serviceType} Request from ${name}`,
      html: emailHtml,
      replyTo: email || undefined,
    });

    return NextResponse.json({
      success: true,
      caseId,
      message: "Case submitted successfully",
    });
  } catch (error) {
    console.error("Support API Error:", error);
    return NextResponse.json(
      { error: "Failed to submit case. Please try again." },
      { status: 500 }
    );
  }
}
