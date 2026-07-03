// \test\app\services\components\HeroBox.tsx
'use client';

import styles from './HeroBox.module.css';
import Button from '@/utilities/buttons/Button';
import { useDeferredActivation } from '@/hooks/useDeferredActivation';

export default function HeroBox() {
  const shouldDisplay = useDeferredActivation(true);
  const boxClassName = `${styles.box} blueglow ${shouldDisplay ? styles.active : ''}`;
  const imageClassName = `${styles.backgroundImage} ${shouldDisplay ? styles.active : ''}`;
  const textClassName = `${styles.fadeInText} ${shouldDisplay ? styles.active : ''}`;
  const mechanismTextClassName = `${styles.fadeInText} ${styles.mechanismText} ${shouldDisplay ? styles.active : ''}`;
  const ctaRowClassName = `${styles.ctaRow} ${shouldDisplay ? styles.active : ''}`;

  return (
    <div className={boxClassName}>
      <img
        src="/images/home/hero/rito-picture2.jpg"
        alt="Rito"
        className={imageClassName}
      />

      <h2 className={styles.heroHeading}>
        <span className={styles.red}>Rito sees </span>
        between
        <span className={styles.red}> the seams. And he </span>
        builds.
      </h2>

      <p className={textClassName}>
        He makes important outcomes <span className={styles.red}><strong>more predictable</strong></span> by <strong>leveraging his depth</strong> across <strong>Product, Brand, UX and Engineering</strong>{" "}
        to address <span className={styles.red}><strong>misalignments &amp; ambiguities</strong></span> that are hard to see or manage.
      </p>

      <p className={mechanismTextClassName}>
        <strong className={styles.red}>How?</strong> He traces symptoms to their causes across domains, then repairs the system or improves decision-making around it.
      </p>

      <div className={ctaRowClassName}>
        <span className={styles.ctaText}>Book an Initial Discovery Call</span>
        <Button
          text="Contact"
          href="#services-form"
          variant="blueAccentButton"
        />
      </div>
    </div>
  );
}
