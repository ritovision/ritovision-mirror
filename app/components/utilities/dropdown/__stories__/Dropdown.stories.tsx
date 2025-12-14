import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ComponentType, type ComponentProps } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Dropdown from '../Dropdown';
import DropdownFormikAdapter from '../DropdownFormikAdapter';
import DynamicFormSwitcher from '../DynamicFormSwitcher';

const items = ['Explorer', 'Engineer', 'Pilot', 'Scientist', 'Commander', 'Medic', 'Technician'];

const meta = {
  title: 'Utilities/Dropdown',
  component: Dropdown,
  args: { label: 'Select a role', items },
  parameters: { layout: 'centered' },
  decorators: [
    (Story: ComponentType) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  render: (args: ComponentProps<typeof Dropdown>) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Dropdown {...args} state="pre" headerText="Pre" />
      <Dropdown {...args} state="valid" headerText="Valid" selectedValue={items[0]} />
      <Dropdown {...args} state="invalid" headerText="Invalid" />
      <Dropdown {...args} state="disabled" headerText="Disabled" />
    </div>
  ),
};

const ControlledDropdown = (args: ComponentProps<typeof Dropdown>) => {
  const [value, setValue] = useState(items[1]);
  return <Dropdown {...args} selectedValue={value} onChange={setValue} />;
};

export const Controlled: Story = {
  render: (args: ComponentProps<typeof Dropdown>) => <ControlledDropdown {...args} />,
};

export const FormikAdapter: Story = {
  name: 'Formik adapter',
  render: () => (
    <Formik
      initialValues={{ role: '' }}
      validationSchema={Yup.object({
        role: Yup.string().required('Pick a role'),
      })}
      onSubmit={() => { }}
    >
      <Form style={{ display: 'grid', gap: 8 }}>
        <DropdownFormikAdapter
          name="role"
          headerText="Role (Formik)"
          items={items}
          label="Select a role"
        />
        <ErrorMessage name="role" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  ),
};

const FormA = () => <div style={{ padding: 16 }}>Form A content</div>;
const FormB = () => <div style={{ padding: 16 }}>Form B content</div>;

export const DynamicSwitcher: Story = {
  name: 'Dynamic form switcher',
  render: () => (
    <DynamicFormSwitcher
      defaultForm="a"
      dropdownHeader="Choose a form"
      formsMap={{
        a: { label: 'Form A', component: FormA },
        b: { label: 'Form B', component: FormB },
      }}
    />
  ),
};
