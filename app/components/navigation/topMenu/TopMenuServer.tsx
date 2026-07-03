import React from 'react';
import Link from 'next/link';
import TopMenuClient from './TopMenuClient';
import DesktopMenuButtons from './DesktopMenuButtons';
import styles from './TopMenu.module.css';

const TopMenuServer: React.FC = () => {
  return (
    <nav className={styles.container}>
      {/* Mobile Layout */}
      <div className={styles.mobileLogos}>
        {/* Mobile Centered Wordmark */}
        <Link href="/">
          <img
            src="/images/brand/ritovision-wordmark-tm.png"
            alt="Wordmark Logo"
            className={styles.logo}
          />
        </Link>
      </div>
      
      {/* Desktop Layout */}
      {/* Desktop combined logo on far left */}
      <div className={styles.desktopLogo}>
        <Link href="/">
          <img
            src="/images/brand/ritovision-wordmark-tm.png"
            alt="Combined Logo"
            className={styles.combinedLogo}
          />
        </Link>
      </div>
      {/* Desktop center grouping of buttons */}
      <div className={styles.desktopMenuButtons}>
        <DesktopMenuButtons />
      </div>

      <TopMenuClient />
    </nav>
  );
};

export default TopMenuServer;
