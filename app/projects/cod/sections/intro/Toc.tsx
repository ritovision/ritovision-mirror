// FILE: c:/Users/Mattj/ritovision website/test/app/projects/cod/sections/intro/Toc.tsx
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
    { href: '#overview',                              text: 'Overview',                              level: 'h2' },
    { href: '#earned-coverage',                        text: 'Earned Coverage',                       level: 'h2' },
    { isSpacer: true, href: '',                        text: '',                                     level: '' },
    { href: '#the-process',                            text: 'The Process',                           level: 'h2', isPrimary: true },
    { href: '#quality-assurance-testing',              text: 'Quality Assurance Testing',             level: 'h3' },
    { href: '#infotaining-content-creation',           text: 'Infotaining Content Creation',          level: 'h3' },
    { href: '#strategic-pr-outreach',                  text: 'Strategic PR Outreach',                 level: 'h3' },
    { isSpacer: true, href: '',                        text: '',                                     level: '' },
    { href: '#case-i-vanishing-riot-shield',           text: 'Cases',                                 level: 'h2', isPrimary: true },
    { href: '#case-i-vanishing-riot-shield',           text: 'Case I: Vanishing Riot Shield',         level: 'h3' },
    { href: '#case-ii-self-destructing-choppers',      text: 'Case II: Self-Destructing Choppers',     level: 'h3' },
    { href: '#case-iii-snoop-doggs-vanishing-head',    text: 'Case III: Snoop Dogg Vanishing Head', level: 'h3' },
    { href: '#bonus-case-beating-a-cheater',           text: 'Bonus Case: Beating a Cheater',          level: 'h3' },
    { isSpacer: true, href: '',                        text: '',                                     level: '' },
    { href: '#conclusion',                             text: 'Conclusion',                           level: 'h2' },
  ], []); // empty deps → one stable array

  // 3) Register into Redux on mount & cleanup via custom hook
  useRegisterToc(tocLinks);

  // 4) Pull links & flag back out
  const { links, hasToc } = useTocLinks();

  // 5) Map to Accordion items with consolidated styles
  const items = hasToc
    ? mapToAccordionItems(links, {
        ...tocStyles,
        agencyClass: 'agencyb',
      })
    : [];

  // 6) Only render Accordion after hydration
  if (!mounted) return null;

  return <AccordionTOC items={items} maxWidth="700px" />;
};

export default Toc;