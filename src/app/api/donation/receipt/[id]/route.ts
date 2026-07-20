/**
 * GET /api/donation/receipt/[id]
 * Generate and download professional donation receipt
 * 
 * Endpoint returns:
 * - HTML receipt for viewing in browser (default)
 * - HTML for printing/saving to PDF
 * 
 * Query Parameters:
 * - format: "html" (default) - Returns viewable HTML
 * - download: "true" - Triggers download prompt
 * 
 * Security: In production, validate donor owns this receipt
 */

import { NextRequest, NextResponse } from "next/server";
import { generateReceiptHTML, ReceiptData } from "@/lib/receipt-generator";
import { siteConfig } from "@/lib/config";
import { getReceiptById } from "@/lib/receipt-storage";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: receiptId } = await params;
    const download = request.nextUrl.searchParams.get("download") === "true";

    // Security: Validate receipt ID format to prevent injection
    if (!isValidReceiptId(receiptId)) {
      return NextResponse.json(
        { error: "Invalid receipt ID format" },
        { status: 400 }
      );
    }

    // Fetch receipt data from database
    const receipt = getReceiptById(receiptId);

    if (!receipt) {
      // Log attempt to access non-existent receipt
      console.warn(`[RECEIPT] Attempt to access non-existent receipt: ${receiptId}`);
      
      return NextResponse.json(
        { error: "Receipt not found. Please verify the receipt ID." },
        { status: 404 }
      );
    }

    // TODO: In production, verify that the requesting user owns this receipt
    // This prevents donors from viewing other donors' receipts
    // Implement via donation_id in receipt table + session validation

    // For now, return a placeholder receipt since we don't have full donor data stored in receipt table
    // In production: fetch donation record using receipt.donationId to get complete donor info
    const receiptData: ReceiptData = {
      donorName: "Valued Donor",
      donorEmail: "",
      donorPhone: undefined,
      donorAddress: undefined,
      donorPAN: undefined,
      
      amount: 0,
      donationDate: receipt.createdAt,
      paymentMode: "razorpay",
      transactionId: undefined,
      orderId: undefined,
      donationPurpose: "General Donation",
      
      receiptNumber: receipt.receiptNumber,
      receiptId: receipt.receiptId,
      
      ngoName: siteConfig.name,
      ngoRegistrationNumber: siteConfig.registrationNumber || "IND 4124/99",
      ngoPAN: "XXXXXXXXX", // TODO: Store NGO PAN in config
      ngoRegisteredOffice: siteConfig.address,
      ngoWebsite: "https://priyasarvutthan.org",
      ngoEmail: siteConfig.contactEmail,
      ngoPhone: siteConfig.phone,
      
      section80GRegistered: false, // TODO: Update once 80G registration is verified
      section80GNumber: undefined,
      section80GValidity: undefined,
    };

    // TODO: In production, fetch full donation data using receipt.donationId
    // Example:
    // const donation = await db.query('SELECT * FROM donations WHERE id = $1', [receipt.donationId]);
    // Then populate receiptData with actual donor information from the donation record

    // Generate receipt HTML
    const html = generateReceiptHTML(receiptData);

    // Prepare response headers
    const headers: Record<string, string> = {
      "Content-Type": "text/html; charset=utf-8",
    };

    if (download) {
      // Trigger download with generated filename
      headers["Content-Disposition"] = `attachment; filename="Receipt_${receipt.receiptNumber}.html"`;
    } else {
      // Display inline in browser
      headers["Content-Disposition"] = `inline; filename="Receipt_${receipt.receiptNumber}.html"`;
      headers["Cache-Control"] = "public, max-age=3600"; // Cache for 1 hour
    }

    return new NextResponse(html, { headers });
  } catch (error) {
    console.error("[RECEIPT] Error generating receipt:", error);
    return NextResponse.json(
      { 
        error: "Failed to generate receipt. Please try again later or contact support.",
        details: process.env.NODE_ENV === "development" ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}

/**
 * Validate receipt ID format to prevent injection attacks
 * Expected format: UUID or alphanumeric strings
 */
function isValidReceiptId(id: string): boolean {
  // Allow alphanumeric, hyphens, underscores
  return /^[a-zA-Z0-9_-]{1,100}$/.test(id);
}
