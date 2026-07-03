import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ComponentProps } from "react";
import BeforeAfterSwiper from "@/components/utilities/media/images/BeforeAfterSwiper";

const imageItems = [
  {
    label: "Before",
    src: "/images/pages/projects/oss/assets/eip/erc-721-BEFORE.jpg",
    mediaType: "image" as const,
    alt: "ERC-721 mobile layout before overflow fix",
    aspectRatio: "540 / 1037",
  },
  {
    label: "After",
    src: "/images/pages/projects/oss/assets/eip/erc-721-AFTER.png",
    mediaType: "image" as const,
    alt: "ERC-721 mobile layout after overflow fix",
    aspectRatio: "540 / 1037",
  },
];

const videoItems = [
  { label: "Before", src: "/video/vwad-before.webm", type: "video/webm" },
  { label: "After", src: "/video/vwad-after.webm", type: "video/webm" },
];

const SwiperCanvas = (args: ComponentProps<typeof BeforeAfterSwiper>) => (
  <div
    style={{
      minHeight: "100vh",
      padding: "56px 16px",
      background: "linear-gradient(135deg, #060c16 0%, #0c1a2a 55%, #101828 100%)",
      color: "#eef4ff",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <BeforeAfterSwiper {...args} />
  </div>
);

const meta = {
  title: "Utilities/Media/Images/BeforeAfterSwiper",
  component: BeforeAfterSwiper,
  args: {
    items: imageItems,
  },
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BeforeAfterSwiper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ImageSlides: Story = {
  name: "Image slides",
  render: (args) => <SwiperCanvas {...args} />,
};

export const VideoSlides: Story = {
  name: "Video slides",
  args: {
    items: videoItems,
  },
  render: (args) => <SwiperCanvas {...args} />,
};
