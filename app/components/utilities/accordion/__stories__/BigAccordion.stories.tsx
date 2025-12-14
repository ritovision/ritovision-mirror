import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { BigAccordion } from '../BigAccordion';
import { AccordionText } from '../AccordionText';

type BigAccordionProps = ComponentProps<typeof BigAccordion>;

const featureItems: BigAccordionProps['items'] = [
  {
    value: 'north-star',
    title: 'North star vision',
    content: (
      <AccordionText
        heading="Give people clarity fast"
        text="BigAccordion reserves more vertical space for the title so the headline can do the heavy lifting.\n\nUse it for hero FAQs, policy summaries, or any place where the open state should feel substantial."
      />
    ),
  },
  {
    value: 'collaboration',
    title: 'Collaboration ready',
    content: (
      <div style={{ display: 'grid', gap: 10 }}>
        <p>Pair this component with anchored headings to deep-link into specific panels.</p>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>Share links like <code>#collaboration</code> to open the matching panel on load</li>
          <li>Set <code>contentPadding</code> for dense or roomy layouts</li>
          <li>Optionally hide the underline animation with <code>showUnderline</code></li>
        </ul>
      </div>
    ),
  },
  {
    value: 'rollout',
    title: 'Rollout guidance',
    content: (
      <AccordionText
        heading="When to choose BigAccordion"
        text="Use it when you want bold, billboard-style headlines and a slower scroll experience.\n\nFor compact FAQs, prefer the smaller accordion component in this folder."
      />
    ),
  },
];

const roadmapItems: BigAccordionProps['items'] = [
  {
    value: 'near-term',
    title: 'Near-term changes',
    content: (
      <div style={{ display: 'grid', gap: 8 }}>
        <p>Ship low-risk improvements this quarter.</p>
        <ol style={{ margin: 0, paddingLeft: 20 }}>
          <li>Refine the open/close easing for screen readers</li>
          <li>Swap icons when content is already expanded</li>
          <li>Expose aria-label overrides on triggers</li>
        </ol>
      </div>
    ),
  },
  {
    value: 'experiments',
    title: 'Experiments',
    content: (
      <AccordionText
        heading="Ideas to test"
        text="Contrast-aware underline colors based on the background.\n\nOptional badge slot in the header for counts or statuses."
      />
    ),
  },
];

const meta = {
  title: 'Utilities/Accordions/BigAccordion',
  component: BigAccordion,
  args: {
    items: featureItems,
    contentPadding: 2,
    showUnderline: true,
    id: 'storybook-big-accordion',
  },
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '40px 0',
          display: 'flex',
          justifyContent: 'center',
          background: 'var(--primary-blue)',
        }}
      >
        <div style={{ width: 'min(1100px, 92vw)' }}>
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    items: { control: false },
  },
} satisfies Meta<typeof BigAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AlternateContent: Story = {
  args: {
    items: roadmapItems,
    contentPadding: 1.25,
    showUnderline: false,
  },
};
