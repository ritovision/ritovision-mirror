import type { Meta, StoryObj } from '@storybook/react';
import Special from '../Special';

const meta: Meta<typeof Special> = {
    title: 'services/components/Special',
    component: Special,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof Special>;

export const Default: Story = {};
