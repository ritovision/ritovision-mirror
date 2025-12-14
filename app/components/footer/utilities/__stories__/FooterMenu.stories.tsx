import type { Meta, StoryObj } from '@storybook/react';
import FooterMenuClient from '../footerMenu/FooterMenuClient';

const meta = {
  title: 'Footer/Utilities/FooterMenu',
  component: FooterMenuClient,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FooterMenuClient>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
