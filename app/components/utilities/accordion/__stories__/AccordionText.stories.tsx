import type { Meta, StoryObj } from '@storybook/react';
import { AccordionText } from '../AccordionText';

const meta = {
  title: 'Utilities/Accordions/AccordionText',
  component: AccordionText,
  args: {
    heading: 'Why AccordionText exists',
    text: 'A lightweight helper for FAQs and timelines.\n\nPass a single string with double line breaks to create new paragraphs.',
  },
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--primary-blue)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 24px',
        }}
      >
        <div style={{ width: 'min(720px, 90vw)' }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof AccordionText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutHeading: Story = {
  args: {
    heading: undefined,
    text: 'Use it when you do not need an internal title but want the spacing and width constraints the component provides.',
  },
};
