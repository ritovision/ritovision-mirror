'use client';

import React, { useState } from 'react';
import styles from './RadioContainer.module.css';

export type ContainerState = 'pre' | 'focus' | 'valid' | 'invalid' | 'disabled';

interface RadioContainerProps {
  title: string;
  state: ContainerState;
  items: string[];
}

const RadioContainer: React.FC<RadioContainerProps> = ({ title, state, items }) => {
  // Only one item can be selected (null means none selected)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Only allow selection if not disabled.
  const selectItem = (index: number) => {
    if (state === 'disabled') return;
    setSelectedIndex(index);
  };

  let stateClass = '';
  switch (state) {
    case 'pre':
      stateClass = styles.pre;
      break;
    case 'focus':
      stateClass = styles.focus;
      break;
    case 'valid':
      stateClass = styles.valid;
      break;
    case 'invalid':
      stateClass = styles.invalid;
      break;
    case 'disabled':
      stateClass = styles.disabled;
      break;
    default:
      stateClass = styles.pre;
  }

  return (
    <div
      className={`${styles.container} ${stateClass}`}
      role="radiogroup"
      aria-labelledby="radio-container-title"
    >
      <div id="radio-container-title" className={styles.title}>
        {title}
      </div>
      <div className={styles.itemsContainer}>
        {items.map((item, index) => (
          <div
            key={index}
            className={styles.item}
            role="radio"
            tabIndex={state !== 'disabled' ? 0 : -1}
            aria-checked={selectedIndex === index}
            onClick={() => selectItem(index)}
            onKeyDown={(e) => {
              if (state !== 'disabled' && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                selectItem(index);
              }
            }}
          >
            <div className={styles.radioButton}>
              {selectedIndex === index && <div className={styles.radioInner} />}
            </div>
            <div className={styles.itemText}>{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioContainer;
