import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import FloatingOrbs from "../FloatingOrbs";

const meta = {
  title: "Utilities/Animations/FloatingOrbs",
  component: FloatingOrbs,
  parameters: {
    layout: "fullscreen",
    nextjs: { appDirectory: true },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FloatingOrbs>;

export default meta;
type Story = StoryObj<typeof meta>;

const Scene: React.FC<{
  title: string;
  copy: string;
  style?: React.CSSProperties;
}> = ({ title, copy, style }) => (
  <div
    style={{
      position: "relative",
      minHeight: 420,
      borderRadius: 28,
      overflow: "hidden",
      padding: "48px 32px",
      margin: "0 auto",
      maxWidth: 1100,
      background:
        "radial-gradient(80% 60% at 50% 50%, rgba(2,23,38,0.9) 0%, rgba(0,0,0,0.9) 100%)",
      border: "1px solid rgba(var(--secondary-blue-rgb),0.25)",
      color: "var(--foreground)",
      ...style,
    }}
  >
    <div style={{ position: "absolute", inset: 0 }}>
      <FloatingOrbs />
    </div>

    <div
      style={{
        position: "relative",
        zIndex: 1,
        display: "grid",
        gap: 12,
        maxWidth: 520,
        textAlign: "center",
        margin: "0 auto",
      }}
    >
      <p
        style={{
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          opacity: 0.7,
          margin: 0,
        }}
      >
        {title}
      </p>
      <h2 style={{ margin: 0, fontSize: "2rem", lineHeight: 1.2 }}>
        Floating Orbs
      </h2>
      <p style={{ margin: 0, opacity: 0.85 }}>{copy}</p>
    </div>
  </div>
);

export const HeroBackdrop: Story = {
  render: () => (
    <Scene
      title="Full Page"
      copy="Full bleed gradient field that mirrors the production error and hero backgrounds."
    />
  ),
};

export const MaskedCard: Story = {
  render: () => (
    <Scene
      title="Card Mask"
      copy="Rounded container that clips the orbs so you can see how they behave inside tighter UI."
      style={{
        maxWidth: 820,
        marginTop: 32,
        boxShadow: "0 20px 80px rgba(0,0,0,0.45)",
      }}
    />
  ),
};

export const SplitLayout: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        padding: 24,
      }}
    >
      <div
        style={{
          position: "relative",
          minHeight: 320,
          borderRadius: 16,
          overflow: "hidden",
          background:
            "linear-gradient(135deg, rgba(2, 23, 38, 0.85), rgba(0, 0, 0, 0.9))",
          border: "1px solid rgba(var(--secondary-blue-rgb),0.25)",
        }}
      >
        <FloatingOrbs />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            color: "var(--foreground)",
            padding: 20,
          }}
        >
          <strong>Left rail</strong>
          <p style={{ opacity: 0.8, margin: "8px 0 0" }}>
            Use as a subtle accent beside copy or navigation.
          </p>
        </div>
      </div>

      <div
        style={{
          position: "relative",
          minHeight: 320,
          borderRadius: 16,
          overflow: "hidden",
          background:
            "linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(2, 23, 38, 0.7))",
          border: "1px solid rgba(var(--secondary-blue-rgb),0.25)",
        }}
      >
        <FloatingOrbs />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            color: "var(--foreground)",
            padding: 20,
            textAlign: "right",
          }}
        >
          <strong>Right rail</strong>
          <p style={{ opacity: 0.8, margin: "8px 0 0" }}>
            Demonstrates stacking multiple locations on one page.
          </p>
        </div>
      </div>
    </div>
  ),
};
