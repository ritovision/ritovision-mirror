// app/components/utilities/media/images/MasonGrid.tsx
"use client";

import React, { useState } from "react";
import styles from "./MasonGrid.module.css";
import Button from "../../buttons/Button";
import JSZip from "jszip";
// ← absolute import from the root of your project
import Lightbox from "@/components/utilities/media/images/Lightbox";

export interface MasonGridItem {
  src: string;
  alt: string;
}

interface MasonGridProps {
  items: MasonGridItem[];
}

const MasonGrid: React.FC<MasonGridProps> = ({ items }) => {
  const imageItems = items;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const len = imageItems.length;

  const downloadAllImages = async () => {
    const zip = new JSZip();
    const folder = zip.folder("rito-images");
    for (let i = 0; i < imageItems.length; i++) {
      const { src } = imageItems[i];
      try {
        const response = await fetch(src);
        if (!response.ok) continue;
        const blob = await response.blob();
        const ext = src.match(/\.(jpe?g|png)$/i)?.[1] || "png";
        folder?.file(`image-${i + 1}.${ext}`, blob);
      } catch (e) {
        console.error(e);
      }
    }
    zip.generateAsync({ type: "blob" }).then((content) => {
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = "rito-images.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  };

  const handlePrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + len) % len);
  };

  const handleNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % len);
  };

  return (
    <div className={styles.masonGridWrapper}>
      <div className={styles.buttonWrapper}>
        <Button
          text="Download All"
          variant="blueAccentButton"
          action={downloadAllImages}
        />
      </div>
      <div className={styles.gridContainer}>
        {imageItems.map((item, idx) => (
          <div key={idx} className={styles.gridItem}>
            <div className={styles.imageWrapper}>
              <img
                src={item.src}
                alt={item.alt}
                className={styles.imageItem}
                onClick={() => setActiveIndex(idx)}
              />
              <a href={item.src} download className={styles.downloadLink}>
                <img
                  src="/images/utilities/icons/download-icon-bg.png"
                  alt="Download icon"
                  className={styles.downloadIcon}
                />
              </a>
            </div>
          </div>
        ))}
      </div>
      <Lightbox
        images={imageItems}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};

export default MasonGrid;
