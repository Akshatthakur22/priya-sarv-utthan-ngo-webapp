import nodemailer from "nodemailer";

// Email configuration
const emailConfig = {
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
};

let transporter: nodemailer.Transporter | null = null;

/**
 * Get or create email transporter
 */
function getEmailTransporter(): nodemailer.Transporter | null {
  // Return null if email is not configured
  if (!emailConfig.auth.user || !emailConfig.auth.pass) {
    console.warn("[EMAIL] Email service not configured. Receipts will not be sent.");
    return null;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport(emailConfig);
  }

  return transporter;
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
      subject: `Donation Receipt - ${ngoName} (ID: ${data.paymentId})`,
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

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Donation Receipt</title>
    <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .header h1 { margin: 0; font-size: 28px; }
        .header p { margin: 10px 0 0 0; font-size: 14px; opacity: 0.9; }
        .content { background: #f9fafb; padding: 30px; }
        .receipt-header { font-size: 18px; font-weight: bold; color: #1f2937; margin-bottom: 20px; }
        .receipt-detail { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e7eb; }
        .receipt-detail label { color: #6b7280; font-weight: 500; }
        .receipt-detail value { color: #1f2937; font-weight: 600; }
        .amount-box { background: white; padding: 20px; border-left: 4px solid #10b981; margin: 20px 0; border-radius: 4px; }
        .amount-label { color: #6b7280; font-size: 14px; margin-bottom: 5px; }
        .amount-value { font-size: 32px; font-weight: bold; color: #10b981; }
        .message { background: white; padding: 15px; border-radius: 4px; margin: 20px 0; border-left: 4px solid #3b82f6; }
        .message-title { color: #1f2937; font-weight: 600; margin-bottom: 8px; }
        .message-text { color: #6b7280; font-size: 14px; }
        .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
        .footer-link { color: #10b981; text-decoration: none; }
        .tax-note { background: #fef3c7; padding: 12px; border-radius: 4px; margin: 15px 0; font-size: 12px; color: #92400e; }
        @media print { body { background: white; } .container { box-shadow: none; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🙏 Thank You</h1>
            <p>Donation Receipt</p>
        </div>
        
        <div class="content">
            <div class="receipt-header">
                Dear ${escapeHtml(data.donorName)},
            </div>
            
            <p>Thank you for your generous donation to ${escapeHtml(data.ngoName)}. Your contribution makes a real difference in our mission to serve and support our community.</p>
            
            <div class="amount-box">
                <div class="amount-label">Amount Donated</div>
                <div class="amount-value">₹${data.amount.toLocaleString("en-IN")}</div>
            </div>
            
            <div class="receipt-header" style="margin-top: 25px;">Receipt Details</div>
            
            <div class="receipt-detail">
                <label>Payment ID</label>
                <value style="font-family: monospace;">${data.paymentId}</value>
            </div>
            
            <div class="receipt-detail">
                <label>Order ID</label>
                <value style="font-family: monospace;">${data.orderId}</value>
            </div>
            
            <div class="receipt-detail">
                <label>Date & Time</label>
                <value>${formattedDate}</value>
            </div>
            
            <div class="message">
                <div class="message-title">📋 Important Information</div>
                <div class="message-text">
                    <p>• This receipt confirms your donation to ${escapeHtml(data.ngoName)}</p>
                    <p>• Payment ID ${data.paymentId} serves as your transaction reference</p>
                    <p>• For tax benefits, please keep this receipt for your records</p>
                </div>
            </div>
            
            <div class="tax-note">
                <strong>Tax Benefit:</strong> ${escapeHtml(data.ngoName)} is registered under Section 80G of the Income Tax Act. You may be eligible for tax deduction on your donation. Please consult your tax advisor for more details.
            </div>
            
            <p style="margin-top: 25px; color: #6b7280;">If you have any questions or need further assistance, please don't hesitate to contact us at <strong>${data.ngoPhone || "(details to be added)"}</strong>.</p>
            
            <p style="margin-top: 20px; color: #6b7280;">With gratitude,<br><strong>${escapeHtml(data.ngoName)}</strong></p>
        </div>
        
        <div class="footer">
            <p>This is an automated email. Please do not reply to this email.</p>
            <p style="margin-top: 10px;">© ${new Date().getFullYear()} ${escapeHtml(data.ngoName)}. All rights reserved.</p>
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
