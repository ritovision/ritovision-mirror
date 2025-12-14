import React from 'react';
import styles from './AccordionText.module.css';

interface AccordionTextProps {
  heading?: string; // optional internal heading
  text: string;
}

export function AccordionText({ heading, text }: AccordionTextProps) {
  const paragraphs = text.split('\n\n');

  return (
    <div className={styles.container}>
      {heading && <h3 className={styles.textTitle}>{heading}</h3>}
      {paragraphs.map((para, index) => (
        <p key={index} className={styles.textBody}>{para}</p>
      ))}
    </div>
  );
}
