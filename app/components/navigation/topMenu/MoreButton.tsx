'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleMobileMenu } from '@/store/slices/navigation/mobileModalSlice';
import styles from './TopMenu.module.css';

const MoreButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleMobileMenu(true));
  };

  return (
    <button
      onClick={handleClick}
      className={styles.desktopButton}
      aria-label="Open additional menu options"
      aria-haspopup="menu"
      aria-expanded={false}
      type="button"
      style={{ cursor: 'pointer' }}
    >
      More...
    </button>
  );
};

export default MoreButton;