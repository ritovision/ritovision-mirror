import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import OrbImage from "../OrbImage";

const sampleImage = "/images/home/hero/rito-picture1.png";

const baseContainerStyle: React.CSSProperties = {
  width: "min(90vw, 380px)",
  height: "min(90vw, 380px)",
  borderRadius: 24,
  position: "relative",
  overflow: "hidden",
  border: "1px solid rgba(var(--secondary-blue-rgb),0.25)",
  background:
    "radial-gradient(circle at 50% 20%, rgba(2,23,38,0.8), rgba(0,0,0,0.9))",
  boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
};

const meta = {
  title: "Utilities/Media/OrbImage",
  component: OrbImage,
  args: {
    alt: "Ritovision orb hero",
    src: sampleImage,
    radius: "24px",
    containerStyle: baseContainerStyle,
    showOrbs: true,
    orbZIndex: 0,
    sizes: "100vw",
  },
  argTypes: {
    containerStyle: { control: false },
    containerClassName: { control: false },
    onLoad: { control: false },
    onError: { control: false },
  },
  parameters: {
    layout: "centered",
    nextjs: { appDirectory: true },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof OrbImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loaded: Story = {
  name: "Loaded state",
};

export const MockLoading: Story = {
  name: "Loading placeholder (mocked)",
  args: {
    alt: "Loading orb image",
    minPlaceholderMs: 1200,
  },
};

export const Fallback: Story = {
  name: "Fallback (error)",
  args: {
    src: "/images/brand/does-not-exist.png",
    alt: "Missing asset fallback",
    containerStyle: {
      ...baseContainerStyle,
      background:
        "linear-gradient(145deg, rgba(14,26,36,0.8), rgba(0,0,0,0.9))",
    },
    showOrbs: true,
  },
};
