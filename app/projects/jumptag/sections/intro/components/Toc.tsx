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

  // 2) Stable TOC source of truth
  const tocLinks = useMemo<TocLink[]>(() => [
    { href: '#overview',                            text: 'Overview',                                level: 'h2' },
    { href: '#web3-predecessor-project',            text: 'Web3 Predecessor Project',                level: 'h2' },
    { isSpacer: true, href: '', text: '', level: '' },
    { href: '#new-york-fashion-week-activations',   text: 'New York Fashion Week Activations',      level: 'h2', isPrimary: true },
    { href: '#future-forward-fashion-show-feature', text: 'Future-Forward Fashion Show Feature',      level: 'h3' },
    { href: '#fashion-show-sponsorship',            text: 'Fashion Show Sponsorship',                level: 'h3' },
    { isSpacer: true, href: '',                     text: '',                                       level: '' },
    { href: '#physical-product',                    text: 'Physical Product',                        level: 'h2', isPrimary: true },
    { href: '#jewelry-design-production',           text: 'Jewelry Design & Production',             level: 'h3' },
    { isSpacer: true, href: '',                     text: '',                                       level: '' },
    { href: '#platform-development',                text: 'Platform Development',                    level: 'h2', isPrimary: true },
    { href: '#first-iteration',                     text: 'First Iteration',                         level: 'h3' },
    { href: '#second-iteration',                    text: 'Second Iteration',                        level: 'h3' },
    { href: '#third-iteration',                     text: 'Third Iteration',                         level: 'h3' },
    { href: '#e-commerce-readiness',                text: 'E-Commerce Readiness',                    level: 'h3' },
    { isSpacer: true, href: '',                     text: '',                                       level: '' },
    { href: '#branding-and-visual-identity',        text: 'Branding & Visual Identity',              level: 'h2', isPrimary: true },
    { href: '#identity-and-voice',                  text: 'Identity and Voice',                      level: 'h3' },
    { href: '#photography-style',                   text: 'Photography Style',                       level: 'h3' },
    { href: '#music',                               text: 'Music',                                   level: 'h3' },
    { isSpacer: true, href: '',                     text: '',                                       level: '' },
    { href: '#conclusion',                          text: 'Conclusion',                              level: 'h2' },
  ], []); // empty deps → one stable array

  // 3) Register TOC on mount & cleanup
  useRegisterToc(tocLinks);

  // 4) Pull Redux-backed links & flag
  const { links, hasToc } = useTocLinks();

  // 5) Map to Accordion items with consolidated styles
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