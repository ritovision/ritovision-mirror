import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ContentDisplay from "../ContentDisplay";

const meta = {
  title: "Utilities/Sections/TopicSegment/ContentDisplay",
  component: ContentDisplay,
  args: {
    imageSrc: "/images/home/hero/rito-picture3.jpg",
    imageAlt: "Rito Rhymes on stage",
    caption: "Live capture from a high-energy keynote taping",
    body: (
      <>
        <p>
          Anchor a section with a real photo, then unpack the story with crisp copy that
          sits beside the visuals. The layout collapses gracefully on mobile while keeping
          the CTA in view.
        </p>
        <p>
          Great for case studies, press moments, or any topic segment that needs a visual
          hook plus an ask.
        </p>
      </>
    ),
    backgroundColor: "rgba(4, 66, 108, 0.08)",
    borderColor: "var(--secondary-blue)",
    buttonText: "See the full project",
    buttonHref: "/projects/uas",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 20px",
          background:
            "radial-gradient(circle at 16% 12%, rgba(90, 216, 255, 0.14), transparent 32%), #050910",
          color: "#dfeafc",
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
} satisfies Meta<typeof ContentDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DarkCardWithPressShot: Story = {
  args: {
    imageSrc: "/images/pages/press/media/frankmorano.jpg",
    imageAlt: "Frank Morano interview",
    caption: "Showcasing national radio hits and media pull-through",
    backgroundColor: "#050b13",
    borderColor: "#5ad8ff",
    buttonText: "Listen to the interview",
    buttonHref:
      "https://wabcradio.com/episode/rito-rhymes-rapper-and-crypto-nerd-6-8-22/",
    body: (
      <>
        <p>
          Pair live coverage photos with the pull-quote or narrative that matters. The
          two-column split keeps the story digestible while still framing the CTA.
        </p>
        <p style={{ margin: 0 }}>
          Useful for recapping coverage, standout partnerships, or product milestones.
        </p>
      </>
    ),
  },
};
