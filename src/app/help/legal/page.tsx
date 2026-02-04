import { Metadata } from "next";
import LegalIntakeForm from "@/components/forms/LegalIntakeForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import styles from "./LegalAid.module.css";

export const metadata: Metadata = {
  title: "Legal Aid Request | Priya Sarva Utthaan Seva Sansthan",
  description: "Request free legal aid in Indore. Connect with advocates and legal authorities for justice, rights protection, and urgent legal help.",
};

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-neutral-50/60 px-3 py-8 md:px-6 md:py-12 font-sans">
      <div className="max-w-xl mx-auto">
        <Link
          href="/help"
          className="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-orange-600 mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Help Center
        </Link>
        <LegalIntakeForm serviceType="Legal" />
        <section className={styles.missionSection}>
          <h2 className="text-xl font-bold text-neutral-800">Social Pension Mission</h2>
          <p className="text-neutral-700 mt-2">
            Leading a nationwide campaign to increase the monthly social pension for the elderly, disabled, and widows from the current ₹600 to a dignified living amount.
          </p>
          <p className="text-neutral-700 mt-2">
            <strong>Mission Statement:</strong> "वृद्ध, विकलांग और विधवा पेंशन को ₹600 से बढ़ाकर सम्मानजनक जीवन स्तर तक पहुँचाना।"
          </p>
          <p className="text-neutral-700 mt-2">
            <strong>Key Terms:</strong> वृद्ध (Elderly), विकलांग (Disabled), विधवा (Widow)
          </p>
        </section>
      </div>
    </main>
  );
}
