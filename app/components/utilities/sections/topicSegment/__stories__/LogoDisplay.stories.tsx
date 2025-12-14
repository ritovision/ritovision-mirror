import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LogoDisplay from "../LogoDisplay";

const meta = {
  title: "Utilities/Sections/TopicSegment/LogoDisplay",
  component: LogoDisplay,
  args: {
    src: "/images/brand/logomark-ritovision.png",
    alt: "Ritovision logomark",
    backgroundColor: "rgba(4, 66, 108, 0.08)",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "64px 18px",
          background:
            "linear-gradient(145deg, #050b13 0%, #0a1424 55%, #050b13 100%)",
        }}
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
} satisfies Meta<typeof LogoDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LinkedLogo: Story = {
  args: {
    href: "https://ritovision.com",
    boxShadow: "0 18px 28px rgba(5, 28, 52, 0.45)",
    backgroundColor: "rgba(90, 216, 255, 0.12)",
  },
};

export const PressFeatureMark: Story = {
  args: {
    src: "/images/pages/press/logos/77-WABC-gold.png",
    alt: "77 WABC logo",
    borderColor: "#d4a017",
    backgroundColor: "#0b0f17",
    boxShadow: "0 18px 24px rgba(212, 160, 23, 0.28)",
  },
};
