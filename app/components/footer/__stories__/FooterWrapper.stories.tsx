import type { Meta, StoryObj } from '@storybook/react';
import FooterWrapperClient from '../FooterWrapperClient';
import FooterMobileClient from '../footerMobile/FooterMobileClient';
import FooterDesktopClient from '../footerDesktop/FooterDesktopClient';
import ImageQuoteClient from '../utilities/imageQuote/ImageQuoteClient';
import { mockImageQuotePairs } from './footerStoryData';

const meta = {
  title: 'Footer/Wrapper',
  component: FooterWrapperClient,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof FooterWrapperClient>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderWrapper = () => (
  <FooterWrapperClient
    mobileFooter={
      <FooterMobileClient>
        <ImageQuoteClient imageTextPairs={mockImageQuotePairs} />
      </FooterMobileClient>
    }
    desktopFooter={
      <FooterDesktopClient
        rightMenuContent={<ImageQuoteClient imageTextPairs={mockImageQuotePairs} />}
      />
    }
  />
);

export const Responsive: Story = {
  args: {
    mobileFooter: null,
    desktopFooter: null,
  },
  render: renderWrapper,
};

export const MobileViewport: Story = {
  name: 'Mobile breakpoint preview',
  parameters: { viewport: { defaultViewport: 'mobile2' } },
  args: {
    mobileFooter: null,
    desktopFooter: null,
  },
  render: renderWrapper,
};
