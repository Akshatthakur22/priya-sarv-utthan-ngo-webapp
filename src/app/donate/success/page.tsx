"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

import { Button } from "@/components/ui/Button";
import { Home, Receipt, PartyPopper, Share2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const WHATSAPP_MESSAGE =
  "I just donated to help children and families in Indore through @PriyaSarvaUtthaan. Join me in spreading kindness! ❤️ https://priyautthaan.org";

export default function ThankYouPage() {
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#10B981", "#FBBF24", "#F472B6", "#34D399", "#F59E42"],
    });
  }, []);

  const router = useRouter();
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-100 via-peach-50 to-emerald-50 font-nunito px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
        className="text-center mb-8"
      >
        <PartyPopper className="mx-auto text-emerald-500 mb-4" size={48} />
        <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-600 mb-2 drop-shadow-lg">
          Thank You, Change-Maker!
        </h1>
        <h2 className="text-lg md:text-xl text-peach-700 font-semibold mb-4">
          Your support for Priya Sarva Utthaan Seva Sansthan helps us continue our 27-year mission in Indore.
        </h2>
        <blockquote className="italic text-peach-600 text-base md:text-lg mb-6">
          “Kindness is the language which the deaf can hear and the blind can see.”
        </blockquote>
        <Button
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full shadow-lg mb-4"
          type="button"
          onClick={() => {
            window.open(
              `https://wa.me/?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
              "_blank"
            );
          }}
        >
          <Share2 size={20} /> Spread the Word
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="backdrop-blur-lg bg-white/60 border border-peach-200 rounded-xl shadow-xl p-6 mb-8 max-w-md w-full"
      >
        <h3 className="text-emerald-700 font-bold text-lg mb-2">What happens next?</h3>
        <p className="text-peach-800 text-base">
          Your donation is being processed and will be used for <span className="font-semibold">Education/Meals</span>.
        </p>
      </motion.div>

      <div className="flex gap-4">
        <Button
          className="flex items-center gap-2 bg-peach-500 hover:bg-peach-600 text-white px-5 py-2 rounded-lg shadow"
          type="button"
          onClick={() => router.push("/")}
        >
          <Home size={18} /> Back to Home
        </Button>
        <Button
          className="flex items-center gap-2 bg-emerald-400 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg shadow"
          type="button"
          onClick={() => router.push("/donate/receipt")}
        >
          <Receipt size={18} /> Get Receipt
        </Button>
      </div>
    </main>
  );
}
