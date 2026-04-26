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

  const cleanName = cleanValue(donation.name) || "Anonymous Donor";
  const cleanEmail = cleanValue(donation.email)?.toLowerCase();
  const cleanPhone = cleanValue(donation.phone);
  const cleanMessage = cleanValue(donation.message);

  if (!cleanEmail || !cleanEmail.includes("@")) {
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
          donor_name: cleanName,
          donor_email: cleanEmail,
          donor_phone: cleanPhone || "",
          message: cleanMessage || "",
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
 * Verify Razorpay webhook signature
 */
export function verifyWebhookSignature(
  body: string,
  signature: string,
  secret: string
): boolean {
  try {
    const hash = crypto.createHmac("sha256", secret).update(body).digest("hex");
    return hash === signature;
  } catch (error: any) {
    console.error("[PAYMENT] Webhook Signature Error:", error.message);
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
 * Utility: Clean string values (production-grade)
 * Returns null for empty/whitespace/fake values
 */
function cleanValue(value?: string | null): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (
    trimmed === "" ||
    /^n\/?a$/i.test(trimmed) ||
    /^undefined$/i.test(trimmed) ||
    /^null$/i.test(trimmed)
  ) {
    return null;
  }
  return trimmed;
}

/**
 * Extract donor name with fallback
 * Priority: notes.donor_name > "Anonymous Donor"
 */
function extractDonorName(notes?: Record<string, any>): string {
  const name = cleanValue(notes?.donor_name);
  return name || "Anonymous Donor";
}

/**
 * Extract donor email with validation
 * Priority: payment.email > notes.donor_email > null
 */
function extractDonorEmail(payment: any): string | null {
  const email = cleanValue(payment?.email) || cleanValue(payment?.notes?.donor_email);
  
  // Validate email format
  if (email && email.includes("@") && email.length > 5) {
    return email.toLowerCase();
  }
  return null;
}

/**
 * Extract donor phone with strict priority
 * CRITICAL: Only trust real phone numbers, NEVER fake/placeholder values
 * Priority: payment.contact > notes.donor_phone > null
 */
function extractDonorPhone(payment: any): string | null {
  // Priority 1: Razorpay contact field (user-entered during checkout)
  const contact = cleanValue(payment?.contact);
  if (contact) {
    return contact;
  }

  // Priority 2: Notes from order creation
  const donorPhone = cleanValue(payment?.notes?.donor_phone);
  if (donorPhone) {
    return donorPhone;
  }

  // NEVER use fake values - better to have null than "N/A"
  return null;
}

/**
 * Store donation in PostgreSQL database (PRODUCTION-GRADE)
 * Called by /api/razorpay/verify as single source of truth
 * Uses payment_id UNIQUE constraint to prevent duplicates
 */
export async function saveDonationToDatabase(data: {
  orderId: string;
  paymentId: string;
  donorName: string;
  donorEmail: string | null;
  donorPhone: string | null;
  amount: number;
  status: "pending" | "completed" | "failed";
  createdAt: Date;
}) {
  try {
    const { queryDatabase } = await import("@/lib/database");

    // Extract donor data with proper cleaning
    const donorName = cleanValue(data.donorName) || "Anonymous Donor";
    const donorEmail = cleanValue(data.donorEmail);
    const donorPhone = cleanValue(data.donorPhone);

    console.log("[PAYMENT] Saving to PostgreSQL:", {
      paymentId: data.paymentId,
      donorName,
      amount: data.amount,
      donorPhone: donorPhone || "(not provided)",
    });

    // Insert with ON CONFLICT DO NOTHING for idempotency
    const result = await queryDatabase(
      `
      INSERT INTO donations (
        order_id,
        payment_id,
        donor_name,
        donor_email,
        donor_phone,
        amount,
        status,
        created_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (payment_id) DO NOTHING
      RETURNING id, payment_id, created_at;
      `,
      [
        data.orderId,
        data.paymentId,
        donorName,
        donorEmail,
        donorPhone,
        Math.round(data.amount), // Amount is already in rupees
        data.status,
        data.createdAt.toISOString(),
      ]
    );

    if (!result.rows || result.rows.length === 0) {
      // Already exists (idempotent - this is safe)
      console.log(`[PAYMENT] Donation already in database for ${data.paymentId}`);
      return {
        id: null,
        paymentId: data.paymentId,
        createdAt: data.createdAt.toISOString(),
        isNewRecord: false,
      };
    }

    const record = result.rows[0];
    console.log(`[PAYMENT] ✅ Donation saved to PostgreSQL - ID: ${record.id}`);

    return {
      id: record.id,
      paymentId: record.payment_id,
      createdAt: record.created_at,
      isNewRecord: true,
    };
  } catch (error: any) {
    console.error("[PAYMENT] Database Error:", error.message);
    throw new Error(`Failed to save donation: ${error.message}`);
  }
}

/**
 * Process captured payment and save donation
 */
export async function processPaymentVerification(payment: any, orderId: string) {
  if (!payment?.id) {
    throw new Error("Missing payment id");
  }

  if (payment.status !== "captured") {
    throw new Error(`Payment not captured. Status: ${payment.status}`);
  }

  const donorName = extractDonorName(payment.notes);
  const donorEmail = extractDonorEmail(payment);
  const donorPhone = extractDonorPhone(payment);
  const amount = payment.amount / 100;

  console.log("[PAYMENT] Extracted donor info:", {
    name: donorName,
    email: donorEmail,
    phone: donorPhone || "(not provided)",
    amount,
  });

  const result = await saveDonationToDatabase({
    orderId,
    paymentId: payment.id,
    donorName,
    donorEmail,
    donorPhone,
    amount,
    status: "completed",
    createdAt: payment?.created_at
      ? new Date(payment.created_at * 1000)
      : new Date(),
  });

  return {
    success: true,
    paymentId: payment.id,
    donorName,
    donorEmail,
    donorPhone,
    amount,
    recordId: result.id,
    isNewRecord: result.isNewRecord,
  };
}

/**
 * Process failed payment event and save minimal record
 */
export async function processFailedPaymentEvent(payment: any) {
  if (!payment?.id) {
    throw new Error("Missing payment id");
  }

  const donorName = extractDonorName(payment?.notes);
  const donorEmail = extractDonorEmail(payment);
  const donorPhone = extractDonorPhone(payment);

  return saveDonationToDatabase({
    orderId: payment?.order_id || "",
    paymentId: payment?.id,
    donorName,
    donorEmail,
    donorPhone,
    amount: (payment?.amount || 0) / 100,
    status: "failed",
    createdAt: payment?.created_at
      ? new Date(payment.created_at * 1000)
      : new Date(),
  });
}
