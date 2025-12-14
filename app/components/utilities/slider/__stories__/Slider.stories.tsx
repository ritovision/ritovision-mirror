import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ComponentType, type ComponentProps } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Slider from '../Slider';
import InteractiveSlider from '../InteractiveSlider';
import SliderFormikAdapter from '../SliderFormikAdapter';

const numericMarks = [0, 25, 50, 75, 100];

const meta = {
  title: 'Utilities/Slider',
  component: Slider,
  args: {
    title: 'Select intensity',
    marks: numericMarks,
  },
  parameters: { layout: 'centered' },
  decorators: [
    (Story: ComponentType) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ManyMarks: Story = {
  name: 'With many numeric marks',
  args: {
    title: 'Fine-grained control',
    marks: [0, 10, 20, 30, 40, 50, 60, 75, 100],
  },
};

const ControlledSlider = (args: ComponentProps<typeof Slider>) => {
  const initial = (args.marks && args.marks[0]) ?? numericMarks[0];
  const [value, setValue] = useState<string | number>(initial);

  const handleChange = (val: string | number) => {
    setValue(val);
  };

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <Slider {...args} onChange={handleChange} />
      <div
        style={{
          textAlign: 'center',
          fontFamily: 'monospace',
          fontSize: 14,
        }}
      >
        Current value: <strong>{String(value)}</strong>
      </div>
    </div>
  );
};

export const WithLiveValue: Story = {
  name: 'With live value readout',
  render: (args: ComponentProps<typeof Slider>) => <ControlledSlider {...args} />,
};

export const InteractiveWrapper: Story = {
  name: 'InteractiveSlider wrapper',
  render: () => (
    <InteractiveSlider
      title="Interactive numeric slider"
      marks={numericMarks}
    />
  ),
};

export const FormikAdapter: Story = {
  name: 'Formik adapter',
  render: () => (
    <Formik
      initialValues={{ amount: '' }}
      validationSchema={Yup.object({
        amount: Yup.mixed().required('Pick an amount'),
      })}
      onSubmit={() => { }}
    >
      <Form style={{ display: 'grid', gap: 8 }}>
        <SliderFormikAdapter
          name="amount"
          title="Amount (Formik slider)"
          marks={numericMarks}
        />
        <ErrorMessage name="amount" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  ),
};
