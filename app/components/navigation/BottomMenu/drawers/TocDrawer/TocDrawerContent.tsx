import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import styles from './TocDrawer.module.css';

interface TocDrawerContentProps {
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  opacity: number;
  fadeDurationMs: number;
}

export function TocDrawerContent({ onLinkClick, opacity, fadeDurationMs }: TocDrawerContentProps) {
  const { links: tocLinks } = useSelector((state: RootState) => state.toc);

  return (
    <div style={{ opacity, transition: `opacity ${fadeDurationMs}ms ease` }}>
      <div role="list">
        {tocLinks.map((link, index) => {
          // Render spacer
          if (link.isSpacer) {
            return (
              <div
                key={`spacer-${index}`}
                className={styles['toc-spacer']}
                role="presentation"
                aria-hidden="true"
              />
            );
          }

          // Render link
          const levelNumber = link.level.replace('h', '');
          return (
            <a
              key={`${link.href}-${index}`}
              href={link.href}
              onClick={(e) => onLinkClick(e, link.href)}
              className={`${styles['toc-link']} ${styles[`toc-${link.level}`]} ${
                link.isPrimary ? styles['toc-primary'] : ''
              }`}
              role="listitem"
              aria-label={`${link.isPrimary ? 'Primary section: ' : ''}${
                levelNumber === '2'
                  ? 'Section'
                  : levelNumber === '3'
                  ? 'Subsection'
                  : 'Item'
              }: ${link.text}`}
            >
              {link.text}
            </a>
          );
        })}
      </div>
    </div>
  );
}
