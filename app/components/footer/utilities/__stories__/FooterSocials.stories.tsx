import type { Meta, StoryObj } from '@storybook/react';
import FooterSocialsClient from '../footerSocials/FooterSocialsClient';

const meta = {
  title: 'Footer/Utilities/FooterSocials',
  component: FooterSocialsClient,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FooterSocialsClient>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
