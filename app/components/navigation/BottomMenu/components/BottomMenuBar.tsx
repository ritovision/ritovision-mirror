import React from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { ScrollToTopButton } from './ScrollToTopButton';
import { TocButton } from './TocButton';
import { AiButton } from './AiButton';
import HamburgerIcon from '@/components/navigation/HamburgerIcon';
import { toggleDrawer, closeDrawer, DrawerType } from '@/store/slices/navigation/bottomMenuSlice';
import styles from './BottomMenuBar.module.css';

interface BottomMenuBarProps {
  height: number;
  scrollToTop: () => void;
  isScrollAnimating: boolean;
  showTocButton: boolean;
  activeDrawer: DrawerType;
  tocButtonRef: React.RefObject<HTMLButtonElement>;
  aiButtonRef: React.RefObject<HTMLButtonElement>;
}

export function BottomMenuBar({
  height,
  scrollToTop,
  isScrollAnimating,
  showTocButton,
  activeDrawer,
  tocButtonRef,
  aiButtonRef,
}: BottomMenuBarProps) {
  const dispatch = useDispatch();

  const handleTocClick = () => {
    dispatch(toggleDrawer('toc'));
  };

  const handleAiClick = () => {
    dispatch(toggleDrawer('ai'));
  };

  const handleHamburgerClick = () => {
    if (activeDrawer) {
      dispatch(closeDrawer());
    }
  };

  return (
    <div className={styles['top-bar']} style={{ height: `${height}px` }}>
      {/* Left side controls */}
      <div className={styles['left-controls']}>
        <ScrollToTopButton onClick={scrollToTop} isAnimating={isScrollAnimating} />

        {showTocButton && (
          <TocButton
            ref={tocButtonRef}
            onClick={handleTocClick}
            isActive={activeDrawer === 'toc'}
          />
        )}
      </div>

      {/* Centered Logo */}
      <div className={styles['center-logo']}>
        <Link href="/" aria-label="Go to homepage">
          <img
            src="/images/brand/wordmark.png"
            alt="RitoVision logo"
            className={styles['logo-image']}
          />
        </Link>
      </div>

      {/* Right side controls */}
      <div className={styles['right-controls']}>
        <AiButton
          ref={aiButtonRef}
          onClick={handleAiClick}
          isActive={activeDrawer === 'ai'}
        />

        <div onClick={handleHamburgerClick} role="presentation">
          <HamburgerIcon />
        </div>
      </div>
    </div>
  );
}
