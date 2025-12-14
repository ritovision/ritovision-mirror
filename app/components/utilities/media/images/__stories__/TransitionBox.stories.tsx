import type { Meta, StoryObj } from "@storybook/react";
import TransitionBox from "../TransitionBox";

const meta: Meta<typeof TransitionBox> = {
    title: "Utilities/Media/Images/TransitionBox",
    component: TransitionBox,
    parameters: {
        layout: "centered",
    },
};

export default meta;

type Story = StoryObj<typeof TransitionBox>;

const sampleImages = [
    "/images/home/hero/rito-picture1.png",
    "/images/utilities/imageQuote/Ignorance.png",
    "/images/utilities/imageQuote/Foundations.png",
];

export const Default: Story = {
    args: {
        images: sampleImages,
        duration: 2000,
        transitionDuration: 500,
        alt: "Transitioning Image",
    },
    render: (args) => (
        <div style={{ width: "300px", height: "300px", position: "relative" }}>
            <TransitionBox {...args} />
        </div>
    ),
};
