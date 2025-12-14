import React, { forwardRef } from 'react';
import { TocDrawerContent } from './TocDrawerContent';
import { useTocDrawer } from './useTocDrawer';
import styles from './TocDrawer.module.css';

interface TocDrawerProps {
  height: number;
  opacity: number;
  fadeDurationMs: number;
}

export const TocDrawer = forwardRef<HTMLDivElement, TocDrawerProps>(
  ({ height, opacity, fadeDurationMs }, ref) => {
    const { handleTocLinkClick } = useTocDrawer();

    return (
      <div
        ref={ref}
        id="toc-drawer-content"
        className={styles['toc-drawer']}
        style={{
          height: `${height}px`,
          overflowY: 'auto',
          overflowX: 'hidden',
          borderTop: '1px solid var(--secondary-blue)',
        }}
        role="region"
        aria-label="Table of contents"
        tabIndex={-1}
      >
        <TocDrawerContent onLinkClick={handleTocLinkClick} opacity={opacity} fadeDurationMs={fadeDurationMs} />
      </div>
    );
  }
);

TocDrawer.displayName = 'TocDrawer';
