/**
 * POST /api/razorpay/verify
 * Verify Razorpay payment signature (CRITICAL SECURITY ENDPOINT)
 * 
 * Request body:
 * {
 *   razorpay_order_id: string,
 *   razorpay_payment_id: string,
 *   razorpay_signature: string
 * }
 * 
 * Response:
 * {
 *   success: true/false,
 *   orderId?: string,
 *   paymentId?: string,
 *   message: string
 * }
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing payment verification details" },
        { status: 400 }
      );
    }

    logPaymentEvent("Verify Request", {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });

    // ⚠️ CRITICAL: Verify signature
    const isSignatureValid = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isSignatureValid) {
      logPaymentEvent("Signature Verification Failed", {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      });

      return NextResponse.json(
        {
          success: false,
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          error: "Payment verification failed. Invalid signature.",
        },
        { status: 403 }
      );
    }

    // Fetch payment details from Razorpay API for extra validation
    const paymentDetails = await fetchPaymentDetails(razorpay_payment_id);

    if (!paymentDetails) {
      logPaymentEvent("Payment Details Fetch Failed", {
        paymentId: razorpay_payment_id,
      });

      return NextResponse.json(
        {
          success: false,
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          error: "Could not verify payment details",
        },
        { status: 400 }
      );
    }

    // Verify payment status
    if (paymentDetails.status !== "captured") {
      logPaymentEvent("Payment Not Captured", {
        paymentId: razorpay_payment_id,
        status: paymentDetails.status,
      });

      return NextResponse.json(
        {
          success: false,
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          error: `Payment not captured. Status: ${paymentDetails.status}`,
        },
        { status: 400 }
      );
    }

    // ✅ PAYMENT VERIFIED - Store in PostgreSQL database
    try {
      const donationRecord = await processPaymentVerification(
        paymentDetails,
        razorpay_order_id
      );

      // Send donation receipt email (non-blocking - don't fail if email fails)
      try {
        const recipientEmail = donationRecord.donorEmail;
        
        const recipientName = donationRecord.donorName;

        if (recipientEmail) {
          const emailSent = await sendDonationReceipt({
            donorEmail: recipientEmail,
            donorName: recipientName,
            amount: donationRecord.amount,
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            createdAt: new Date(),
            ngoName: siteConfig.name,
            ngoPhone: siteConfig.phone,
          });

          if (emailSent) {
            logPaymentEvent("Receipt Email Sent", {
              donorEmail: recipientEmail,
            });
          }
        }
      } catch (emailError: any) {
        console.warn(
          "[PAYMENT] Email receipt failed but donation was recorded:",
          emailError.message
        );
        // Don't fail the donation if email sending fails
      }

      logPaymentEvent("Payment Success", {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        amount: donationRecord.amount,
        recordId: donationRecord.recordId,
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
        { status: 200 }
      );
    } catch (dbError: any) {
      // Database error - payment was successful but couldn't be stored
      // WEBHOOK will handle this as backup
      console.error("[PAYMENT] Database Error:", dbError.message);

      logPaymentEvent("Database Storage Error", {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        error: dbError.message,
      });

      // Still return 200 since payment was captured successfully
      // Webhook will ensure recording via redundancy
      return NextResponse.json(
        {
          success: true,
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          message: "Payment captured. Recording via backup webhook handler.",
          recordId: null,
          warning: "Database storage pending - webhook will ensure recording",
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("[PAYMENT] Verification Error:", error.message);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Payment verification failed",
      },
      { status: 500 }
    );
  }
}
