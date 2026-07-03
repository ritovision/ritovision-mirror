import React from 'react';
import styles from './ScrollToTopButton.module.css';

interface ScrollToTopButtonProps {
  onClick: () => void;
  isAnimating: boolean;
}

export function ScrollToTopButton({ onClick, isAnimating }: ScrollToTopButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${styles['scroll-arrow-wrapper']} ${isAnimating ? styles['arrow-animating'] : ''}`}
      aria-label="Scroll to top of page"
      title="Scroll to top"
    >
      <img
        src="/images/utilities/icons/arrowup.png"
        alt=""
        aria-hidden="true"
        style={{
          height: '20px',
          width: '20px',
          objectFit: 'contain',
        }}
      />
    </button>
  );
}
