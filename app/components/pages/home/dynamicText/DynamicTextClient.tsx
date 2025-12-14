// ./app/components/pages/home/dynamicText/DynamicTextClient.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Particles } from "@tsparticles/react";
import styles from "./DynamicText.module.css";

type AnimationType = "slide" | "fade" | "glitch" | "typewriter" | "particles";

type TitleItem = {
  text: string;
  enter: AnimationType;
  exit: AnimationType;
};

const titles: TitleItem[] = [
  { text: "Chief Integration Officer", enter: "slide", exit: "fade" },
  { text: "Product Strategist", enter: "slide", exit: "fade" },
  { text: "Full-Stack Engineer", enter: "glitch", exit: "particles" },
  { text: "UX Architect", enter: "fade", exit: "slide" },
  { text: "Business Analyst", enter: "typewriter", exit: "glitch" },
  { text: "Creative Director", enter: "slide", exit: "fade" },
  { text: "Photographer", enter: "fade", exit: "fade" },
  { text: "Brand Builder", enter: "typewriter", exit: "glitch" },
  { text: "Music Producer", enter: "glitch", exit: "typewriter" },
  { text: "NFT Artist", enter: "slide", exit: "particles" },
  { text: "Infotaining Rapper", enter: "fade", exit: "slide" },
];

export default function DynamicTextClient() {
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState<"enter" | "static" | "exit">("enter");

  const cycleTitle = useCallback(() => {
    if (stage === "enter") {
      setStage("static");
      setTimeout(() => setStage("exit"), 1000);
    } else if (stage === "exit") {
      setStage("enter");
      setIndex((prev) => (prev + 1) % titles.length);
    }
  }, [stage]);

  useEffect(() => {
    const timer = setTimeout(cycleTitle, stage === "static" ? 1000 : 800);
    return () => clearTimeout(timer);
  }, [stage, cycleTitle]);

  const renderAnimation = (text: string, stage: "enter" | "static" | "exit") => {
    if (stage === "static") return <motion.div>{text}</motion.div>;

    const animationType = titles[index][stage as "enter" | "exit"];

    if (stage === "enter") {
      switch (animationType) {
        case "slide":
          return (
            <motion.div
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {text}
            </motion.div>
          );
        case "fade":
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {text}
            </motion.div>
          );
        case "glitch":
          return <div className={styles.glitch}>{text}</div>;
        case "typewriter":
          return <Typewriter text={text} speed={600 / text.length} />;
        case "particles":
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <ParticlesEffect text={text} />
            </motion.div>
          );
        default:
          return <span>{text}</span>;
      }
    } else if (stage === "exit") {
      return (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {text}
        </motion.div>
      );
    }
  };

  return (
    <AnimatePresence mode="wait">
      <div key={index} className={styles.title}>
        {renderAnimation(titles[index].text, stage)}
      </div>
    </AnimatePresence>
  );
}

const Typewriter = ({ text, speed = 50 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <motion.span>{displayedText}</motion.span>;
};

const ParticlesEffect = ({ text }: { text: string }) => {
  void text;
  return (
    <Particles
      id="tsparticles"
      options={{
        particles: {
          number: { value: 50 },
          move: { speed: 3 },
        },
      }}
    />
  );
};
