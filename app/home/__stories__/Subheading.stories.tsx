import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SubheadingClient from '../subheading/SubheadingClient';
import SubheadingServer from '../subheading/SubheadingServer';

const meta = {
  title: 'Homepage/Subheading',
  component: SubheadingServer,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof SubheadingServer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OverlayOnly: Story = {
  render: () => (
    <div
      style={{
        minHeight: '200vh',
        background:
          'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06), transparent 30%), #020202',
        color: 'var(--foreground)',
        paddingTop: '75vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <SubheadingClient />
    </div>
  ),
};

export const WithBackgroundImage: Story = {
  render: () => (
    <div
      style={{
        minHeight: '200vh',
        backgroundColor: '#010101',
        color: 'var(--foreground)',
        paddingTop: '75vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <SubheadingServer />
    </div>
  ),
};
