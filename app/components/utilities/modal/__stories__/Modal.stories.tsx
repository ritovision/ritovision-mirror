import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ComponentType, type ComponentProps } from 'react';
import { Modal } from '@/components/utilities/modal';
import type { ModalVariant } from '../index';
import Button from '@/components/utilities/buttons/Button';

const meta = {
  title: 'Utilities/Modal',
  component: Modal,
  args: {
    isOpen: true,
    variant: 'primaryBlue' as ModalVariant,
    onClose: () => { },
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h3 style={{ margin: 0 }}>Basic modal</h3>
        <p style={{ margin: 0 }}>
          This is the base <code>Modal</code> component with arbitrary content.
        </p>
      </div>
    ),
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story: ComponentType) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AlwaysOpen: Story = {
  name: 'Always open (static)',
};

export const Variants: Story = {
  name: 'Visual variants',
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gap: 24,
        alignItems: 'flex-start',
        justifyItems: 'center',
      }}
    >
      <Modal {...args} isOpen variant="primaryBlue" inline>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h3 style={{ margin: 0 }}>Primary Blue</h3>
          <p style={{ margin: 0 }}>
            Primary blue background and secondary blue border.
          </p>
        </div>
      </Modal>

      <Modal {...args} isOpen variant="blackRed" inline>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h3 style={{ margin: 0 }}>Black / Red</h3>
          <p style={{ margin: 0 }}>
            Black background with a red border for error / warning states.
          </p>
        </div>
      </Modal>

      <Modal {...args} isOpen variant="someOtherVariant" inline>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h3 style={{ margin: 0 }}>Some other variant</h3>
          <p style={{ margin: 0 }}>
            Example of the <code>someOtherVariant</code> style.
          </p>
        </div>
      </Modal>
    </div>
  ),
};

const InteractiveModalDemo = (args: ComponentProps<typeof Modal>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [variant, setVariant] = useState<ModalVariant>('primaryBlue');
  const [message, setMessage] = useState(
    'Your form submission has been received!'
  );

  const openSuccessModal = () => {
    setVariant('primaryBlue');
    setMessage('Your form submission has been received!');
    setIsOpen(true);
  };

  const openFailureModal = () => {
    setVariant('blackRed');
    setMessage('Form submission unsuccessful. An error has occurred.');
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div
      style={{
        display: 'grid',
        gap: 16,
        justifyItems: 'center',
      }}
    >
      <div style={{ display: 'flex', gap: 16 }}>
        <Button
          text="Show Success"
          variant="blueAccentButton"
          onClick={openSuccessModal}
        />
        <Button
          text="Show Failure"
          variant="blueAccentButton"
          onClick={openFailureModal}
        />
      </div>

      <Modal
        {...args}
        isOpen={isOpen}
        onClose={closeModal}
        variant={variant}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          {variant === 'primaryBlue' ? (
            <svg
              width="50"
              height="50"
              fill="none"
              stroke="var(--utility-green)"
              strokeWidth="4"
            >
              <path d="M10 25 L20 35 L40 15" />
            </svg>
          ) : (
            <svg
              width="50"
              height="50"
              fill="none"
              stroke="var(--primary-red)"
              strokeWidth="4"
            >
              <path d="M10 10 L40 40 M40 10 L10 40" />
            </svg>
          )}
          <p style={{ margin: 0 }}>{message}</p>
          <Button
            text="Okay"
            variant={
              variant === 'blackRed' ? 'blackAndRedButton' : 'blueAccentButton'
            }
            onClick={closeModal}
          />
        </div>
      </Modal>
    </div>
  );
};

export const InteractiveDemo: Story = {
  name: 'Interactive variant demo',
  render: (args) => <InteractiveModalDemo {...args} />,
};
