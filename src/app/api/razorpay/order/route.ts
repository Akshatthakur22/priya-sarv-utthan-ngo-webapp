/**
 * POST /api/razorpay/order
 * Create Razorpay order
 */

import { NextRequest, NextResponse } from "next/server";
import { createRazorpayOrder } from "@/services/payment.service";
import { razorpayConfig } from "@/lib/razorpay";
import { donationSchema, sanitizeString } from "@/lib/validation";
import { donationRateLimit, getRateLimitHeaders } from "@/lib/rate-limit";

if (!razorpayConfig.keyId || !razorpayConfig.keySecret) {
  console.error("[PAYMENT] Missing Razorpay credentials");
}

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await donationRateLimit(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many donation attempts. Please try again later." },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
      );
    }

    const body = await request.json();

    const sanitized = {
      name: sanitizeString(body.name || ""),
      email: sanitizeString(body.email || ""),
      phone: body.phone ? sanitizeString(body.phone) : undefined,
      amount: body.amount,
      message: body.message ? sanitizeString(body.message) : undefined,
    };

    try {
      donationSchema.parse(sanitized);
    } catch (validationError: unknown) {
      const err = validationError as { errors?: Array<{ path: string[]; message: string }>; message?: string };
      let issues = "Invalid donation data";
      if (err?.errors && Array.isArray(err.errors)) {
        issues = err.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ");
      } else if (err?.message) {
        issues = err.message;
      }
      return NextResponse.json(
        { error: `Validation failed: ${issues}` },
        { status: 400, headers: getRateLimitHeaders(rateLimitResult) }
      );
    }

    const orderData = await createRazorpayOrder({
      name: sanitized.name,
      email: sanitized.email,
      phone: sanitized.phone,
      amount: sanitized.amount,
      message: sanitized.message,
    });

    return NextResponse.json(
      {
        success: true,
        orderId: orderData.orderId,
        amount: orderData.amount,
        currency: orderData.currency,
        reference: orderData.reference,
        keyId: razorpayConfig.keyId,
      },
      { status: 200, headers: getRateLimitHeaders(rateLimitResult) }
    );
  } catch {
    console.error("[PAYMENT] Order creation error");

    return NextResponse.json(
      { success: false, error: "Failed to create payment order" },
      { status: 500 }
    );
  }
}
