import type { Meta, StoryObj } from '@storybook/react';
import ContactForm from '../containers/ContactForm';
import type { FormSubmissionResponse } from '@/lib/forms/client/submitForm';

const meta = {
  title: 'Utilities/Forms/ContactForm',
  component: ContactForm,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 440 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SuccessFlow: Story = {
  name: 'Mocked success',
  args: {},
  render: () => {
    const mockSubmit = async (): Promise<FormSubmissionResponse> => ({ success: true });
    return <ContactForm submitFormFn={mockSubmit} />;
  },
};

export const ErrorFlow: Story = {
  name: 'Mocked failure',
  args: {},
  render: () => {
    const mockSubmit = async (): Promise<FormSubmissionResponse> => ({
      success: false,
      error: 'Mock service error. Try again soon.',
    });
    return <ContactForm submitFormFn={mockSubmit} />;
  },
};
