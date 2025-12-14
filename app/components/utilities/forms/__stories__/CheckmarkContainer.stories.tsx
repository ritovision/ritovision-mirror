import type { Meta, StoryObj } from '@storybook/react';
import CheckmarkContainer from '../CheckmarkContainer';

const items = ['Artifice', 'Science', 'Exploration', 'Logistics'];

const meta = {
  title: 'Utilities/Forms/CheckmarkContainer',
  component: CheckmarkContainer,
  args: {
    title: 'Select interests',
    items,
    state: 'pre',
  },
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CheckmarkContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  name: 'Visual states',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <CheckmarkContainer {...args} state="pre" title="Pre" />
      <CheckmarkContainer {...args} state="focus" title="Focus" />
      <CheckmarkContainer {...args} state="valid" title="Valid" />
      <CheckmarkContainer {...args} state="invalid" title="Invalid" />
      <CheckmarkContainer {...args} state="disabled" title="Disabled" />
    </div>
  ),
};
