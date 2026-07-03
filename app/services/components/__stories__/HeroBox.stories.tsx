import type { Meta, StoryObj } from '@storybook/react';
import HeroBox from '../HeroBox';

const meta: Meta<typeof HeroBox> = {
    title: 'services/components/HeroBox',
    component: HeroBox,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof HeroBox>;

export const Default: Story = {};
