"use client";

import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function DonatePage() {
  const [amount, setAmount] = useState<number | "">("");
  const [app, setApp] = useState<"upi" | "gpay" | "phonepe" | "paytm">("upi");

  // Reference ID (appears in bank statement)
  const referenceId = useMemo(() => {
    return `PSUF-${Date.now().toString().slice(-6)}`;
  }, []);

  const baseParams = `pa=${siteConfig.upiId}&pn=${encodeURIComponent(
    siteConfig.name
  )}&am=${amount || ""}&cu=INR&tr=${referenceId}&tn=Donation`;

  const upiLinks = {
    upi: `upi://pay?${baseParams}`,       // Any UPI app (GPay, BHIM, bank apps)
    gpay: `upi://pay?${baseParams}`,      // Google Pay (correct method)
    phonepe: `phonepe://pay?${baseParams}`,
    paytm: `paytmmp://pay?${baseParams}`,
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 md:px-6">
      {/* Header */}
      <motion.div
        className="space-y-3 text-center mb-8 md:mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-sm font-semibold text-primary">Make a difference</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-ink">
          Support Our Work
        </h1>
        <p className="text-base text-neutral-body max-w-xl mx-auto">
          Your contribution helps us empower women, educate children, and create
          opportunities for families in Gandhi Nagar, Indore.
        </p>
      </motion.div>

      {/* Emotional Hook */}
      <motion.div
        className="bg-accent-peach-light/30 rounded-2xl p-5 mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-lg italic text-neutral-ink font-medium">
          आपका छोटा सा योगदान, किसी की ज़िंदगी बदल सकता है।
        </p>
      </motion.div>

      {/* Amount Selection */}
      <motion.div
        className="bg-surface-paper p-5 rounded-2xl ring-1 ring-neutral-muted/20 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-sm font-semibold text-neutral-ink mb-3">
          Choose donation amount
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          {[100, 300, 500].map((val) => (
            <button
              key={val}
              onClick={() => setAmount(val)}
              className={`px-4 py-2 rounded-full border text-sm font-medium ${
                amount === val
                  ? "border-primary text-primary"
                  : "border-neutral-muted/30 text-neutral-body"
              }`}
            >
              ₹{val}
            </button>
          ))}
        </div>

        {/* CLEAN input – NO arrows */}
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Enter custom amount"
          value={amount}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            setAmount(value ? Number(value) : "");
          }}
          className="w-full rounded-xl border border-neutral-muted/30 px-4 py-2 text-sm outline-none appearance-none"
        />
      </motion.div>

      {/* UPI App Selection */}
      <motion.div
        className="bg-surface-paper p-5 rounded-2xl ring-1 ring-neutral-muted/20 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-sm font-semibold text-neutral-ink mb-3">
          Pay using UPI
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { id: "upi", label: "Any UPI App" },
            { id: "gpay", label: "Google Pay" },
            { id: "phonepe", label: "PhonePe" },
            { id: "paytm", label: "Paytm" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setApp(item.id as any)}
              className={`px-4 py-2 rounded-full border text-sm ${
                app === item.id
                  ? "border-primary text-primary"
                  : "border-neutral-muted/30 text-neutral-body"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <a
          href={amount ? upiLinks[app] : "#"}
          className={`inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all min-h-[44px]
            ${
              amount
                ? "bg-primary text-white hover:opacity-90"
                : "bg-neutral-muted/30 text-neutral-muted cursor-not-allowed"
            }`}
        >
          Donate via UPI
        </a>

        <p className="text-xs text-neutral-body mt-3 text-center">
          Reference ID:{" "}
          <span className="font-medium text-neutral-ink">{referenceId}</span>
        </p>
      </motion.div>

      {/* QR Code (Backup for Desktop Users) */}
      <motion.div className="flex justify-center mb-8">
        <div className="bg-white p-6 rounded-2xl ring-1 ring-neutral-muted/20">
          <Image
            src={siteConfig.upiQrCodeUrl}
            alt="UPI QR Code for donation"
            width={220}
            height={220}
            className="object-contain"
          />
        </div>
      </motion.div>

      {/* Transparency Note */}
      <p className="text-xs text-neutral-body text-center mb-10">
        Payments are made directly via confirmed UPI apps to our official account.
        As this is a direct UPI transfer, confirmations are verified manually.
      </p>

      {/* Contact Section */}
      <motion.div
        className="bg-surface-paper p-5 rounded-2xl ring-1 ring-neutral-muted/20 text-center space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-sm font-semibold text-neutral-ink">
          Prefer another way to donate?
        </p>
        <p className="text-sm text-neutral-body">
          For offline donations, food, clothes, or any questions, reach out to us.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex items-center justify-center rounded-full border border-neutral-muted/30 px-4 py-2.5 text-sm font-semibold text-neutral-body min-h-[44px]"
          >
            Call us
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-neutral-muted/30 px-4 py-2.5 text-sm font-semibold text-neutral-body min-h-[44px]"
          >
            Get in touch
          </Link>
        </div>
      </motion.div>

      {/* Thank You */}
      <motion.div
        className="mt-10 p-5 bg-accent-peach-light/20 rounded-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-sm text-neutral-body italic">
          Thank you for believing in our mission. Your generosity fuels hope and
          change.
        </p>
      </motion.div>
    </div>
  );
}
