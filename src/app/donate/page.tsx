"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";

export default function DonatePage() {
  const copyUpiId = async () => {
    await navigator.clipboard.writeText(siteConfig.upiId);
    alert("UPI ID copied. Paste it in your UPI app to donate.");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 md:px-6">
      {/* HERO WITH BACKGROUND IMAGE */}
      <motion.div
        className="relative mb-6 rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Background Image */}
        <Image
          src="/images/donation-children.png"
          alt="Children supported by our NGO"
          fill
          priority
          className="object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 px-5 py-10 text-center text-white space-y-3">
          <p className="text-sm font-semibold text-white/90">
            Make a Difference Today
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
            Your small help can change a life
          </h1>

          <p className="text-base italic text-white/90">
            आपका छोटा सा सहयोग, किसी का भविष्य बदल सकता है।
          </p>
        </div>
      </motion.div>

      {/* PRIMARY DONATION ACTION */}
      <motion.div
        className="bg-white rounded-xl p-5 mb-5 ring-1 ring-neutral-muted/20 text-center"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <p className="text-sm font-semibold text-neutral-ink mb-3">
          Scan with any UPI app to donate
        </p>

        <Image
          src={siteConfig.upiQrCodeUrl}
          alt="UPI QR Code"
          width={200}
          height={200}
          className="mx-auto"
        />

        <p className="text-xs text-neutral-body mt-3">
          PhonePe • Google Pay • Paytm • BHIM
        </p>
      </motion.div>

      {/* SAME PHONE FLOW */}
      <motion.div
        className="bg-surface-paper rounded-xl p-4 mb-6 ring-1 ring-neutral-muted/20 text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-sm font-semibold text-neutral-ink mb-2">
          Using UPI on this phone?
        </p>

        <button
          onClick={copyUpiId}
          className="rounded-full border px-4 py-2 text-sm font-semibold text-neutral-body"
        >
          Copy UPI ID
        </button>

        <p className="text-xs text-neutral-body mt-2">
          {siteConfig.upiId}
        </p>
      </motion.div>

      {/* TRUST LINE */}
      <p className="text-xs text-neutral-body text-center mb-6">
        100% of donations are used for community welfare.
      </p>

      {/* CONTACT */}
      <div className="flex justify-center gap-3 mb-6">
        <a
          href={`tel:${siteConfig.phone}`}
          className="rounded-full border px-4 py-2 text-sm font-semibold"
        >
          Call us
        </a>
        <Link
          href="/contact"
          className="rounded-full border px-4 py-2 text-sm font-semibold"
        >
          Contact
        </Link>
      </div>

      {/* GRATITUDE */}
      <p className="text-sm text-neutral-body italic text-center">
        Thank you for choosing kindness 🤍
      </p>
    </div>
  );
}
