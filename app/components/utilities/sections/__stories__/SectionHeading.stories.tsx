import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SectionHeading from "../SectionHeading";

const meta = {
  title: "Utilities/Sections/SectionHeading",
  component: SectionHeading,
  args: {
    title: "Story-first builds that actually ship",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 16px",
          background:
            "linear-gradient(145deg, #040810 0%, #0e1726 55%, #0a0f1b 100%)",
          color: "#e2ecf5",
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    nextjs: { appDirectory: true },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLongTitle: Story = {
  args: {
    title:
      "From pre-launch narratives to post-launch adoption, the heading keeps the mission focused.",
  },
};
