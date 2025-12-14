import type { Meta, StoryObj } from '@storybook/react';
import FooterLegalClient from '../footerLegal/FooterLegalClient';

const meta = {
  title: 'Footer/Utilities/FooterLegal',
  component: FooterLegalClient,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100%',
          minHeight: '100vh',
          background: 'var(--primary-blue)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '64px 24px 96px',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FooterLegalClient>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
