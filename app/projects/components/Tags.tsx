'use client';
import React, { useMemo } from 'react';
import styles from './Tags.module.css';

interface TagsProps {
  initialTags: string[];
}

export default function Tags({ initialTags }: TagsProps) {
  // Normalize + dedupe to prevent accidental duplicates (e.g., extra spaces, punctuation variants).
  const tags = useMemo(() => {
    const normalized = initialTags.map(t => t.trim());
    return Array.from(new Set(normalized));
  }, [initialTags]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>Tags</div>
      <div className={styles.tagList}>
        {tags.map((tag, i) => (
          <span className={styles.tag} key={`${tag}-${i}`}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
