'use client';

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import styles from './ContentGraph.module.css';

interface BlockProps {
  lines: string[];
  animate: boolean;
  onComplete: () => void;
  last?: boolean;
}

function Block({ lines, animate, onComplete, last = false }: BlockProps) {
  const [drawBorder, setDrawBorder] = useState(false);
  const [showText, setShowText]     = useState(false);
  const [drawArrow, setDrawArrow]   = useState(false);

  useEffect(() => {
    if (!animate) return;
    setDrawBorder(true);
    setShowText(true);

    if (!last) {
      const arrowTimer = setTimeout(() => {
        setDrawArrow(true);
        onComplete();
      }, 1000);
      return () => clearTimeout(arrowTimer);
    } else {
      const finishTimer = setTimeout(onComplete, 1000);
      return () => clearTimeout(finishTimer);
    }
  }, [animate, last, onComplete]);

  const yPositions = lines.length === 1 ? [35] : [25, 45];

  return (
    <svg
      className={styles.block}
      viewBox="0 0 200 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100,0 L200,0 L200,60 L100,60"
        className={`${styles.line} ${drawBorder ? styles.drawBorder : ''}`}
      />
      <path
        d="M100,0 L0,0 L0,60 L100,60"
        className={`${styles.line} ${drawBorder ? styles.drawBorder : ''}`}
      />

      <text
        className={`${styles.text} ${showText ? styles.showText : ''}`}
        fill="white"
        fontSize="20"
        fontFamily="var(--font-agency)"
      >
        {lines.map((line, i) => (
          <tspan key={i} x="100" y={yPositions[i]} textAnchor="middle">
            {line}
          </tspan>
        ))}
      </text>

      {!last && (
        <path
          d="M100,60 L100,90 M90,80 L100,90 L110,80"
          className={`${styles.arrow} ${drawArrow ? styles.drawArrow : ''}`}
        />
      )}
    </svg>
  );
}

export default function ContentGraph() {
  const thresholdVal =
    typeof window !== 'undefined' && window.innerWidth >= 768 ? 0.1 : 0.2;

  const [ref1, inView1] = useInView({ threshold: thresholdVal, triggerOnce: true });
  const [ref2, inView2] = useInView({ threshold: thresholdVal, triggerOnce: true });
  const [ref3, inView3] = useInView({ threshold: thresholdVal, triggerOnce: true });
  const [ref4, inView4] = useInView({ threshold: thresholdVal, triggerOnce: true });
  const [ref5, inView5] = useInView({ threshold: thresholdVal, triggerOnce: true });
  const [ref6, inView6] = useInView({ threshold: thresholdVal, triggerOnce: true });

  const [animate1, setAnimate1] = useState(false);
  const [animate2, setAnimate2] = useState(false);
  const [animate3, setAnimate3] = useState(false);
  const [animate4, setAnimate4] = useState(false);
  const [animate5, setAnimate5] = useState(false);
  const [animate6, setAnimate6] = useState(false);

  const [done1, setDone1] = useState(false);
  const [done2, setDone2] = useState(false);
  const [done3, setDone3] = useState(false);
  const [done4, setDone4] = useState(false);
  const [done5, setDone5] = useState(false);

  useEffect(() => { if (inView1) setAnimate1(true); }, [inView1]);
  useEffect(() => { if (done1 && inView2) setAnimate2(true); }, [done1, inView2]);
  useEffect(() => { if (done2 && inView3) setAnimate3(true); }, [done2, inView3]);
  useEffect(() => { if (done3 && inView4) setAnimate4(true); }, [done3, inView4]);
  useEffect(() => { if (done4 && inView5) setAnimate5(true); }, [done4, inView5]);
  useEffect(() => { if (done5 && inView6) setAnimate6(true); }, [done5, inView6]);

  return (
    <div className={styles.graphContainer}>
      <div className={styles.blocks}>
        <div ref={ref1} className={styles.blockWrapper}>
          <Block
            lines={['Select Prioritized Bug']}
            animate={animate1}
            onComplete={() => setDone1(true)}
          />
        </div>
        <div ref={ref2} className={styles.blockWrapper}>
          <Block
            lines={['Strategize Content', 'Positioning']}
            animate={animate2}
            onComplete={() => setDone2(true)}
          />
        </div>
        <div ref={ref3} className={styles.blockWrapper}>
          <Block
            lines={['Concept & Storyboarding']}
            animate={animate3}
            onComplete={() => setDone3(true)}
          />
        </div>
        <div ref={ref4} className={styles.blockWrapper}>
          <Block
            lines={['In-Game Footage Capture']}
            animate={animate4}
            onComplete={() => setDone4(true)}
          />
        </div>
        <div ref={ref5} className={styles.blockWrapper}>
          <Block
            lines={['Video + Audio Editing', 'Assembly']}
            animate={animate5}
            onComplete={() => setDone5(true)}
          />
        </div>
        <div
          ref={ref6}
          className={`${styles.imageWrapper} ${animate6 ? styles.visible : ''}`}
        >
          <Image
            src="/images/pages/projects/cod/graphs/globe.png"
            alt="Publish Video"
            width={64}
            height={64}
            className={styles.image}
          />
          <p className={styles.imageText}>Publish Video</p>
        </div>
      </div>
    </div>
  );
}
