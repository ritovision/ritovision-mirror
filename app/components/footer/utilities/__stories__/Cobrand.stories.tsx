import type { Meta, StoryObj } from '@storybook/react';
import CobrandClient from '../cobrands/CobrandClient';

const meta = {
  title: 'Footer/Utilities/Cobrand',
  component: CobrandClient,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CobrandClient>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
