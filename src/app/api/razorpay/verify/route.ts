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
  storeDonationRecord,
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

    // ✅ PAYMENT VERIFIED - Store in database
    try {
      const donationRecord = await storeDonationRecord({
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        amount: paymentDetails.amount / 100, // Convert paise to rupees
        currency: paymentDetails.currency,
        donorName: paymentDetails.notes?.donor_name || "Anonymous",
        donorEmail: paymentDetails.notes?.donor_email || "Unknown",
        donorPhone: paymentDetails.notes?.donor_phone,
        donorMessage: paymentDetails.notes?.message,
        status: "completed",
        timestamp: new Date(),
      });

      // Send donation receipt email (non-blocking)
      try {
        const emailSent = await sendDonationReceipt({
          donorEmail: paymentDetails.notes?.donor_email || "Unknown",
          donorName: paymentDetails.notes?.donor_name || "Donor",
          amount: paymentDetails.amount / 100,
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          createdAt: new Date(),
          ngoName: siteConfig.name,
          ngoPhone: siteConfig.phone,
        });

        if (emailSent) {
          logPaymentEvent("Receipt Email Sent", {
            donorEmail: paymentDetails.notes?.donor_email,
          });
        }
      } catch (emailError) {
        console.warn("[PAYMENT] Email receipt failed but donation was recorded:", emailError);
        // Don't fail the donation if email sending fails
      }

      logPaymentEvent("Payment Success", {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        amount: paymentDetails.amount / 100,
        recordId: donationRecord.id,
      });

      return NextResponse.json(
        {
          success: true,
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          message: "Payment verified and recorded successfully",
          recordId: donationRecord.id,
        },
        { status: 200 }
      );
    } catch (dbError: any) {
      // Database error - payment was successful but couldn't be stored
      console.error("[PAYMENT] Database Error:", dbError.message);

      logPaymentEvent("Database Storage Error", {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        error: dbError.message,
      });

      // Return success but indicate storage issue
      // Client should retry or contact support
      return NextResponse.json(
        {
          success: false,
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          error: "Payment verified but storage failed. Please contact support with Payment ID.",
          retryable: true,
        },
        { status: 500 }
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
