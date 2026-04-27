"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Loader,
  Check,
  AlertCircle,
  Award,
  Mail,
  Shield,
  Users,
  TrendingUp,
  Zap,
  Share2,
  RefreshCw,
} from "lucide-react";
import { RazorpayPaymentResponse, logPaymentEvent } from "@/lib/razorpay";
import { siteConfig } from "@/lib/config";

// ─── Donation tiers – micro-entry included for low-budget donors ─────────────
const DONATION_TIERS = [
  { amount: 10,   impact: "Feed a child tonight",       icon: "🍱",  label: "Just ₹10" },
  { amount: 50,   impact: "A week of meals",       icon: "🍲",  label: "₹50" },
  { amount: 100,  impact: "One child, one full month",   icon: "❤️",  label: "₹100" },
  { amount: 500,  impact: "Change a child's life this month",      icon: "✨",  label: "₹500", popular: true },
  { amount: 1000, impact: "Education for 2 children",    icon: "📚",  label: "₹1000" },
  { amount: 5000, impact: "Full year of care for a child",    icon: "🌟",  label: "₹5000" },
];

// ─── Emotional success messages keyed by amount ───────────────────────────────
const SUCCESS_MESSAGES: Record<number, string> = {
  10:   "Even ₹10 matters — tonight, a child will eat because of you ❤️",
  50:   "You just gave someone a week of meals. Real impact. Right now. 🙏",
  100:  "One child. One full month. You made that happen ❤️",
  500:  "This month, because of you, a child has food security and a chance to dream ✨",
  1000: "You just changed the path for 2 children — education, meals, hope 🌟",
  5000: "One full year of care. One child's entire life changes because of your heart 🌟",
};

// ─── Default values (will be overridden by API) ──────────────────────────────
const DEFAULT_GOAL = {
  target:  5000,   // ₹5L target
  raised:  0,        // Will be fetched
  donors:  0,        // Will be fetched
  period:  "this month",
};

const DEFAULT_SOCIAL_PROOF = {
  donors: "0",
  raised: "₹0",
  period: "this month",
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface PaymentState {
  status: "idle" | "loading" | "processing" | "success" | "error";
  message: string;
  orderId?: string;
  paymentId?: string;
  receiptEmail?: string;
}

interface DonorInfo {
  name: string;
  email: string;
  phone?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatINR(n: number): string {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000)   return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────


/** Loss-aversion emotional section */
function LossAversionBanner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="mx-auto max-w-2xl px-4 mb-4"
    >
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-2xl px-5 py-4 text-center">
        <p className="text-sm font-black text-red-700 leading-snug">
          🌙 Tonight, children will sleep hungry.
        </p>
        <p className="text-sm text-red-600 mt-1.5 font-semibold">
          Your donation — even ₹10 — changes everything.
        </p>
      </div>
    </motion.div>
  );
}


/** Enhanced success screen with identity reinforcement + share */
function SuccessScreen({
  amount,
  paymentId,
  receiptEmail,
  successMessage,
  onReceiptChange,
  onDonateAgain,
}: {
  amount: number | "";
  paymentId?: string;
  receiptEmail?: string;
  successMessage: string;
  onReceiptChange: (email: string) => void;
  onDonateAgain: () => void;
}) {
  // Get impact message for this donation amount
  const impactTier = DONATION_TIERS.find((t) => t.amount === amount);
  const impactMessage = impactTier?.impact || "Made a real difference";
  
  // WhatsApp message generator with variations for A/B testing
function generateWhatsAppMessage(amount: number, variation: 'A' | 'B' | 'C' = 'A'): string {
  const donationLink = "https://priyasarvutthan.org/donate";
  
  const messages = {
    A: `🌟 Just donated ₹${amount} to help children in need!

Every small act creates big change 💚
Together we can make a real difference!

🙏 Join me: ${donationLink}`,
    
    B: `💫 Making a difference, one child at a time!

I just contributed ₹${amount} to Priya Sarv Utthan 🏫
Your support can change lives too!

🤝 Be the change: ${donationLink}`,
    
    C: `🚀 Empowering communities through education!

My donation of ₹${amount} will help provide meals & learning 📚
Will you join this beautiful mission?

✨ Start your impact: ${donationLink}`
  };
  
  return messages[variation];
}

// Get random variation for A/B testing
function getRandomVariation(): 'A' | 'B' | 'C' {
  const variations: ('A' | 'B' | 'C')[] = ['A', 'B', 'C'];
  return variations[Math.floor(Math.random() * variations.length)];
}

// Safe amount handling
const safeAmount = typeof amount === "number" ? amount : 0;

// Generate WhatsApp share message with stable variation
const [currentVariation] = useState(getRandomVariation());
const shareText = generateWhatsAppMessage(safeAmount, currentVariation);
const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

// Track WhatsApp share performance
const handleWhatsAppShare = () => {
  // Log analytics for A/B testing (development only)
  if (process.env.NODE_ENV === "development") {
    console.log(`[WHATSAPP_SHARE] Variation: ${currentVariation}, Amount: ${safeAmount}`);
  }
  
  // Track conversion event (you can integrate with Google Analytics, etc.)
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', 'whatsapp_share', {
      variation: currentVariation,
      amount: safeAmount,
      ngo_name: 'Priya Sarv Utthan'
    });
  }
  
  // Open WhatsApp
  window.open(whatsappUrl, '_blank');
};

  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="mb-6 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 border-2 border-emerald-300 rounded-3xl overflow-hidden shadow-xl"
    >
      {/* Celebratory top bar */}
      <div className="h-2 bg-gradient-to-r from-emerald-400 via-amber-400 to-red-400" />

      <div className="p-6 md:p-8 text-center">
        {/* Celebration emoji */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1] }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          className="text-6xl mb-3"
        >
          💚
        </motion.div>

        {/* Identity reinforcement headline */}
        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-black text-emerald-900 text-xl md:text-2xl mb-2 leading-tight"
        >
          You changed a life today
        </motion.h3>

        {/* Impact message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-emerald-700 font-bold text-base mb-5 leading-relaxed"
        >
          {successMessage}
        </motion.p>

        {/* Amount confirmation pill */}
        <div className="inline-flex items-center gap-2 bg-emerald-100 rounded-full px-4 py-2 mb-5 shadow-sm">
          <Check size={16} className="text-emerald-700" />
          <span className="text-sm font-black text-emerald-800">
            ₹{typeof amount === "number" ? amount : 0} confirmed
          </span>
        </div>

        {paymentId && (
          <p className="text-xs text-neutral-500 font-mono mb-6">
            Payment ID: {paymentId}
          </p>
        )}

        {/* Share + Donate again buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <motion.button
            type="button"
            onClick={handleWhatsAppShare}
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white rounded-2xl font-black text-sm shadow-lg hover:bg-[#1ebe5d] transition-all hover:shadow-xl"
          >
            <Share2 size={16} />
            Invite friends 💚
          </motion.button>
          <motion.button
            type="button"
            onClick={onDonateAgain}
            whileTap={{ scale: 0.96 }}
            className="flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-2xl font-black text-sm shadow-md hover:bg-emerald-700 transition-colors"
          >
            <RefreshCw size={16} />
            Again
          </motion.button>
        </div>

        {/* Receipt email */}
        {!receiptEmail ? (
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Get 80G receipt via email"
              className="flex-1 px-4 py-2.5 rounded-xl border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
              onChange={(e) => onReceiptChange(e.target.value)}
            />
            <button
              type="button"
              disabled
              className="px-4 py-2.5 bg-emerald-400 text-white rounded-xl font-bold opacity-60 cursor-not-allowed transition-all text-sm flex items-center gap-2"
            >
              <Mail size={15} /> Send
            </button>
          </div>
        ) : (
          <p className="text-sm text-emerald-600">
            ✓ Receipt sent to{" "}
            <span className="font-semibold">{receiptEmail}</span>
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DonateClient() {
  const [mounted, setMounted] = useState(false);
  const [amount, setAmount] = useState<number | "">(500);
  const [donorInfo, setDonorInfo] = useState<DonorInfo>({
    name: "",
    email: "",
    phone: "",
  });
  const [paymentState, setPaymentState] = useState<PaymentState>({
    status: "idle",
    message: "",
  });

  const mainCtaRef = useRef<HTMLButtonElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return; // Only run after hydration
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (mainCtaRef.current) observer.observe(mainCtaRef.current);
    return () => observer.disconnect();
  }, [mounted]);

  // ─── Payment Logic (unchanged) ────────────────────────────────────────────

  const loadRazorpayScript = useCallback(async (): Promise<boolean> => {
    return new Promise((resolve) => {
      // Check if already loaded
      if ((window as any).Razorpay) { 
        if (process.env.NODE_ENV === "development") console.log("[RAZORPAY] Already loaded");
        resolve(true); 
        return; 
      }

      // Check if script already exists
      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );

      if (existingScript) {
        if (process.env.NODE_ENV === "development") console.log("[RAZORPAY] Script already exists, waiting for load");
        const handleLoad = () => {
          if (process.env.NODE_ENV === "development") console.log("[RAZORPAY] Existing script loaded");
          existingScript.removeEventListener("load", handleLoad);
          existingScript.removeEventListener("error", handleError);
          resolve(true);
        };
        const handleError = () => {
          console.error("[RAZORPAY] Existing script failed to load");
          existingScript.removeEventListener("load", handleLoad);
          existingScript.removeEventListener("error", handleError);
          resolve(false);
        };
        existingScript.addEventListener("load", handleLoad);
        existingScript.addEventListener("error", handleError);
        return;
      }

      if (process.env.NODE_ENV === "development") console.log("[RAZORPAY] Creating new script tag");
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      const handleLoad = () => {
        if (process.env.NODE_ENV === "development") console.log("[RAZORPAY] Script loaded, Razorpay available:", !!(window as any).Razorpay);
        script.removeEventListener("load", handleLoad);
        script.removeEventListener("error", handleError);
        // Wait a tick to ensure global is set
        setTimeout(() => {
          const isAvailable = !!(window as any).Razorpay;
          if (process.env.NODE_ENV === "development") console.log("[RAZORPAY] After delay, available:", isAvailable);
          resolve(isAvailable);
        }, 100);
      };

      const handleError = () => {
        console.error("[RAZORPAY] Script load error");
        script.removeEventListener("load", handleLoad);
        script.removeEventListener("error", handleError);
        setPaymentState({ 
          status: "error", 
          message: "Payment gateway unavailable. Please check your internet and try again." 
        });
        resolve(false);
      };

      script.onload = handleLoad;
      script.onerror = handleError;
      
      // Timeout fallback
      const timeout = setTimeout(() => {
        const isAvailable = !!(window as any).Razorpay;
        if (process.env.NODE_ENV === "development") console.log("[RAZORPAY] Timeout check, available:", isAvailable);
        if (isAvailable) {
          resolve(true);
        } else {
          console.warn("[RAZORPAY] Timeout - Razorpay not available");
          resolve(false);
        }
      }, 6000);

      script.addEventListener("load", () => {
        clearTimeout(timeout);
      });
      script.addEventListener("error", () => {
        clearTimeout(timeout);
      });

      if (process.env.NODE_ENV === "development") console.log("[RAZORPAY] Appending script to body");
      document.body.appendChild(script);
    });
  }, []);

  const createOrder = async () => {
    try {
      setPaymentState({ status: "loading", message: "Preparing your secure donation..." });
      const response = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: donorInfo.name, 
          email: donorInfo.email, 
          phone: donorInfo.phone,
          amount: Math.round(amount as number) 
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Failed to create order");
      return data;
    } catch (error: any) {
      setPaymentState({ status: "error", message: error.message || "Failed to initialize payment" });
      throw error;
    }
  };

  const openRazorpayCheckout = async (orderData: any) => {
    if (process.env.NODE_ENV === "development") console.log("[RAZORPAY] Starting checkout with order:", orderData.orderId);
    
    const scriptLoaded = await loadRazorpayScript();
    if (process.env.NODE_ENV === "development") console.log("[RAZORPAY] Script load result:", scriptLoaded);

    if (!scriptLoaded) {
      console.error("[RAZORPAY] Script failed to load");
      setPaymentState({ 
        status: "error", 
        message: "Payment gateway unavailable. Please check your internet connection and try again." 
      });
      return;
    }

    // Verify Razorpay is actually available
    const RazorpayGlobal = (window as any).Razorpay;
    if (!RazorpayGlobal) {
      console.error("[RAZORPAY] Razorpay object not found in window");
      setPaymentState({ 
        status: "error", 
        message: "Payment gateway is not responding. Please reload the page and try again." 
      });
      return;
    }

    if (process.env.NODE_ENV === "development") console.log("[RAZORPAY] Creating checkout options");
    const options = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: siteConfig.name,
      description: `Donation – ${DONATION_TIERS.find((t) => t.amount === amount)?.impact || "Support"}`,
      order_id: orderData.orderId,
      image: "/images/logo.png",
      prefill: {
        name: donorInfo.name,
        email: donorInfo.email,
        contact: donorInfo.phone || "",
      },
      notes: {
        donation_type: "single",
        impact: DONATION_TIERS.find((t) => t.amount === amount)?.impact || "General",
      },
      handler: async (response: RazorpayPaymentResponse) => { 
        if (process.env.NODE_ENV === "development") console.log("[RAZORPAY] Payment handler called with response:", response);
        await verifyPayment(response); 
      },
      modal: {
        ondismiss: () => {
          if (process.env.NODE_ENV === "development") console.log("[RAZORPAY] Payment modal dismissed");
          setPaymentState({ status: "error", message: "Payment cancelled. No amount was charged." });
        },
      },
      theme: { color: "#10b981" },
    };

    try {
      if (process.env.NODE_ENV === "development") console.log("[RAZORPAY] Creating Razorpay instance");
      const checkout = new RazorpayGlobal(options);
      
      checkout.on("payment.failed", (error: any) => {
        console.error("[RAZORPAY] Payment failed event:", error);
        const errorMessage = error?.error?.description || error?.error?.reason || "Payment failed";
        const errorCode = error?.error?.code || "UNKNOWN";
        setPaymentState({
          status: "error",
          message: `Payment failed: ${errorMessage}. Please try again.`,
          paymentId: error?.metadata?.payment_id,
        });
        logPaymentEvent("Payment Failed", { orderId: orderData.orderId, errorCode, errorMessage });
      });

      if (process.env.NODE_ENV === "development") console.log("[RAZORPAY] Opening checkout modal");
      checkout.open();
    } catch (error: any) {
      console.error("[RAZORPAY] Error creating/opening checkout:", error);
      setPaymentState({
        status: "error",
        message: `Something went wrong: ${error?.message || "Unable to open payment dialog"}. Please reload and try again.`,
      });
    }
  };

  const verifyPayment = async (response: RazorpayPaymentResponse, retryCount = 0) => {
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 2000;
    try {
      setPaymentState((prev) => ({
        ...prev,
        status: "processing",
        message: retryCount === 0
          ? "Securing your donation..."
          : `Verifying payment (attempt ${retryCount + 1}/${MAX_RETRIES})...`,
        paymentId: response.razorpay_payment_id,
      }));

      const verifyResponse = await fetch("/api/razorpay/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        }),
      });

      const data = await verifyResponse.json();

      if (verifyResponse.ok && data.success) {
        // ✅ Backend verified payment & saved donation (single source of truth)
        setPaymentState({
          status: "success",
          message: "Thank you! Your donation has been received.",
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          receiptEmail: donorInfo.email,
        });
        return;
      }

      if (data.retryable && retryCount < MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        await verifyPayment(response, retryCount + 1);
        return;
      }

      if (retryCount >= MAX_RETRIES) {
        setPaymentState({
          status: "error",
          message: `Your payment (ID: ${response.razorpay_payment_id}) was likely successful but we're having trouble confirming it. Please check your email or contact support with your Payment ID.`,
          paymentId: response.razorpay_payment_id,
        });
        return;
      }

      throw new Error(data.error || "Payment verification failed");
    } catch (error: any) {
      setPaymentState({
        status: "error",
        message: error.message || "Payment verification failed. Please contact support if amount was deducted.",
        paymentId: response.razorpay_payment_id,
      });
    }
  };

  // ─── Shared donate trigger ─────────────────────────────────────────────────
  const triggerDonation = async (overrideAmount?: number) => {
    // Validate donor info
    if (!donorInfo.name || donorInfo.name.trim().length === 0) {
      setPaymentState({ 
        status: "error", 
        message: "Please enter your name" 
      });
      return;
    }

    if (!donorInfo.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorInfo.email)) {
      setPaymentState({ 
        status: "error", 
        message: "Please enter a valid email address" 
      });
      return;
    }

    const finalAmount = overrideAmount ?? (amount as number);
    if (!finalAmount || finalAmount <= 0 || finalAmount < siteConfig.donationMinAmount) {
      setPaymentState({ 
        status: "error", 
        message: `Please enter an amount of at least ₹${siteConfig.donationMinAmount}` 
      });
      return;
    }
    if (finalAmount > 100000) {
      setPaymentState({ 
        status: "error", 
        message: "Maximum donation is ₹100,000. Please reduce the amount." 
      });
      return;
    }
    if (overrideAmount) setAmount(overrideAmount);
    try {
      const orderData = await createOrder();
      await openRazorpayCheckout(orderData);
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    await triggerDonation();
  };

  const handleDonateAgain = () => {
    setPaymentState({ status: "idle", message: "" });
    setAmount(500);
  };

  const isProcessing =
    paymentState.status === "loading" || paymentState.status === "processing";

  const successMessage =
    SUCCESS_MESSAGES[amount as number] ??
    `You changed someone's life with ₹${amount} 💚`;

  // Dynamic emotion-first CTA based on amount
  const getCtaLabel = (amt: number | "") => {
    if (!amt) return "Choose amount to help 💚";
    const tier = DONATION_TIERS.find(t => t.amount === amt);
    if (tier?.amount === 10) return "Feed someone tonight ❤️";
    if (tier?.amount === 50) return "Give a week of meals 🍱";
    if (tier?.amount === 100) return "Change one child's month 💚";
    if (tier?.amount === 500) return "Transform a life this month ✨";
    if (tier?.amount === 1000) return "Education for 2 children 📚";
    if (tier?.amount === 5000) return "Full year of hope 🌟";
    return `Help with ₹${amt} 💚`;
  };

  // Dynamic impact subtext
  const getImpactSubtext = (amt: number | "") => {
    if (!amt) return "";
    const tier = DONATION_TIERS.find(t => t.amount === amt);
    return tier?.impact || "";
  };

  const ctaLabel = getCtaLabel(amount);
  const impactSubtext = getImpactSubtext(amount);

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-orange-50 pb-28 md:pb-0" suppressHydrationWarning>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <motion.section
        className="relative px-4 pt-8 pb-4 md:pt-14 md:pb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Credibility pill */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-3 inline-flex items-center gap-2 bg-white/90 backdrop-blur border border-emerald-100 text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md"
        >
          <Award size={12} className="text-amber-500" />
          27 Years of Impact · 80G Certified
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-3xl md:text-5xl font-black text-neutral-900 leading-tight mb-3"
        >
          Help a child eat{" "}
          <span className="bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">today</span>
        </motion.h1>

        <motion.p
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-base text-neutral-600 max-w-sm mx-auto mb-5 font-semibold leading-relaxed"
        >
          27 years serving children. Every ₹10 changes a life.
        </motion.p>

        {/* Impact image */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="relative max-w-sm mx-auto rounded-2xl overflow-hidden shadow-xl"
        >
          <Image
            src="/images/donation-children.png"
            alt="Children benefiting from donations"
            width={500}
            height={220}
            className="w-full h-44 md:h-56 object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 via-transparent to-transparent" />

          {/* Floating social proof on image */}
          
        </motion.div>
      </motion.section>

      {/* ── Goal progress bar ────────────────────────────────────────────────── */}

      {/* ── Loss aversion / emotional banner ────────────────────────────────── */}
      <LossAversionBanner />

      {/* ── Main donation card ───────────────────────────────────────────────── */}
      <motion.div
        className="max-w-2xl mx-auto px-4 pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        {/* ── Status messages ── */}
        <AnimatePresence mode="wait">
          {paymentState.status === "success" && (
            <SuccessScreen
              key="success"
              amount={amount}
              paymentId={paymentState.paymentId}
              receiptEmail={paymentState.receiptEmail}
              successMessage={successMessage}
              onReceiptChange={(email) =>
                setPaymentState((prev) => ({ ...prev, receiptEmail: email }))
              }
              onDonateAgain={handleDonateAgain}
            />
          )}

          {paymentState.status === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-5 bg-red-50 border-2 border-red-200 rounded-2xl"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-black text-red-900 text-sm mb-0.5">Something went wrong</p>
                  <p className="text-sm text-red-700">{paymentState.message}</p>
                </div>
              </div>
            </motion.div>
          )}

          {isProcessing && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-5 bg-blue-50 border-2 border-blue-200 rounded-2xl flex items-center gap-3"
            >
              <Loader className="text-blue-600 animate-spin shrink-0" size={18} />
              <p className="text-sm font-semibold text-blue-700">{paymentState.message}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Donation form ── */}
        {paymentState.status !== "success" && (
          <motion.form
            onSubmit={handleDonate}
            className="bg-white rounded-3xl p-5 md:p-8 shadow-xl border border-neutral-100 space-y-6"
          >
            {/* Donor Info Section */}
            <div className="border-b border-neutral-200 pb-6">
              <p className="text-xs font-black text-emerald-700 uppercase tracking-widest mb-4">
                👤 Your Information
              </p>
              
              {/* Name */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-neutral-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={donorInfo.name}
                  onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-neutral-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={donorInfo.email}
                  onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  value={donorInfo.phone}
                  onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value })}
                  placeholder="+91-XXXXXXXXXX"
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />
                <p className="text-xs text-neutral-500 mt-1 font-semibold">
                  For donation receipt and communication
                </p>
              </div>
            </div>

            {/* Section header */}
            <div>
              <p className="text-xs font-black text-emerald-700 uppercase tracking-widest mb-2">
                ✨ Choose your impact
              </p>
              <p className="text-sm text-neutral-600 font-semibold mb-5">
                Every rupee reaches a child. Start with as little as ₹10.
              </p>

              {/* Social proof strip inline */}
          

              {/* Donation tier grid — 3 cols on mobile for compact layout */}
              <div className="grid grid-cols-3 md:grid-cols-3 gap-2.5 mb-6">
                {DONATION_TIERS.map((tier) => {
                  const isSelected = amount === tier.amount;
                  return (
                    <div key={tier.amount} className="relative">
                      {tier.popular && (
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2.5 py-1 rounded-full text-[9px] font-black shadow-lg whitespace-nowrap">
                          ⭐ Popular
                        </div>
                      )}

                      <motion.div
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setAmount(tier.amount)}
                        className={`relative cursor-pointer rounded-2xl transition-all duration-200 overflow-hidden ${
                          isSelected
                            ? "bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-xl ring-2 ring-emerald-400"
                            : tier.popular
                            ? "bg-gradient-to-br from-orange-50 to-amber-50 text-neutral-900 border-2 border-orange-200 hover:border-orange-300"
                            : "bg-white text-neutral-800 border-2 border-neutral-200 hover:border-emerald-300"
                        }`}
                      >
                        {/* Main info */}
                        <div className="p-3 pb-2 text-center">
                          <div className="text-2xl mb-1">{tier.icon}</div>
                          <div className="text-base font-black leading-tight">
                            {tier.label}
                          </div>
                          <div
                            className={`text-[11px] font-bold mt-1.5 leading-tight ${
                              isSelected ? "text-emerald-100" : tier.popular ? "text-orange-700" : "text-neutral-500"
                            }`}
                          >
                            {tier.impact}
                          </div>
                        </div>

                        {/* Quick donate button */}
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            triggerDonation(tier.amount);
                          }}
                          disabled={isProcessing}
                          className={`w-full py-1.5 text-[10px] font-black flex items-center justify-center gap-1 transition-all ${
                            isSelected
                              ? "bg-emerald-700 text-white hover:bg-emerald-800"
                              : tier.popular
                              ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          }`}
                        >
                          <Zap size={9} />
                          Donate
                        </motion.button>
                      </motion.div>
                    </div>
                  );
                })}
              </div>

              {/* Dynamic impact message */}
              {amount && impactSubtext && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-5 p-3 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200"
                >
                  <p className="text-sm font-black text-emerald-900 text-center">
                    💡 {impactSubtext}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Custom amount */}
            <div>
              <label className="block text-xs font-black text-emerald-700 uppercase tracking-widest mb-2">
                Or type your own amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-black text-emerald-600 pointer-events-none">
                  ₹
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    const val = e.target.value ? parseInt(e.target.value) : "";
                    if (val !== "" && typeof val === "number" && val < siteConfig.donationMinAmount) {
                      setAmount(siteConfig.donationMinAmount);
                    } else {
                      setAmount(val);
                    }
                  }}
                  placeholder={`Minimum ₹${siteConfig.donationMinAmount}`}
                  min={siteConfig.donationMinAmount}
                  max={100000}
                  className="w-full pl-10 pr-4 py-3.5 rounded-2xl border-2 border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition text-lg font-semibold bg-emerald-50 focus:bg-white"
                />
              </div>
              <p className="text-xs text-neutral-600 mt-2 font-semibold">
                Even ₹{siteConfig.donationMinAmount} makes a difference · Max ₹100,000
              </p>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-2xl border border-emerald-200">
              <div className="text-center">
                <p className="text-2xl mb-1">🛡️</p>
                <p className="text-xs font-bold text-neutral-700">100% Secure</p>
              </div>
              <div className="text-center">
                <p className="text-2xl mb-1">📜</p>
                <p className="text-xs font-bold text-neutral-700">80G Certified</p>
              </div>
              <div className="text-center">
                <p className="text-2xl mb-1">27️⃣</p>
                <p className="text-xs font-bold text-neutral-700">27 Years</p>
              </div>
            </div>

            {/* Main CTA – emotion-driven copy */}
            <motion.button
              ref={mainCtaRef}
              type="submit"
              disabled={!amount || isProcessing}
              whileHover={!isProcessing && amount ? { scale: 1.02 } : {}}
              whileTap={!isProcessing && amount ? { scale: 0.97 } : {}}
              className={`w-full py-4 px-8 rounded-2xl font-black text-lg flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                amount && !isProcessing
                  ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-emerald-800 cursor-pointer"
                  : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader size={22} className="animate-spin" />
                  <span className="text-base">{paymentState.message}</span>
                </>
              ) : (
                <>
                  <Heart size={24} className="fill-current" />
                  <span>{ctaLabel}</span>
                  {amount && (
                    <span className="text-sm font-semibold text-emerald-100">
                      Takes less than 30 seconds
                    </span>
                  )}
                </>
              )}
            </motion.button>

            <p className="text-center text-xs text-neutral-500 font-semibold">
              100% reaches our mission ·{" "}
              <Link href="/contact" className="text-emerald-600 font-bold hover:underline">
                Help & FAQs
              </Link>
            </p>
          </motion.form>
        )}
      </motion.div>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <motion.div
        className="max-w-2xl mx-auto px-4 pb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-neutral-100">
          <h2 className="text-xl font-black text-neutral-900 mb-6">
            ❓ Your questions, answered
          </h2>
          <div className="space-y-5">
            {[
              {
                q: "Is my donation really secure?",
                a: "100% yes. We use Razorpay, India's most trusted payment gateway with bank-level encryption.",
              },
              {
                q: "Will I get a receipt?",
                a: "Yes, immediately. We'll email your 80G tax receipt and donation acknowledgment within 24 hours.",
              },
              {
                q: "Can I claim this on my taxes?",
                a: "Yes. Priya Sarv Utthan is 80G certified. Your donation is fully tax-deductible under Section 80G.",
              },
              {
                q: "What payment methods work?",
                a: "All cards (Visa, Mastercard, Amex), UPI, net banking, digital wallets — via Razorpay.",
              },
              {
                q: "Where exactly does my money go?",
                a: "Every rupee funds nutrition programs, education, skill training, and women empowerment for children in need.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                className="pb-5 border-b border-neutral-100 last:border-0 last:pb-0"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.05 }}
              >
                <p className="font-black text-neutral-900 mb-2 text-sm">{faq.q}</p>
                <p className="text-neutral-600 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="text-center pb-10 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <p className="text-neutral-600 text-sm font-medium">
          Still have questions?{" "}
          <Link href="/contact" className="text-emerald-600 font-black hover:underline">
            Reach out to us
          </Link>
        </p>
      </motion.div>

      {/* ── Sticky bottom CTA (mobile) ────────────────────────────────────────── */}
      <AnimatePresence>
        {showSticky && paymentState.status !== "success" && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          >
            <div className="h-6 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
            <div className="bg-white/95 backdrop-blur-md border-t border-neutral-200 px-4 py-3 pb-safe">
              <motion.button
                type="button"
                disabled={!amount || isProcessing}
                whileTap={amount && !isProcessing ? { scale: 0.97 } : {}}
                onClick={() => triggerDonation()}
                className={`w-full py-4 rounded-2xl font-black text-base flex flex-col items-center justify-center gap-1.5 transition-all ${
                  amount && !isProcessing
                    ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg active:from-emerald-700"
                    : "bg-neutral-200 text-neutral-400"
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    <span className="text-sm">Securing...</span>
                  </>
                ) : (
                  <>
                    <Heart size={20} className="fill-current" />
                    <span className="text-base">{ctaLabel}</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}