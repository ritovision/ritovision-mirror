import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BasicContainer from '../BasicContainer';

const meta = {
  title: 'Utilities/Containers/BasicContainer',
  component: BasicContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    nextjs: { appDirectory: true },
  },
  args: {
    title: 'Reusable container',
    paragraphs: [
      'This container is handy for quick content sections. It keeps your copy readable and centered without extra setup.',
      'You can pass any copy you want as an array of paragraphs to keep spacing consistent with the design system.',
    ],
  },
  argTypes: {
    title: { control: 'text' },
    paragraphs: { control: 'object' },
  },
} satisfies Meta<typeof BasicContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongerCopy: Story = {
  args: {
    title: 'Deeper dive',
    paragraphs: [
      'When you need to unpack an idea, the container gracefully handles longer blocks of text with the same spacing rules.',
      'Mix and match short and long paragraphs to see how the spacing adapts across the stack.',
      'The border and radius mirror the brand tokens so you can drop this into any page without fighting layout.',
    ],
  },
};
