import type { Meta, StoryObj } from '@storybook/react';
import { AccordionComponent, type AccordionItem } from '../Accordion';
import { AccordionText } from '../AccordionText';

const baseItems: AccordionItem[] = [
  {
    value: 'mission',
    title: 'What makes this accordion different?',
    content: (
      <AccordionText
        heading="Multiple panels stay open"
        text="Supports opening more than one section at a time so people can compare details without losing context.\n\nAnimations are powered by Framer Motion for a smooth expand/collapse."
      />
    ),
  },
  {
    value: 'content',
    title: 'Content guidelines',
    content: (
      <AccordionText
        heading="Keep copy scannable"
        text="Lead with the outcome in the header and keep the body to three or four sentences.\n\nWhen details get long, nest lists or secondary components instead of cramming everything into one paragraph."
      />
    ),
  },
  {
    value: 'accessibility',
    title: 'Accessibility defaults',
    content: (
      <AccordionText
        heading="Radix primitives under the hood"
        text="Keyboard controls, focus management, and ARIA syntax ship with the underlying Radix Accordion components, so teams only supply content.\n\nPair headings with meaningful values to keep the reading order logical."
      />
    ),
  },
];

const richItems: AccordionItem[] = [
  {
    value: 'checklist',
    title: 'Launch checklist',
    content: (
      <div style={{ display: 'grid', gap: 8 }}>
        <p>Great for progressive disclosure of steps.</p>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li>Confirm owners and due dates</li>
          <li>Link to supporting docs instead of pasting walls of text</li>
          <li>Keep each panel focused on a single decision</li>
        </ul>
      </div>
    ),
  },
  {
    value: 'faq',
    title: 'FAQ style content',
    content: (
      <div style={{ display: 'grid', gap: 10 }}>
        <p>
          Pair this accordion with <code>AccordionText</code> when you want quick paragraph
          formatting without writing custom markup.
        </p>
        <AccordionText
          heading="Quick example"
          text="How many items should I use?\n\nThree to six panels perform best; if you have more, split them into themed accordions."
        />
      </div>
    ),
  },
];

const meta = {
  title: 'Utilities/Accordions/Accordion',
  component: AccordionComponent,
  args: {
    items: baseItems,
  },
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--primary-blue)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '48px 24px',
        }}
      >
        <div style={{ width: 'min(960px, 90vw)' }}>
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    items: { control: false },
  },
} satisfies Meta<typeof AccordionComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RichContent: Story = {
  args: { items: richItems },
};
