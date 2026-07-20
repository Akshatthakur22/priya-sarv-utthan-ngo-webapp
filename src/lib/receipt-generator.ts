/**
 * Professional Donation Receipt Generator
 * Generates audit-friendly, print-ready donation receipts
 * for tax, financial, and archival purposes.
 */

import { formatNumberToWords } from "./number-to-words";
import { escapeHtml } from "./escape-html";

export interface ReceiptData {
  // Donor Information
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  donorPAN?: string;
  donorAddress?: string;

  // Donation Details
  amount: number;
  donationDate: Date;
  paymentMode: "razorpay" | "upi" | "bank_transfer" | "cash";
  transactionId?: string;
  orderId?: string;
  donationPurpose?: string;

  // Receipt Metadata
  receiptNumber: string;
  receiptId: string; // Unique identifier for verification

  // NGO Information
  ngoName: string;
  ngoRegistrationNumber: string;
  ngoPAN: string;
  ngoRegisteredOffice: string;
  ngoWebsite?: string;
  ngoEmail?: string;
  ngoPhone?: string;

  // Tax Information
  section80GRegistered?: boolean;
  section80GNumber?: string;
  section80GValidity?: string;
}

/**
 * Generate professional receipt number
 * Format: PSUS-DR-YYYY-XXXXXX
 * Example: PSUS-DR-2026-000001
 */
export function generateReceiptNumber(sequenceNumber: number, year: number = new Date().getFullYear()): string {
  const paddedSequence = String(sequenceNumber).padStart(6, "0");
  return `PSUS-DR-${year}-${paddedSequence}`;
}

/**
 * Generate the HTML content for the donation receipt
 * Optimized for:
 * - Screen display
 * - PDF generation
 * - Print on A4 paper
 * - Black and white printing
 */
export function generateReceiptHTML(data: ReceiptData): string {
  const amountInWords = formatNumberToWords(data.amount);
  const formattedDate = formatReceiptDate(data.donationDate);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Donation Receipt - ${data.ngoName}">
  <title>Donation Receipt ${data.receiptNumber}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      background-color: #f5f5f5;
      padding: 0;
    }

    /* A4 Print Container */
    .receipt-container {
      width: 210mm;
      height: 297mm;
      margin: 0 auto;
      background: white;
      color: #1a1a1a;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 20mm;
      font-size: 11pt;
      line-height: 1.5;
    }

    /* Header */
    .receipt-header {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20mm;
      margin-bottom: 8mm;
      padding-bottom: 6mm;
      border-bottom: 2pt solid #1a1a1a;
    }

    .ngo-info {
      align-content: start;
    }

    .ngo-name {
      font-size: 16pt;
      font-weight: 700;
      margin-bottom: 2mm;
      letter-spacing: -0.5pt;
    }

    .ngo-designation {
      font-size: 10pt;
      color: #444;
      margin-bottom: 3mm;
      font-weight: 500;
    }

    .ngo-registration-info {
      font-size: 9pt;
      color: #555;
      line-height: 1.4;
    }

    .ngo-registration-info .label {
      font-weight: 600;
      display: inline-block;
      width: 60mm;
    }

    .receipt-meta {
      text-align: right;
    }

    .receipt-title {
      font-size: 18pt;
      font-weight: 700;
      margin-bottom: 3mm;
      color: #1a1a1a;
    }

    .receipt-number-box {
      background-color: #f0f0f0;
      border: 1pt solid #999;
      padding: 3mm 4mm;
      font-family: "Courier New", monospace;
      font-size: 10pt;
      font-weight: 600;
      margin-bottom: 2mm;
    }

    .issue-date {
      font-size: 9pt;
      color: #555;
    }

    /* Section Title */
    .section-title {
      font-size: 11pt;
      font-weight: 700;
      margin-top: 6mm;
      margin-bottom: 3mm;
      color: #1a1a1a;
      text-transform: uppercase;
      letter-spacing: 0.5pt;
    }

    /* Donor Details Section */
    .donor-details {
      margin-bottom: 6mm;
    }

    .detail-row {
      display: grid;
      grid-template-columns: 50mm 1fr;
      gap: 3mm;
      margin-bottom: 2mm;
      line-height: 1.4;
    }

    .detail-label {
      font-weight: 600;
      color: #333;
      font-size: 10pt;
    }

    .detail-value {
      color: #1a1a1a;
      font-size: 10pt;
    }

    /* Donation Details Section */
    .donation-details {
      background-color: #f9f9f9;
      border: 1pt solid #d0d0d0;
      padding: 4mm;
      margin: 4mm 0;
    }

    .amount-box {
      margin-bottom: 3mm;
    }

    .amount-figure {
      font-size: 24pt;
      font-weight: 700;
      color: #1a1a1a;
      font-family: "Courier New", monospace;
      margin-bottom: 1mm;
    }

    .amount-words {
      font-size: 9pt;
      color: #555;
      font-style: italic;
      font-weight: 500;
    }

    /* NGO Information */
    .ngo-details {
      margin-bottom: 6mm;
    }

    /* Tax Information */
    .tax-info-box {
      background-color: #fffbf0;
      border: 1pt solid #e6d5c0;
      padding: 3mm 4mm;
      margin: 4mm 0;
      font-size: 9pt;
      line-height: 1.5;
      color: #555;
    }

    /* Declaration */
    .declaration {
      background-color: #f0f8f0;
      border: 1pt solid #c0e6c0;
      padding: 3mm 4mm;
      margin: 4mm 0;
      font-size: 9pt;
      line-height: 1.5;
      color: #1a1a1a;
    }

    .declaration-title {
      font-weight: 700;
      margin-bottom: 2mm;
    }

    /* Verification Section */
    .verification-section {
      margin-top: 6mm;
      padding-top: 3mm;
      border-top: 1pt solid #d0d0d0;
      text-align: center;
      font-size: 9pt;
      color: #666;
    }

    /* Footer */
    .receipt-footer {
      margin-top: 8mm;
      padding-top: 4mm;
      border-top: 1pt solid #d0d0d0;
      text-align: center;
      font-size: 8pt;
      color: #777;
    }

    .footer-line {
      margin-bottom: 1mm;
    }

    /* Watermark */
    .watermark {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      font-size: 80pt;
      color: rgba(0, 0, 0, 0.05);
      font-weight: 700;
      white-space: nowrap;
      pointer-events: none;
      z-index: -1;
    }

    /* Print Styles */
    @media print {
      body {
        background-color: white;
        margin: 0;
        padding: 0;
      }

      .receipt-container {
        box-shadow: none;
        margin: 0;
        width: auto;
        height: auto;
        padding: 20mm;
        page-break-after: always;
      }

      a {
        color: #1a1a1a;
        text-decoration: none;
      }
    }

    /* Mobile Responsiveness */
    @media screen and (max-width: 768px) {
      .receipt-container {
        width: 100%;
        height: auto;
        margin: 10px;
        padding: 15mm;
        font-size: 10pt;
      }

      .receipt-header {
        grid-template-columns: 1fr;
        gap: 10mm;
      }

      .receipt-meta {
        text-align: left;
      }

      .detail-row {
        grid-template-columns: 1fr;
        gap: 1mm;
      }

      .ngo-registration-info .label {
        width: auto;
        display: block;
      }
    }
  </style>
</head>
<body>
  <div class="watermark">PRIYA SARV UTTHHAN</div>

  <div class="receipt-container">
    <!-- Header -->
    <div class="receipt-header">
      <div class="ngo-info">
        <div class="ngo-name">${escapeHtml(data.ngoName)}</div>
        <div class="ngo-designation">Registered Public Charitable Trust</div>
        <div class="ngo-registration-info">
          <div><span class="label">Registration Number:</span> ${escapeHtml(data.ngoRegistrationNumber)}</div>
          <div><span class="label">PAN:</span> ${escapeHtml(data.ngoPAN)}</div>
        </div>
      </div>

      <div class="receipt-meta">
        <div class="receipt-title">DONATION RECEIPT</div>
        <div class="receipt-number-box">${escapeHtml(data.receiptNumber)}</div>
        <div class="issue-date"><strong>Issue Date:</strong> ${formattedDate}</div>
      </div>
    </div>

    <!-- Donor Details Section -->
    <div class="section-title">1. Donor Details</div>
    <div class="donor-details">
      <div class="detail-row">
        <div class="detail-label">Full Name:</div>
        <div class="detail-value">${escapeHtml(data.donorName)}</div>
      </div>
      ${data.donorEmail ? `
      <div class="detail-row">
        <div class="detail-label">Email Address:</div>
        <div class="detail-value">${escapeHtml(data.donorEmail)}</div>
      </div>
      ` : ""}
      ${data.donorPhone ? `
      <div class="detail-row">
        <div class="detail-label">Phone Number:</div>
        <div class="detail-value">${escapeHtml(data.donorPhone)}</div>
      </div>
      ` : ""}
      ${data.donorAddress ? `
      <div class="detail-row">
        <div class="detail-label">Address:</div>
        <div class="detail-value">${escapeHtml(data.donorAddress)}</div>
      </div>
      ` : ""}
      ${data.donorPAN ? `
      <div class="detail-row">
        <div class="detail-label">PAN:</div>
        <div class="detail-value">${escapeHtml(data.donorPAN)}</div>
      </div>
      ` : ""}
    </div>

    <!-- Donation Details Section -->
    <div class="section-title">2. Donation Details</div>
    <div class="donation-details">
      <div class="amount-box">
        <div class="amount-figure">₹ ${data.amount.toLocaleString("en-IN")}</div>
        <div class="amount-words">${amountInWords}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Receipt Number:</div>
        <div class="detail-value">${escapeHtml(data.receiptNumber)}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Donation Date:</div>
        <div class="detail-value">${formattedDate}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Payment Mode:</div>
        <div class="detail-value">${escapeHtml(formatPaymentMode(data.paymentMode))}</div>
      </div>
      ${data.transactionId ? `
      <div class="detail-row">
        <div class="detail-label">Transaction ID:</div>
        <div class="detail-value">${escapeHtml(data.transactionId)}</div>
      </div>
      ` : ""}
      ${data.orderId ? `
      <div class="detail-row">
        <div class="detail-label">Order ID:</div>
        <div class="detail-value">${escapeHtml(data.orderId)}</div>
      </div>
      ` : ""}
      ${data.donationPurpose ? `
      <div class="detail-row">
        <div class="detail-label">Donation Purpose:</div>
        <div class="detail-value">${escapeHtml(data.donationPurpose)}</div>
      </div>
      ` : `
      <div class="detail-row">
        <div class="detail-label">Donation Purpose:</div>
        <div class="detail-value">General Donation</div>
      </div>
      `}
    </div>

    <!-- NGO Information -->
    <div class="section-title">3. Organization Information</div>
    <div class="ngo-details">
      <div class="detail-row">
        <div class="detail-label">Organization Name:</div>
        <div class="detail-value">${escapeHtml(data.ngoName)}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Registration Number:</div>
        <div class="detail-value">${escapeHtml(data.ngoRegistrationNumber)}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">PAN:</div>
        <div class="detail-value">${escapeHtml(data.ngoPAN)}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Registered Office:</div>
        <div class="detail-value">${escapeHtml(data.ngoRegisteredOffice)}</div>
      </div>
      ${data.ngoWebsite ? `
      <div class="detail-row">
        <div class="detail-label">Website:</div>
        <div class="detail-value"><a href="${escapeHtml(data.ngoWebsite)}" target="_blank">${escapeHtml(data.ngoWebsite)}</a></div>
      </div>
      ` : ""}
      ${data.ngoEmail ? `
      <div class="detail-row">
        <div class="detail-label">Email:</div>
        <div class="detail-value"><a href="mailto:${escapeHtml(data.ngoEmail)}">${escapeHtml(data.ngoEmail)}</a></div>
      </div>
      ` : ""}
      ${data.ngoPhone ? `
      <div class="detail-row">
        <div class="detail-label">Phone:</div>
        <div class="detail-value">${escapeHtml(data.ngoPhone)}</div>
      </div>
      ` : ""}
    </div>

    <!-- Tax Information -->
    <div class="section-title">4. Tax Information</div>
    <div class="tax-info-box">
      ${data.section80GRegistered && data.section80GNumber ? `
        <strong>Section 80G Registration:</strong><br>
        <strong>Number:</strong> ${escapeHtml(data.section80GNumber)}<br>
        ${data.section80GValidity ? `<strong>Validity:</strong> ${escapeHtml(data.section80GValidity)}<br>` : ""}
        This donation is eligible for tax deduction under Section 80G of the Income Tax Act, 1961.
      ` : `
        <strong>Tax Status:</strong><br>
        Section 80G information will be available once registration is completed. Currently, this receipt acknowledges the donation received by the organization. Please retain this receipt for your records.
      `}
    </div>

    <!-- Declaration -->
    <div class="section-title">5. Declaration</div>
    <div class="declaration">
      <div class="declaration-title">Receipt Acknowledgement:</div>
      <p style="margin-bottom: 2mm;">
        This receipt acknowledges the voluntary donation received by <strong>${escapeHtml(data.ngoName)}</strong> towards its charitable activities.
      </p>
      <p style="margin-bottom: 2mm;">
        This receipt has been generated electronically and does not require a physical signature.
      </p>
      <p>
        Any unauthorized modification renders this receipt invalid.
      </p>
    </div>

    <!-- Verification Section -->
    <div class="section-title">6. Verification</div>
    <div class="verification-section">
      <div>Receipt ID: <strong>${escapeHtml(data.receiptId)}</strong></div>
      <div style="margin-top: 2mm; font-size: 8pt; color: #999;">
        Future verification feature coming soon at<br>
        <strong>https://priyasarvutthan.org</strong>
      </div>
    </div>

    <!-- Footer -->
    <div class="receipt-footer">
      <div class="footer-line"><strong>${escapeHtml(data.ngoName)}</strong></div>
      <div class="footer-line">${escapeHtml(data.ngoRegisteredOffice)}</div>
      ${data.ngoWebsite ? `<div class="footer-line">${escapeHtml(data.ngoWebsite)}</div>` : ""}
      ${data.ngoEmail ? `<div class="footer-line">${escapeHtml(data.ngoEmail)}</div>` : ""}
      ${data.ngoPhone ? `<div class="footer-line">${escapeHtml(data.ngoPhone)}</div>` : ""}
      <div class="footer-line" style="margin-top: 2mm;">© ${new Date().getFullYear()} ${escapeHtml(data.ngoName)}</div>
      <div class="footer-line" style="margin-top: 1mm; font-weight: 600;">Computer Generated Receipt • No Signature Required</div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Format payment mode for display
 */
function formatPaymentMode(mode: string): string {
  const modeMap: Record<string, string> = {
    razorpay: "Razorpay Payment Gateway",
    upi: "UPI Transfer",
    bank_transfer: "Bank Transfer",
    cash: "Cash",
  };
  return modeMap[mode] || mode;
}

/**
 * Format receipt date consistently
 */
export function formatReceiptDate(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
