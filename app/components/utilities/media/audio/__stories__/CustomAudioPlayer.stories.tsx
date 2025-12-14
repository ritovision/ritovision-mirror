import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentType } from 'react';
import CustomAudioPlayer from '../CustomAudioPlayer';

const meta = {
  title: 'Utilities/Audio/CustomAudioPlayer',
  component: CustomAudioPlayer,
  args: {
    title: 'Phygital (sample track)',
    audioSrc: '/audio/Phygital.mp3',
  },
  parameters: { layout: 'centered' },
  decorators: [
    (Story: ComponentType) => (
      <div style={{ width: 420, maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CustomAudioPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLongTitle: Story = {
  args: {
    title:
      'Very long audio title that should wrap gracefully without truncating the controls',
  },
};

export const AlternateTrack: Story = {
  args: {
    title: 'Dogecoin Roadmap Rap',
    audioSrc: '/audio/Dogecoin-Roadmap-Rap.mp3',
  },
};
