import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SectionLineWrapper from "../SectionLineWrapper";
import RedHeader from "../RedHeader";
import SectionHeading from "../SectionHeading";

const MockBody = () => (
  <div
    style={{
      maxWidth: 980,
      display: "grid",
      gap: 16,
      textAlign: "center",
      color: "#dbe7ff",
    }}
  >
    <p style={{ fontSize: 18, margin: 0 }}>
      Anchor whole narratives inside a simple wrapper that draws the eye exactly
      where you want it.
    </p>
    <div
      style={{
        display: "grid",
        gap: 12,
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      }}
    >
      {[
        "Line dividers keep long pages breathable.",
        "Works nicely with anchored headings for deep links.",
        "Responsive controls help spacing collapse gracefully on mobile.",
      ].map((item) => (
        <div
          key={item}
          style={{
            padding: "16px 18px",
            borderRadius: 12,
            border: "1px solid rgba(90, 216, 255, 0.35)",
            background: "rgba(12, 22, 37, 0.65)",
            boxShadow: "0 12px 24px rgba(0,0,0,0.3)",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  </div>
);

const meta = {
  title: "Utilities/Sections/SectionLineWrapper",
  component: SectionLineWrapper,
  args: {
    isFirstSection: true,
    children: null,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 20px",
          background:
            "radial-gradient(circle at 30% 20%, rgba(90, 216, 255, 0.14), transparent 32%), radial-gradient(circle at 80% 10%, rgba(255, 107, 107, 0.12), transparent 30%), #050910",
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
  render: (args) => (
    <SectionLineWrapper {...args}>
      <RedHeader id="section-wrapper-demo">Layered storytelling</RedHeader>
      <SectionHeading title="Keep sections crisp and skimmable" />
      <MockBody />
    </SectionLineWrapper>
  ),
  tags: ["autodocs"],
} satisfies Meta<typeof SectionLineWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomLines: Story = {
  args: {
    lineColor: "#ff6b6b",
    lineWidth: "3px",
  },
};

export const CompactMobileSpacing: Story = {
  args: {
    hideBottomLine: true,
    responsiveBreakpoint: 820,
    responsiveMargin: "10% auto 12% auto",
    lineColor: "#7dd3fc",
  },
};
