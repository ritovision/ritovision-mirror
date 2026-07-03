import React, { forwardRef } from 'react';
import styles from './AiButton.module.css';

interface AiButtonProps {
  onClick: () => void;
  isActive: boolean;
}

export const AiButton = forwardRef<HTMLButtonElement, AiButtonProps>(
  ({ onClick, isActive }, ref) => {
    return (
      <button
        ref={ref}
        onMouseDown={(e) => e.preventDefault()}
        onClick={onClick}
        className={styles['ai-btn']}
        aria-label={isActive ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={isActive}
        aria-controls="ai-drawer-content"
        title="AI Assistant"
      >
        <img
          src="/images/utilities/icons/ai-icon-white.png"
          alt=""
          aria-hidden="true"
          style={{
            height: '24px',
            width: '24px',
            objectFit: 'contain',
          }}
        />
      </button>
    );
  }
);

AiButton.displayName = 'AiButton';
