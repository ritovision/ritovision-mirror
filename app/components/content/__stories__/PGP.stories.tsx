import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useEffect } from 'react';
import PGP from '../PGP';

const meta = {
  title: 'content/PGP',
  component: PGP,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof PGP>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <StoryWrapper />
  ),
};

const StoryWrapper = () => {
  useEffect(() => {
    if (window.location.hash !== '#ritovision-pgp') {
      window.location.hash = 'ritovision-pgp';
    }
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #050505 0%, #0e0e10 100%)',
        color: 'var(--foreground)',
        justifyContent: 'center',
        paddingTop: '12vh',
        paddingBottom: '12vh',
      }}
    >
      <PGP />
    </div>
  );
};
