import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { mapToAccordionItems, AccordionTocStyles } from '../mapToAccordionItems';
import { TocLink } from '@/store/slices/navigation/tocSlice';

describe('mapToAccordionItems', () => {
    const mockStyles: AccordionTocStyles = {
        tocContent: 'toc-content',
        spacer: 'spacer-class',
        primaryTitle: 'primary-title',
        linkList: 'link-list',
        linkItem: 'link-item',
        nestedList: 'nested-list',
        agencyClass: 'agency-class',
    };

    describe('basic structure', () => {
        it('returns an array with a single accordion item for empty links', () => {
            const result = mapToAccordionItems([], mockStyles);

            expect(result).toHaveLength(1);
            expect(result[0].value).toBe('toc');
        });

        it('includes "Table of Contents" title with SVG icon', () => {
            const result = mapToAccordionItems([], mockStyles);
            const { container } = render(<>{result[0].title}</>);

            expect(container.querySelector('svg')).toBeTruthy();
            expect(container.textContent).toContain('Table of Contents');
        });

        it('wraps content in a nav element with proper aria-label', () => {
            const result = mapToAccordionItems([], mockStyles);
            const { container } = render(<>{result[0].content}</>);

            const nav = container.querySelector('nav');
            expect(nav).toBeTruthy();
            expect(nav?.getAttribute('aria-label')).toBe('Table of contents');
            expect(nav?.getAttribute('role')).toBe('navigation');
        });
    });

    describe('spacer rendering', () => {
        it('renders spacer items with correct class and attributes', () => {
            const links: TocLink[] = [
                { href: '#section1', text: 'Section 1', level: 'h2' },
                { isSpacer: true, href: '', text: '', level: '' },
                { href: '#section2', text: 'Section 2', level: 'h2' },
            ];

            const result = mapToAccordionItems(links, mockStyles);
            const { container } = render(<>{result[0].content}</>);

            const spacer = container.querySelector('.spacer-class');
            expect(spacer).toBeTruthy();
            expect(spacer?.getAttribute('role')).toBe('presentation');
            expect(spacer?.getAttribute('aria-hidden')).toBe('true');
        });
    });

    describe('primary section rendering', () => {
        it('renders primary items with correct class and link', () => {
            const links: TocLink[] = [
                { href: '#intro', text: 'Introduction', level: '', isPrimary: true },
            ];

            const result = mapToAccordionItems(links, mockStyles);
            const { container } = render(<>{result[0].content}</>);

            const primaryItem = container.querySelector('.primary-title');
            expect(primaryItem).toBeTruthy();
            expect(primaryItem?.classList.contains('agency-class')).toBe(true);

            const link = primaryItem?.querySelector('a');
            expect(link?.getAttribute('href')).toBe('#intro');
            expect(link?.textContent).toBe('Introduction');
            expect(link?.getAttribute('aria-label')).toBe('Primary section: Introduction');
        });
    });

    describe('regular TOC item rendering', () => {
        it('renders regular items with correct class and link', () => {
            const links: TocLink[] = [
                { href: '#section1', text: 'Section 1', level: 'h2' },
            ];

            const result = mapToAccordionItems(links, mockStyles);
            const { container } = render(<>{result[0].content}</>);

            const link = container.querySelector('a');
            expect(link?.getAttribute('href')).toBe('#section1');
            expect(link?.textContent).toBe('Section 1');
        });

        it('applies level-based CSS class for h2', () => {
            const links: TocLink[] = [
                { href: '#section1', text: 'Section 1', level: 'h2' },
            ];

            const result = mapToAccordionItems(links, mockStyles);
            const { container } = render(<>{result[0].content}</>);

            const listItem = container.querySelector('li');
            expect(listItem?.classList.contains('toc-level-2')).toBe(true);
        });

        it('sets correct aria-label for h2 items', () => {
            const links: TocLink[] = [
                { href: '#section1', text: 'Section 1', level: 'h2' },
            ];

            const result = mapToAccordionItems(links, mockStyles);
            const { container } = render(<>{result[0].content}</>);

            const link = container.querySelector('a');
            expect(link?.getAttribute('aria-label')).toBe('Section: Section 1');
        });
    });

    describe('complex mixed content', () => {
        it('renders mixed content with correct order and structure', () => {
            const links: TocLink[] = [
                { href: '#intro', text: 'Introduction', level: '', isPrimary: true },
                { isSpacer: true, href: '', text: '', level: '' },
                { href: '#section1', text: 'Section 1', level: 'h2' },
                { href: '#subsection1', text: 'Subsection 1.1', level: 'h3' },
                { href: '#subsection2', text: 'Subsection 1.2', level: 'h3' },
                { isSpacer: true, href: '', text: '', level: '' },
                { href: '#section2', text: 'Section 2', level: 'h2' },
                { href: '#conclusion', text: 'Conclusion', level: '', isPrimary: true },
            ];

            const result = mapToAccordionItems(links, mockStyles);
            const { container } = render(<>{result[0].content}</>);

            const allListItems = container.querySelectorAll('li');
            expect(allListItems).toHaveLength(8);

            const primaryItems = container.querySelectorAll('.primary-title');
            expect(primaryItems).toHaveLength(2);

            const spacers = container.querySelectorAll('.spacer-class');
            expect(spacers).toHaveLength(2);

            const h2Items = container.querySelectorAll('.toc-level-2');
            expect(h2Items).toHaveLength(2);

            const h3Items = container.querySelectorAll('.toc-level-3');
            expect(h3Items).toHaveLength(2);
        });
    });
});
