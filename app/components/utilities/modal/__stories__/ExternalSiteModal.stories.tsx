import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ComponentType } from 'react';
import ExternalSiteModal from '../ExternalSite';
import Button from '@/components/utilities/buttons/Button';

const meta = {
  title: 'Utilities/ExternalSiteModal',
  component: ExternalSiteModal,
  args: {
    isOpen: true,
    url: 'https://ritovision.com',
    message: 'You are about to leave RitoVision.com',
    openInNewWindow: true,
    onClose: () => { },
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
} satisfies Meta<typeof ExternalSiteModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AlwaysOpen: Story = {
  name: 'Always open (static)',
};

export const CustomMessage: Story = {
  name: 'Custom message + URL',
  args: {
    message: 'You are about to visit RitoSwap.com',
    url: 'https://ritoswap.com',
  },
};

const ControlledExternalSiteModal = (args: React.ComponentProps<typeof ExternalSiteModal>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div
      style={{
        display: 'grid',
        gap: 16,
        justifyItems: 'center',
      }}
    >
      <Button
        text="Go to RitoSwap"
        variant="blueAccentButton"
        onClick={handleOpen}
      />

      <ExternalSiteModal
        {...args}
        isOpen={isOpen}
        onClose={handleClose}
      />
    </div>
  );
};

export const InteractiveTrigger: Story = {
  name: 'Triggered by button',
  render: (args) => <ControlledExternalSiteModal {...args} />,
};
