
'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleMobileMenu } from '@/store/slices/navigation/mobileModalSlice';
import styles from './TopMenu.module.css';

// An ID we can reference from aria-controls
const CONTAINER_ID = 'top-menu-navigation';

const TopMenuClient: React.FC = () => {
  const dispatch = useDispatch();
  const isTopMenuVisible = useSelector(
    (state: RootState) => state.menu.isTopMenuVisible
  );

  // On state change, update the container’s transform and ensure it has an ID
  useEffect(() => {
    const container = document.querySelector(
      `nav.${styles.container}`
    ) as HTMLElement | null;

    if (!container) return;

    // Give it an id if not already set (so aria-controls can point to it)
    if (!container.id) {
      container.id = CONTAINER_ID;
    }

    container.style.transform = isTopMenuVisible
      ? 'translateY(0)'
      : 'translateY(-100%)';
  }, [isTopMenuVisible]);

  const handleHamburgerClick = () => {
    dispatch(toggleMobileMenu(true));
  };

  return (
    <button
      type="button"
      className={styles.hamburgerButton}
      onClick={handleHamburgerClick}
      aria-label={
        isTopMenuVisible ? 'Close mobile menu' : 'Open mobile menu'
      }
      aria-controls={CONTAINER_ID}
      aria-expanded={isTopMenuVisible}
      aria-haspopup="true"
    >
      {/* Simple hamburger icon */}
      ☰
    </button>
  );
};

export default TopMenuClient;