import { Metadata } from "next";
import LegalIntakeForm from "@/components/forms/LegalIntakeForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "File a Complaint | Priya Sarva Utthaan Seva Sansthan",
  description: "Report social injustice, local issues, or grievances in Indore. We ensure your voice is heard and escalate to the right authorities.",
};

export default function ComplaintPage() {
  return (
    <main className="min-h-screen bg-neutral-50/60 px-3 py-8 md:px-6 md:py-12 font-sans">
      <div className="max-w-xl mx-auto">
        <Link
          href="/help"
          className="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-orange-600 mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Help Center
        </Link>
        <LegalIntakeForm serviceType="Grievance" />
      </div>
    </main>
  );
}
