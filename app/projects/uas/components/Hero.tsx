'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';
import MapLinesAnimation from './MapLinesAnimation';

const Hero = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const xContainerRef = useRef<HTMLDivElement>(null);
  const xSvgRef = useRef<SVGSVGElement>(null);
  const line1Ref = useRef<SVGLineElement>(null);
  const line2Ref = useRef<SVGLineElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [showMapAnimation, setShowMapAnimation] = useState(false);

  const baseWidth = 600;
  const baseHeight = 800;
  const aspectRatio = baseWidth / baseHeight;
  const cornerRadius = 20;

  const xSize = 40;
  const viewBoxCenter = xSize / 2;
  const halfXSize = xSize / 2;
  const x1PosLocal = viewBoxCenter - halfXSize / 2;
  const y1PosLocal = viewBoxCenter - halfXSize / 2;
  const x2PosLocal = viewBoxCenter + halfXSize / 2;
  const y2PosLocal = viewBoxCenter + halfXSize / 2;

  useEffect(() => {
    const svgElement = svgRef.current;
    const pathElement = pathRef.current;
    const imageElement = imageRef.current;
    const xContainerElement = xContainerRef.current;
    const xSvgElement = xSvgRef.current;
    const line1Element = line1Ref.current;
    const line2Element = line2Ref.current;
    const textElement = textRef.current;
    if (
      !svgElement ||
      !pathElement ||
      !imageElement ||
      !xContainerElement ||
      !xSvgElement ||
      !line1Element ||
      !line2Element ||
      !textElement
    )
      return;

    try {
      const pathLen = pathElement.getTotalLength();
      pathElement.style.strokeDasharray = `${pathLen}`;
      pathElement.style.strokeDashoffset = `${pathLen}`;

      const l1 = line1Element.getTotalLength();
      line1Element.style.strokeDasharray = `${l1}`;
      line1Element.style.strokeDashoffset = `${l1}`;

      const l2 = line2Element.getTotalLength();
      line2Element.style.strokeDasharray = `${l2}`;
      line2Element.style.strokeDashoffset = `${l2}`;
    } catch {
      pathRef.current!.style.strokeDashoffset = '0';
      line1Ref.current!.style.strokeDashoffset = '0';
      line2Ref.current!.style.strokeDashoffset = '0';
      pathRef.current!.style.opacity = '1';
      line1Ref.current!.style.opacity = '1';
      line2Ref.current!.style.opacity = '1';
      textRef.current!.style.opacity = '1';
      imageRef.current!.style.opacity = '0.4';
      imageRef.current!.style.transform = 'scale(1)';
      xContainerRef.current!.style.opacity = '1';
      setShowMapAnimation(true);
      return;
    }

    const borderDur = 1500;
    const imageDur = 1500;
    const xContFade = 500;
    const xLineDur = 500;
    const xLineDelay = 100;
    const textFade = 500;
    const mapDelay = 500;

    pathElement.style.animation = `${styles.drawBorder} 1.5s ease-in-out forwards`;

    setTimeout(() => {
      imageElement.style.animation = `${styles.fadeInScaleUp} ${imageDur}ms ease-in-out forwards`;
    }, borderDur);

    const xContStart = borderDur + imageDur;
    setTimeout(() => {
      xContainerElement.style.animation = `${styles.fadeInXContainer} ${xContFade}ms ease-in-out forwards`;
      line1Ref.current!.style.animation = `${styles.drawLine} ${xLineDur}ms ease-in-out forwards`;
    }, xContStart);

    const line2Start = xContStart + xLineDur + xLineDelay;
    setTimeout(() => {
      line2Ref.current!.style.animation = `${styles.drawLine} ${xLineDur}ms ease-in-out forwards`;
    }, line2Start);

    const textStart = line2Start + xLineDur;
    setTimeout(() => {
      textRef.current!.style.animation = `${styles.fadeInText} ${textFade}ms ease-in-out forwards`;
    }, textStart);

    const mapLinesStart = textStart + textFade + mapDelay;
    setTimeout(() => setShowMapAnimation(true), mapLinesStart);
  }, []);

  return (
    <div className={styles.heroContainer} style={{ aspectRatio: `${aspectRatio}` }}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${baseWidth} ${baseHeight}`}
        className={styles.svgContainer}
      >
        <path
          ref={pathRef}
          d={`
            M ${cornerRadius}, 0
            L ${baseWidth - cornerRadius}, 0
            A ${cornerRadius}, ${cornerRadius} 0 0 1 ${baseWidth}, ${cornerRadius}
            L ${baseWidth}, ${baseHeight - cornerRadius}
            A ${cornerRadius}, ${cornerRadius} 0 0 1 ${baseWidth - cornerRadius}, ${baseHeight}
            L ${cornerRadius}, ${baseHeight}
            A ${cornerRadius}, ${cornerRadius} 0 0 1 0, ${baseHeight - cornerRadius}
            L 0, ${cornerRadius}
            A ${cornerRadius}, ${cornerRadius} 0 0 1 ${cornerRadius}, 0
          `}
          fill="none"
          stroke="white"
          strokeWidth="2"
          className={styles.borderPath}
        />
      </svg>

      <Image
        ref={imageRef}
        src="/images/pages/projects/uas/map.png"
        alt="Map"
        fill
        style={{ objectFit: 'cover' }}
        className={styles.mapImage}
      />

      <div ref={xContainerRef} className={styles.xAndAdoptionContainer}>
        <div ref={textRef} className={styles.adoptionText}>
          Adoption
        </div>
        <svg
          ref={xSvgRef}
          width="100%"
          height="100%"
          viewBox={`0 0 ${xSize} ${xSize}`}
          className={styles.xSvg}
        >
          <line
            ref={line1Ref}
            x1={x1PosLocal}
            y1={y1PosLocal}
            x2={x2PosLocal}
            y2={y2PosLocal}
            stroke="white"
            strokeWidth="2"
            fill="none"
            className={styles.xLine}
          />
          <line
            ref={line2Ref}
            x1={x1PosLocal}
            y1={y2PosLocal}
            x2={x2PosLocal}
            y2={y1PosLocal}
            stroke="white"
            strokeWidth="2"
            fill="none"
            className={styles.xLine}
          />
        </svg>
      </div>

      <MapLinesAnimation animateTrigger={showMapAnimation} />
    </div>
  );
};

export default Hero;
