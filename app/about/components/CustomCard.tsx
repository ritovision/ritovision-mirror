"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import styles from "./CustomCard.module.css";

interface CustomCardProps {
  title: string;
  imageSrc: string;
  text: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, imageSrc, text }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 40%", "start 55%"],
  });

  const transitionRange = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const headerColor = useTransform(transitionRange, [0, 1], [
    "#FC1819", // var(--primary-red)
    "#04426C", // var(--secondary-blue)
  ]);

  const headerBg = useTransform(transitionRange, [0, 1], [
    "#000000", // black
    "#012035", // var(--primary-blue)
  ]);

  const cardBackground = useTransform(transitionRange, [0, 1], [
    "#000000", // black
    "rgba(1, 32, 53, 0)", // transparent primary-blue
  ]);

  const bottomTextColor = useTransform(transitionRange, [0, 1], [
    "#ffffff", // white
    "#04426C", // var(--secondary-blue)
  ]);

  const bottomBg = useTransform(transitionRange, [0, 1], [
    "#000000", // black
    "#012035", // var(--primary-blue)
  ]);

  const cardBoxShadow = useTransform(transitionRange, [0, 1], [
    "0 0 20px 10px rgba(0, 0, 0, 0.6)", // post transformation
    "0 0 0px 0px rgba(0, 0, 0, 0)", // no shadow instead of 'none'
  ]);

  // ✅ FIXED: now image is crisp at progress = 0 (black bg), blurry at progress = 1
  const imageFilter = useTransform(transitionRange, [0, 1], [
    "blur(0px)",   // black background (post transformation): crisp
    "blur(12px)",  // transparent background (pre transformation): blurry
  ]);

  const imageOpacity = useTransform(transitionRange, [0, 1], [
    1,    // black background (post transformation): full opacity
    0.7,  // transparent background (pre transformation): reduced opacity
  ]);

  return (
    <motion.div
      ref={cardRef}
      className={styles.card}
      style={{
        background: cardBackground,
        boxShadow: cardBoxShadow,
      }}
    >
      {/* Header Section */}
      <motion.div
        className={styles.header}
        style={{
          position: "relative",
          zIndex: 2,
          background: headerBg,
        }}
      >
        <motion.h3 style={{ color: headerColor, margin: 0 }}>
          {title}
        </motion.h3>
      </motion.div>

      {/* Image Section */}
      <motion.div
        className={styles.imageSection}
        style={{
          filter: imageFilter,
          opacity: imageOpacity,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Image
          src={imageSrc}
          alt="Card Image"
          fill
          style={{ objectFit: "cover" }}
        />
      </motion.div>

      {/* Bottom Section */}
      <motion.div
        className={styles.bottom}
        style={{
          color: bottomTextColor,
          position: "relative",
          zIndex: 2,
          background: bottomBg,
        }}
      >
        <p>{text}</p>
      </motion.div>
    </motion.div>
  );
};

export default CustomCard;
