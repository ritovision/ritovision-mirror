import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ComponentProps } from "react";
import CaptionedSwiper from "@/components/utilities/media/images/CaptionedSwiper";

const slides: ComponentProps<typeof CaptionedSwiper>["items"] = [
  {
    title: "Advanced Search Modal - Empty",
    caption:
      "Here is the opened advanced search modal with multiple configurable parameters",
    src: "/images/pages/projects/oss/assets/owasp/vwad-AS-empty.png",
    alt: "Advanced search modal empty state for the VWAD directory",
    aspectRatio: "1080 / 2078",
  },
  {
    title: "Advanced Search Modal - Filled",
    caption:
      "Here the modal is filled out with search parameters and the pill buttons begin to populate. Pressing \"accept\" is needed to apply the query to the table.",
    src: "/images/pages/projects/oss/assets/owasp/vwad-AS-filled.png",
    alt: "Advanced search modal filled state with parameters and pills",
    aspectRatio: "1080 / 2078",
  },
  {
    title: "Advanced Search applied",
    caption:
      "Here there is an \"Advanced Search\" button used to open the modal, and the current search params are applied as seen in the pill buttons and the text describing the total search results currently present",
    src: "/images/pages/projects/oss/assets/owasp/vwad-AS-filterbar-sort.png",
    alt: "Advanced search applied with filter pills and result count",
    aspectRatio: "1080 / 2219",
  },
];

const SwiperCanvas = (args: ComponentProps<typeof CaptionedSwiper>) => (
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
    <CaptionedSwiper {...args} />
  </div>
);

const meta = {
  title: "Utilities/Media/Images/CaptionedSwiper",
  component: CaptionedSwiper,
  args: {
    items: slides,
  },
  parameters: {
    layout: "fullscreen",
    nextjs: { appDirectory: true },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CaptionedSwiper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <SwiperCanvas {...args} />,
};
