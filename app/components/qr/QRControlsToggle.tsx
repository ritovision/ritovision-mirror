'use client';

import React from 'react';
import styles from './QRControlsToggle.module.css';

type QRControlsToggleProps = {
  expanded: boolean;
  onToggle: () => void;
  controlsId: string;
};

export default function QRControlsToggle({
  expanded,
  onToggle,
  controlsId,
}: QRControlsToggleProps) {
  return (
    <button
      className={[
        styles.toggle,
        expanded ? styles.toggleExpanded : '',
      ].join(' ')}
      type="button"
      aria-label={expanded ? 'Hide QR controls' : 'Show QR controls'}
      aria-expanded={expanded}
      aria-controls={controlsId}
      onClick={onToggle}
    >
      <span className={styles.dots} aria-hidden>
        <span />
        <span />
        <span />
      </span>
    </button>
  );
}
