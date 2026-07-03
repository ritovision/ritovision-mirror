'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

type HeroLogo = {
  key: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  positionClassName: string;
  isCenter?: boolean;
};

const heroLogos: HeroLogo[] = [
  {
    key: 'owasp',
    src: '/images/pages/projects/oss/logos/owasp-white.png',
    alt: 'OWASP',
    width: 500,
    height: 500,
    positionClassName: styles.logoTopLeft,
  },
  {
    key: 'zap',
    src: '/images/pages/projects/oss/logos/zap-white.png',
    alt: 'OWASP ZAP',
    width: 334,
    height: 335,
    positionClassName: styles.logoTopCenter,
  },
  {
    key: 'ethereum',
    src: '/images/pages/projects/oss/logos/ethereum-white.png',
    alt: 'Ethereum',
    width: 308,
    height: 500,
    positionClassName: styles.logoTopRight,
  },
  {
    key: 'linux',
    src: '/images/pages/projects/oss/logos/linux-white.png',
    alt: 'Linux',
    width: 400,
    height: 440,
    positionClassName: styles.logoRightMiddle,
  },
  {
    key: 'storybook',
    src: '/images/pages/projects/oss/logos/storybook-white.png',
    alt: 'Storybook',
    width: 402,
    height: 500,
    positionClassName: styles.logoBottomRight,
  },
  {
    key: 'kubernetes',
    src: '/images/pages/projects/oss/logos/kubernetes-white.png',
    alt: 'Kubernetes',
    width: 500,
    height: 484,
    positionClassName: styles.logoBottomCenter,
  },
  {
    key: 'langchain',
    src: '/images/pages/projects/oss/logos/langchain-white.png',
    alt: 'LangChain',
    width: 500,
    height: 250,
    positionClassName: styles.logoBottomLeft,
  },
  {
    key: 'systemd',
    src: '/images/pages/projects/oss/logos/systemd-white.png',
    alt: 'systemd',
    width: 359,
    height: 109,
    positionClassName: styles.logoLeftMiddle,
  },
  {
    key: 'git',
    src: '/images/pages/projects/oss/logos/git-logo-white.png',
    alt: 'Git',
    width: 383,
    height: 383,
    positionClassName: styles.logoCenter,
    isCenter: true,
  },
];

const Hero = () => {
  const pathRef = useRef<SVGPathElement>(null);

  const baseSize = 600;
  const borderDurationMs = 800;
  const firstLogoOffsetMs = 133;
  const logoStepMs = 167;
  const centerRevealExtraMs = 400;
  const revealDelayMs = firstLogoOffsetMs + logoStepMs * (heroLogos.length - 1) + centerRevealExtraMs;

  useEffect(() => {
    const pathElement = pathRef.current;
    if (!pathElement) return;

    try {
      const pathLen = pathElement.getTotalLength();
      pathElement.style.strokeDasharray = `${pathLen}`;
      pathElement.style.strokeDashoffset = `${pathLen}`;
      pathElement.style.animation = `${styles.drawBorder} ${borderDurationMs}ms ease-in-out forwards`;
    } catch {
      pathElement.style.strokeDashoffset = '0';
      pathElement.style.opacity = '1';
    }
  }, []);

  const heroStyle = {
    '--border-dur': `${borderDurationMs}ms`,
    '--reveal-delay': `${revealDelayMs}ms`,
  } as React.CSSProperties;

  return (
    <div className={styles.heroContainer} style={heroStyle}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${baseSize} ${baseSize}`}
        className={styles.svgContainer}
      >
        <path
          ref={pathRef}
          d={`M 0 0 L ${baseSize} 0 L ${baseSize} ${baseSize} L 0 ${baseSize} Z`}
          fill="none"
          stroke="white"
          strokeWidth="2"
          className={styles.borderPath}
        />
      </svg>

      <Image
        src="/images/home/hero/rito-picture1.png"
        alt="Rito portrait"
        fill
        className={styles.backgroundImage}
        style={{ objectFit: 'cover' }}
        sizes="(max-width: 768px) 90vw, 560px"
      />

      {heroLogos.map((logo, index) => (
        <Image
          key={logo.key}
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          className={[
            styles.logo,
            logo.positionClassName,
            logo.isCenter ? styles.logoCenterAnimated : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={
            {
              '--delay': `${firstLogoOffsetMs + logoStepMs * index + (logo.isCenter ? centerRevealExtraMs : 0)}ms`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};

export default Hero;
