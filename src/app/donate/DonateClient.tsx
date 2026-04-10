"use client";

import { useState, useCallback, useRef, useEffect } from "react";
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
  { amount: 10,   impact: "Start helping",       icon: "❤️",  label: "Just ₹10" },
  { amount: 50,   impact: "Support a meal",       icon: "🍱",  label: "₹50" },
  { amount: 100,  impact: "Feed a child today",   icon: "🍲",  label: "₹100" },
  { amount: 500,  impact: "Food for a week",      icon: "📚",  label: "₹500", popular: true },
  { amount: 1000, impact: "Education support",    icon: "✏️",  label: "₹1000" },
  { amount: 5000, impact: "Full monthly care",    icon: "🏠",  label: "₹5000" },
];

// ─── Emotional success messages keyed by amount ───────────────────────────────
const SUCCESS_MESSAGES: Record<number, string> = {
  10:   "Even ₹10 matters — you just took the first step ❤️",
  50:   "You just helped a child eat today 🙏",
  100:  "You just helped feed a child for a full day ❤️",
  500:  "You just gave a child food security for a week 🙏",
  1000: "You just funded a month of education for a child ✨",
  5000: "You just changed a family's life this month 🌟",
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

interface DonationStats {
  totalAmount: number;
  totalDonors: number;
  todayAmount: number;
  thisMonthAmount: number;
  donationCount: number;
  recentDonations: Array<{
    amount: number;
    timestamp: string;
    donorName: string;
  }>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatINR(n: number): string {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000)   return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Animated fundraising progress bar */
function GoalProgress({ stats }: { stats: DonationStats | null }) {
  const goal = {
    target: DEFAULT_GOAL.target,
    raised: stats?.thisMonthAmount ?? 0,
    donors: stats?.totalDonors ?? 0,
  };

  const pct = Math.min((goal.raised / goal.target) * 100, 100);
  const remaining = goal.target - goal.raised;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mx-auto max-w-2xl px-4 mb-4"
    >
     <div className="bg-white rounded-2xl shadow-md border border-emerald-100 px-5 py-4">

  {/* 🔥 Emotional headline */}
  <div className="flex items-center justify-between mb-2">
    <p className="text-xs font-black text-orange-600 uppercase tracking-widest flex items-center gap-1.5">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
      </span>
      Help us feed children today
    </p>

    <p className="text-xs font-bold text-emerald-700">
      {formatINR(goal.raised)}
    </p>
  </div>

  {/* 🔥 Progress bar */}
  <div className="relative h-3 bg-emerald-100 rounded-full overflow-hidden mb-2">
    <motion.div
      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
      initial={{ width: 0 }}
      animate={{ width: `${pct}%` }}
      transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
    />
  </div>

  {/* 🔥 Emotion + urgency */}
  <div className="flex flex-col gap-1 text-center">

    <p className="text-xs font-semibold text-neutral-600">
      ❤️ {goal.donors}+ people already helped
    </p>

    <p className="text-sm font-bold text-neutral-700">
      Only{" "}
      <span className="text-orange-600 font-black">
        {formatINR(remaining)}
      </span>{" "}
      left to complete {DEFAULT_GOAL.period}'s impact
    </p>

    <p className="text-[11px] text-neutral-400">
      Every ₹10 brings us closer 🙏
    </p>

  </div>
</div>
    </motion.div>
  );
}

/** Loss-aversion emotional section */
function LossAversionBanner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="mx-auto max-w-2xl px-4 mb-4"
    >
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-2xl px-5 py-4 text-center">
        <p className="text-sm font-bold text-neutral-700 leading-snug">
          🌙 Tonight, many children will go to sleep hungry.
        </p>
        <p className="text-sm text-neutral-500 mt-1">
          Your donation — even ₹10 — can change that.
        </p>
      </div>
    </motion.div>
  );
}

/** Social proof strip */
function SocialProofStrip({ stats }: { stats: DonationStats | null }) {
  const donors = stats?.totalDonors ?? 0;
  const raised = formatINR(stats?.thisMonthAmount ?? 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className="flex items-center justify-center gap-6 mb-5"
    >
      <div className="flex items-center gap-2">
        <div className="flex -space-x-1.5">
          {["🧑", "👩", "👦"].map((e, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-xs leading-none"
            >
              {e}
            </div>
          ))}
        </div>
        <p className="text-xs font-black text-neutral-700">
          {donors}+ people donated this month
        </p>
      </div>
      <div className="w-px h-5 bg-neutral-200" />
      <div className="flex items-center gap-1.5">
        <TrendingUp size={13} className="text-emerald-600" />
        <p className="text-xs font-black text-neutral-700">
          {raised} raised this month
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
  stats,
}: {
  amount: number | "";
  paymentId?: string;
  receiptEmail?: string;
  successMessage: string;
  onReceiptChange: (email: string) => void;
  onDonateAgain: () => void;
  stats: DonationStats | null;
}) {
  // Get impact message for this donation amount
  const impactTier = DONATION_TIERS.find((t) => t.amount === amount);
  const impactMessage = impactTier?.impact || "Made a real difference";
  const donors = stats?.totalDonors ?? 0;
  
  // Enhanced share message with impact, social proof, and call-to-action
  const shareText = `🌟 I just donated ₹${amount} to Priya Sarv Utthan!

${impactMessage} — help me inspire ${donors}+ changemakers to support nutrition, education & empowerment for children in need.

Join our mission → Every rupee counts! 🙏

#MakeADifference #PriyaSarvUtthan`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="mb-6 bg-gradient-to-br from-emerald-50 via-white to-green-50 border-2 border-emerald-300 rounded-3xl overflow-hidden shadow-xl"
    >
      {/* Confetti-like top bar */}
      <div className="h-2 bg-gradient-to-r from-emerald-400 via-amber-400 to-orange-400" />

      <div className="p-6 text-center">
        {/* Big heart */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1] }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          className="text-6xl mb-3"
        >
          🙏
        </motion.div>

        {/* Identity reinforcement headline */}
        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-black text-emerald-900 text-xl mb-1 leading-tight"
        >
          You are now part of {donors}+ changemakers ❤️
        </motion.h3>

        {/* Impact message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-emerald-700 font-bold text-base mb-4"
        >
          {successMessage}
        </motion.p>

        {/* Amount pill */}
        <div className="inline-flex items-center gap-2 bg-emerald-100 rounded-full px-4 py-1.5 mb-4">
          <Check size={14} className="text-emerald-700" />
          <span className="text-sm font-bold text-emerald-800">
            ₹{amount} donation confirmed
          </span>
        </div>

        {paymentId && (
          <p className="text-xs text-neutral-400 font-mono mb-5">
            Payment ID: {paymentId}
          </p>
        )}

        {/* Share + Donate again buttons */}
        <div className="flex gap-3 mb-5">
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.96 }}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white rounded-2xl font-black text-sm shadow-md hover:bg-[#1ebe5d] transition-colors"
          >
            <Share2 size={16} />
            Share on WhatsApp
          </motion.a>
          <motion.button
            type="button"
            onClick={onDonateAgain}
            whileTap={{ scale: 0.96 }}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-2xl font-black text-sm shadow-md hover:bg-emerald-700 transition-colors"
          >
            <RefreshCw size={16} />
            Donate Again
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
              className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 active:scale-95 transition-all text-sm flex items-center gap-2"
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
  const [paymentState, setPaymentState] = useState<PaymentState>({
    status: "idle",
    message: "",
  });
  const [stats, setStats] = useState<DonationStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const mainCtaRef = useRef<HTMLButtonElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  // Fetch real donation stats from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/donations/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch donation stats:", error);
        // Fall back to defaults
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
    // Refresh stats every 30 seconds for real-time updates
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

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
      if ((window as any).Razorpay) { resolve(true); return; }
      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );
      if (existingScript) {
        existingScript.addEventListener("load", () => resolve(true));
        existingScript.addEventListener("error", () => resolve(false));
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => {
        setPaymentState({ status: "error", message: "Failed to load payment gateway. Please try again." });
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }, []);

  const createOrder = async () => {
    try {
      setPaymentState({ status: "loading", message: "Preparing your secure donation..." });
      const response = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "NGO Donor", email: "donor@ngo.org", amount: Math.round(amount as number) }),
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
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) return;

    const RazorpayCheckout = (window as any).Razorpay;
    const options = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: siteConfig.name,
      description: `Donation – ${DONATION_TIERS.find((t) => t.amount === amount)?.impact || "Support"}`,
      order_id: orderData.orderId,
      image: "/images/logo.png",
      prefill: { name: "", email: "", contact: "" },
      notes: {
        donation_type: "single",
        impact: DONATION_TIERS.find((t) => t.amount === amount)?.impact || "General",
      },
      handler: async (response: RazorpayPaymentResponse) => { await verifyPayment(response); },
      modal: {
        ondismiss: () => {
          setPaymentState({ status: "error", message: "Payment cancelled. No amount was charged." });
        },
      },
      theme: { color: "#10b981" },
    };

    const checkout = new RazorpayCheckout(options);
    checkout.on("payment.failed", (error: any) => {
      const errorMessage = error?.error?.description || error?.error?.reason || "Payment failed";
      const errorCode = error?.error?.code || "UNKNOWN";
      setPaymentState({
        status: "error",
        message: `Payment failed: ${errorMessage}. Please try again.`,
        paymentId: error?.metadata?.payment_id,
      });
      logPaymentEvent("Payment Failed", { orderId: orderData.orderId, errorCode, errorMessage });
    });
    checkout.open();
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
        setPaymentState({
          status: "success",
          message: "Thank you! Your donation has been received.",
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
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
    const finalAmount = overrideAmount ?? (amount as number);
    if (!finalAmount || finalAmount < siteConfig.donationMinAmount) {
      setPaymentState({ status: "error", message: `Minimum donation is ₹${siteConfig.donationMinAmount}` });
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
    `You just made a real difference with ₹${amount} ❤️`;

  // Emotion-first CTA label
  const ctaLabel = amount
    ? `Help a child with ₹${amount} ❤️`
    : "Choose an amount to give ❤️";

  // ─── Render ────────────────────────────────────────────────────────────────
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-orange-50 pb-28 md:pb-0" />
    );
  }

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
          className="text-3xl md:text-5xl font-black text-neutral-900 leading-tight mb-2"
        >
          Make a real difference{" "}
          <span className="text-emerald-600">today</span>
        </motion.h1>

        <motion.p
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-base text-neutral-500 max-w-xs mx-auto mb-4 font-medium"
        >
          आपका छोटा सा सहयोग, किसी का भविष्य बदल सकता है।
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
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/95 backdrop-blur rounded-full px-4 py-2 shadow-lg whitespace-nowrap"
          >
            <Users size={13} className="text-emerald-600 shrink-0" />
            <span className="text-xs font-black text-neutral-800">
              {stats?.totalDonors ?? 0} donors
            </span>
            <span className="w-px h-3 bg-neutral-200" />
            <TrendingUp size={13} className="text-emerald-600 shrink-0" />
            <span className="text-xs font-black text-neutral-800">
              {formatINR(stats?.thisMonthAmount ?? 0)} raised this month
            </span>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ── Goal progress bar ────────────────────────────────────────────────── */}
      <GoalProgress stats={stats} />

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
              stats={stats}
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
            {/* Section header */}
            <div>
              <p className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-1">
                Choose your impact
              </p>
              <p className="text-sm text-neutral-400 font-medium mb-4">
                Every rupee reaches a child in need. Start with as little as ₹10.
              </p>

              {/* Social proof strip inline */}
              <SocialProofStrip stats={stats} />

              {/* Donation tier grid — 3 cols on mobile for compact layout */}
              <div className="grid grid-cols-3 md:grid-cols-3 gap-2.5">
                {DONATION_TIERS.map((tier) => {
                  const isSelected = amount === tier.amount;
                  return (
                    <div key={tier.amount} className="relative">
                      {tier.popular && (
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 bg-orange-500 text-white px-2 py-0.5 rounded-full text-[10px] font-black shadow whitespace-nowrap">
                          ⭐ Most Popular
                        </div>
                      )}

                      <motion.div
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setAmount(tier.amount)}
                        className={`relative cursor-pointer rounded-2xl transition-all duration-200 ${
                          isSelected
                            ? "bg-emerald-600 text-white shadow-xl ring-2 ring-emerald-400"
                            : tier.popular
                            ? "bg-orange-50 text-neutral-800 border-2 border-orange-200 hover:border-orange-300"
                            : "bg-neutral-50 text-neutral-800 border-2 border-neutral-200 hover:border-emerald-300"
                        }`}
                      >
                        {/* Main info */}
                        <div className="p-3 pb-2 text-center">
                          <div className="text-2xl mb-0.5">{tier.icon}</div>
                          <div className="text-lg font-black leading-none">
                            {tier.label}
                          </div>
                          <div
                            className={`text-[10px] font-semibold mt-1 leading-tight ${
                              isSelected ? "text-emerald-100" : "text-neutral-500"
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
                          className={`w-full py-1.5 rounded-b-2xl text-[10px] font-black flex items-center justify-center gap-1 transition-all ${
                            isSelected
                              ? "bg-emerald-700 text-white hover:bg-emerald-800"
                              : tier.popular
                              ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          }`}
                        >
                          <Zap size={9} />
                          Give {tier.label}
                        </motion.button>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom amount */}
            <div>
              <label className="block text-xs font-black text-neutral-500 uppercase tracking-widest mb-2">
                Or type your own amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-black text-neutral-400 pointer-events-none">
                  ₹
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value ? parseInt(e.target.value) : "")
                  }
                  placeholder="Any amount you choose"
                  min={siteConfig.donationMinAmount}
                  max={100000}
                  className="w-full pl-10 pr-4 py-3.5 rounded-2xl border-2 border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition text-lg font-semibold bg-neutral-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-2.5 p-3 bg-gradient-to-r from-emerald-50 to-orange-50 rounded-2xl border border-emerald-100">
              <Shield size={15} className="text-emerald-600 shrink-0" />
              <p className="text-xs font-semibold text-neutral-600">
                100% Secure · Razorpay · 80G Tax Benefit
              </p>
            </div>

            {/* Main CTA – emotion-driven copy */}
            <motion.button
              ref={mainCtaRef}
              type="submit"
              disabled={!amount || isProcessing}
              whileHover={!isProcessing && amount ? { scale: 1.02 } : {}}
              whileTap={!isProcessing && amount ? { scale: 0.97 } : {}}
              className={`w-full py-4 px-8 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all duration-200 ${
                amount && !isProcessing
                  ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-emerald-800 cursor-pointer"
                  : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader size={22} className="animate-spin" />
                  <span>Securing your donation...</span>
                </>
              ) : (
                <>
                  <Heart size={22} className="fill-current" />
                  <span>{ctaLabel}</span>
                </>
              )}
            </motion.button>

            <p className="text-center text-xs text-neutral-400 font-medium">
              100% goes to our mission ·{" "}
              <Link href="/contact" className="text-emerald-600 font-bold hover:underline">
                Questions?
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
            Your questions, answered
          </h2>
          <div className="space-y-5">
            {[
              {
                q: "Is my donation secure?",
                a: "Yes. We use Razorpay, India's most trusted payment gateway with 256-bit SSL encryption.",
              },
              {
                q: "Can I get a receipt?",
                a: "Absolutely. We'll send a receipt and acknowledgment to your email within 24 hours.",
              },
              {
                q: "Is my donation tax-deductible?",
                a: "Yes. Priya Sarv Utthan is an 80G certified NGO. You'll receive a tax receipt with your donation.",
              },
              {
                q: "What payment methods are accepted?",
                a: "All cards (Visa, Mastercard), UPI, net banking, and wallets via Razorpay.",
              },
              {
                q: "Where does my money go?",
                a: "100% of donations go to nutrition, education, skill training, and women empowerment programs.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                className="pb-5 border-b border-neutral-100 last:border-0 last:pb-0"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.05 }}
              >
                <p className="font-bold text-neutral-900 mb-1 text-sm">{faq.q}</p>
                <p className="text-neutral-500 text-sm leading-relaxed">{faq.a}</p>
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
        <p className="text-neutral-400 text-sm">
          Have questions?{" "}
          <Link href="/contact" className="text-emerald-600 font-bold hover:underline">
            Get in touch
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
            <div className="h-8 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
            <div className="bg-white/95 backdrop-blur-md border-t border-neutral-200 px-4 py-3 pb-safe">
              <motion.button
                type="button"
                disabled={!amount || isProcessing}
                whileTap={amount && !isProcessing ? { scale: 0.97 } : {}}
                onClick={() => triggerDonation()}
                className={`w-full py-4 rounded-2xl font-black text-base flex items-center justify-center gap-2.5 transition-all ${
                  amount && !isProcessing
                    ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg active:from-emerald-700"
                    : "bg-neutral-200 text-neutral-400"
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    <span>Securing your donation...</span>
                  </>
                ) : (
                  <>
                    <Heart size={18} className="fill-current" />
                    <span>{ctaLabel}</span>
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