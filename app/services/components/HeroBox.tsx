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
  const ctaRowClassName = `${styles.ctaRow} ${shouldDisplay ? styles.active : ''}`;

  return (
    <div className={boxClassName}>
      <img
        src="/images/home/hero/rito-picture2.jpg"
        alt="Rito"
        className={imageClassName}
      />

      <h2 className={styles.heroHeading}>
        <span>A Creative-Strategic</span>{' '}
        <span className={styles.red}>Powerhouse</span>{' '}
        de-risking{' '}
        <span className={`${styles.red} ${styles.italic}`}>vision</span>{' '}
        and{' '}
        <span className={`${styles.red} ${styles.italic}`}>complexity</span>{' '}
        into{' '}
        <span className={styles.red}>scalable market leadership</span>
      </h2>

      <p className={textClassName}>
        Rito is a Chief Integration Officer with proven authority across Product, Brand, UX &amp; Technology.
        His rare hybrid specialty is in filling the cracks across domains to de-risk complex business initiatives.
        <br /><br />
        He can also operate as a standalone Chief Product (CPO) or Experience Officer (CXO), and rolls up his sleeves as a full-stack engineer shipping software
        or an artisan crafting creative media.
        <br /><br />
        From first sketch to $50M-scale MVP—or rescuing in-flight initiatives, Rito emeds as a strategic partner exactly where momentum stalls,
        bridging bold ideas and rigorous delivery to create digital experiences that don’t just work... they move people.
      </p>


      <div className={ctaRowClassName}>
        <span className={styles.ctaText}>Book a personalized discovery call.</span>
        <Button
          text="Contact"
          href="#services-form"
          variant="blueAccentButton"
        />
      </div>
    </div>
  );
}
