import type { Meta, StoryObj } from '@storybook/react';

// Hooks
import { useConfirm } from '@/hooks';

// Components
import { Button } from '../common';
import ConfirmDialog from '.';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Components/ConfirmDialog',
  component: ConfirmDialog,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof ConfirmDialog>;

const Template = () => {
  const confirm = useConfirm();

  const handleConfirmDialog = () =>
    confirm({
      title: 'Delete Item',
      confirmMessage: 'Are you sure you want to delete this item?',
      onConfirm: () => alert('Confirmed!'),
      onCancel: () => alert('Cancelled!'),
    });

  return (
    <>
      <Button onClick={handleConfirmDialog} className="px-4">
        Delete Item
      </Button>
      <ConfirmDialog />
    </>
  );
};

export const Default: Story = {
  render: Template,
};
