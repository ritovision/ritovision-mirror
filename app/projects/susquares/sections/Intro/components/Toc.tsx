'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { AccordionTOC, tocStyles } from '@/components/utilities/accordion/AccordionTOC';
import { TocLink } from '@/store/slices/navigation/tocSlice';
import { mapToAccordionItems, useRegisterToc, useTocLinks } from '@/hooks/navigation/toc';
import styles from './Toc.module.css';

const Toc: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tocLinks = useMemo<TocLink[]>(
    () => [
      {
        href: '#susquares-highlights',
        text: 'Quick Highlights',
        level: 'h2',
        isPrimary: true,
      },
      {
        href: '#why-this-project-mattered',
        text: 'Why This Project Mattered',
        level: 'h2',
      },
      {
        href: '#problems-vision-and-rationale',
        text: 'Problems, Vision and Rationale',
        level: 'h2',
      },
      {
        href: '#what-rito-built-in-the-fork',
        text: 'What Rito Built in the Fork',
        level: 'h2',
      },
      {
        href: '#trust-scope-and-working-relationship',
        text: 'Trust, Scope, and Working Relationship',
        level: 'h2',
      },
      {
        href: '#upstream-merges-for-the-official-su-squares-site',
        text: 'Upstream Merges for the Official Su Squares Site',
        level: 'h2',
      },
      {
        href: '#boundaries-and-exit',
        text: 'Boundaries and Exit',
        level: 'h2',
      },
      {
        href: '#conclusion',
        text: 'Conclusion',
        level: 'h2',
      },
    ],
    []
  );

  useRegisterToc(tocLinks);

  const { links, hasToc } = useTocLinks();

  const items = hasToc
    ? mapToAccordionItems(links, {
        ...tocStyles,
        agencyClass: 'agencyb',
      })
    : [];

  if (!mounted) return null;

  return (
    <div className={styles.wrapper}>
      <AccordionTOC items={items} />
    </div>
  );
};

export default Toc;
