"use client";

import Image from "next/image";
import { triggerHaptic } from "@/utils/haptics";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import styles from "./FounderCard.module.css";

interface FounderCardProps {
  name: string;
  title: string;
  expertise: string;
  impact: string;
  contact: string;
  imageSrc?: string;
}

export default function FounderCard({
  name,
  title,
  expertise,
  impact,
  contact,
  imageSrc,
}: FounderCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/founder");
  };

  // Generate SEO-friendly alt text dynamically
  const generateAltText = () => {
    const ngoName = "Priya Sarv Utthan Seva Sansthan";
    if (title.toLowerCase().includes("founder") || title.toLowerCase().includes("president")) {
      return `${name} - Founder and President of ${ngoName} leading social welfare initiatives in Madhya Pradesh`;
    } else if (title.toLowerCase().includes("secretary")) {
      return `${name} - Secretary of ${ngoName} managing administrative operations and community development programs`;
    } else {
      return `${name} - ${title} at ${ngoName} dedicated to social welfare and community empowerment`;
    }
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
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={generateAltText()}
              width={200}
              height={200}
              className="w-full h-full object-cover rounded-lg"
              priority={true}
            />
          ) : (
            <div className={styles.imagePlaceholder}>Photo Coming Soon</div>
          )}
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