// app/components/utilities/buttons/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within, fn } from 'storybook/test';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Button from '../Button';
import { getRouter } from '@storybook/nextjs-vite/navigation.mock';

// Create a mock Redux store for stories
const mockStore = configureStore({
  reducer: {
    test: (state = {}) => state,
  },
});

// Decorator to wrap stories with Redux Provider
const withRedux = (Story: React.ComponentType) => (
  <Provider store={mockStore}>
    <Story />
  </Provider>
);

const meta = {
  title: 'Utilities/Button',
  component: Button,
  decorators: [withRedux],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'blueAccentButton',
        'redButton',
        'blackAndRedButton',
        'blackButton',
        'blackButton2',
        'blueAccentButton2',
        'redButton2',
        'whiteAndRedButton',
        'whiteAndRedButton2',
        'blackWhiteButton',
      ],
      description: 'Button style variant',
    },
    text: { control: 'text', description: 'Button text content' },
    href: { control: 'text', description: 'Navigation URL (internal or external)' },
    action: { description: 'Custom click handler function' },
    isSubmit: { control: 'boolean', description: 'Set button type to submit' },
    isReset: { control: 'boolean', description: 'Set button type to reset' },
    isDisabled: { control: 'boolean', description: 'Disable the button' },
    modalId: { control: 'text', description: 'ID of modal to toggle on click' },
    dispatchAction: { description: 'Redux action to dispatch on click' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    text: 'Click Me',
    variant: 'blueAccentButton',
  },
};

// Variants
export const BlueAccent: Story = { args: { text: 'Blue Accent', variant: 'blueAccentButton' } };
export const BlueAccent2: Story = { args: { text: 'Blue Accent 2', variant: 'blueAccentButton2' } };
export const RedButton: Story = { args: { text: 'Red Button', variant: 'redButton' } };
export const RedButton2: Story = { args: { text: 'Red Button 2', variant: 'redButton2' } };
export const BlackAndRed: Story = { args: { text: 'Black & Red', variant: 'blackAndRedButton' } };
export const BlackButton: Story = { args: { text: 'Black Button', variant: 'blackButton' } };
export const BlackButton2: Story = { args: { text: 'Black Button 2', variant: 'blackButton2' } };
export const WhiteAndRed: Story = { args: { text: 'White & Red', variant: 'whiteAndRedButton' } };
export const WhiteAndRed2: Story = { args: { text: 'White & Red 2', variant: 'whiteAndRedButton2' } };
export const BlackWhite: Story = { args: { text: 'Black & White', variant: 'blackWhiteButton' } };

// Interaction Tests - Custom Action
export const WithCustomAction: Story = {
  args: {
    text: 'Click for Action',
    action: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByText('Click for Action');
    await userEvent.click(button);
    await expect(args.action).toHaveBeenCalledTimes(1);
  },
};

// Interaction Tests - Internal Navigation
export const WithInternalNavigation: Story = {
  args: {
    text: 'Go to About',
    href: '/about',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByText('Go to About');

    // Clear previous calls on the Storybook-provided Next router mock
    getRouter().push.mockClear();

    await userEvent.click(button);

    await expect(getRouter().push).toHaveBeenCalledWith('/about');
  },
};

// Interaction Tests - External Navigation
export const WithExternalNavigation: Story = {
  args: {
    text: 'Visit Google',
    href: 'https://google.com',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByText('Visit Google');

    const originalOpen = window.open;
    window.open = fn();

    await userEvent.click(button);
    await expect(window.open).toHaveBeenCalledWith('https://google.com', '_blank');

    window.open = originalOpen;
  },
};

// Interaction Tests - Disabled State
export const Disabled: Story = {
  args: {
    text: 'Disabled Button',
    isDisabled: true,
    action: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByText('Disabled Button');

    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.action).not.toHaveBeenCalled();
  },
};

// Interaction Tests - Modal Toggle
export const WithModalToggle: Story = {
  args: {
    text: 'Toggle Modal',
    modalId: 'test-modal',
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div id="test-modal" className="hidden">
          Modal Content
        </div>
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByText('Toggle Modal');
    const modal = document.getElementById('test-modal');

    await expect(modal).toHaveClass('hidden');

    await userEvent.click(button);
    await expect(modal).not.toHaveClass('hidden');

    await userEvent.click(button);
    await expect(modal).toHaveClass('hidden');
  },
};

// Interaction Tests - Redux Dispatch
export const WithReduxDispatch: Story = {
  args: {
    text: 'Dispatch Action',
    dispatchAction: {
      type: 'TEST_ACTION',
      payload: { data: 'test' },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByText('Dispatch Action');

    const dispatchSpy = fn(mockStore.dispatch);
    (mockStore as unknown as { dispatch: typeof dispatchSpy }).dispatch = dispatchSpy;

    await userEvent.click(button);

    await expect(dispatchSpy).toHaveBeenCalledWith({
      type: 'TEST_ACTION',
      payload: { data: 'test' },
    });
  },
};

// Button Types
export const SubmitButton: Story = {
  args: {
    text: 'Submit Form',
    isSubmit: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByText('Submit Form');
    await expect(button).toHaveAttribute('type', 'submit');
  },
};

export const ResetButton: Story = {
  args: {
    text: 'Reset Form',
    isReset: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByText('Reset Form');
    await expect(button).toHaveAttribute('type', 'reset');
  },
};
