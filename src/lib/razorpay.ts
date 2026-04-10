/**
 * Razorpay Configuration & Utilities
 * Handles all Razorpay setup and helper functions
 */

export const razorpayConfig = {
  // Public key (safe to expose in frontend)
  keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
  
  // Private key (NEVER expose, server-only)
  keySecret: process.env.RAZORPAY_KEY_SECRET || "",
};

/**
 * Razorpay Checkout Options
 * Passed to Razorpay checkout script on frontend
 */
export interface RazorpayCheckoutOptions {
  key: string;
  amount: number; // In paise (₹1 = 100 paise)
  currency: string;
  name: string;
  description?: string;
  image?: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  handler?: (response: RazorpayPaymentResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

/**
 * Response from Razorpay after successful payment
 */
export interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

/**
 * Donation data structure
 */
export interface DonationData {
  name: string;
  email: string;
  amount: number;
  phone?: string;
  message?: string;
}

/**
 * Validation helper for donation amount
 */
export const validateDonationAmount = (amount: number): boolean => {
  const min = 1;
  const max = 100000;
  return amount >= min && amount <= max;
};

/**
 * Generate donation reference ID
 */
export const generateDonationRef = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `PSUF${timestamp}${random}`;
};

/**
 * Log for debugging (server-side)
 */
export const logPaymentEvent = (event: string, data: any) => {
  console.log(`[PAYMENT] ${event}:`, data);
};
