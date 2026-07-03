import type { Meta, StoryObj } from '@storybook/react';
import ImageQuoteClient from '../imageQuote/ImageQuoteClient';
import { mockImageQuotePairs } from '../../__stories__/footerStoryData';

const meta = {
  title: 'Footer/Utilities/ImageQuote',
  component: ImageQuoteClient,
  args: {
    imageTextPairs: mockImageQuotePairs,
  },
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: 480,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ImageQuoteClient>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
