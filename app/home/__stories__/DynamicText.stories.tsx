import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DynamicTextServer from '../dynamicText/DynamicTextServer';

const meta = {
  title: 'Homepage/DynamicText',
  component: DynamicTextServer,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof DynamicTextServer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RotatingTitles: Story = {
  render: () => (
    <div
      style={{
        background: 'var(--black)',
        color: 'var(--foreground)',
        padding: '48px 0',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <DynamicTextServer />
    </div>
  ),
};
