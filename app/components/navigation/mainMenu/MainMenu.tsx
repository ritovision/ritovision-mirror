// ./app/components/navigation/mainMenu/MainMenu.tsx

'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import styles from './MainMenu.module.css';

import { menuItems, socialLinks } from './config';
import { modalVariants, buttonVariants, elementVariants } from './menuAnimations';
import useMainMenuLogic from './useMainMenuLogic';
import CloseButton from './CloseButton';
import OrbImage from '@/components/utilities/media/images/OrbImage';

export default function MainMenu() {
  const {
    mounted,
    showImage,
    showButtonBackground,
    clickedButton,
    fadeOutButtons,
    triggerClose,
    handleLinkClick,
    handleMenuClick,
    onAnimationComplete,
    isOpen,
    image
  } = useMainMenuLogic();

  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      setTimeout(() => {
        if (modalRef.current) modalRef.current.focus();
      }, 100);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') handleMenuClick();
        if (e.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll(
            'button:not([disabled]), a[href]:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements && focusableElements.length > 0) {
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    } else {
      if (previousFocusRef.current) previousFocusRef.current.focus();
    }
  }, [isOpen, handleMenuClick]);

  if (!mounted) return null;

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 0.3,
      scale: 1,
      transition: { duration: 1.5, delay: 0.8 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          className={styles.modalOverlay}
          initial="closed"
          animate={triggerClose ? 'closed' : 'open'}
          exit="closed"
          variants={modalVariants}
          onAnimationComplete={onAnimationComplete}
          role="dialog"
          aria-modal="true"
          aria-label="Main navigation menu"
          tabIndex={-1}
        >
          <CloseButton onClick={handleMenuClick} />

          <div className={styles.modalContent}>
            <motion.div
              className={styles.socialsContainer}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={elementVariants}
              role="navigation"
              aria-label="Social media links"
            >
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${social.alt}`}
                >
                  <img
                    src={social.icon}
                    alt=""
                    className={styles.socialIcon}
                    aria-hidden="true"
                  />
                </a>
              ))}
            </motion.div>

            <nav
              className={styles.menuContainer}
              role="navigation"
              aria-label="Primary navigation"
            >
              <motion.div
                className={styles.randomImageLayer}
                initial="hidden"
                animate={showImage ? 'visible' : 'hidden'}
                variants={imageVariants}
                aria-hidden="true"
              >
                <OrbImage
                  src={image}
                  alt=""
                  sizes="100vw"
                />
              </motion.div>

              <div className={styles.leftColumn}>
                {Object.entries(menuItems).map(([label, url]) => (
                  <motion.div
                    key={label}
                    variants={buttonVariants}
                    initial="normal"
                    animate={
                      fadeOutButtons
                        ? 'fadeOut'
                        : clickedButton === label
                        ? 'transparent'
                        : 'normal'
                    }
                  >
                    <Link
                      href={url}
                      className={`${styles.menuItem} ${
                        showButtonBackground
                          ? styles.visibleBackground
                          : styles.transparentBackground
                      }`}
                      onClick={() => handleLinkClick(label)}
                      aria-disabled={clickedButton !== null}
                      tabIndex={clickedButton !== null ? -1 : 0}
                      aria-label={`Navigate to ${label}`}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className={styles.rightColumn}
                variants={buttonVariants}
                initial="normal"
                animate={fadeOutButtons ? 'fadeOut' : 'normal'}
              >
                <button
                  className={`${styles.menuButton} ${
                    showButtonBackground
                      ? styles.visibleBackground
                      : styles.transparentBackground
                  }`}
                  onClick={handleMenuClick}
                  disabled={clickedButton !== null}
                  aria-label="Close menu"
                  type="button"
                >
                  Menu
                </button>
              </motion.div>
            </nav>

            <motion.img
              src="/images/brand/ritovision-wordmark-tm.png"
              alt="Rito Vision"
              className={styles.wordmarkLogo}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={elementVariants}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
