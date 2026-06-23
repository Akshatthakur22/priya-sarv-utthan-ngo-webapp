/**
 * Razorpay server configuration (NEVER import from client components)
 */

export const razorpayConfig = {
  keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
  keySecret: process.env.RAZORPAY_KEY_SECRET || "",
};

export interface DonationData {
  name: string;
  email: string;
  amount: number;
  phone?: string;
  message?: string;
}

export const validateDonationAmount = (amount: number): boolean => {
  return amount >= 1 && amount <= 100000;
};

export const generateDonationRef = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `PSUF${timestamp}${random}`;
};

/** Server-side payment event logging — never logs PII or signatures */
export function logPaymentEvent(
  event: string,
  data?: { orderId?: string; paymentId?: string; status?: string }
) {
  if (process.env.NODE_ENV === "development") {
    console.log(`[PAYMENT] ${event}`, data ?? "");
  }
}
