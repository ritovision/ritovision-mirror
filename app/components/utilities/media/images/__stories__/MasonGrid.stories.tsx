import type { Meta, StoryObj } from "@storybook/react";
import MasonGrid from "../MasonGrid";

const meta: Meta<typeof MasonGrid> = {
    title: "Utilities/Media/Images/MasonGrid",
    component: MasonGrid,
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;

type Story = StoryObj<typeof MasonGrid>;

const ritoItems = [
    {
        src: "/images/home/hero/rito-picture1.png",
        alt: "Portrait of Rito",
    },
    {
        src: "/images/utilities/imageQuote/Ignorance.png",
        alt: "Rito in a suit in front of computer terminals",
    },
    {
        src: "/images/utilities/imageQuote/Foundations.png",
        alt: "Rito wiring a robot",
    },
    {
        src: "/images/pages/press/rito-images/Rito-dashboard.jpg",
        alt: "Rito navigating a holographic dashboard",
    },
    {
        src: "/images/utilities/imageQuote/Roadmap.jpg",
        alt: "Depiction of Rito flying through a Tron City directory structure",
    },
    {
        src: "/images/pages/press/media/ritorhymes-bitcoin.jpeg",
        alt: "Rito Rhymes holding a Bitcoin coin",
    },
];

export const Default: Story = {
    args: {
        items: ritoItems,
    },
};
