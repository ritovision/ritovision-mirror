import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ReactNode } from 'react';
import HeroOrbsWrapper from '../hero/HeroOrbsWrapper';

const meta = {
  title: 'Homepage/Hero',
  component: HeroOrbsWrapper,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof HeroOrbsWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

const Background = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      minHeight: '100vh',
      background:
        'radial-gradient(circle at 30% 20%, rgba(4,66,108,0.45), rgba(1,32,53,0.15) 35%), linear-gradient(180deg, #010b16 0%, #01060d 65%, #000 100%)',
      color: 'var(--foreground)',
    }}
  >
    {children}
  </div>
);

export const Desktop: Story = {
  render: () => (
    <Background>
      <HeroOrbsWrapper />
    </Background>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'desktopHero',
      viewports: {
        desktopHero: {
          name: 'Desktop (1280)',
          styles: {
            width: '1280px',
            height: '800px',
          },
        },
      },
    },
  },
};

export const Mobile: Story = {
  render: () => (
    <Background>
      <HeroOrbsWrapper />
    </Background>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobileHero',
      viewports: {
        mobileHero: {
          name: 'Mobile (430)',
          styles: {
            width: '430px',
            height: '932px',
          },
        },
      },
    },
  },
};
