'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { AccordionTOC, tocStyles } from '@/components/utilities/accordion/AccordionTOC';
import { TocLink } from '@/store/slices/navigation/tocSlice';
import {
  useRegisterToc,
  useTocLinks,
  mapToAccordionItems,
} from '@/hooks/navigation/toc';

const Toc: React.FC = () => {
  // 1) Hydration guard to avoid SSR mismatches
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2) Stable source-of-truth for this section's ToC
  const tocLinks = useMemo<TocLink[]>(() => [
    { href: '#overview',                     text: 'Overview',                            level: 'h2' },
    { href: '#testimonial-entriken',         text: 'Testimonial',                         level: 'h2' },
    { href: '#responsibilities-activities',  text: 'Responsibilities & Activities',       level: 'h2' },
    { href: '#planning-cycles',              text: 'Planning Cycles',                     level: 'h2' },
    { href: '#problem-to-address',           text: 'Problem to Address',                  level: 'h2' },
    { href: '#how-the-erc-solves-it',        text: 'How the ERC solves it',               level: 'h2' },
    { href: '#erc-pitches',                  text: 'ERC Pitches',                          level: 'h2' },
    { href: '#post-mortem-podcast',          text: 'Post-Mortem Podcast',                  level: 'h2' },
    { href: '#encrypted-access-to-erc',      text: 'Encrypted Access to ERC',              level: 'h2' },
    { href: '#full-narrative-of-erc-journey',text: 'Full Narrative of ERC Journey',       level: 'h2' },
    { href: '#conclusion',                   text: 'Conclusion',                          level: 'h2' },
  ], []); // empty deps → stable reference

  // 3) Register into Redux on mount & cleanup via custom hook
  useRegisterToc(tocLinks);

  // 4) Pull links & flag back out
  const { links, hasToc } = useTocLinks();

  // 5) Prepare Accordion items with consolidated styles
  const items = hasToc
    ? mapToAccordionItems(links, {
        ...tocStyles,
        agencyClass: 'agencyb',
      })
    : [];

  // 6) Only render after hydration
  if (!mounted) return null;

  return <AccordionTOC items={items} />;
};

export default Toc;