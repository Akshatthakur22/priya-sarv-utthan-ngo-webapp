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
