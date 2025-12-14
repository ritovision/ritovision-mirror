import type { Meta, StoryObj } from '@storybook/react';
import EngagementItem from '../EngagementItem';

const meta: Meta<typeof EngagementItem> = {
    title: 'services/components/EngagementItem',
    component: EngagementItem,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div style={{ width: '400px' }}>
                <Story />
            </div>
        ),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EngagementItem>;

export const Default: Story = {
    args: {
        icon: '/images/pages/services/engagement/compass.png',
        title: 'Guide your team',
        description: 'Don’t have a product team yet? I’ll help you scope, prioritize, and architect the right thing to build—then guide your team (or help you build one) through execution.',
        bgImage: '/images/pages/services/engagement/guide.jpg',
        link: '#contact-services',
    },
};

export const BeYourTeam: Story = {
    args: {
        icon: '/images/pages/services/engagement/lightning.png',
        title: ' Be your team',
        description: 'You have the vision, but no one to build it. I’ll design, develop, and deliver your product—end-to-end—with full ownership and momentum.',
        bgImage: '/images/pages/services/engagement/be.jpg',
        link: '#contact-services',
    },
};

export const BoostYourTeam: Story = {
    args: {
        icon: '/images/pages/services/engagement/gears.png',
        title: 'Boost your team',
        description: 'Your team is great—but missing a piece. I can jump in to handle UX strategy, dev execution, or QA when your roadmap’s overloaded.',
        bgImage: '/images/pages/services/engagement/boost.jpg',
        link: '#contact-services',
    },
};
