'use client';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './BlockTextSequence.module.css';
import AnimatedBorderBlock from './AnimatedBorderBlock';

export default function BlockTextSequence() {
  const items = useMemo(
    () => [
      { text: 'Creative', color: '#FFFFFF' },
      { text: 'Authoritative', color: '#FFFFFF' },
      { text: 'A Multi-Disciplinary Visionary', color: '#FC1819' },
    ],
    []
  );

  const [visibleIndex, setVisibleIndex] = useState(-1);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    items.forEach((_, index) => {
      const t = setTimeout(() => {
        setVisibleIndex(index);
      }, 800 * index);
      timeouts.push(t);
    });
    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [items]);

  return (
    <div className={styles.sequenceContainer}>
      {items.map((item, index) => (
        <AnimatedBorderBlock
          key={index}
          text={item.text}
          textColor={item.color}
          borderColor="var(--secondary-blue)"
          isVisible={index <= visibleIndex}
          animationDuration={600}
          extraClassName={
            index === 0
              ? styles.leftAlign
              : index === 1
              ? styles.rightAlign
              : styles.largeText
          }
        />
      ))}
    </div>
  );
}
