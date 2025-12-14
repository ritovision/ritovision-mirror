import type { Meta, StoryObj } from '@storybook/react';
import Testimonial from '../Testimonial';

const meta: Meta<typeof Testimonial> = {
    title: 'services/components/Testimonial',
    component: Testimonial,
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof Testimonial>;

export const Default: Story = {};
