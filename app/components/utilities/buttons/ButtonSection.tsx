// \test\app\components\utilities\buttons\ButtonSection.tsx

"use client";

import React, { ReactNode } from 'react';
import ButtonGroup, { ButtonGroupProps } from './ButtonGroup';
import styles from './ButtonSection.module.css';

export interface ButtonSectionProps {
  buttonGroupProps: ButtonGroupProps;
  title?: ReactNode;
  withBackground?: boolean;
  backgroundColor?: string;
  className?: string;
  textColor?: string;
  style?: React.CSSProperties;
}

const ButtonSection: React.FC<ButtonSectionProps> = ({
  buttonGroupProps,
  title,
  withBackground = false,
  backgroundColor = 'var(--primary-blue)',
  className = '',
  textColor = 'white',
  style,
}) => {
  return (
    <section
      className={`${styles.buttonSection} ${className}`}
      style={{
        backgroundColor: withBackground ? backgroundColor : 'transparent',
        padding: withBackground ? '40px 20px' : '0',
        borderRadius: withBackground ? '10px' : '0',
        ...style,
      }}
    >
      {title && (
        <h3 className={styles.title} style={{ color: textColor }}>
          {title}
        </h3>
      )}
      <ButtonGroup {...buttonGroupProps} />
    </section>
  );
};

export default ButtonSection;
