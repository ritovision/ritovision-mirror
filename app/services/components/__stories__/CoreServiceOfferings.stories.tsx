import type { Meta, StoryObj } from '@storybook/react';
import CoreServiceOfferings from '../CoreServiceOfferings';

const meta: Meta<typeof CoreServiceOfferings> = {
    title: 'services/components/CoreServiceOfferings',
    component: CoreServiceOfferings,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof CoreServiceOfferings>;

export const Default: Story = {};
