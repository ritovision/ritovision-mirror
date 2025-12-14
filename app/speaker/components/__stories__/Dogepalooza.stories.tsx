import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Dogepalooza from '../Dogepalooza';

const meta: Meta<typeof Dogepalooza> = {
    title: 'speaker/Dogepalooza',
    component: Dogepalooza,
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <div style={{ marginTop: '200px' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Dogepalooza>;

export const Default: Story = {};
