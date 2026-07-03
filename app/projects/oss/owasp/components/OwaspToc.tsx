'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { AccordionTOC, tocStyles } from '@/components/utilities/accordion/AccordionTOC';
import { mapToAccordionItems, useRegisterToc, useTocLinks } from '@/hooks/navigation/toc';
import { TocLink } from '@/store/slices/navigation/tocSlice';

export default function OwaspToc() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tocLinks = useMemo<TocLink[]>(
    () => [
      { href: '#owasp-overview', text: 'Overview', level: 'h2', isPrimary: true },
      { href: '#owasp-quick-highlights', text: 'Quick Highlights', level: 'h3' },
      { isSpacer: true, href: '#', text: '', level: 'h2' },
      { href: '#owasp-background', text: 'Background', level: 'h2', isPrimary: true },
      { isSpacer: true, href: '#', text: '', level: 'h2' },
      { href: '#owasp-vwad-current', text: 'VWAD Platform Foundations', level: 'h2', isPrimary: true },
      { href: '#owasp-vwad-current-browse', text: 'Productizing the Browse Experience', level: 'h3' },
      { href: '#owasp-vwad-current-publishing', text: 'Building the Publishing and Discovery Substrate', level: 'h3' },
      { href: '#owasp-vwad-current-hardening', text: 'Hardening the Launch Surface', level: 'h3' },
      { isSpacer: true, href: '#', text: '', level: 'h2' },
      { href: '#owasp-vwad-legacy', text: 'Legacy VWAD: UX Rescue and Product Expansion', level: 'h2', isPrimary: true },
      { href: '#owasp-vwad-legacy-table', text: 'Table Rescue and Mobile Responsiveness', level: 'h3' },
      { href: '#owasp-vwad-legacy-search', text: 'Advanced Search and Normalization', level: 'h3' },
      { isSpacer: true, href: '#', text: '', level: 'h2' },
      { href: '#owasp-site-theme', text: 'OWASP Site Theme Mobile Rescue', level: 'h2', isPrimary: true },
      { href: '#owasp-top10', text: 'OWASP Top 10 RC Mobile', level: 'h2', isPrimary: true },
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
}
