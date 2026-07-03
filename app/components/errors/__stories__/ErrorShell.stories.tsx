import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { fn } from "storybook/test";
import ErrorShellFullPage from "../ErrorShellFullPage";
import ErrorShellInline from "../ErrorShellInline";
import PageError from "../PageError";

const meta = {
  title: "Feedback/Errors/Orbs",
  component: ErrorShellFullPage,
  args: {
    title: "Something went wrong",
    message: "Please try again.",
  },
  argTypes: {
    onRetry: { control: false },
  },
  parameters: {
    layout: "fullscreen",
    nextjs: { appDirectory: true },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ErrorShellFullPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullPage404: Story = {
  name: "Full page • 404",
  args: {
    title: "Page not found",
    message: "We couldn't find that route.",
    onRetry: fn(),
  },
};

export const FullPageServerError: Story = {
  name: "Full page • 500",
  args: {
    title: "Server error",
    message: "The servers hiccupped. Give it another go.",
    onRetry: fn(),
  },
};

export const InlineShell: Story = {
  name: "Inline shell",
  render: () => (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: "100vh",
        background:
          "radial-gradient(80% 60% at 50% 20%, rgba(3,19,36,0.7) 0%, rgba(2,6,12,0.9) 100%)",
        padding: 32,
      }}
    >
      <div
        style={{
          position: "relative",
          width: 400,
          height: 400,
          display: "grid",
          placeItems: "center",
          background:
            "radial-gradient(90% 80% at 50% 50%, rgba(2,23,38,0.9), rgba(0,0,0,0.9))",
          borderRadius: 24,
          overflow: "hidden",
          border: "1px solid rgba(var(--secondary-blue-rgb),0.3)",
          boxShadow: "0 12px 50px rgba(0,0,0,0.45)",
        }}
      >
        <ErrorShellInline
          title="Widget failed to load"
          message="Inline presentation inside a compact component."
          onRetry={fn()}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};

const demoError = Object.assign(new Error("Demo error boundary"), {
  digest: "demo-digest",
});

export const PageErrorBoundary: Story = {
  name: "PageError wrapper",
  render: () => (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(80% 60% at 50% 20%, #031324 0%, #02060c 100%)",
        padding: 32,
      }}
    >
      <PageError error={demoError} reset={fn()} />
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};
