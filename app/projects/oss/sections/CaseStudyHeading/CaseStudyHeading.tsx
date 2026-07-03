import React from 'react';
import SectionHeading from '@/components/utilities/sections/SectionHeading';
import OrbImage from '@/components/utilities/media/images/OrbImage';
import styles from './CaseStudyHeading.module.css';

type CaseStudyHeadingProps = {
  title: string;
  eyebrow?: string;
  logoSrc?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
};

export default function CaseStudyHeading({
  title,
  eyebrow,
  logoSrc,
  logoAlt,
  logoWidth,
  logoHeight,
}: CaseStudyHeadingProps) {
  return (
    <div className={styles.wrapper}>
      {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
      <SectionHeading title={title} />
      {logoSrc && logoAlt && logoWidth && logoHeight ? (
        <div
          className={styles.logoWrapper}
          style={{ width: logoWidth, height: logoHeight }}
        >
          <OrbImage
            src={logoSrc}
            alt={logoAlt}
            width={logoWidth}
            height={logoHeight}
            fill={false}
            showOrbs={false}
          />
        </div>
      ) : null}
    </div>
  );
}
