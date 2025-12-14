// FILE: app/hooks/navigation/toc/mapToAccordionItems.tsx
import React from 'react';
import { AccordionItem } from '@/components/utilities/accordion/AccordionTOC';
import { TocLink } from '@/store/slices/navigation/tocSlice';

export interface AccordionTocStyles {
  tocContent: string;
  spacer: string;
  primaryTitle: string;
  linkList: string;
  linkItem?: string; // Made optional to not break existing code
  nestedList?: string;
  agencyClass?: string;
}

/**
 * Turn a flat TocLink[] into an AccordionItem[],
 * injecting a "Table of Contents" header with SVG icon.
 */
export function mapToAccordionItems(
  links: TocLink[],
  styles: AccordionTocStyles
): AccordionItem[] {
  return [
    {
      value: 'toc',
      title: (
        <React.Fragment>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="4" cy="6" r="1.5" fill="white" />
            <rect x="8" y="5" width="8" height="2" rx="1" fill="white" />
            <circle cx="4" cy="12" r="1.5" fill="white" />
            <rect x="8" y="11" width="8" height="2" rx="1" fill="white" />
            <circle cx="4" cy="18" r="1.5" fill="white" />
            <rect x="8" y="17" width="8" height="2" rx="1" fill="white" />
          </svg>
          <span>Table of Contents</span>
        </React.Fragment>
      ),
      content: (
        <nav 
          className={styles.tocContent}
          aria-label="Table of contents"
          role="navigation"
        >
          <ul role="list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {links.map((link, i) => {
              // Render spacer
              if (link.isSpacer) {
                return (
                  <li 
                    key={`spacer-${i}`} 
                    className={styles.spacer}
                    role="presentation"
                    aria-hidden="true"
                  />
                );
              }
              
              // Render primary section header
              if (link.isPrimary) {
                return (
                  <li
                    key={`primary-${i}`}
                    className={`${styles.primaryTitle} ${styles.agencyClass || ''}`}
                    role="listitem"
                  >
                    <a 
                      href={link.href}
                      aria-label={`Primary section: ${link.text}`}
                      onClick={handleSmoothScroll}
                    >
                      {link.text}
                    </a>
                  </li>
                );
              }
              
              // Render regular TOC item with proper nesting level
              const levelClass = link.level ? `toc-level-${link.level.replace('h', '')}` : '';
              const ariaLevel = link.level ? parseInt(link.level.replace('h', '')) - 1 : 2;
              
              return (
                <li
                  key={`link-${i}`}
                  className={`${styles.linkItem || styles.linkList} ${levelClass} ${styles.agencyClass || ''}`}
                  role="listitem"
                  aria-level={ariaLevel}
                >
                  <a 
                    href={link.href}
                    aria-label={`${getHeadingTypeLabel(link.level)}: ${link.text}`}
                    onClick={handleSmoothScroll}
                  >
                    {link.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      ),
    },
  ];
}

/**
 * Helper function to get semantic heading type label
 */
function getHeadingTypeLabel(level: string | undefined): string {
  if (!level) return 'Section';
  
  switch(level) {
    case 'h1': return 'Main heading';
    case 'h2': return 'Section';
    case 'h3': return 'Subsection';
    case 'h4': return 'Sub-subsection';
    default: return 'Section';
  }
}

/**
 * Smooth scroll handler with accessibility considerations
 */
function handleSmoothScroll(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const href = e.currentTarget.getAttribute('href');
  if (!href) return;
  
  const targetId = href.replace('#', '');
  const target = document.getElementById(targetId);
  
  if (target) {
    // Smooth scroll to target
    target.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
    
    // Set focus for keyboard users (after scroll completes)
    setTimeout(() => {
      target.setAttribute('tabindex', '-1');
      target.focus();
      // Remove tabindex after focus (so it's not in tab order)
      target.addEventListener('blur', () => {
        target.removeAttribute('tabindex');
      }, { once: true });
    }, 500);
  }
}