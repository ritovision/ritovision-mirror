'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { AccordionTOC, tocStyles } from '@/components/utilities/accordion/AccordionTOC';
import { TocLink } from '@/store/slices/navigation/tocSlice';
import { mapToAccordionItems, useRegisterToc, useTocLinks } from '@/hooks/navigation/toc';

const Toc: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tocLinks = useMemo<TocLink[]>(
    () => [
      { href: '#overview', text: 'Overview', level: 'h2' },
      {
        href: '#quick-highlights',
        text: 'Quick Highlights',
        level: 'h2',
        isPrimary: true,
      },
      { href: '#contributions-table', text: 'Table of Shipped Contributions', level: 'h2' },
      { href: '#oss-case-studies', text: 'OSS Case Studies', level: 'h2' },
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

  return <AccordionTOC items={items} />;
};

export default Toc;
