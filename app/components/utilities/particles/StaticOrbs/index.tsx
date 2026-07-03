import React from 'react';
import styles from './styles.module.css';

type StaticOrbsProps = {
  className?: string;
  zIndex?: number;
};

export default function StaticOrbs({ className, zIndex }: StaticOrbsProps) {
  const style: React.CSSProperties | undefined =
    zIndex === undefined ? undefined : { zIndex };

  return (
    <div
      className={[styles.field, className].filter(Boolean).join(' ')}
      style={style}
      aria-hidden
    >
      {Array.from({ length: 16 }).map((_, index) => (
        <span key={index} className={styles.orb} />
      ))}
    </div>
  );
}
