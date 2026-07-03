import type { Meta, StoryObj } from '@storybook/react';
import ServiceSlider from '../ServiceSlider';

const meta: Meta<typeof ServiceSlider> = {
    title: 'services/components/ServiceSlider',
    component: ServiceSlider,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div style={{ width: '400px', height: '400px' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof ServiceSlider>;

export const Default: Story = {
    args: {
        heading: 'Product Strategy & Management',
        backgroundImage: '/images/pages/services/CoreServices/product.jpg',
        slides: [
            'Navigating the ever-evolving complexities of bringing a product to market, or pivoting to a new one.',
            'Shape a product vision rooted in real audience needs and a value proposition that drives business growth and adoption',
            'Develop clear product roadmaps by identifying key milestones, risks, opportunities, and stakeholder needs.',
            'Turn strategy into action by aligning teams, timelines, and priorities across all moving parts.',
            'Build, measure, and adapt with continuous iteration guided by feedback, usage data, and evolving business goals.',
        ],
    },
};
