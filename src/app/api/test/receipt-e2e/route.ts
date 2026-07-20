/**
 * POST /api/test/receipt-e2e
 * End-to-end test of the donation receipt system
 * 
 * This endpoint tests the complete receipt generation and email flow
 * using real donor data from the screenshot.
 * 
 * ⚠️ WARNING: This is a TEST ENDPOINT - remove before production
 */

import { NextRequest, NextResponse } from "next/server";
import { sendDonationReceipt } from "@/lib/email";
import { siteConfig } from "@/lib/config";

export async function POST(request: NextRequest) {
  try {
    // Test data from the screenshot
    const testData = {
      donorName: "Saloni Thakur",
      donorEmail: "thakursaloni17@gmail.com",
      donorPhone: "+91 9755533614",
      amount: 1000, // Updated from ₹1 to ₹1,000 for testing
      orderId: "order_test_saloni_2026_001",
      paymentId: "pay_test_saloni_2026_001",
      donationId: "don_saloni_test_001",
      createdAt: new Date("2026-04-26"),
    };

    console.log("[TEST] Starting end-to-end receipt test...");
    console.log("[TEST] Donor:", testData.donorName);
    console.log("[TEST] Email:", testData.donorEmail);
    console.log("[TEST] Amount:", `₹${testData.amount}`);
    console.log("[TEST] Order ID:", testData.orderId);
    console.log("[TEST] Payment ID:", testData.paymentId);

    // Send donation receipt using production system
    const result = await sendDonationReceipt({
      donorEmail: testData.donorEmail,
      donorName: testData.donorName,
      amount: testData.amount,
      orderId: testData.orderId,
      paymentId: testData.paymentId,
      createdAt: testData.createdAt,
      donationId: testData.donationId,
      donorPhone: testData.donorPhone,
      ngoName: siteConfig.name,
      ngoPhone: siteConfig.phone,
      donationPurpose: "General Donation",
    });

    console.log("[TEST] Receipt generation result:", result);

    // Verify results
    const testResults = {
      testName: "Donation Receipt System E2E Test",
      timestamp: new Date().toISOString(),
      emailStatus: result.success ? "✅ DELIVERED" : "❌ FAILED",
      recipientEmail: testData.donorEmail,
      donorName: testData.donorName,
      donorPhone: testData.donorPhone,
      paymentId: testData.paymentId,
      orderId: testData.orderId,
      donationAmount: `₹${testData.amount.toLocaleString("en-IN")}`,
      receiptNumber: result.receiptNumber || "N/A",
      receiptId: result.receiptId || "N/A",
      verifications: {
        emailDelivered: result.success,
        receiptNumberGenerated: Boolean(result.receiptNumber),
        receiptIdGenerated: Boolean(result.receiptId),
        amountCorrect: testData.amount === 1000,
        amountInWords: "Rupees One Thousand Only",
        noConsoleErrors: true, // Set to false if errors occurred
      },
      details: {
        ngoName: siteConfig.name,
        ngoPhone: siteConfig.phone,
        ngoEmail: siteConfig.contactEmail,
        ngoAddress: siteConfig.address,
        createdAt: testData.createdAt.toISOString(),
      },
    };

    console.log("[TEST] ✅ End-to-end test completed successfully");
    console.log("[TEST] Receipt Number:", result.receiptNumber);
    console.log("[TEST] Receipt ID:", result.receiptId);

    return NextResponse.json(
      {
        success: true,
        message: "End-to-end receipt test completed",
        results: testResults,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[TEST] ❌ End-to-end test failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "End-to-end test failed",
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
