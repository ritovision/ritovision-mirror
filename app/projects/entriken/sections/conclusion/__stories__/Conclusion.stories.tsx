import type { Meta, StoryObj } from '@storybook/react';
import Conclusion from '../Conclusion';

const meta: Meta<typeof Conclusion> = {
    title: 'projects/Conclusion',
    component: Conclusion,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof Conclusion>;

export const Default: Story = {};
