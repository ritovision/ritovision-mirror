import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import TextArea, { type TextAreaState } from '../TextArea';

const meta = {
  title: 'Utilities/Forms/TextArea',
  component: TextArea,
  args: {
    name: 'message',
    label: 'Message',
    placeholder: 'Share your thoughts',
    state: 'pre' as TextAreaState,
    value: '',
    onChange: () => { },
    onBlur: () => { },
    onFocus: () => { },
  },
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const noopHandlers = {
  value: '',
  onChange: () => { },
  onBlur: () => { },
  onFocus: () => { },
};

const ControlledTextArea = (args: React.ComponentProps<typeof TextArea>) => {
  const [value, setValue] = useState('');
  const [state, setState] = useState<TextAreaState>('pre');

  return (
    <TextArea
      {...args}
      value={value}
      state={state}
      errorText={state === 'invalid' ? 'Message is required' : undefined}
      onChange={(event) => {
        const nextValue = event.target.value;
        setValue(nextValue);
        setState(nextValue ? 'valid' : 'pre');
      }}
      onFocus={() => setState('focus')}
      onBlur={() => setState(value ? 'valid' : 'invalid')}
    />
  );
};

export const Default: Story = {
  render: (args) => <ControlledTextArea {...args} />,
};

export const States: Story = {
  name: 'Visual states',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <TextArea {...args} {...noopHandlers} name="pre" label="Pre" state="pre" />
      <TextArea {...args} {...noopHandlers} name="focus" label="Focus" state="focus" />
      <TextArea
        {...args}
        {...noopHandlers}
        name="valid"
        label="Valid"
        state="valid"
        value="Pre-populated text"
      />
      <TextArea
        {...args}
        {...noopHandlers}
        name="invalid"
        label="Invalid"
        state="invalid"
        errorText="Tell us a bit more."
      />
      <TextArea
        {...args}
        {...noopHandlers}
        name="disabled"
        label="Disabled"
        state="disabled"
        value="Locked"
      />
    </div>
  ),
};
