/**
 * Razorpay Webhook Handler
 * Receives events from Razorpay (payment.captured, payment.failed, etc.)
 * 
 * CRITICAL: This is the backup/redundant source of truth
 * If /verify fails due to network issues, webhook ensures payment is still recorded
 * 
 * Environment Variables Required:
 * - RAZORPAY_WEBHOOK_SECRET: Webhook signing secret from Razorpay dashboard
 */

import { NextRequest, NextResponse } from "next/server";
import {
  processFailedPaymentEvent,
  processPaymentVerification,
  verifyWebhookSignature,
} from "@/services/payment.service";

const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;

/**
 * Process payment.captured event
 */
async function processPaymentCaptured(payment: any) {
  try {
    console.log(`[WEBHOOK] Processing payment.captured: ${payment.id}`);

    const result = await processPaymentVerification(payment, payment.order_id || "");

    if (!result.isNewRecord) {
      console.log(`[WEBHOOK] ✅ Donation already recorded for ${payment.id} (idempotent)`);
    } else {
      console.log(`[WEBHOOK] ✅ Donation recorded from webhook - ID: ${result.recordId}`);
    }

    return true;
  } catch (error: any) {
    console.error("[WEBHOOK] Error processing payment.captured:", error.message);
    // Don't throw - return success anyway to prevent Razorpay retries
    return true;
  }
}

/**
 * Process payment.failed event
 */
async function processPaymentFailed(payment: any) {
  try {
    console.log(`[WEBHOOK] Processing payment.failed: ${payment.id}`);

    await processFailedPaymentEvent(payment);

    console.log(`[WEBHOOK] Failed payment recorded: ${payment.id}`);
    return true;
  } catch (error: any) {
    console.error("[WEBHOOK] Error processing payment.failed:", error.message);
    return true;
  }
}

/**
 * POST /api/razorpay/webhook
 * Webhook endpoint for Razorpay events
 */
export async function POST(request: NextRequest) {
  try {
    // Get the raw body for signature verification
    const bodyText = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    if (!signature) {
      console.warn("[WEBHOOK] Missing signature header");
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 401 }
      );
    }

    // Verify webhook signature
    if (!WEBHOOK_SECRET || !verifyWebhookSignature(bodyText, signature, WEBHOOK_SECRET)) {
      console.warn("[WEBHOOK] Invalid signature");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    const event = JSON.parse(bodyText);
    const eventType = event.event;
    const payment = event.payload?.payment?.entity;

    console.log(`[WEBHOOK] Event received: ${eventType}`);

    // Process specific events
    if (eventType === "payment.captured" && payment) {
      await processPaymentCaptured(payment);
    } else if (eventType === "payment.failed" && payment) {
      await processPaymentFailed(payment);
    }

    // Always return 200 to prevent Razorpay retries
    return NextResponse.json(
      { success: true, event: eventType },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[WEBHOOK] Unhandled error:", error.message);
    // Return 200 anyway to prevent retry storms
    return NextResponse.json(
      { success: true, error: error.message },
      { status: 200 }
    );
  }
}
