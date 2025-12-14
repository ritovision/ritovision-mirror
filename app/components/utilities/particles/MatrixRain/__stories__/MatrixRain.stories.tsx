import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { MatrixRain } from "../MatrixRain";

const meta = {
  title: "Utilities/Particles/MatrixRain",
  component: MatrixRain,
  args: {
    color: "#00ff9d",
    preset: "default",
  },
  argTypes: {
    color: { control: "color" },
    preset: {
      control: "select",
      options: ["default", "chinese", "japanese", "binary"],
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          height: "540px",
          width: "min(1100px, 100vw)",
          margin: "0 auto",
          padding: 16,
          borderRadius: 20,
          border: "1px solid rgba(4,66,108,0.45)",
          background:
            "radial-gradient(circle at 50% 20%, rgba(1,12,21,0.9), rgba(0,0,0,0.9))",
          boxShadow: "0 20px 80px rgba(0,0,0,0.55)",
          overflow: "hidden",
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
} satisfies Meta<typeof MatrixRain>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultPreset: Story = {
  name: "Default preset",
};

export const BinaryBlue: Story = {
  args: {
    color: "#5ad8ff",
    preset: "binary",
  },
};

export const JapaneseViolet: Story = {
  args: {
    color: "#b37bff",
    preset: "japanese",
  },
};
