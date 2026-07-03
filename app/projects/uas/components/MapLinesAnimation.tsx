// FILE PATH: app/projects/uas/components/MapLinesAnimation.tsx

'use client';

import { useRef, useEffect } from 'react';
import styles from './MapLinesAnimation.module.css';

interface MapLinesAnimationProps {
  animateTrigger: boolean;
}

const MapLinesAnimation: React.FC<MapLinesAnimationProps> = ({ animateTrigger }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const line1Ref = useRef<SVGLineElement>(null);
  const line2Ref = useRef<SVGLineElement>(null);
  const line3Ref = useRef<SVGLineElement>(null);
  const line4Ref = useRef<SVGLineElement>(null);

  // Define the points for the four connected lines within the 600x800 viewBox
  // Line 1: Bottom left diagonal up-right
  const p1_start = { x: 50, y: 750 };
  const p1_end = { x: 250, y: 550 }; // Connects to start of Line 2

  // Line 2: Right
  const p2_end = { x: 450, y: 550 }; // Connects to start of Line 3

  // Line 3: Up
  const p3_end = { x: 450, y: 300 }; // Connects to start of Line 4

  // Line 4: Diagonal up-left
  const p4_end = { x: 200, y: 150 };


  useEffect(() => {
    const svgElement = svgRef.current;
    const line1Element = line1Ref.current;
    const line2Element = line2Ref.current;
    const line3Element = line3Ref.current;
    const line4Element = line4Ref.current;


    if (!svgElement || !line1Element || !line2Element || !line3Element || !line4Element) return;

    if (animateTrigger) {

        // Get lengths of each line
        const line1Length = line1Element.getTotalLength();
        const line2Length = line2Element.getTotalLength();
        const line3Length = line3Element.getTotalLength();
        const line4Length = line4Element.getTotalLength();

        // Set initial state (hidden via stroke-dashoffset and opacity)
        line1Element.style.strokeDasharray = `${line1Length}`;
        line1Element.style.strokeDashoffset = `${line1Length}`;
        line1Element.style.opacity = '0';

        line2Element.style.strokeDasharray = `${line2Length}`;
        line2Element.style.strokeDashoffset = `${line2Length}`;
        line2Element.style.opacity = '0';

        line3Element.style.strokeDasharray = `${line3Length}`;
        line3Element.style.strokeDashoffset = `${line3Length}`;
        line3Element.style.opacity = '0';

        line4Element.style.strokeDasharray = `${line4Length}`;
        line4Element.style.strokeDashoffset = `${line4Length}`;
        line4Element.style.opacity = '0';


        // Define animation durations and delays
        const drawDuration = 700; // Duration for each line to draw (milliseconds)
        const delayBetweenLines = 200; // Delay before the next line starts (milliseconds)


        // Sequence the animations
        // Line 1 starts first
        line1Element.style.animation = `${styles.drawLine} ${drawDuration}ms ease-out forwards`;

        // Line 2 starts after Line 1 finishes + delay
        const line2StartTime = drawDuration + delayBetweenLines;
        setTimeout(() => {
            line2Element.style.animation = `${styles.drawLine} ${drawDuration}ms ease-out forwards`;
        }, line2StartTime);

        // Line 3 starts after Line 2 finishes + delay
        const line3StartTime = line2StartTime + drawDuration + delayBetweenLines;
         setTimeout(() => {
            line3Element.style.animation = `${styles.drawLine} ${drawDuration}ms ease-out forwards`;
        }, line3StartTime);

        // Line 4 starts after Line 3 finishes + delay
        const line4StartTime = line3StartTime + drawDuration + delayBetweenLines;
         setTimeout(() => {
            line4Element.style.animation = `${styles.drawLine} ${drawDuration}ms ease-out forwards`;
        }, line4StartTime);


    } else {
        // Ensure paths are hidden when animation is not triggered
        line1Element.style.animation = 'none';
        line2Element.style.animation = 'none';
        line3Element.style.animation = 'none';
        line4Element.style.animation = 'none';
         line1Element.style.opacity = '0';
         line2Element.style.opacity = '0';
         line3Element.style.opacity = '0';
         line4Element.style.opacity = '0';
    }

  }, [animateTrigger]); // Re-run effect when animateTrigger changes

  return (
    <svg
      ref={svgRef}
      className={styles.mapLinesSvg}
      viewBox="0 0 600 800" /* Matches Hero's base viewBox */
    >
      {/* Line 1: Bottom left diagonal up-right */}
      <line
        ref={line1Ref}
        x1={p1_start.x}
        y1={p1_start.y}
        x2={p1_end.x}
        y2={p1_end.y}
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        className={styles.mapLine} /* Use a single class for styling/animation */
      />

      {/* Line 2: Right (Starts where Line 1 ends) */}
       <line
        ref={line2Ref}
        x1={p1_end.x}
        y1={p1_end.y}
        x2={p2_end.x}
        y2={p2_end.y}
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        className={styles.mapLine}
      />

      {/* Line 3: Up (Starts where Line 2 ends) */}
       <line
        ref={line3Ref}
        x1={p2_end.x}
        y1={p2_end.y}
        x2={p3_end.x}
        y2={p3_end.y}
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        className={styles.mapLine}
      />

      {/* Line 4: Diagonal up-left (Starts where Line 3 ends) */}
       <line
        ref={line4Ref}
        x1={p3_end.x}
        y1={p3_end.y}
        x2={p4_end.x}
        y2={p4_end.y}
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        className={styles.mapLine}
      />

    </svg>
  );
};

export default MapLinesAnimation;