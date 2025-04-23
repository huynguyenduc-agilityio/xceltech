import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import DropdownNotification from '.';

const queryClient = new QueryClient();

const meta = {
  title: 'Components/DropdownNotification',
  component: DropdownNotification,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => (
    <>
      <QueryClientProvider client={queryClient}>
        <DropdownNotification />
      </QueryClientProvider>
    </>
  ),
} satisfies Meta<typeof DropdownNotification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
