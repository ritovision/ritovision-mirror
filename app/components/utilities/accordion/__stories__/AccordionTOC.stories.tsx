import type { Meta, StoryObj } from '@storybook/react';
import { AccordionTOC, tocStyles, type AccordionItem } from '../AccordionTOC';
import { AccordionText } from '../AccordionText';
import { mapToAccordionItems } from '@/hooks/navigation/toc';
import type { TocLink } from '@/store/slices/navigation/tocSlice';

const tocLinks: TocLink[] = [
  { href: '#overview', text: 'Overview', level: 'h2', isPrimary: true },
  { href: '#overview', text: 'Why use a TOC accordion', level: 'h3' },
  { href: '#setup', text: 'Setup guide', level: 'h3' },
  { href: '#divider', text: 'Spacer', level: 'h2', isSpacer: true },
  { href: '#features', text: 'Features', level: 'h2', isPrimary: true },
  { href: '#features-search', text: 'Search and filter', level: 'h4' },
  { href: '#features-shortcuts', text: 'Keyboard tips', level: 'h4' },
  { href: '#accessibility', text: 'Accessibility defaults', level: 'h3' },
  { href: '#faq', text: 'FAQ', level: 'h2', isPrimary: true },
];

const tocAccordionItems = mapToAccordionItems(tocLinks, {
  tocContent: tocStyles.tocContent,
  spacer: tocStyles.spacer,
  primaryTitle: tocStyles.primaryTitle,
  linkList: tocStyles.linkList,
  linkItem: tocStyles.linkItem,
});

const supplementalItems: AccordionItem[] = [
  {
    value: 'implement',
    title: 'Implementation notes',
    content: (
      <div style={{ display: 'grid', gap: 10 }}>
        <AccordionText
          heading="Drop-in friendly"
          text="Pass any items array to the accordion. The TOC helper maps Redux tocSlice entries into a nav block with smooth scrolling.\n\ndefaultOpenItems lets you keep the TOC expanded on load."
        />
      </div>
    ),
  },
  {
    value: 'writing',
    title: 'Writing guidance',
    content: (
      <AccordionText
        heading="Make links scannable"
        text="Lead with verbs, keep labels short, and align link targets with visible headings on the page.\n\nUse isPrimary and isSpacer flags to break the list into grouped sections."
      />
    ),
  },
];

const demoItems = [...tocAccordionItems, ...supplementalItems];

const meta = {
  title: 'Utilities/Accordions/AccordionTOC',
  component: AccordionTOC,
  args: {
    items: demoItems,
    defaultOpenItems: ['toc'],
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
  },
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '32px 0',
          background: 'var(--primary-blue)',
          minHeight: '100vh',
        }}
      >
        <div style={{ width: 'min(1080px, 94vw)', margin: '0 auto' }}>
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    items: { control: false },
  },
} satisfies Meta<typeof AccordionTOC>;

export default meta;
type Story = StoryObj<typeof meta>;

const sectionContent = [
  {
    id: 'overview',
    title: 'Overview',
    body:
      'Use this accordion to present a compact table of contents the reader can expand or collapse without losing their place.',
  },
  {
    id: 'setup',
    title: 'Setup guide',
    body:
      'Provide TocLink objects to mapToAccordionItems and pass the returned items into AccordionTOC. Default styling is pulled from tocStyles.',
  },
  {
    id: 'features',
    title: 'Features',
    body:
      'Built on Radix Accordion plus framer-motion so open/close feels crisp while keeping keyboard interactions accessible.',
  },
  {
    id: 'features-search',
    title: 'Search and filter',
    body:
      'Use multiple link levels to show hierarchy. Add spacer rows when you need breathing room between sections.',
  },
  {
    id: 'features-shortcuts',
    title: 'Keyboard tips',
    body:
      'Radix primitives handle arrow key navigation and focus management out of the box.',
  },
  {
    id: 'accessibility',
    title: 'Accessibility defaults',
    body:
      'Trigger elements expose aria-expanded and aria-controls. If you override titles, keep them concise and descriptive.',
  },
  {
    id: 'faq',
    title: 'FAQ',
    body:
      'You can mix the TOC entry with other accordion items for release notes, support contacts, or contextual guidance.',
  },
];

export const TocWithPageSections: Story = {
  name: 'TOC with smooth-scroll targets',
  render: (args) => (
    <div style={{ display: 'grid', gap: 28 }}>
      <AccordionTOC {...args} />
      <div
        style={{
          display: 'grid',
          gap: 16,
          padding: '0 24px 32px',
          maxWidth: 1024,
          margin: '0 auto',
        }}
      >
        {sectionContent.map((section) => (
          <section
            key={section.id}
            id={section.id}
            style={{
              padding: '16px 18px',
              borderRadius: 8,
              background: 'rgba(255, 255, 255, 0.08)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
            }}
          >
            <h3 style={{ margin: '0 0 8px' }}>{section.title}</h3>
            <p style={{ margin: 0 }}>{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  ),
};

export const CompactContainer: Story = {
  name: 'Compact container',
  args: {
    items: tocAccordionItems,
    maxWidth: '720px',
    defaultOpenItems: ['toc'],
    marginTop: '1rem',
    marginBottom: '1rem',
  },
};
