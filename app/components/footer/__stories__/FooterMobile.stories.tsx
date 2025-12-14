import type { Meta, StoryObj } from '@storybook/react';
import FooterMobileClient from '../footerMobile/FooterMobileClient';
import ImageQuoteClient from '../utilities/imageQuote/ImageQuoteClient';
import { mockImageQuotePairs } from './footerStoryData';

const meta = {
  title: 'Footer/Mobile',
  component: FooterMobileClient,
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile2' },
  },
} satisfies Meta<typeof FooterMobileClient>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImageQuote: Story = {
  args: {
    children: <ImageQuoteClient imageTextPairs={mockImageQuotePairs} />,
  },
};

export const Simple: Story = {
  name: 'Without quote panel',
  args: { children: null },
};
