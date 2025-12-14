import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";
import LogoDisplayCarousel from "../LogoDisplayCarousel";

const pressLogos = [
  "/images/pages/press/logos/77-WABC-gold.png",
  "/images/pages/press/logos/logo-utoday.png",
  "/images/pages/projects/entriken/logos/ethereum.png",
  "/images/pages/projects/cod/logos/gamerant.png",
];

const pressLinks = [
  "https://wabcradio.com/",
  "https://u.today/",
  "https://ethereum.org/",
  "https://gamerant.com/",
];

const wrapperStyle: CSSProperties = {
  minHeight: "70vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "64px 18px",
  background:
    "radial-gradient(circle at 20% 15%, rgba(90, 216, 255, 0.16), transparent 30%), #040810",
  // Ensure the component's CSS custom property exists in Storybook; otherwise the width collapses.
  "--container-width-narrow": "min(420px, 90vw)",
} as CSSProperties;

const meta = {
  title: "Utilities/Sections/TopicSegment/LogoDisplayCarousel",
  component: LogoDisplayCarousel,
  args: {
    images: pressLogos,
    links: pressLinks,
    interval: 1600,
    backgroundColor: "rgba(4, 66, 108, 0.08)",
  },
  decorators: [
    (Story) => (
      <div
        style={wrapperStyle}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
    nextjs: { appDirectory: true },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LogoDisplayCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SlowerShowcase: Story = {
  args: {
    interval: 2600,
    borderColor: "#5ad8ff",
    boxShadow: "0 20px 36px rgba(0, 0, 0, 0.25)",
  },
};

export const WithoutLinks: Story = {
  args: {
    links: undefined,
    backgroundColor: "#0b1424",
    borderColor: "#7dd3fc",
  },
};
