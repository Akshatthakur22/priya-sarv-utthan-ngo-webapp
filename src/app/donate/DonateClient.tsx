"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Smartphone, Copy, Check, MessageCircle, 
  ShieldCheck, Info, ArrowRight, Award 
} from "lucide-react";

const UPI_ID = "QR917000078439-2755@unionbankofindia";
const ORG_NAME = "PRIYA SARVA UTTHAAN SEVA SANSTHAN SAMAAJ SEVA";
const PHONE_NUMBER = "919806502882"; // Your actual contact
const OFFICIAL_EMAIL = "priyasarvuthan@gmail.com";

export default function DonateClient() {
  const [copied, setCopied] = useState(false);

  const copyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 md:px-6 min-h-screen bg-neutral-50/30 font-sans">
      
      {/* 1. IMPACT HERO SECTION */}
      <motion.div
        className="relative mb-8 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Image
          src="/images/donation-children.png"
          alt="Impact Illustration - Children benefiting from NGO donations"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-black/20 to-transparent" />

        <div className="relative z-10 px-6 py-14 text-center text-white space-y-4">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="flex justify-center"
          >
            <span className="bg-white/20 backdrop-blur-lg border border-white/30 text-[10px] uppercase tracking-[0.2em] font-black px-4 py-2 rounded-full flex items-center gap-2">
              <Award size={14} className="text-amber-400" /> Since 1999 • Indore
            </span>
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-black leading-tight">
            Help us feed & <br/><span className="text-emerald-300">educate children</span>
          </h1>

          <p className="text-lg italic text-emerald-50 font-medium">
            "आपका छोटा सा सहयोग, किसी का भविष्य बदल सकता है।"
          </p>
        </div>
      </motion.div>

      {/* 2. HOW TO PAY - STEP GUIDE */}
      <div className="grid grid-cols-3 gap-2 mb-8 px-2">
        {[
          { icon: <Copy size={16}/>, text: "Copy UPI ID" },
          { icon: <Smartphone size={16}/>, text: "Pay in App" },
          { icon: <MessageCircle size={16}/>, text: "Send Proof" },
        ].map((step, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-2">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
              {step.icon}
            </div>
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-tighter">{step.text}</span>
          </div>
        ))}
      </div>

      {/* 3. MAIN DONATION CARD */}
      <motion.div
        className="bg-white rounded-[2.5rem] p-8 mb-6 border border-emerald-50 shadow-xl shadow-emerald-900/5 text-center relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Subtle background decoration */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-50" />
        
        <div className="flex items-center justify-center gap-2 mb-8">
           <div className="bg-emerald-500 p-1 rounded-full text-white">
             <Check size={14} />
           </div>
           <p className="text-xs font-black text-emerald-700 uppercase tracking-widest">Official Donation Portal</p>
        </div>

        <div className="bg-white p-4 rounded-[2rem] inline-block mb-6 shadow-inner border border-neutral-100 relative group">
          <Image
            src="/images/upi-qr-unionbank.png" 
            alt="Union Bank UPI QR Code for secure donations"
            width={240}
            height={240}
            className="mx-auto rounded-xl"
          />
          <div className="absolute inset-0 border-2 border-emerald-500/20 rounded-[2rem] pointer-events-none group-hover:border-emerald-500/50 transition-colors" />
        </div>

        <h3 className="text-lg font-black text-neutral-800 leading-tight mb-2 max-w-[250px] mx-auto">
          {ORG_NAME}
        </h3>
        <p className="text-xs font-bold text-neutral-400 mb-8 tracking-wide italic">QR917000078439-2755@unionbankofindia</p>
        
        {/* UPI LOGO BAR */}
        <div className="flex justify-center items-center gap-6 py-4 opacity-100">
   {/* Remove 'grayscale' classes to restore color */}
   <img src="/images/gpay-logo.png" alt="Google Pay UPI" className="h-5 w-auto" />
   <img src="/images/phonepe-logo.png" alt="PhonePe UPI" className="h-6 w-auto" />
   <img src="/images/paytm-logo.png" alt="Paytm UPI" className="h-5 w-auto" />
         </div>
      </motion.div>

      {/* 4. MOBILE-FRIENDLY ACTION SECTION */}
      <motion.div
        className="bg-white rounded-[2.5rem] p-8 mb-8 border border-neutral-100 shadow-lg text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col gap-4 max-w-sm mx-auto">
          <button
            onClick={copyUpiId}
            className={`group relative flex items-center justify-center gap-3 w-full rounded-2xl py-5 text-sm font-black transition-all duration-500 ${
              copied 
              ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" 
              : "bg-neutral-900 text-white shadow-xl hover:bg-neutral-800"
            }`}
          >
            {copied ? (
              <motion.div initial={{scale:0}} animate={{scale:1}} className="flex items-center gap-2">
                <Check size={20} /> ID COPIED
              </motion.div>
            ) : (
              <><Copy size={20} /> COPY UPI ID</>
            )}
          </button>
          
          <Link
            href={`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent("Namaste, I am interested in supporting the NGO. Here is my contribution details.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full rounded-2xl py-4 text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
          >
            <MessageCircle size={18} /> SEND SCREENSHOT ON WHATSAPP
          </Link>
        </div>
        
        <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-100/50 flex gap-3 text-left">
           <Info className="text-amber-500 shrink-0" size={16} />
           <p className="text-[10px] text-amber-800 leading-relaxed font-medium">
             <strong>Note:</strong> Some apps limit gallery QR scans to ₹2,000. For larger donations, please copy the ID and pay directly in your app.
           </p>
        </div>
      </motion.div>

      {/* 5. TRUST FOOTER */}
      <div className="text-center pb-12">
        <div className="flex items-center justify-center gap-4 mb-8">
           <div className="text-center px-4 border-r border-neutral-200">
             <p className="text-xl font-black text-neutral-800">27+</p>
             <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-tighter">Years</p>
           </div>
           <div className="text-center px-4">
             <p className="text-xl font-black text-neutral-800">100%</p>
             <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-tighter">Transparent</p>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="rounded-full border border-neutral-200 bg-white px-8 py-3 text-xs font-bold text-neutral-700 transition-all hover:shadow-md"
          >
            CALL US
          </a>
          <Link
            href="/contact"
            className="rounded-full border border-neutral-200 bg-white px-8 py-3 text-xs font-bold text-neutral-700 transition-all hover:shadow-md"
          >
            CONTACT
          </Link>
          <a
            href={`mailto:${OFFICIAL_EMAIL}`}
            className="rounded-full border border-neutral-200 bg-white px-8 py-3 text-xs font-bold text-neutral-700 transition-all hover:shadow-md"
          >
            EMAIL
          </a>
        </div>

        <p className="text-[11px] text-neutral-400 font-bold tracking-[0.3em] uppercase mb-4">
          Secured by Union Bank of India
        </p>
        <p className="text-sm text-neutral-body italic font-medium">
          Thank you for choosing kindness 🤍
        </p>
      </div>
    </div>
  );
}
