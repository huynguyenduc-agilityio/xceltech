import type { Meta, StoryObj } from '@storybook/react';

// Types
import { ToastStatus } from '@/types';

// Hooks
import { useToast } from '@/hooks';

// Components
import { Button, Toast } from '@/components';

const meta = {
  title: 'Components/Commons/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

const ToastExample = ({ status }: { status: ToastStatus }) => {
  const { toast } = useToast();

  return (
    <div>
      <Button
        className="px-6"
        onClick={() => {
          toast({
            title:
              status === ToastStatus.Success
                ? 'Success!'
                : 'Something went wrong',
            status,
          });
        }}
      >
        {status === ToastStatus.Success
          ? 'Show Success Toast'
          : 'Show Error Toast'}
      </Button>
      <Toast />
    </div>
  );
};

export const SuccessToast: Story = {
  render: () => <ToastExample status={ToastStatus.Success} />,
};

export const ErrorToast: Story = {
  render: () => <ToastExample status={ToastStatus.Error} />,
};
