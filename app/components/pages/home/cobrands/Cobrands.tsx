// ./app/components/pages/home/cobrands/Cobrands.tsx
// c:/Users/Mattj/ritovision website/test/app/components/pages/home/cobrands/Cobrands.tsx

'use client';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/utilities/buttons/Button';
import styles from './Cobrands.module.css';

// scroll-triggered fade+scale for RitoVision content
const FadeScaleSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.fadeScaleSection} ${
        visible ? styles.visible : ''
      }`}
    >
      {children}
    </div>
  );
};

interface BottomBrandProps {
  images: string[];
  logoSrc: string;
  alt: string;
  text: string;
  link: string;
  buttonText: string;
}

const BottomBrandContainer: React.FC<BottomBrandProps> = ({
  images,
  logoSrc,
  alt,
  text,
  link,
  buttonText,
}) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (boxRef.current) obs.observe(boxRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    setImageVisible(true);
    const t1 = setTimeout(() => setContentVisible(true), 1500);
    const t2 = setTimeout(() => setButtonVisible(true), 2500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [visible]);

  useEffect(() => {
    if (!imageVisible) return;
    const id = setInterval(
      () => setCurrentImage(i => (i + 1) % images.length),
      4500
    );
    return () => clearInterval(id);
  }, [imageVisible, images.length]);

  return (
    <div ref={boxRef} className={styles.bottomContainer}>
      <div className={styles.bgSlider}>
        {images.map((src, idx) => (
          <div
            key={idx}
            className={styles.bgSlide}
            style={{
              backgroundImage: `url(${src})`,
              opacity: imageVisible
                ? currentImage === idx
                  ? 0.2
                  : 0
                : 0,
              transform: imageVisible ? 'scale(1.1)' : 'scale(1)',
              transition:
                'opacity 1.5s ease-in-out, transform 1.5s ease-in-out',
            }}
          />
        ))}
      </div>

      <div
        className={`${styles.contentWrapper} ${
          contentVisible ? styles.visible : ''
        }`}
      >
        <Image
          src={logoSrc}
          alt={alt}
          width={300}
          height={100}
          className={styles.logo}
        />
        <p>{text}</p>
      </div>

      <div
        className={`${styles.buttonWrapper} ${
          buttonVisible ? styles.visible : ''
        }`}
      >
        <Button href={link} text={buttonText} />
      </div>
    </div>
  );
};

export default function Cobrands() {
  const ritoRhymesImages = [
    '/images/pages/speaker/hero/ritorhymes.jpg',
    '/images/home/cobrands/Rito-mic-hold.jpg',
    '/images/home/cobrands/blackshirt-rito.jpg',
  ];
  const ritographyImages = [
    '/images/home/cobrands/rito-jon_snow-cosplay.jpg',
    '/images/home/cobrands/rito-camera.png',
    '/images/home/cobrands/rito-apple-closeup.jpg',
  ];

  const ritoRhymesText = `Rito Rhymes is Rito's infotaining musical persona. You may notice significant overlap with RitoVision content here, especially given its application in the technology sector. RitoRhymes.com is the dedicated platform for this distinct brand and features a full catalogue of infotaining musical anthems and a voice and vibe more satirical and amusing.

Proceed with caution!`;

  const ritographyText = `Ritography is Rito's multimedia art and content creation studio. It's where he channels his creative energy into photography, modeling, video editing, animation, and more. The spirit of Ritography lives throughout RitoVision’s web presence—shaping its creative assets, visual storytelling, and overall art direction.`;

  return (
    <div
      className={`${styles.cobrandsWrapper} defaulttopspace defaultbottomspace`}
    >
      <h2 className={styles.heading}>Co-Brands</h2>



      <div className={styles.topContainer}>
        <FadeScaleSection>
          <p className={styles.topText}>
            RitoVision is Rito's hybrid studio and consultancy delivering
            creative-strategic digital solutions and software development.
          </p>
          <Image
            src="/images/brand/ritovision-wordmark-tm.png"
            alt="RitoVision Logomark"
            width={300}
            height={100}
            className={styles.topLogo}
          />
        </FadeScaleSection>
      </div>

      <div className={styles.bottomContainers}>
        <BottomBrandContainer
          images={ritoRhymesImages}
          logoSrc="/images/brand/cobrands/RitoRhymes-logo.png"
          alt="RitoRhymes"
          text={ritoRhymesText}
          link="https://ritorhymes.com"
          buttonText="RitoRhymes.com"
        />
        <BottomBrandContainer
          images={ritographyImages}
          logoSrc="/images/brand/cobrands/ritography-logo.png"
          alt="Ritography"
          text={ritographyText}
          link="https://ritography.com"
          buttonText="Ritography.com"
        />
      </div>
    </div>
  );
}
