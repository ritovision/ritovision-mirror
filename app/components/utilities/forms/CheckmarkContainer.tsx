'use client';

import React, { useState } from 'react';
import styles from './CheckmarkContainer.module.css';

export type ContainerState = 'pre' | 'focus' | 'valid' | 'invalid' | 'disabled';

interface CheckmarkContainerProps {
  title: string;
  state: ContainerState;
  items: string[];
}

const CheckmarkContainer: React.FC<CheckmarkContainerProps> = ({ title, state, items }) => {
  // Initialize all check items as unchecked
  const [checkedItems, setCheckedItems] = useState<boolean[]>(items.map(() => false));

  // Toggle only if not disabled
  const toggleItem = (index: number) => {
    if (state === 'disabled') {
      return;
    }
    const newChecked = [...checkedItems];
    newChecked[index] = !newChecked[index];
    setCheckedItems(newChecked);
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
      role="group"
      aria-labelledby="checkmark-container-title"
    >
      <div id="checkmark-container-title" className={styles.title}>
        {title}
      </div>
      <div className={styles.itemsContainer}>
        {items.map((item, index) => (
          <div
            key={index}
            className={styles.item}
            role="checkbox"
            tabIndex={state !== 'disabled' ? 0 : -1}
            aria-checked={checkedItems[index]}
            onClick={() => toggleItem(index)}
            onKeyDown={(e) => {
              if (state !== 'disabled' && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                toggleItem(index);
              }
            }}
          >
            <div className={styles.checkBox}>
              {checkedItems[index] && (
                <svg
                  viewBox="0 0 24 24"
                  className={styles.checkIcon}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 16.2l-3.5-3.5L4 14.2l5 5 12-12-1.5-1.5L9 16.2z" />
                </svg>
              )}
            </div>
            <div className={styles.itemText}>{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckmarkContainer;
