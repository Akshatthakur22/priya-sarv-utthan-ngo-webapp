/**
 * Payment Service Layer
 * Handles all payment-related business logic
 */

import crypto from "crypto";
import { razorpayConfig, DonationData, validateDonationAmount, generateDonationRef } from "@/lib/razorpay";

const RAZORPAY_API_URL = "https://api.razorpay.com/v1";

/**
 * Create a Razorpay order
 * @param donation - Donation data from user
 * @returns order_id from Razorpay
 */
export async function createRazorpayOrder(donation: DonationData) {
  // Validate amount
  if (!validateDonationAmount(donation.amount)) {
    throw new Error(`Amount must be between ₹1 and ₹1,00,000`);
  }

  // Validate email
  if (!donation.email || !donation.email.includes("@")) {
    throw new Error("Valid email is required");
  }

  // Convert rupees to paise
  const amountInPaise = Math.round(donation.amount * 100);

  // Generate reference ID
  const donationRef = generateDonationRef();

  try {
    const auth = Buffer.from(
      `${razorpayConfig.keyId}:${razorpayConfig.keySecret}`
    ).toString("base64");

    const response = await fetch(`${RAZORPAY_API_URL}/orders`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: "INR",
        receipt: donationRef,
        notes: {
          donor_name: donation.name,
          donor_email: donation.email,
          donor_phone: donation.phone || "N/A",
          message: donation.message || "No message",
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Razorpay API Error: ${error.error?.description || "Unknown error"}`);
    }

    const order = await response.json();
    return {
      orderId: order.id,
      amount: amountInPaise,
      currency: "INR",
      reference: donationRef,
    };
  } catch (error: any) {
    console.error("[PAYMENT] Order Creation Failed:", error.message);
    throw new Error(`Failed to create payment order: ${error.message}`);
  }
}

/**
 * Verify Razorpay payment signature (CRITICAL SECURITY)
 * @param orderId - Razorpay order ID
 * @param paymentId - Razorpay payment ID
 * @param signature - Razorpay signature from client
 * @returns true if valid, false if invalid
 */
export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  try {
    // Create HMAC SHA256 signature
    const generatedSignature = crypto
      .createHmac("sha256", razorpayConfig.keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    // Compare with received signature
    const isValid = generatedSignature === signature;

    if (isValid) {
      console.log(`[PAYMENT] Signature verified for payment ${paymentId}`);
    } else {
      console.warn(
        `[PAYMENT] Signature mismatch for payment ${paymentId}. Expected: ${generatedSignature}, Got: ${signature}`
      );
    }

    return isValid;
  } catch (error: any) {
    console.error("[PAYMENT] Signature Verification Error:", error.message);
    return false;
  }
}

/**
 * Fetch payment details from Razorpay API
 * @param paymentId - Razorpay payment ID
 * @returns Payment details or null if not found
 */
export async function fetchPaymentDetails(paymentId: string) {
  try {
    const auth = Buffer.from(
      `${razorpayConfig.keyId}:${razorpayConfig.keySecret}`
    ).toString("base64");

    const response = await fetch(`${RAZORPAY_API_URL}/payments/${paymentId}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch payment: ${response.statusText}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("[PAYMENT] Fetch Payment Error:", error.message);
    return null;
  }
}

/**
 * Store donation in PostgreSQL database
 * Uses payment_id as unique constraint to prevent duplicate donations
 */
export async function storeDonationRecord(data: {
  orderId: string;
  paymentId: string;
  amount: number;
  currency: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  donorMessage?: string;
  status: "pending" | "completed" | "failed";
  timestamp: Date;
}) {
  try {
    // Lazy import to avoid issues during build time
    const { queryDatabase } = await import("@/lib/database");

    const result = await queryDatabase(
      `
      INSERT INTO donations (
        order_id,
        payment_id,
        amount,
        currency,
        donor_name,
        donor_email,
        donor_phone,
        donor_message,
        status,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (payment_id) DO UPDATE 
      SET updated_at = CURRENT_TIMESTAMP
      RETURNING id, payment_id, created_at;
      `,
      [
        data.orderId,
        data.paymentId,
        data.amount,
        data.currency,
        data.donorName,
        data.donorEmail,
        data.donorPhone || null,
        data.donorMessage || null,
        data.status,
        data.timestamp,
      ]
    );

    if (!result.rows || result.rows.length === 0) {
      throw new Error("Failed to insert donation record");
    }

    const record = result.rows[0];

    console.log(
      `[PAYMENT] Donation stored successfully - Record ID: ${record.id}, Payment ID: ${record.payment_id}`
    );

    return {
      id: record.id,
      paymentId: record.payment_id,
      createdAt: record.created_at,
    };
  } catch (error: any) {
    console.error("[PAYMENT] Store Donation Error:", error.message);
    throw new Error(`Failed to store donation: ${error.message}`);
  }
}
