"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import { Check, Heart, QrCode, Smartphone, Copy } from "lucide-react";

const UPI_ID = "QR917000078439-2755@unionbankofindia";
const UPI_NAME = "PRIYA SARVA UTTHAAN SEVA SANSTHAN SAMAAJ SEVA";
const AMOUNTS = [100, 500, 1000, 2000];
const IMPACT_LABELS: Record<number, string> = {
  100: "Feed a child for a day",
  500: "Provide a school kit",
  1000: "Support a family's health",
  2000: "Fund a month of vocational training",
};

export default function DonatePage() {
  const [amount, setAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const effectiveAmount = customAmount && !isNaN(Number(customAmount)) && Number(customAmount) > 0 ? Number(customAmount) : amount;
  const upiId = UPI_ID;

  useEffect(() => {
    setIsDesktop(!/android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent));
  }, []);

  const handlePayNow = async () => {
    await navigator.clipboard.writeText(upiId);
    setCopied(true);
    setShowModal(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Amount Selector & UPI Deep Link */}
      <motion.div
        className="glass-card p-6 mb-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="mb-4 flex flex-wrap justify-center gap-2">
          {AMOUNTS.map((amt) => (
            <button
              key={amt}
              className={`rounded-full px-4 py-2 font-semibold text-sm transition-all border-2 ${Number(customAmount) === amt || (customAmount === "" && amount === amt) ? "border-emerald-600 bg-emerald-50 text-emerald-700" : "border-neutral-muted bg-white text-neutral-body hover:bg-emerald-50"}`}
              onClick={() => { setAmount(amt); setCustomAmount(""); }}
              aria-label={`Donate ₹${amt}`}
            >
              ₹{amt}
            </button>
          ))}
          <input
            type="number"
            min={1}
            placeholder="Other"
            className="rounded-full border-2 border-neutral-muted bg-white px-4 py-2 text-sm font-semibold text-neutral-body w-28 focus:border-emerald-600 focus:ring-emerald-200 outline-none transition-all"
            value={customAmount}
            onChange={e => setCustomAmount(e.target.value.replace(/^0+/, ""))}
            aria-label="Enter custom amount"
          />
        </div>
        <motion.button
          type="button"
          onClick={handlePayNow}
          className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-emerald-600 px-6 py-4 text-lg font-bold text-white shadow-lg transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          style={{ boxShadow: "0 4px 24px 0 rgba(16, 185, 129, 0.15)" }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <Smartphone className="w-5 h-5" />
          Pay Now
        </motion.button>
        {/* Smart Payment Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-peach-100/60 via-emerald-100/60 to-white/80 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="relative z-10 max-w-md w-full mx-4 rounded-3xl glass-card p-8 text-center shadow-2xl border border-peach-200"
              style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)" }}
            >
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1.1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
                className="flex items-center justify-center mb-4"
              >
                <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 p-4">
                  <Check className="w-10 h-10 text-emerald-600 animate-bounce" />
                </span>
              </motion.div>
              <h2 className="text-2xl font-extrabold text-emerald-700 mb-2">UPI ID Copied!</h2>
              <p className="text-lg text-neutral-body mb-4">
                Now, open any payment app and paste the ID to complete your donation of <span className="font-bold text-emerald-600">₹{effectiveAmount}</span>.
              </p>
              {!isDesktop ? (
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <a
                    href={`intent://pay?pa=${upiId}&pn=${encodeURIComponent(UPI_NAME)}&am=${effectiveAmount}&cu=INR#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`}
                    className="flex flex-col items-center justify-center rounded-xl bg-emerald-50 hover:bg-emerald-100 p-4 transition shadow"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/images/gpay.png" alt="GPay" className="w-10 h-10 mb-1" />
                    <span className="text-xs font-semibold">GPay</span>
                  </a>
                  <a
                    href={`phonepe://pay?pa=${upiId}&pn=${encodeURIComponent(UPI_NAME)}&am=${effectiveAmount}&cu=INR`}
                    className="flex flex-col items-center justify-center rounded-xl bg-emerald-50 hover:bg-emerald-100 p-4 transition shadow"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/images/phonepe.png" alt="PhonePe" className="w-10 h-10 mb-1" />
                    <span className="text-xs font-semibold">PhonePe</span>
                  </a>
                  <a
                    href={`paytmmp://pay?pa=${upiId}&pn=${encodeURIComponent(UPI_NAME)}&am=${effectiveAmount}&cu=INR`}
                    className="flex flex-col items-center justify-center rounded-xl bg-emerald-50 hover:bg-emerald-100 p-4 transition shadow"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/images/paytm.png" alt="Paytm" className="w-10 h-10 mb-1" />
                    <span className="text-xs font-semibold">Paytm</span>
                  </a>
                </div>
              ) : (
                <button
                  className="w-full rounded-xl bg-peach-100 hover:bg-peach-200 text-peach-700 font-semibold py-3 mb-4 transition shadow"
                  onClick={() => setShowQR(true)}
                >
                  Show QR Code
                </button>
              )}
              <div className="text-xs text-neutral-body mt-2 mb-1">
                Verified Payee: <span className="font-bold text-emerald-700">PRIYA SARVA UTTHAAN SEVA SANSTHAN</span>
              </div>
              <button
                className="mt-2 text-sm text-peach-700 hover:underline"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold text-neutral-body bg-white/80 hover:bg-emerald-50 transition"
            onClick={() => setShowQR((v) => !v)}
          >
            <QrCode className="w-4 h-4" />
            {showQR ? "Hide QR Code" : "Show QR Code"}
          </button>
          <button
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold text-neutral-body bg-white/80 hover:bg-emerald-50 transition"
            onClick={handleCopy}
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600 animate-bounce" /> : <Smartphone className="w-4 h-4" />}
            {copied ? "UPI ID Copied!" : "Copy UPI ID"}
          </button>
        </div>
        <AnimatePresence>
          {showQR && (
            <motion.div
              className="mt-6 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={siteConfig.upiQrCodeUrl}
                alt="UPI QR Code"
                width={200}
                height={200}
                className="mx-auto rounded-xl shadow-lg border border-emerald-100"
              />
              <p className="text-xs text-neutral-body mt-2">Scan with any UPI app</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Trust Signals & Footer */}
      <motion.div
        className="glass-card p-5 mt-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-2">
          <span className="inline-block rounded-full bg-emerald-100 px-4 py-2 text-emerald-700 font-semibold text-sm">100% Transparency</span>
          <span className="inline-block rounded-full bg-emerald-100 px-4 py-2 text-emerald-700 font-semibold text-sm">Section 80G Tax Benefits</span>
        </div>
        <p className="text-xs text-neutral-body mt-2">All donations are used for community welfare. Receipts provided for tax claims.</p>
        <div className="mt-3">
          <span className="inline-block rounded-full bg-peach-100 px-4 py-2 text-peach-700 font-semibold text-sm">
            {IMPACT_LABELS[effectiveAmount] || `Your gift of ₹${effectiveAmount} will help us create impact!`}
          </span>
        </div>
      </motion.div>

      {/* Contact & Gratitude */}
      <div className="flex justify-center gap-3 mt-8 mb-6">
        <a
          href={`tel:${siteConfig.phone}`}
          className="rounded-full border px-4 py-2 text-sm font-semibold bg-white/80 hover:bg-emerald-50"
        >
          Call us
        </a>
        <Link
          href="/contact"
          className="rounded-full border px-4 py-2 text-sm font-semibold bg-white/80 hover:bg-emerald-50"
        >
          Contact
        </Link>
      </div>
      <p className="text-sm text-neutral-body italic text-center mb-2">
        Thank you for choosing kindness 🤍
      </p>
      {/* Glassmorphism style */}
      <style jsx>{`
        .glass-card {
          background: rgba(255,255,255,0.7);
          border-radius: 1.5rem;
          box-shadow: 0 8px 32px 0 rgba(16,185,129,0.12);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(16,185,129,0.08);
        }
      `}</style>
    </div>
  );
}