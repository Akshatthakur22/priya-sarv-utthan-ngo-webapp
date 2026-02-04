"use client";

import Image from "next/image";
import { triggerHaptic } from "@/utils/haptics";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import styles from "./FounderCard.module.css"; // Corrected the import path for styles

interface FounderCardProps {
  name: string;
  title: string;
  expertise: string;
  impact: string;
  contact: string;
}

export default function FounderCard({
  name,
  title,
  expertise,
  impact,
  contact,
}: FounderCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/founder");
  };

  return (
    <motion.div
      layoutId="founder-card"
      className={styles.card}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className={styles.imageContainer}>
        <motion.div
          layoutId="founder-card"
          className={styles.imageWrapper}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className={styles.imagePlaceholder}>Photo Coming Soon</div>
        </motion.div>
      </div>
      <div className={styles.textContent}>
        <h3>{name}</h3>
        <p>{title}</p>
        <p><strong>Expertise:</strong> {expertise}</p>
        <p><strong>Impact:</strong> {impact}</p>
        <a href={contact} className={styles.contactLink}>Contact Founder</a>
      </div>
    </motion.div>
  );
}