"use client";

import React, { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import styles from "./Modal.module.css";
import { ModalVariant } from "./index";

interface ModalProps {
  /** Controls whether the modal is visible */
  isOpen: boolean;
  /** Called when the modal should close (click outside, "Ok", or page leave) */
  onClose: () => void;
  /** Choose a style variant: e.g. "primaryBlue", "blackRed", etc. */
  variant?: ModalVariant;
  /** Modal contents (text, icons, buttons, etc.) */
  children?: React.ReactNode;
  /** Optional class for custom layout in non-overlay scenarios (e.g. Storybook) */
  className?: string;
  /** Optional inline styles for embedding the modal in custom layouts */
  style?: CSSProperties;
  /** Render the modal inline instead of fixed to the viewport */
  inline?: boolean;
}

/**
 * A flexible modal fixed in the center of the screen (no overlay).
 * Closes on outside click, "Ok" button, or page leave.
 */
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  variant = "primaryBlue",
  children,
  className = "",
  style,
  inline = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close if user clicks outside the modal container
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  // Close if user leaves the page (beforeunload)
  useEffect(() => {
    function handleBeforeUnload() {
      onClose();
    }
    if (isOpen) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isOpen, onClose]);

  // If not open, don't render anything
  if (!isOpen) return null;

  const containerClassName = [
    styles.modalContainer,
    styles[variant],
    inline ? styles.inline : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClassName} ref={modalRef} style={style}>
      {children}
    </div>
  );
};

export default Modal;
