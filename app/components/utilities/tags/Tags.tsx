'use client';
import React, { useMemo } from 'react';
import styles from './Tags.module.css';

interface TagsProps {
  initialTags: string[];
  variant?: 'card' | 'inline';
  className?: string;
}

export default function Tags({ initialTags, variant = 'card', className = '' }: TagsProps) {
  // Normalize + dedupe to prevent accidental duplicates (e.g., extra spaces, punctuation variants).
  const tags = useMemo(() => {
    const normalized = initialTags.map((t) => t.trim());
    return Array.from(new Set(normalized));
  }, [initialTags]);

  const tagList = (
    <div
      className={[
        styles.tagList,
        variant === 'inline' ? className : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {tags.map((tag, i) => (
        <span className={styles.tag} key={`${tag}-${i}`}>
          {tag}
        </span>
      ))}
    </div>
  );

  if (variant === 'inline') {
    return tagList;
  }

  return (
    <div className={[styles.container, className].filter(Boolean).join(' ')}>
      <div className={styles.header}>Tags</div>
      {tagList}
    </div>
  );
}
