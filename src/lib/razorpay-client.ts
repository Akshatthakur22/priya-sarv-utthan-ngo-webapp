/** Client-safe Razorpay types and helpers (no server secrets) */

export interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export function logPaymentEvent(event: string, data?: { orderId?: string; paymentId?: string; status?: string }) {
  if (process.env.NODE_ENV === "development") {
    console.log(`[PAYMENT] ${event}`, data ? { orderId: data.orderId, paymentId: data.paymentId } : "");
  }
}
