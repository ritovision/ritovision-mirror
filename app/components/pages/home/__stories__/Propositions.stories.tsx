import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Propositions from '../Propositions';

const meta = {
  title: 'Homepage/Propositions',
  component: Propositions,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof Propositions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div
      style={{
        minHeight: '120vh',
        background: 'linear-gradient(135deg, #050505 0%, #0e0e10 100%)',
        color: 'var(--foreground)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '12vh',
        paddingBottom: '12vh',
      }}
    >
      <Propositions />
    </div>
  ),
};
