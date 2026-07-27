/**
 * POST /api/razorpay/verify
 * Verify Razorpay payment signature (CRITICAL SECURITY ENDPOINT)
 */

import { NextRequest, NextResponse } from "next/server";
import {
  verifyPaymentSignature,
  fetchPaymentDetails,
  processPaymentVerification,
} from "@/services/payment.service";
import { logPaymentEvent } from "@/lib/razorpay";
import { sendDonationReceipt } from "@/lib/email";
import { siteConfig } from "@/lib/config";
import { donationRateLimit, getRateLimitHeaders } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await donationRateLimit(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many verification attempts. Please try again later." },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
      );
    }

    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing payment verification details" },
        { status: 400, headers: getRateLimitHeaders(rateLimitResult) }
      );
    }

    logPaymentEvent("Verify Request", {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });

    const isSignatureValid = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isSignatureValid) {
      logPaymentEvent("Signature Verification Failed", {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        status: "invalid_signature",
      });

      return NextResponse.json(
        {
          success: false,
          error: "Payment verification failed. Invalid signature.",
        },
        { status: 403, headers: getRateLimitHeaders(rateLimitResult) }
      );
    }

    const paymentDetails = await fetchPaymentDetails(razorpay_payment_id);

    if (!paymentDetails) {
      logPaymentEvent("Payment Details Fetch Failed", {
        paymentId: razorpay_payment_id,
        status: "fetch_failed",
      });

      return NextResponse.json(
        { success: false, error: "Could not verify payment details" },
        { status: 400, headers: getRateLimitHeaders(rateLimitResult) }
      );
    }

    if (paymentDetails.status !== "captured") {
      logPaymentEvent("Payment Not Captured", {
        paymentId: razorpay_payment_id,
        status: paymentDetails.status,
      });

      return NextResponse.json(
        { success: false, error: "Payment not captured" },
        { status: 400, headers: getRateLimitHeaders(rateLimitResult) }
      );
    }

    try {
      const donationRecord = await processPaymentVerification(
        paymentDetails,
        razorpay_order_id
      );

      try {
        const recipientEmail = donationRecord.donorEmail;
        const recipientName = donationRecord.donorName;

        if (recipientEmail) {
          await sendDonationReceipt({
            donorEmail: recipientEmail,
            donorName: recipientName,
            amount: donationRecord.amount,
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            createdAt: new Date(),
            donationId: donationRecord.recordId,
            ngoName: siteConfig.name,
            ngoPhone: siteConfig.phone,
          });
        }
      } catch {
        console.warn("[PAYMENT] Email receipt failed but donation was recorded");
      }

      logPaymentEvent("Payment Success", {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        status: "captured",
      });

      return NextResponse.json(
        {
          success: true,
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          message: "Payment verified and recorded successfully",
          recordId: donationRecord.recordId,
          isNewRecord: donationRecord.isNewRecord,
        },
        { status: 200, headers: getRateLimitHeaders(rateLimitResult) }
      );
    } catch {
      console.error("[PAYMENT] Database error during verification");

      logPaymentEvent("Database Storage Error", {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        status: "db_error",
      });

      return NextResponse.json(
        {
          success: true,
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          message: "Payment captured. Recording via backup webhook handler.",
          recordId: null,
          warning: "Database storage pending - webhook will ensure recording",
        },
        { status: 200, headers: getRateLimitHeaders(rateLimitResult) }
      );
    }
  } catch {
    console.error("[PAYMENT] Verification error");

    return NextResponse.json(
      { success: false, error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
