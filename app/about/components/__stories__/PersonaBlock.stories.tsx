import type { Meta, StoryObj } from "@storybook/react";
import PersonaBlock from "../PersonaBlock";

const meta: Meta<typeof PersonaBlock> = {
    title: "About/Components/PersonaBlock",
    component: PersonaBlock,
    parameters: {
        layout: "fullscreen",
    },
    argTypes: {
        animate: {
            control: "boolean",
            description: "Controls the fade-in animation state",
        },
    },
};

export default meta;

type Story = StoryObj<typeof PersonaBlock>;

export const Default: Story = {
    args: {
        heading: "Integrative Strategist",
        imageSrc: "/images/pages/services/CoreServices/product.jpg",
        caption:
            "Rito distills complexity into clarity to move the chessboard decisively—aligning layers of product, narrative, and execution into one cohesive strategy.",
        animate: true,
    },
    render: (args) => (
        <div
            style={{
                width: "100%",
                minHeight: "100vh",
                background: "#000",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
            }}
        >
            <PersonaBlock {...args} />
        </div>
    ),
};

export const Engineer: Story = {
    args: {
        heading: "Engineer",
        imageSrc: "/images/home/intro/rito-tinkering.png",
        caption:
            "Bringing an engineer's discipline to problem-solving, Rito decomposes complex challenges into manageable components, identifies patterns across systems, and leverages AI to amplify creativity and technical capabilities.",
        animate: true,
    },
    render: (args) => (
        <div
            style={{
                width: "100%",
                minHeight: "100vh",
                background: "#000",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
            }}
        >
            <PersonaBlock {...args} />
        </div>
    ),
};
