import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import TitleDisplay from "../TitleDisplay";

const meta = {
  title: "Utilities/Sections/TopicSegment/TitleDisplay",
  component: TitleDisplay,
  args: {
    text: "Signal-rich storytelling for teams that move fast",
    borderColor: "var(--secondary-blue)",
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
            "radial-gradient(circle at 10% 20%, rgba(90, 216, 255, 0.18), transparent 34%), #050b13",
          color: "#e7f1ff",
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
} satisfies Meta<typeof TitleDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LinkedTitle: Story = {
  args: {
    href: "/press",
    text: "Press-ready proof that cuts through skepticism",
  },
};

export const StaticWithoutFade: Story = {
  args: {
    fadeIn: false,
    borderColor: "#5ad8ff",
    backgroundColor: "rgba(90, 216, 255, 0.12)",
    children: (
      <>
        Launch notes, <span style={{ color: "#5ad8ff" }}>stage moments</span>,
        and internal briefings in one crisp title bar.
      </>
    ),
  },
};
