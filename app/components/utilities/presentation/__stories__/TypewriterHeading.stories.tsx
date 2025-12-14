import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import TypewriterHeading from '../TypewriterHeading';

const meta = {
  title: 'Utilities/Presentation/TypewriterHeading',
  component: TypewriterHeading,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    nextjs: { appDirectory: true },
  },
  args: {
    phrases: ['Storytelling that lands.', 'Products that actually launch.', 'Teams that stay in sync.'],
    typingSpeed: 80,
    startTyping: true,
  },
  argTypes: {
    phrases: { control: 'object' },
    typingSpeed: { control: { type: 'number', min: 20, max: 400, step: 10 } },
    startTyping: { control: 'boolean' },
    scrollTrigger: {
      control: { type: 'number', min: 0, max: 1, step: 0.05 },
      description: 'Intersection ratio to start typing; set >1 to use percentage.',
    },
  },
} satisfies Meta<typeof TypewriterHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InstantStart: Story = {};

export const SlowAndDeliberate: Story = {
  args: {
    typingSpeed: 160,
    phrases: ['An intentional pace.', 'Perfect for thoughtful hero copy.', 'Keeps eyes pinned to the line.'],
  },
};

export const ScrollTriggered: Story = {
  args: {
    startTyping: false,
    scrollTrigger: 0.4,
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: '200vh',
          background: 'linear-gradient(180deg, #0b1220 0%, #05080f 55%, #020305 100%)',
          color: '#bfc7d5',
          padding: '4rem 1.5rem 8rem',
        }}
      >
        <p style={{ maxWidth: 720, margin: '0 auto 64vh', lineHeight: 1.6, textAlign: 'center' }}>
          Scroll down until the heading hits roughly 40% of the viewport to watch the typing animation kick in.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '800px' }}>
          <Story />
        </div>
      </div>
    ),
  ],
};
