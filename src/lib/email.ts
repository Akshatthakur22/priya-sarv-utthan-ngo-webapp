import nodemailer from "nodemailer";
import { ResumeFile } from "./resume-storage";
import { escapeHtml } from "./escape-html";
import { generateReceiptHTML, generateReceiptNumber, ReceiptData } from "./receipt-generator";
import { getNextReceiptNumber, generateReceiptId, storeReceipt } from "./receipt-storage";
import { siteConfig } from "./config";

function normalizeAppPassword(password?: string): string | undefined {
  return password?.replace(/\s+/g, "") || undefined;
}

function getSmtpConfig() {
  const user = process.env.EMAIL_USER;
  const pass = normalizeAppPassword(process.env.EMAIL_APP_PASSWORD);

  return {
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_PORT || "587", 10),
    secure: process.env.EMAIL_SECURE === "true",
    auth: user && pass ? { user, pass } : undefined,
  };
}

let transporter: nodemailer.Transporter | null = null;

/** Official inbox that receives form/application alerts */
export function getNotificationEmail(): string | undefined {
  return process.env.NOTIFY_EMAIL || process.env.EMAIL_USER;
}

export function isEmailConfigured(): boolean {
  const config = getSmtpConfig();
  return Boolean(config.auth?.user && config.auth?.pass);
}

/**
 * Get or create email transporter
 */
function getEmailTransporter(): nodemailer.Transporter | null {
  const config = getSmtpConfig();

  if (!config.auth?.user || !config.auth?.pass) {
    console.warn("[EMAIL] Email service not configured. Set EMAIL_USER and EMAIL_APP_PASSWORD.");
    return null;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport(config);
  }

  return transporter;
}

function getFromEmail(): string | undefined {
  return process.env.EMAIL_FROM || process.env.EMAIL_USER;
}

/**
 * Send professional donation receipt email
 * Generates a sequential receipt number and sends audit-friendly receipt
 */
export async function sendDonationReceipt(data: {
  donorEmail: string;
  donorName: string;
  amount: number;
  orderId: string;
  paymentId: string;
  createdAt: Date;
  donationId?: string;
  donorPhone?: string;
  donorAddress?: string;
  donorPAN?: string;
  donationPurpose?: string;
  ngoName?: string;
  ngoEmail?: string;
  ngoPhone?: string;
}): Promise<{
  success: boolean;
  receiptNumber?: string;
  receiptId?: string;
}> {
  try {
    const transporter = getEmailTransporter();

    if (!transporter) {
      console.log("[EMAIL] Email service not configured, skipping receipt");
      return { success: false };
    }

    const ngoName = data.ngoName || siteConfig.name;
    const fromEmail = data.ngoEmail || process.env.EMAIL_FROM || process.env.EMAIL_USER;

    if (!fromEmail) {
      console.error("[EMAIL] From email not configured");
      return { success: false };
    }

    // Generate sequential receipt number
    const { number: receiptNumber } = getNextReceiptNumber();
    const receiptId = generateReceiptId();

    // Prepare receipt data
    const receiptData: ReceiptData = {
      donorName: data.donorName,
      donorEmail: data.donorEmail,
      donorPhone: data.donorPhone,
      donorAddress: data.donorAddress,
      donorPAN: data.donorPAN,
      amount: data.amount,
      donationDate: data.createdAt,
      paymentMode: "razorpay",
      transactionId: data.paymentId,
      orderId: data.orderId,
      donationPurpose: data.donationPurpose || "General Donation",
      receiptNumber,
      receiptId,
      ngoName,
      ngoRegistrationNumber: siteConfig.registrationNumber || "XXXXXXX",
      ngoPAN: "XXXXXXXXX",
      ngoRegisteredOffice: siteConfig.address,
      ngoWebsite: "https://priyasarvutthan.org",
      ngoEmail: siteConfig.contactEmail,
      ngoPhone: siteConfig.phone,
      section80GRegistered: false,
    };

    // Generate professional receipt HTML
    const receiptHTML = generateReceiptHTML(receiptData);

    // Store receipt in database
    if (data.donationId) {
      storeReceipt({
        receiptNumber,
        receiptId,
        donationId: data.donationId,
      });
    }

    // Email subject - professional tone
    const subject = `Donation Receipt ${receiptNumber} | ${ngoName}`;

    // Plain text version for accessibility
    const plainText = `
${ngoName}
${siteConfig.address}

DONATION RECEIPT

Receipt Number: ${receiptNumber}
Issue Date: ${data.createdAt.toLocaleDateString("en-IN")}

Dear ${data.donorName},

Thank you for your donation to ${ngoName}.

Donation Details:
- Amount: ₹${data.amount.toLocaleString("en-IN")}
- Date: ${data.createdAt.toLocaleDateString("en-IN")}
- Transaction ID: ${data.paymentId}
- Order ID: ${data.orderId}

This receipt acknowledges your donation. Please retain this for your records.

For any questions, contact us:
Email: ${siteConfig.contactEmail}
Phone: ${siteConfig.phone}

---
This is an automated receipt. Please do not reply to this email.
© ${new Date().getFullYear()} ${ngoName}
    `.trim();

    const mailOptions = {
      from: `"${ngoName}" <${fromEmail}>`,
      to: data.donorEmail,
      subject,
      html: receiptHTML,
      text: plainText,
    };

    const result = await transporter.sendMail(mailOptions);

    console.log(
      `[EMAIL] Professional donation receipt sent successfully to ${data.donorEmail} (Receipt: ${receiptNumber}, Message ID: ${result.messageId})`
    );

    return {
      success: true,
      receiptNumber,
      receiptId,
    };
  } catch (error: any) {
    console.error("[EMAIL] Failed to send donation receipt:", error.message);
    // Don't throw - email failure should not block donation confirmation
    return { success: false };
  }
}

/**
 * Send confirmation email to job applicant
 */
export async function sendJobApplicationConfirmation(data: {
  applicantEmail: string;
  applicantName: string;
  jobTitle: string;
  applicationId: string;
}): Promise<boolean> {
  try {
    const transporter = getEmailTransporter();
    if (!transporter) {
      console.log("[EMAIL] Email service not configured, skipping application confirmation");
      return false;
    }

    const fromEmail = process.env.EMAIL_FROM || process.env.EMAIL_USER;
    if (!fromEmail) return false;

    const ngoName = "Priya Sarv Utthan Seva Sansthan";
    const safeName = escapeHtml(data.applicantName);
    const safeTitle = escapeHtml(data.jobTitle);

    const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:#f8fafc;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="background:linear-gradient(135deg,#f97316 0%,#f59e0b 100%);border-radius:16px 16px 0 0;padding:32px;text-align:center;">
      <h1 style="color:white;margin:0;font-size:24px;">Application Received</h1>
      <p style="color:rgba(255,255,255,0.9);margin:8px 0 0;font-size:14px;">Thank you for your interest in joining us</p>
    </div>
    <div style="background:white;padding:32px;border-radius:0 0 16px 16px;box-shadow:0 4px 6px rgba(0,0,0,0.05);">
      <p style="color:#374151;font-size:16px;line-height:1.7;">Dear ${safeName},</p>
      <p style="color:#374151;font-size:16px;line-height:1.7;">
        We have received your application for <strong>${safeTitle}</strong>.
        Our team will review it and get back to you soon.
      </p>
      <div style="background:#fff7ed;border-radius:12px;padding:16px;margin:24px 0;border-left:4px solid #f97316;">
        <p style="margin:0;color:#9a3412;font-size:12px;text-transform:uppercase;font-weight:600;">Reference ID</p>
        <p style="margin:4px 0 0;color:#1f2937;font-family:monospace;font-weight:700;">${escapeHtml(data.applicationId)}</p>
      </div>
      <p style="color:#6b7280;font-size:14px;line-height:1.6;">
        If you have questions, call us at <a href="tel:+917000078439" style="color:#f97316;">+91 70000 78439</a>
        (Mon–Sun, 11 AM – 5 PM).
      </p>
    </div>
    <p style="text-align:center;color:#9ca3af;font-size:12px;margin-top:24px;">${ngoName} | Indore, MP</p>
  </div>
</body>
</html>`;

    await transporter.sendMail({
      from: `"${ngoName}" <${fromEmail}>`,
      to: data.applicantEmail,
      subject: `Application Received – ${data.jobTitle} | ${ngoName}`,
      html,
      text: `Dear ${data.applicantName},\n\nWe have received your application for ${data.jobTitle}. Reference ID: ${data.applicationId}\n\nOur team will review it and contact you soon.`,
    });

    return true;
  } catch (error: any) {
    console.error("[EMAIL] Failed to send job application confirmation:", error.message);
    return false;
  }
}

/**
 * Notify NGO admin when a new job application is submitted
 */
export async function sendAdminJobApplicationNotification(data: {
  applicationId: string;
  applicant: string;
  email: string;
  jobTitle: string;
  jobLocation: string;
  coverLetter?: string;
  hasResume?: boolean;
  resume?: ResumeFile;
}): Promise<boolean> {
  try {
    const transporter = getEmailTransporter();
    const notifyEmail = getNotificationEmail();
    const fromEmail = getFromEmail();

    if (!transporter || !notifyEmail || !fromEmail) {
      console.warn("[EMAIL] Admin notification skipped — email not configured");
      return false;
    }

    const safeApplicant = escapeHtml(data.applicant);
    const safeEmail = escapeHtml(data.email);
    const safeTitle = escapeHtml(data.jobTitle);
    const safeLocation = escapeHtml(data.jobLocation);
    const safeCoverLetter = data.coverLetter ? escapeHtml(data.coverLetter) : "";

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:#f8fafc;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="background:linear-gradient(135deg,#f97316 0%,#f59e0b 100%);border-radius:16px 16px 0 0;padding:32px;text-align:center;">
      <h1 style="color:white;margin:0;font-size:24px;">📋 New Job Application</h1>
      <p style="color:rgba(255,255,255,0.9);margin:8px 0 0;font-size:14px;">Application ID: <strong>${escapeHtml(data.applicationId)}</strong></p>
    </div>
    <div style="background:white;padding:32px;border-radius:0 0 16px 16px;box-shadow:0 4px 6px rgba(0,0,0,0.05);">
      <div style="background:linear-gradient(135deg,#fff7ed 0%,#fef3c7 100%);border-radius:12px;padding:20px;margin-bottom:24px;border-left:4px solid #f97316;">
        <p style="margin:0 0 4px;font-size:12px;color:#9a3412;text-transform:uppercase;font-weight:600;">Position Applied For</p>
        <p style="margin:0;font-size:20px;color:#1f2937;font-weight:700;">${safeTitle}</p>
        <p style="margin:4px 0 0;font-size:14px;color:#6b7280;">📍 ${safeLocation}</p>
      </div>
      <h3 style="color:#1f2937;margin:0 0 16px;font-size:16px;font-weight:600;border-bottom:2px solid #f3f4f6;padding-bottom:8px;">👤 Applicant Information</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr><td style="padding:12px 0;border-bottom:1px solid #f3f4f6;width:120px;color:#6b7280;font-size:14px;">Full Name</td><td style="padding:12px 0;border-bottom:1px solid #f3f4f6;color:#1f2937;font-size:14px;font-weight:600;">${safeApplicant}</td></tr>
        <tr><td style="padding:12px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px;">Email</td><td style="padding:12px 0;border-bottom:1px solid #f3f4f6;"><a href="mailto:${safeEmail}" style="color:#f97316;font-size:14px;text-decoration:none;font-weight:500;">${safeEmail}</a></td></tr>
        <tr><td style="padding:12px 0;color:#6b7280;font-size:14px;">Applied On</td><td style="padding:12px 0;color:#1f2937;font-size:14px;">${new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</td></tr>
      </table>
      ${safeCoverLetter ? `<h3 style="color:#1f2937;margin:0 0 12px;font-size:16px;font-weight:600;">✉️ Cover Letter</h3><div style="background:#f9fafb;border-radius:12px;padding:20px;margin-bottom:24px;border:1px solid #e5e7eb;"><p style="margin:0;color:#374151;font-size:14px;line-height:1.7;white-space:pre-wrap;">${safeCoverLetter}</p></div>` : `<div style="background:#fef3c7;border-radius:12px;padding:16px;margin-bottom:24px;text-align:center;"><p style="margin:0;color:#92400e;font-size:14px;">⚠️ No cover letter provided</p></div>`}
      ${data.hasResume ? `<div style="background:#eff6ff;border-radius:12px;padding:16px;margin-bottom:24px;border:1px solid #bfdbfe;"><p style="margin:0;color:#1e40af;font-size:14px;">📎 Resume attached to this email</p></div>` : `<div style="background:#fef3c7;border-radius:12px;padding:16px;margin-bottom:24px;text-align:center;"><p style="margin:0;color:#92400e;font-size:14px;">⚠️ No resume provided</p></div>`}
      <div style="background:#f0fdf4;border-radius:12px;padding:20px;text-align:center;border:1px solid #bbf7d0;">
        <a href="mailto:${safeEmail}?subject=Re: Your Application for ${safeTitle}" style="display:inline-block;background:linear-gradient(135deg,#f97316 0%,#f59e0b 100%);color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">📧 Reply to Applicant</a>
      </div>
    </div>
    <p style="text-align:center;color:#9ca3af;font-size:12px;margin-top:24px;">Priya Sarv Utthan Seva Sansthan | Indore, MP</p>
  </div>
</body>
</html>`;

    await transporter.sendMail({
      from: `"PSUSS Careers" <${fromEmail}>`,
      to: notifyEmail,
      subject: `[${data.applicationId}] New Job Application: ${data.jobTitle}`,
      html,
      replyTo: data.email,
      attachments: data.resume
        ? [{ filename: data.resume.filename, content: data.resume.data, contentType: data.resume.mimeType }]
        : undefined,
    });

    console.log(`[EMAIL] Admin job application notification sent to ${notifyEmail}`);
    return true;
  } catch (error: any) {
    console.error("[EMAIL] Failed to send admin job application notification:", error.message);
    return false;
  }
}



// Export sanitization function
export function sanitizeForEmail(text: string): string {
  return escapeHtml(text);
}
