import React from 'react';
import Link from 'next/link';
import MoreButton from './MoreButton';
import styles from './TopMenu.module.css';

const DesktopMenuButtons: React.FC = () => {
  return (
    <nav 
      className={styles.desktopButtonsContainer}
      role="navigation"
      aria-label="Main navigation"
    >
      <Link 
        href="/services" 
        className={styles.desktopButton}
        aria-label="View our services"
      >
        Services
      </Link>
      <Link 
        href="/projects" 
        className={styles.desktopButton}
        aria-label="View our projects"
      >
        Projects
      </Link>
      <Link 
        href="/contact" 
        className={styles.desktopButton}
        aria-label="Contact us"
      >
        Contact
      </Link>
      <MoreButton />
    </nav>
  );
};

export default DesktopMenuButtons;