import nodemailer from "nodemailer";
import { ResumeFile } from "./resume-storage";

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
 * Send donation receipt email
 */
export async function sendDonationReceipt(data: {
  donorEmail: string;
  donorName: string;
  amount: number;
  orderId: string;
  paymentId: string;
  createdAt: Date;
  ngoName?: string;
  ngoEmail?: string;
  ngoPhone?: string;
}): Promise<boolean> {
  try {
    const transporter = getEmailTransporter();

    if (!transporter) {
      console.log("[EMAIL] Email service not configured, skipping receipt");
      return false;
    }

    const ngoName = data.ngoName || "Priya Sarv Utthan NGO";
    const fromEmail = data.ngoEmail || process.env.EMAIL_FROM || process.env.EMAIL_USER;

    if (!fromEmail) {
      console.error("[EMAIL] From email not configured");
      return false;
    }

    const emailTemplate = generateReceiptTemplate({
      donorName: data.donorName,
      amount: data.amount,
      orderId: data.orderId,
      paymentId: data.paymentId,
      createdAt: data.createdAt,
      ngoName,
      ngoPhone: data.ngoPhone,
    });

    const mailOptions = {
      from: `"${ngoName}" <${fromEmail}>`,
      to: data.donorEmail,
      subject: `Your Donation Receipt | ${ngoName}`,
      html: emailTemplate,
      text: `Thank you for your donation of ₹${data.amount}. Your payment ID is: ${data.paymentId}`,
    };

    const result = await transporter.sendMail(mailOptions);

    console.log(
      `[EMAIL] Donation receipt sent successfully to ${data.donorEmail} (Message ID: ${result.messageId})`
    );

    return true;
  } catch (error: any) {
    console.error("[EMAIL] Failed to send donation receipt:", error.message);
    // Don't throw - email failure should not block donation confirmation
    return false;
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

/**
 * Escape HTML special characters (server-side)
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Generate HTML email template for donation receipt
 */
function generateReceiptTemplate(data: {
  donorName: string;
  amount: number;
  orderId: string;
  paymentId: string;
  createdAt: Date;
  ngoName: string;
  ngoPhone?: string;
}): string {
  const formattedDate = data.createdAt.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Generate receipt number using paymentId for traceability
  const receiptNo = `DON-${new Date().getFullYear()}-${data.paymentId.slice(-6)}`;
  
  // Scalable amount-to-words converter
  const numberToWords = (num: number): string => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    
    const convertLessThanThousand = (n: number): string => {
      if (n === 0) return '';
      if (n < 10) return ones[n];
      if (n < 20) return teens[n - 10];
      if (n < 100) {
        const tenPart = tens[Math.floor(n / 10)];
        const onePart = n % 10;
        return onePart ? `${tenPart} ${ones[onePart]}` : tenPart;
      }
      const hundredPart = ones[Math.floor(n / 100)] + ' Hundred';
      const remainder = n % 100;
      return remainder ? `${hundredPart} ${convertLessThanThousand(remainder)}` : hundredPart;
    };
    
    if (num === 0) return 'Zero';
    if (num >= 100000) return `${num.toLocaleString('en-IN')}`; // For large amounts, use formatted number
    
    const thousands = Math.floor(num / 1000);
    const remainder = num % 1000;
    
    if (thousands > 0) {
      const thousandPart = convertLessThanThousand(thousands) + ' Thousand';
      const remainderPart = convertLessThanThousand(remainder);
      return remainderPart ? `${thousandPart} ${remainderPart}` : thousandPart;
    }
    
    return convertLessThanThousand(remainder);
  };
  
  const amountInWords = (amount: number): string => {
    const words = numberToWords(amount);
    return `Rupees ${words} Only`;
  };
  
  // NGO tagline
  const ngoTagline = "Serving Humanity, Empowering Lives";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Donation Receipt</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333; background-color: #f8fafc; margin: 0; padding: 0; }
        .container { max-width: 650px; margin: 20px auto; background: white; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); overflow: hidden; border: 1px solid rgba(0,0,0,0.05); }
        .header { background: linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%); color: white; padding: 50px 30px 40px; text-align: center; position: relative; }
        .header::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #fbbf24, #f59e0b, #d97706); }
        .header-content { position: relative; z-index: 1; }
                .header h1 { margin: 0; font-size: 36px; font-weight: 700; letter-spacing: -0.5px; }
        .header h2 { margin: 8px 0 12px 0; font-size: 18px; font-weight: 400; opacity: 0.95; }
        .header-tagline { font-size: 14px; opacity: 0.85; font-style: italic; margin-top: 8px; }
        .content { padding: 45px 35px; }
        .greeting { font-size: 20px; color: #111827; margin-bottom: 24px; font-weight: 600; }
        .thank-you-message { font-size: 16px; color: #4b5563; margin-bottom: 20px; line-height: 1.7; }
        .impact-line { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #f59e0b; padding: 16px 20px; border-radius: 8px; margin: 20px 0; font-weight: 500; color: #92400e; }
        .section { margin-bottom: 40px; }
        .section-title { font-size: 22px; font-weight: 700; color: #111827; margin-bottom: 24px; display: flex; align-items: center; gap: 10px; }
        .detail-grid { display: grid; grid-template-columns: 140px 1fr; gap: 16px; margin-bottom: 12px; align-items: center; }
        .detail-label { font-weight: 600; color: #374151; font-size: 14px; }
        .detail-value { color: #111827; font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace; font-size: 14px; font-weight: 500; }
        .highlight-box { background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-left: 5px solid #059669; padding: 30px; border-radius: 12px; margin: 30px 0; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .amount-display { font-size: 36px; font-weight: 800; color: #059669; margin-bottom: 10px; letter-spacing: -1px; }
        .amount-words { font-size: 15px; color: #6b7280; font-style: italic; }
        .info-box { background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin: 24px 0; }
        .info-list { margin: 0; padding-left: 24px; }
        .info-list li { margin-bottom: 12px; color: #4b5563; line-height: 1.6; }
        .tax-box { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 1px solid #f59e0b; border-radius: 12px; padding: 24px; margin: 24px 0; }
        .tax-title { font-weight: 700; color: #92400e; margin-bottom: 12px; font-size: 16px; }
        .tax-text { color: #78350f; font-size: 14px; line-height: 1.6; }
        .contact-box { background: #eff6ff; border: 1px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 24px 0; }
        .contact-title { font-weight: 700; color: #1e40af; margin-bottom: 12px; font-size: 16px; }
        .closing { margin-top: 35px; color: #4b5563; font-style: italic; font-size: 16px; }
        .footer { background: #f9fafb; padding: 30px; text-align: center; font-size: 13px; color: #6b7280; border-top: 2px solid #e5e7eb; }
        .footer p { margin: 8px 0; line-height: 1.5; }
        .divider { border: none; border-top: 2px solid #e5e7eb; margin: 40px 0; }
        @media print { body { background: white; } .container { box-shadow: none; margin: 0; border-radius: 0; } }
        @media screen and (max-width: 640px) {
          .container { margin: 10px; border-radius: 12px; }
          .header { padding: 35px 20px 30px; }
          .header h1 { font-size: 28px; }
          .content { padding: 30px 20px; }
          .detail-grid { grid-template-columns: 1fr; gap: 8px; }
          .detail-label { margin-bottom: 4px; }
          .section-title { font-size: 20px; }
          .amount-display { font-size: 28px; }
          .highlight-box { padding: 20px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="header-content">
                <div style="text-align:center; font-size:32px; margin-bottom:16px;">
                    🙏
                </div>
                <h1>Thank You for Your Contribution</h1>
                <h2>Donation Receipt</h2>
                <div class="header-tagline">${ngoTagline}</div>
            </div>
        </div>
        
        <div class="content">
            <div class="greeting">Dear ${escapeHtml(data.donorName)},</div>
            
            <p class="thank-you-message">We sincerely thank you for your generous contribution to <strong>${escapeHtml(data.ngoName)}</strong>. Your support helps us continue our mission of providing nutrition, education, and empowerment to those in need.</p>
            
            <div class="impact-line">
                Your contribution of ₹${data.amount.toLocaleString("en-IN")} helps provide meals and support to those in need.
            </div>
            
            <hr class="divider">
            
            <div class="section">
                <div class="section-title">💰 Donation Details</div>
                <div class="highlight-box">
                    <div class="amount-display">₹${data.amount.toLocaleString("en-IN")}</div>
                    <div class="amount-words">*(${amountInWords(data.amount)})*</div>
                </div>
                <div class="detail-grid">
                    <div class="detail-label">Receipt No:</div>
                    <div class="detail-value">${receiptNo}</div>
                </div>
                <div class="detail-grid">
                    <div class="detail-label">Payment ID:</div>
                    <div class="detail-value">${data.paymentId}</div>
                </div>
                <div class="detail-grid">
                    <div class="detail-label">Order ID:</div>
                    <div class="detail-value">${data.orderId}</div>
                </div>
                <div class="detail-grid">
                    <div class="detail-label">Date & Time:</div>
                    <div class="detail-value">${formattedDate}</div>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">👤 Donor Details</div>
                <div class="detail-grid">
                    <div class="detail-label">Name:</div>
                    <div class="detail-value">${escapeHtml(data.donorName)}</div>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">📋 Important Information</div>
                <div class="info-box">
                    <ul class="info-list">
                        <li>This receipt acknowledges your donation to ${escapeHtml(data.ngoName)}</li>
                        <li>Payment ID <strong>${data.paymentId}</strong> is your official transaction reference</li>
                        <li>Please retain this receipt for your records and tax purposes</li>
                    </ul>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">🧾 Tax Benefit (80G)</div>
                <div class="tax-box">
                    <div class="tax-title">${escapeHtml(data.ngoName)} is registered under Section 80G of the Income Tax Act.</div>
                    <div class="tax-text">Your donation may be eligible for tax deduction as per applicable laws.</div>
                    <div class="tax-text" style="margin-top: 8px; font-style: italic;">*(Please consult your tax advisor for details.)*</div>
                </div>
            </div>
            
                        
            <div class="section">
                <div class="section-title">📞 Need Help?</div>
                <div class="contact-box">
                    <div class="contact-title">If you have any questions, feel free to contact us:</div>
                    <div style="font-size: 16px; color: #1e40af;">📞 ${data.ngoPhone || "+91 70000 78439"}</div>
                </div>
            </div>
            
            <div class="closing">
                With gratitude,<br>
                <strong>${escapeHtml(data.ngoName)}</strong>
            </div>
        </div>
        
        <div class="footer">
            <p>*This is an automated receipt. Please do not reply to this email.*</p>
            <p>© ${new Date().getFullYear()} ${escapeHtml(data.ngoName)}</p>
        </div>
    </div>
</body>
</html>
  `;
}

// Export sanitization function
export function sanitizeForEmail(text: string): string {
  return escapeHtml(text);
}
