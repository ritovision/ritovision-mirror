import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import FormField, { type FormFieldState } from '../FormField';

const meta = {
  title: 'Utilities/Forms/FormField',
  component: FormField,
  args: {
    name: 'fullName',
    label: 'Full name',
    placeholder: 'Enter your full name',
    state: 'pre' as FormFieldState,
  },
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  name: 'Visual states',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <FormField {...args} name="pre" label="Pre" state="pre" />
      <FormField {...args} name="focus" label="Focus (visual)" state="focus" />
      <FormField
        {...args}
        name="valid"
        label="Valid"
        state="valid"
        value="Jane Doe"
      />
      <FormField
        {...args}
        name="invalid"
        label="Invalid"
        state="invalid"
        errorText="This field is required"
      />
      <FormField
        {...args}
        name="disabled"
        label="Disabled"
        state="disabled"
        value="Disabled input"
      />
    </div>
  ),
};

const ControlledFormField = (args: React.ComponentProps<typeof FormField>) => {
  const [value, setValue] = useState('Rito Vision');
  const [state, setState] = useState<FormFieldState>('pre');

  return (
    <FormField
      {...args}
      name="controlled"
      label="Controlled field"
      value={value}
      state={state}
      onChange={(event) => {
        const newValue = event.target.value;
        setValue(newValue);
        setState(newValue ? 'valid' : 'invalid');
      }}
      onFocus={() => setState('focus')}
      onBlur={() => setState(value ? 'valid' : 'invalid')}
    />
  );
};

export const Controlled: Story = {
  render: (args) => <ControlledFormField {...args} />,
};
