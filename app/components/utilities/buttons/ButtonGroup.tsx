"use client";

import React from 'react';
import ClientWrapperButton from './ClientWrapperButton';
import { ButtonProps } from './Button';
import styles from './ButtonGroup.module.css';

export interface ButtonGroupProps {
  buttons: Omit<ButtonProps, 'action'>[]; // omit action to avoid passing functions from the server
  isSingle?: boolean;
  className?: string;
  mobileMaxWidth?: string; // optional prop for mobile max-width, e.g. "300px"
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ 
  buttons,
  isSingle = false,
  className = '',
  mobileMaxWidth
}) => {
  // Ensure we have at most 2 buttons.
  const validButtons = buttons.slice(0, isSingle ? 1 : 2);
  
  // If mobileMaxWidth is provided, pass it as a CSS custom property.
  const containerStyle = mobileMaxWidth
    ? { '--mobile-max-width': mobileMaxWidth } as React.CSSProperties
    : {};

  return (
    <div className={`${styles.buttonGroup} ${className}`} style={containerStyle}>
      {validButtons.map((buttonProps, index) => (
        <div 
          key={index}
          className={isSingle ? styles.buttonWrapperSingle : styles.buttonWrapper}
        >
          <ClientWrapperButton {...buttonProps} />
        </div>
      ))}
    </div>
  );
};

export default ButtonGroup;
