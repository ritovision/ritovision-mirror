"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import styles from "./ImageQuote.module.css";
import { useRandomPick } from "@/utilities/hooks/useRandomPick";
import OrbImage from "@/components/utilities/media/images/OrbImage";

interface ImageTextPair {
  image: string;
  text: string;
}

export default function ImageQuoteClient({ imageTextPairs }: { imageTextPairs: ImageTextPair[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isEmpty = !imageTextPairs || imageTextPairs.length === 0;

  const { item: currentPair, reroll } = useRandomPick<ImageTextPair>(imageTextPairs);

  useEffect(() => {
    if (isEmpty) return;

    if (containerRef.current) {
      containerRef.current.classList.remove(styles.visible);
    }

    const t = window.setTimeout(() => {
      reroll();
    }, 10);

    return () => window.clearTimeout(t);
  }, [pathname, imageTextPairs, isEmpty, reroll]);

  useEffect(() => {
    if (isEmpty || !containerRef.current) return;

    const el = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isEmpty, pathname, currentPair]);

  return (
    <div ref={containerRef} className={styles.container}>
      {!isEmpty && currentPair ? (
        <>
          <OrbImage
            src={currentPair.image}
            alt="Random visual"
            className={styles.image}
            sizes="100vw"
          />
          <div className={styles.overlay}>
            <p className={styles.text}>"{currentPair.text}"</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
