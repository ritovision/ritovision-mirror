import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import CardDraw from '../CardDraw';

const meta = {
  title: 'Utilities/Presentation/CardDraw',
  component: CardDraw,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem 1.5rem',
          background:
            'radial-gradient(circle at 25% 20%, rgba(13,52,78,0.35), transparent 35%), radial-gradient(circle at 75% 40%, rgba(75,99,124,0.25), transparent 65%), #030712',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    imageSrc: '/images/home/hero/rito-picture.jpg',
    text: 'Drawing attention with a clean frame and a slow reveal.',
    scrollTriggerOffset: 0,
  },
  argTypes: {
    imageSrc: { control: 'text' },
    text: { control: 'text' },
    scrollTriggerOffset: {
      control: { type: 'number', min: 0, max: 600, step: 50 },
      description: 'Pixels before the animation starts as you scroll into view',
    },
  },
} satisfies Meta<typeof CardDraw>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TallImage: Story = {
  args: {
    imageSrc: '/images/home/cobrands/rito-apple-closeup.jpg',
    text: 'Handles new aspect ratios just by swapping the image source.',
    scrollTriggerOffset: 150,
  },
};
