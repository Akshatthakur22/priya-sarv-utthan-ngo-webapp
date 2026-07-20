"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Download, Mail, Check, X, Copy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface DonationSuccessModalProps {
  isOpen: boolean;
  donationData?: {
    amount: number;
    donorName: string;
    donorEmail: string;
    recordId: string;
    orderId: string;
    paymentId: string;
  };
  onClose: () => void;
}

export function DonationSuccessModal({
  isOpen,
  donationData,
  onClose,
}: DonationSuccessModalProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleCopyReceipt = () => {
    if (donationData?.recordId) {
      navigator.clipboard.writeText(donationData.recordId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadReceipt = async () => {
    if (!donationData?.recordId) return;
    
    setDownloading(true);
    try {
      // Create a link and trigger download
      const receiptUrl = `/api/donation/receipt/${donationData.recordId}?download=true`;
      const link = document.createElement("a");
      link.href = receiptUrl;
      link.download = `Receipt_${donationData.recordId}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloading(false);
    }
  };

  const handleViewReceipt = () => {
    if (donationData?.recordId) {
      window.open(`/api/donation/receipt/${donationData.recordId}`, "_blank");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-neutral-100 rounded-lg transition-colors z-10"
            >
              <X className="w-5 h-5 text-neutral-600" />
            </button>

            {/* Success Header */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 text-center border-b border-green-200">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4"
              >
                <Check className="w-8 h-8 text-green-600" />
              </motion.div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                Thank You!
              </h2>
              <p className="text-neutral-600">
                Your donation has been received successfully.
              </p>
            </div>

            {/* Donation Details */}
            {donationData && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 space-y-4"
              >
                {/* Amount */}
                <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
                  <p className="text-sm text-blue-600 font-medium mb-1">
                    Donation Amount
                  </p>
                  <p className="text-3xl font-bold text-blue-900">
                    ₹{donationData.amount.toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Donor Name */}
                <div>
                  <p className="text-xs font-semibold text-neutral-600 uppercase mb-1">
                    Donor Name
                  </p>
                  <p className="text-neutral-900 font-medium">
                    {donationData.donorName}
                  </p>
                </div>

                {/* Email */}
                <div>
                  <p className="text-xs font-semibold text-neutral-600 uppercase mb-1">
                    Email
                  </p>
                  <p className="text-neutral-900 font-medium break-all">
                    {donationData.donorEmail}
                  </p>
                </div>

                {/* Receipt ID */}
                <div>
                  <p className="text-xs font-semibold text-neutral-600 uppercase mb-1">
                    Receipt ID
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-neutral-100 text-neutral-900 px-3 py-2 rounded font-mono text-sm">
                      {donationData.recordId}
                    </code>
                    <button
                      onClick={handleCopyReceipt}
                      className="p-2 hover:bg-neutral-100 rounded transition-colors"
                      title="Copy Receipt ID"
                    >
                      <Copy className="w-4 h-4 text-neutral-600" />
                    </button>
                  </div>
                  {copied && (
                    <p className="text-xs text-green-600 mt-1">Copied!</p>
                  )}
                </div>

                {/* Messages */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-900">
                  <p className="font-medium mb-1">📧 Receipt Email</p>
                  <p className="text-amber-800">
                    A detailed receipt has been sent to your email. Check spam if not found.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={handleViewReceipt}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Check className="w-5 h-5" />
                    View Receipt
                  </button>

                  <button
                    onClick={handleDownloadReceipt}
                    disabled={downloading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-neutral-100 text-neutral-900 rounded-lg font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50"
                  >
                    <Download className="w-5 h-5" />
                    {downloading ? "Downloading..." : "Download Receipt"}
                  </button>

                  <button
                    onClick={onClose}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-neutral-50 text-neutral-900 rounded-lg font-medium hover:bg-neutral-100 transition-colors"
                  >
                    Continue
                  </button>
                </div>

                {/* Footer Info */}
                <div className="text-center text-xs text-neutral-600 pt-2 border-t border-neutral-200">
                  <p>
                    Questions?{" "}
                    <Link href="/contact" className="text-blue-600 hover:underline">
                      Contact us
                    </Link>
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
