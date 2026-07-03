import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Cobrands from '../cobrands/Cobrands';

const meta = {
  title: 'Homepage/Cobrands',
  component: Cobrands,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof Cobrands>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div
      style={{
        background: 'var(--black)',
        color: 'var(--foreground)',
        padding: '64px 0',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Cobrands />
    </div>
  ),
};
