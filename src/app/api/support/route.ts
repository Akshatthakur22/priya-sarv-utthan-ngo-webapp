import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";
import { queryDatabase } from "@/lib/database";
import { validateRequest, supportCaseSchema, sanitizeString, sanitizeEmail, sanitizePhone } from "@/lib/validation";
import { supportRateLimit, getRateLimitHeaders } from "@/lib/rate-limit";

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
  let caseId: string | null = null;
  let name: string | null = null;
  let serviceType: string | null = null;

  try {
    // Check rate limit
    const rateLimitResult = await supportRateLimit(req);
    if (!rateLimitResult.success) {
      logger.warn('Support API rate limit exceeded', {
        ip: req.headers.get('x-forwarded-for') || 'unknown',
        retryAfter: rateLimitResult.retryAfter,
      });

      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many support requests. Please try again later.',
          retryAfter: rateLimitResult.retryAfter 
        },
        { 
          status: 429,
          headers: getRateLimitHeaders(rateLimitResult)
        }
      );
    }

    const body = await req.json();
    
    // Validate and sanitize input
    const validatedData = validateRequest(supportCaseSchema, {
      name: sanitizeString(body.name),
      phone: sanitizePhone(body.phone),
      email: body.email ? sanitizeEmail(body.email) : undefined,
      message: sanitizeString(body.message),
      serviceType: body.serviceType,
      opposingParty: body.opposingParty ? sanitizeString(body.opposingParty) : undefined,
      courtDeadline: body.courtDeadline,
      department: body.department ? sanitizeString(body.department) : undefined,
    });

    name = validatedData.name;
    serviceType = validatedData.serviceType;

    caseId = generateCaseId();
    const submittedAt = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });

    logger.formSubmission('support_case', validatedData);
    logger.info('Support case submitted successfully', { 
      caseId,
      name,
      serviceType,
    });

    // ✅ STORE IN DATABASE FIRST (non-blocking, doesn't fail submission)
    try {
      await queryDatabase(
        `
        INSERT INTO support_cases (
          case_id,
          name,
          email,
          phone,
          service_type,
          message,
          opposing_party,
          court_deadline,
          department,
          status,
          created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
        `,
        [
          caseId,
          validatedData.name,
          validatedData.email,
          validatedData.phone || null,
          validatedData.serviceType,
          validatedData.message,
          validatedData.opposingParty || null,
          validatedData.courtDeadline || null,
          validatedData.department || null,
          'open'
        ]
      );
      logger.info('Support case stored in database', { caseId });
    } catch (dbError) {
      logger.warn('Failed to store support case in database', { caseId, error: dbError });
      // Don't fail the submission if DB insert fails
    }

    // Check for email configuration
    if (!env.EMAIL_APP_PASSWORD || !env.EMAIL_USER) {
      logger.warn("Email service not configured", { 
        caseId, 
        name, 
        serviceType,
        message: "EMAIL_APP_PASSWORD not configured"
      });
      
      // Return success for UI but note email wasn't sent
      return NextResponse.json({
        success: true,
        caseId,
        message: "Case submitted successfully (email service in development mode)",
        warning: "Email notifications are currently disabled"
      }, {
        headers: getRateLimitHeaders(rateLimitResult)
      });
    }

    // Create email transporter only if configured
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_APP_PASSWORD,
      },
    });

    // Build conditional fields HTML
    let conditionalFields = "";
    if (validatedData.serviceType === "Legal") {
      conditionalFields = `
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-weight: 600;">Opposing Party</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #f3f4f6; color: #111827;">${validatedData.opposingParty || "Not specified"}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-weight: 600;">Court Deadline</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #f3f4f6; color: #111827; ${validatedData.courtDeadline ? "font-weight: bold; color: #dc2626;" : ""}">${formatDate(validatedData.courtDeadline || "")}</td>
        </tr>
      `;
    } else if (validatedData.serviceType === "Grievance") {
      conditionalFields = `
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-weight: 600;">Department</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: bold;">${validatedData.department || "Not specified"}</td>
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
            <a href="https://wa.me/${validatedData.phone.replace(/\D/g, "")}" style="color: #16a34a; font-weight: bold; text-decoration: none;">${validatedData.phone}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-weight: 600;">Email</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #f3f4f6; color: #111827;">${validatedData.email || "Not provided"}</td>
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
          <td style="padding: 20px; color: #374151; line-height: 1.6; font-size: 15px; white-space: pre-wrap;">${validatedData.message}</td>
        </tr>
      </table>
    </div>
    
    <!-- Action Button -->
    <div style="background: white; padding: 24px; text-align: center; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">
      <a href="https://wa.me/${validatedData.phone.replace(/\D/g, "")}?text=नमस्ते%20${encodeURIComponent(name)}%2C%20हमनें%20आपकी%20केस%20${encodeURIComponent(caseId)}%20प्राप्ति%20है।%20हमारा%20टीम%20जल्दी%20से%20आपकी%20सहायता%20करेंगे।" 
         style="display: inline-block; background: #16a34a; color: white; padding: 14px 32px; border-radius: 999px; text-decoration: none; font-weight: 700; font-size: 14px;">
        💬 Reply on WhatsApp
      </a>
    </div>
    
    <!-- Footer -->
    <div style="background: #1f2937; padding: 24px; border-radius: 0 0 16px 16px; text-align: center;">
      <p style="margin: 0; color: #9ca3af; font-size: 12px;">
        Priya Sarv Utthan Seva Sansthan<br>
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

    // Send email
    await transporter.sendMail({
      from: `"PSU Case System" <${env.EMAIL_FROM || env.EMAIL_USER}>`,
      to: env.EMAIL_USER,
      subject: `[${caseId}] New ${serviceType} Request from ${name}`,
      html: emailHtml,
      replyTo: validatedData.email || undefined,
    });

    logger.emailSent(env.EMAIL_USER, `[${caseId}] New ${serviceType} Request`, {
      caseId,
      name,
      serviceType,
    });

    return NextResponse.json({
      success: true,
      caseId,
      message: "Case submitted successfully",
    }, {
      headers: getRateLimitHeaders(rateLimitResult)
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      logger.warn('Support case validation failed', { errors: error.errors });
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    logger.apiError('POST', '/api/support', error, {
      caseId: caseId || 'unknown',
      name: name || 'unknown',
      serviceType: serviceType || 'unknown',
    });
    return NextResponse.json(
      { error: "Failed to submit case. Please try again." },
      { status: 500 }
    );
  }
}
