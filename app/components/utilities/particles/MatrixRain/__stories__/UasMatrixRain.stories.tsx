import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { MatrixRainContainer } from "../MatrixRainContainer";

const meta = {
  title: "Utilities/Particles/MatrixRain/Encrypted Access (UAS)",
  component: MatrixRainContainer,
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "120vh",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "64px 24px 320px",
          boxSizing: "border-box",
          borderRadius: 20,
          border: "1px solid rgba(4,66,108,0.45)",
          background:
            "radial-gradient(circle at 50% 20%, rgba(1,12,21,0.9), rgba(0,0,0,0.9))",
          boxShadow: "0 20px 80px rgba(0,0,0,0.55)",
          overflowY: "auto",
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
} satisfies Meta<typeof MatrixRainContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
