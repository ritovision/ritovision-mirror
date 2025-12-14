import type { Meta, StoryObj } from '@storybook/react';
import RadioContainer from '../RadioContainer';

const items = ['Email', 'Phone', 'Signal', 'Subspace'];

const meta = {
  title: 'Utilities/Forms/RadioContainer',
  component: RadioContainer,
  args: {
    title: 'Preferred contact method',
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
} satisfies Meta<typeof RadioContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  name: 'Visual states',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <RadioContainer {...args} state="pre" title="Pre" />
      <RadioContainer {...args} state="focus" title="Focus" />
      <RadioContainer {...args} state="valid" title="Valid" />
      <RadioContainer {...args} state="invalid" title="Invalid" />
      <RadioContainer {...args} state="disabled" title="Disabled" />
    </div>
  ),
};
