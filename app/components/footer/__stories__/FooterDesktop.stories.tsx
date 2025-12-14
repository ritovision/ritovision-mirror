import type { Meta, StoryObj } from '@storybook/react';
import FooterDesktopClient from '../footerDesktop/FooterDesktopClient';
import ImageQuoteClient from '../utilities/imageQuote/ImageQuoteClient';
import { mockImageQuotePairs } from './footerStoryData';

const meta = {
  title: 'Footer/Desktop',
  component: FooterDesktopClient,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof FooterDesktopClient>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImageQuote: Story = {
  args: {
    rightMenuContent: <ImageQuoteClient imageTextPairs={mockImageQuotePairs} />,
  },
};
