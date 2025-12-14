// ./app/components/utilities/buttons/ClientWrapperButton.tsx
"use client";

import React from 'react';
import Button, { ButtonProps } from './Button';

type ClientWrapperButtonProps = Omit<ButtonProps, 'action'>;

export default function ClientWrapperButton({
  ...props
}: ClientWrapperButtonProps) {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return <Button {...props} action={handleClick} />;
}
