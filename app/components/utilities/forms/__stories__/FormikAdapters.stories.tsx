import type { Meta, StoryObj } from '@storybook/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from '@/components/utilities/buttons/Button';
import FormFieldFormikAdapter from '../FormFieldFormikAdapter';
import TextAreaFormikAdapter from '../TextAreaFormikAdapter';
import CheckmarkContainerFormikAdapter from '../CheckmarkContainerFormikAdapter';
import RadioContainerFormikAdapter from '../RadioContainerFormikAdapter';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  message: Yup.string().min(10, 'Min 10 characters').required('Message is required'),
  interests: Yup.array().of(Yup.string()).min(1, 'Pick at least one'),
  contactMethod: Yup.string().required('Choose one'),
});

const items = {
  interests: ['Engineering', 'Design', 'Operations', 'Research'],
  contactMethods: ['Email', 'Phone', 'Signal', 'Slack'],
};

const meta = {
  title: 'Utilities/Forms/Formik adapters',
  component: FormFieldFormikAdapter,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 520 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormFieldFormikAdapter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DemoForm: Story = {
  name: 'Adapter form',
  args: {
    name: 'demo',
    label: 'Demo Label',
  },
  render: () => (
    <Formik
      initialValues={{
        name: '',
        email: '',
        message: '',
        interests: [] as string[],
        contactMethod: '',
      }}
      validationSchema={validationSchema}
      validateOnChange={false}
      onSubmit={async (_, helpers) => {
        // Simulate a network round-trip without leaving Storybook
        await new Promise((resolve) => setTimeout(resolve, 400));
        helpers.setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form style={{ display: 'grid', gap: 12 }}>
          <FormFieldFormikAdapter name="name" label="Name" placeholder="Ada Lovelace" />
          <FormFieldFormikAdapter name="email" label="Email" placeholder="you@example.com" />
          <TextAreaFormikAdapter
            name="message"
            label="Message"
            placeholder="Tell us what you have in mind"
          />
          <CheckmarkContainerFormikAdapter
            name="interests"
            title="Interests"
            items={items.interests}
          />
          <RadioContainerFormikAdapter
            name="contactMethod"
            title="Preferred contact method"
            items={items.contactMethods}
          />
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 8 }}>
            <Button
              text={isSubmitting ? 'Submitting...' : 'Submit'}
              variant="blueAccentButton"
              isSubmit
              isDisabled={isSubmitting}
            />
            <Button text="Reset" variant="blueAccentButton2" isReset />
          </div>
        </Form>
      )}
    </Formik>
  ),
};
