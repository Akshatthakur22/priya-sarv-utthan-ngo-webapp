"use client";

import { useState } from "react";
// ...existing code...
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import { Check, Heart, QrCode, Smartphone } from "lucide-react";

const UPI_ID = "QR917000078439-2755@unionbankofindia";
const UPI_NAME = "PRIYA SARVA UTTHAAN SEVA SANSTHAN SAMAAJ SEVA";
const UPI_BASE = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&cu=INR`;
const AMOUNTS = [100, 500, 1000, 2000];
const IMPACT_LABELS: Record<number, string> = {
  100: "Feed a child for a day",
  500: "Provide a school kit",
  1000: "Support a family's health",
  2000: "Fund a month of vocational training",
};

export default function DonatePage() {
  const [amount, setAmount] = useState(500);
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);

  const upiLink = `${UPI_BASE}&am=${amount}`;

  const copyUpiId = async () => {
    await navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-6 md:px-6">
            {/* Hero Section */}
            <motion.div
              className="relative mb-8 rounded-3xl overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Image
                src="/images/donation-children.png"
                alt="Children supported by our NGO"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/10" />
              <div className="relative z-10 px-6 py-12 text-center text-white space-y-3">
                <motion.span
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600/80 px-4 py-1.5 text-xs font-semibold tracking-wide shadow"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Heart className="w-4 h-4 text-rose-500 animate-pulse" />
                  Make a Difference Today
                </motion.span>
                <h1 className="text-3xl sm:text-4xl font-bold leading-tight drop-shadow">
                  Your small help can change a life
                </h1>
                <p className="text-base italic text-white/90">
                  आपका छोटा सा सहयोग, किसी का भविष्य बदल सकता है।
                </p>
              </div>
            </motion.div>

            {/* Amount Selector & UPI Deep Link */}
            <motion.div
              className="glass-card p-6 mb-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="mb-4 flex justify-center gap-2">
                {AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    className={`rounded-full px-4 py-2 font-semibold text-sm transition-all border-2 ${amount === amt ? "border-emerald-600 bg-emerald-50 text-emerald-700" : "border-neutral-muted bg-white text-neutral-body hover:bg-emerald-50"}`}
                    onClick={() => setAmount(amt)}
                    aria-label={`Donate ₹${amt}`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
              <motion.a
                href={upiLink}
                className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-emerald-600 px-6 py-4 text-lg font-bold text-white shadow-lg transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                style={{ boxShadow: "0 4px 24px 0 rgba(16, 185, 129, 0.15)" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <Smartphone className="w-5 h-5" />
                Pay Now with UPI
              </motion.a>
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
                  onClick={copyUpiId}
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