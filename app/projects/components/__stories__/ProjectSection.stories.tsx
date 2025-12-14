import type { Meta, StoryObj } from '@storybook/react';
import ProjectSection from '../ProjectSection';

const meta: Meta<typeof ProjectSection> = {
    title: 'Projects/Components/ProjectSection',
    component: ProjectSection,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof ProjectSection>;

export const Fansite: Story = {
    args: {
        projects: [
            {
                id: "fansite",
                title: "NYT-Featured Fansite for Fashion Icon Caroline Vreeland",
                text: "End-to-end production of a New York Times recognized fansite for fashion icon and musician Caroline Vreeland, organically reaching 100k hits in a year, and currently powered with lean and robust Next.js architecture designed to function like a CMS with minimal overhead.",
                imageSrc: "/images/pages/projects/fansite/caroline-hero.jpg",
                link: "/projects/fansite",
                tags: ["Celebrity", "Fashion Icon", "Caroline Vreeland", "Next.js", "Content Strategy", "SEO", "AI", "Creative Direction", "The New York Times", "Brand Strategy", "Product Management", "CMS Replacement", "Typescript", "Web Development"],
            },
        ],
    },
};
