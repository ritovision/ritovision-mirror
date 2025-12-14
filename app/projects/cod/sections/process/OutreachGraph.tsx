// app/projects/cod/sections/process/OutreachGraph.tsx
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import styles from "./OutreachGraph.module.css";
import { useInView } from "react-intersection-observer";

interface AnimationUnit {
  id: number;
  imageUrls: string[];
  text: string;
  isRow?: boolean;
  completed: boolean;
  arrowCompleted: boolean;
}

export default function OutreachGraph() {
  const thresholdValue =
    typeof window !== "undefined" && window.innerWidth >= 768 ? 0.1 : 0.2;

  const [ref, inView] = useInView({
    threshold: thresholdValue,
    triggerOnce: true,
  });

  const [units, setUnits] = useState<AnimationUnit[]>([
    {
      id: 1,
      imageUrls: ["/images/pages/projects/cod/graphs/email.png"],
      text: "Sending Pitch",
      completed: false,
      arrowCompleted: false,
    },
    {
      id: 2,
      imageUrls: [
        "/images/pages/projects/cod/graphs/read.png",
        "/images/pages/projects/cod/graphs/write.png",
      ],
      text: "(Maybe) they review it then write story",
      isRow: true,
      completed: false,
      arrowCompleted: false,
    },
    {
      id: 3,
      imageUrls: ["/images/pages/projects/cod/graphs/globe.png"],
      text: "They publish article",
      completed: false,
      arrowCompleted: false,
    },
    {
      id: 4,
      imageUrls: ["/images/pages/projects/hero/code-icon.png"],
      text: "Devs fix publicized bugs",
      completed: false,
      arrowCompleted: false,
    },
  ]);

  const animationStarted = useRef(false);
  const unitCount = units.length;

  const startAnimation = useCallback(
    (unitId: number) => {
      if (unitId > unitCount) return;

      setTimeout(() => {
        setUnits((prev) =>
          prev.map((u) =>
            u.id === unitId ? { ...u, completed: true } : u
          )
        );

        setTimeout(() => {
          setUnits((prev) =>
            prev.map((u) =>
              u.id === unitId ? { ...u, arrowCompleted: true } : u
            )
          );

          setTimeout(() => {
            startAnimation(unitId + 1);
          }, 800); // arrow draw duration
        }, 600); // fade-in duration
      }, 300); // initial delay
    },
    [unitCount]
  );

  useEffect(() => {
    if (inView && !animationStarted.current) {
      animationStarted.current = true;
      startAnimation(1);
    }
  }, [inView, startAnimation]);

  return (
    <div className={styles.graphContainer} ref={ref}>
      {units.map((unit) => (
        <div key={unit.id} className={styles.unitContainer}>
          <div
            className={`${styles.contentGroup} ${
              unit.completed ? styles.visible : ""
            }`}
          >
            <div
              className={`${styles.imageContainer} ${
                unit.isRow ? styles.imageRow : ""
              }`}
            >
              {unit.imageUrls.map((url, idx) => (
                <div key={idx} className={styles.imageWrapper}>
                  <Image
                    src={url}
                    alt={`Step ${unit.id} icon`}
                    width={64}
                    height={64}
                    className={styles.icon}
                  />
                </div>
              ))}
            </div>
            <p className={styles.text}>{unit.text}</p>
          </div>

          {unit.id < unitCount && (
            <div className={styles.arrowContainer}>
              <svg
                className={styles.arrow}
                width="2"
                height="80"
                viewBox="0 0 2 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className={`${styles.arrowLine} ${
                    unit.arrowCompleted ? styles.drawArrow : ""
                  }`}
                  d="M1 0V70"
                  stroke="white"
                  strokeWidth="2"
                />
                <path
                  className={`${styles.arrowHead} ${
                    unit.arrowCompleted ? styles.fadeInArrowHead : ""
                  }`}
                  d="M1 70L5 62H-3L1 70Z"
                  fill="white"
                />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
