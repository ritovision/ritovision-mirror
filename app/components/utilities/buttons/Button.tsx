// ./app/components/utilities/buttons/Button.tsx
"use client";

import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import baseStyles from './Button.module.css';
import * as variantModules from './styles';

export type ButtonVariant = keyof typeof variantModules;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  action?: () => void;
  text: string;
  isSubmit?: boolean;
  isReset?: boolean;
  isDisabled?: boolean;
  modalId?: string;
  dispatchAction?: {
    type: string;
    payload?: unknown;
  };
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'blueAccentButton',
      href,
      action,
      text,
      isSubmit = false,
      isReset = false,
      isDisabled = false,
      modalId,
      dispatchAction,
      className = '',
      ...props
    },
    ref
  ) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) return;
      if (href) {
        e.preventDefault();
        // Check if external link (starts with 'http')
        if (href.startsWith('http')) {
          window.open(href, '_blank');
        } else {
          router.push(href);
        }
      }
      if (action) action();
      if (modalId) {
        const modalEl = document.getElementById(modalId);
        if (modalEl) modalEl.classList.toggle('hidden');
      }
      if (dispatchAction) {
        dispatch(dispatchAction);
      }
    };

    // Use a two-step cast so that TypeScript believes each module has a `variant` property.
    const variantClass =
      ((variantModules as unknown) as Record<string, { variant: string }>)[
        variant
      ]?.variant || '';

    const buttonClassName = `${baseStyles.button} ${variantClass} ${className}`.trim();

    return (
      <button
        ref={ref}
        type={isSubmit ? 'submit' : isReset ? 'reset' : 'button'}
        disabled={isDisabled}
        onClick={handleClick}
        className={buttonClassName}
        {...props}
      >
        {text}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
