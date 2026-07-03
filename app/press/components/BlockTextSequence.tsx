'use client';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './BlockTextSequence.module.css';
import AnimatedBorderBlock from './AnimatedBorderBlock';

type SequenceItem = {
  text: React.ReactNode;
  color: string;
};

interface BlockTextSequenceProps {
  items?: SequenceItem[];
  trailingText?: React.ReactNode;
  trailingTextDelay?: number;
}

const defaultItems: SequenceItem[] = [
  { text: 'Creative', color: '#FFFFFF' },
  { text: 'Authoritative', color: '#FFFFFF' },
  { text: 'A Multi-Disciplinary Visionary', color: '#FC1819' },
];

export default function BlockTextSequence({
  items: providedItems,
  trailingText,
  trailingTextDelay = 750,
}: BlockTextSequenceProps) {
  const items = useMemo(() => providedItems ?? defaultItems, [providedItems]);

  const [visibleIndex, setVisibleIndex] = useState(-1);
  const [trailingVisible, setTrailingVisible] = useState(false);
  const trailingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const revealTrailingText = useCallback(() => {
    if (!trailingText) return;
    if (trailingTimerRef.current) clearTimeout(trailingTimerRef.current);
    trailingTimerRef.current = setTimeout(() => {
      setTrailingVisible(true);
    }, trailingTextDelay);
  }, [trailingText, trailingTextDelay]);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    setVisibleIndex(-1);
    setTrailingVisible(false);
    if (trailingTimerRef.current) clearTimeout(trailingTimerRef.current);

    items.forEach((_, index) => {
      const t = setTimeout(() => {
        setVisibleIndex(index);
      }, 800 * index);
      timeouts.push(t);
    });
    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
      if (trailingTimerRef.current) clearTimeout(trailingTimerRef.current);
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
          onTextVisible={index === items.length - 1 ? revealTrailingText : undefined}
        />
      ))}
      {trailingText && (
        <div className={styles.largeText} style={{ alignSelf: 'center' }}>
          <p
            className={styles.textContainer}
            style={{
              margin: 0,
              color: 'var(--primary-red)',
              opacity: trailingVisible ? 1 : 0,
              pointerEvents: 'none',
              transition: 'opacity 0.5s ease-in-out',
            }}
          >
            {trailingText}
          </p>
        </div>
      )}
    </div>
  );
}
