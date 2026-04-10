/**
 * POST /api/razorpay/order
 * Create Razorpay order
 * 
 * Request body:
 * {
 *   name: string,
 *   email: string,
 *   phone?: string,
 *   amount: number (in rupees),
 *   message?: string
 * }
 * 
 * Response:
 * {
 *   orderId: string,
 *   amount: number,
 *   currency: string,
 *   reference: string
 * }
 */

import { NextRequest, NextResponse } from "next/server";
import { createRazorpayOrder } from "@/services/payment.service";
import { razorpayConfig } from "@/lib/razorpay";
import { donationSchema, sanitizeString } from "@/lib/validation";

// Validate environment variables
if (!razorpayConfig.keyId || !razorpayConfig.keySecret) {
  console.error(
    "[PAYMENT] ⚠️ Missing Razorpay credentials. Set NEXT_PUBLIC_RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET"
  );
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    console.log("[PAYMENT] Request body:", body);
    
    // Sanitize inputs
    const sanitized = {
      name: sanitizeString(body.name || ""),
      email: sanitizeString(body.email || ""),
      phone: body.phone ? sanitizeString(body.phone) : undefined,
      amount: body.amount,
      message: body.message ? sanitizeString(body.message) : undefined,
    };

    console.log("[PAYMENT] Sanitized data:", sanitized);

    // Validate using zod schema
    try {
      donationSchema.parse(sanitized);
    } catch (validationError: any) {
      console.error("[PAYMENT] Validation error:", validationError);
      let issues = "Unknown validation error";
      if (validationError?.errors && Array.isArray(validationError.errors)) {
        issues = validationError.errors.map((e: any) => `${e.path.join(".")}: ${e.message}`).join(", ");
      } else if (validationError?.message) {
        issues = validationError.message;
      }
      return NextResponse.json(
        { error: `Validation failed: ${issues}` },
        { status: 400 }
      );
    }

    // Create order with validated data
    const orderData = await createRazorpayOrder({
      name: sanitized.name,
      email: sanitized.email,
      phone: sanitized.phone,
      amount: sanitized.amount,
      message: sanitized.message,
    });

    console.log(
      `[PAYMENT] Order created successfully - Order ID: ${orderData.orderId}, Amount: ₹${sanitized.amount}`
    );

    return NextResponse.json(
      {
        success: true,
        orderId: orderData.orderId,
        amount: orderData.amount,
        currency: orderData.currency,
        reference: orderData.reference,
        keyId: razorpayConfig.keyId, // Send public key to frontend
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[PAYMENT] Order Creation Error:", error.message);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to create payment order",
      },
      { status: 500 }
    );
  }
}
