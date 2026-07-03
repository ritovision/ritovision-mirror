import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import RedHeader from "../RedHeader";

const meta = {
  title: "Utilities/Sections/RedHeader",
  component: RedHeader,
  args: {
    id: "red-header-demo",
    children: "Breaking Through the Noise",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "64px 24px",
          background:
            "radial-gradient(circle at 20% 20%, rgba(90, 216, 255, 0.18), transparent 30%), radial-gradient(circle at 80% 10%, rgba(255, 107, 107, 0.16), transparent 32%), #040810",
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
} satisfies Meta<typeof RedHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongCopy: Story = {
  args: {
    children:
      "A confident section banner that anchors the story and keeps eyes glued to the page.",
  },
};
