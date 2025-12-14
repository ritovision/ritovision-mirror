import type { Meta, StoryObj } from "@storybook/react";
import CustomCard from "../CustomCard";

const meta: Meta<typeof CustomCard> = {
    title: "About/Components/CustomCard",
    component: CustomCard,
    parameters: {
        layout: "centered",
    },
};

export default meta;

type Story = StoryObj<typeof CustomCard>;

export const Default: Story = {
    args: {
        title: "Visionary Leadership",
        imageSrc: "/images/home/hero/rito-picture1.png",
        text: "Driving vision and complexity into scalable market leadership.",
    },
    render: (args) => (
        <div style={{ height: "150vh", padding: "20px" }}>
            <p style={{ marginBottom: "40vh" }}>Scroll down to see the effect...</p>
            <CustomCard {...args} />
            <p style={{ marginTop: "40vh" }}>End of scroll</p>
        </div>
    ),
};
