// FILE: c:/Users/Mattj/ritovision website/test/app/projects/entriken/sections/intro/components/Toc.tsx
'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { AccordionTOC, tocStyles } from '@/components/utilities/accordion/AccordionTOC';
import { TocLink } from '@/store/slices/navigation/tocSlice';
import {
  useRegisterToc,
  useTocLinks,
  mapToAccordionItems,
} from '@/hooks/navigation/toc';

const Toc: React.FC = () => {
  // 1) Hydration guard state & effect
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2) Memoize your ToC data array (stable reference)
  const tocLinks = useMemo<TocLink[]>(() => [
    { href: '#overview',               text: 'Overview',                     level: 'h2' },
    { href: '#problems-objectives',    text: 'Problems & Objectives',         level: 'h2' },
    { href: '#testimonial-entriken',   text: 'Testimonial',                   level: 'h2' },
    { href: '#privacy-disclaimer',     text: 'Privacy Disclaimer',           level: 'h2' },
    { isSpacer: true, href: '', text: '', level: '' },
    { href: '#brand-discovery-audit',  text: 'Brand Discovery & Audit',      level: 'h2', isPrimary: true },
    { href: '#context-goals',          text: 'Context & Goals',               level: 'h3' },
    { href: '#different-careers',      text: 'Different Careers',             level: 'h3' },
    { href: '#blockchain-legacy',      text: 'Blockchain Legacy',             level: 'h3' },
    { href: '#legacy-website',         text: 'Legacy Website',                level: 'h3' },
    { href: '#public-platforms',       text: 'Public Platforms',              level: 'h3' },
    { href: '#public-speaking',        text: 'Public Speaking',               level: 'h3' },
    { href: '#book-author',            text: 'Book Author',                   level: 'h3' },
    { href: '#press-publications',     text: 'Press & Publications',          level: 'h3' },
    { href: '#wikipedia',              text: 'Wikipedia',                     level: 'h3' },
    { isSpacer: true, href: '', text: '', level: '' },
    { href: '#brand-strategy-execution', text: 'Brand Strategy & Execution', level: 'h2', isPrimary: true },
    { href: '#overview-strategy',        text: 'Overview',                  level: 'h3' },
    { href: '#website-comparison',       text: 'Website Comparison',        level: 'h3' },
    { href: '#ux-strategy',              text: 'UX Strategy',               level: 'h3' },
    { href: '#creative-direction',       text: 'Creative Direction',        level: 'h3' },
    { href: '#software-architecture',    text: 'Software Architecture',     level: 'h3' },
    { href: '#seo-ai-optimization',      text: 'SEO & AI Optimization',     level: 'h3' },
    { isSpacer: true, href: '', text: '', level: '' },
    { href: '#conclusion', text: 'Conclusion', level: 'h2' },
  ], []); // empty deps → stable array

  // 3) Register into Redux on mount/cleanup
  useRegisterToc(tocLinks);

  // 4) Pull links & flag back out
  const { links, hasToc } = useTocLinks();

  // 5) Prepare Accordion items using consolidated styles
  const items = hasToc
    ? mapToAccordionItems(links, {
        ...tocStyles,
        agencyClass: 'agencyb',
      })
    : [];

  // 6) Only render AccordionTOC after we've hydrated
  if (!mounted) return null;
  return <AccordionTOC items={items} />;
};

export default Toc;