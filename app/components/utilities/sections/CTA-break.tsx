import React from 'react';
import Button, { ButtonVariant } from '@/components/utilities/buttons/Button';
import styles from './CTA-break.module.css';

interface CTABreakProps {
  text: React.ReactNode;
  buttonText: string;
  buttonHref: string;
  buttonVariant?: ButtonVariant;
}

const CTABreak: React.FC<CTABreakProps> = ({
  text,
  buttonText,
  buttonHref,
  buttonVariant = 'blueAccentButton',
}) => {
  return (
    <section className={`${styles.section} defaulttopspace defaultbottomspace`}>
      <div className={styles.divider}></div>
      <div className={styles.content}>
        <p className={styles.text}>{text}</p>
        <Button text={buttonText} variant={buttonVariant} href={buttonHref} />
      </div>
      <div className={styles.divider}></div>
    </section>
  );
};

export default CTABreak;
