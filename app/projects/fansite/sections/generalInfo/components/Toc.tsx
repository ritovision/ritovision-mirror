// app/projects/fansite/sections/generalInfo/components/Toc.tsx
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
  // ----------------------------------------
  // Hydration guard: render nothing until client‐side mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  // Always call hooks above; only guard the JSX below.
  // ----------------------------------------
  // Memoize your TOC data so it's the same reference every render
  const tocLinks = useMemo<TocLink[]>(() => [
    { href: '#testimonial', text: 'Testimonial', level: 'h2' },
    { href: '#overview', text: 'Overview', level: 'h2' },
    { href: '#site-evolution', text: 'Site Evolution', level: 'h2' },
    { href: '#vision-branding', text: 'Vision & Branding', level: 'h2' },
    {
      href: '#nyt-highlight',
      text: 'New York Times Highlight & Traffic Surge',
      level: 'h2',
    },
    { isSpacer: true, href: '', text: '', level: '' },
    { href: '#nextjs', text: "Next.js Website Version", level: 'h2', isPrimary: true },
    
    
    { href: '#static-site-cms', text: 'Static Site Built like a CMS', level: 'h3' },
    { href: '#content-strategy', text: 'Content Strategy', level: 'h3' },
    { href: '#bot-parity', text: 'Bot Parity & Edge Orchestration', level: 'h3' },
    { href: '#seo-ai', text: 'SEO Future-Proofed for AI', level: 'h3' },
    
    { isSpacer: true, href: '', text: '', level: '' },
    { href: '#conclusion', text: 'Conclusion', level: 'h2' },
  ], []); // empty deps = only built once
  // Register into Redux on mount, clear on unmount
  useRegisterToc(tocLinks);
  // Read back the same list
  const { links, hasToc } = useTocLinks();
  // Map into AccordionItems with consolidated styles
  const items = hasToc
    ? mapToAccordionItems(links, {
        ...tocStyles,
        agencyClass: 'agencyb',
      })
    : [];
  // Only render after hydration
  if (!mounted) return null;
  return <AccordionTOC items={items} />;
};

export default Toc;
