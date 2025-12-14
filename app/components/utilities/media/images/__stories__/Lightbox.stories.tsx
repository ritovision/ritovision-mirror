import type { Meta, StoryObj } from "@storybook/react";
import Lightbox from "../Lightbox";
import { useState } from "react";

const meta: Meta<typeof Lightbox> = {
    title: "Utilities/Media/Images/Lightbox",
    component: Lightbox,
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;

type Story = StoryObj<typeof Lightbox>;

const sampleImages = [
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
];

const ControlledLightbox = (args: React.ComponentProps<typeof Lightbox>) => {
    const [index, setIndex] = useState<number | null>(0);

    return (
        <div>
            <button onClick={() => setIndex(0)}>Open Lightbox</button>
            <Lightbox
                {...args}
                images={sampleImages}
                activeIndex={index}
                onClose={() => setIndex(null)}
                onPrev={() =>
                    setIndex((prev) =>
                        prev !== null
                            ? (prev - 1 + sampleImages.length) % sampleImages.length
                            : null
                    )
                }
                onNext={() =>
                    setIndex((prev) =>
                        prev !== null ? (prev + 1) % sampleImages.length : null
                    )
                }
            />
        </div>
    );
};

export const Default: Story = {
    render: (args) => <ControlledLightbox {...args} />,
};
