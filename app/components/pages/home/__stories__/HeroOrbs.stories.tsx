import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HeroOrbs from '../hero/HeroOrbs';

const meta = {
  title: 'Homepage/Hero Orbs',
  component: HeroOrbs,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof HeroOrbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextOnly: Story = {
  render: () => (
    <>
      <style>{`
        .sb-hero-orbs [class*="backgroundVideo"] { display: none !important; }
        .sb-hero-orbs [class*="imageContainer"] { display: none !important; }
      `}</style>
      <div
        className="sb-hero-orbs"
        style={{
          minHeight: '100vh',
          background:
            'linear-gradient(160deg, #060b11 0%, #0b1624 60%, #060b11 100%)',
          color: 'var(--foreground)',
          padding: '72px 0',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <HeroOrbs />
      </div>
    </>
  ),
};
