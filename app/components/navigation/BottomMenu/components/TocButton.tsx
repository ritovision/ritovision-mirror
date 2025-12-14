import React, { forwardRef } from 'react';
import styles from './TocButton.module.css';

interface TocButtonProps {
  onClick: () => void;
  isActive: boolean;
}

export const TocButton = forwardRef<HTMLButtonElement, TocButtonProps>(
  ({ onClick, isActive }, ref) => {
    return (
      <button
        ref={ref}
        onMouseDown={(e) => e.preventDefault()}
        onClick={onClick}
        className={styles['toc-btn']}
        aria-label={isActive ? "Close table of contents" : "Open table of contents"}
        aria-expanded={isActive}
        aria-controls="toc-drawer-content"
        title="Table of Contents"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="4" cy="6" r="1.5" fill="white" />
          <rect x="8" y="5" width="8" height="2" rx="1" fill="white" />
          <circle cx="4" cy="12" r="1.5" fill="white" />
          <rect x="8" y="11" width="8" height="2" rx="1" fill="white" />
          <circle cx="4" cy="18" r="1.5" fill="white" />
          <rect x="8" y="17" width="8" height="2" rx="1" fill="white" />
        </svg>
      </button>
    );
  }
);

TocButton.displayName = 'TocButton';
