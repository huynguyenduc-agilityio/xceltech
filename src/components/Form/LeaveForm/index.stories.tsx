import type { Meta, StoryObj } from '@storybook/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import LeaveForm from '.';

const queryClient = new QueryClient();

const meta = {
  title: 'Components/LeaveForm',
  component: LeaveForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => (
    <QueryClientProvider client={queryClient}>
      <div className="flex justify-center p-9 bg-blue-light">
        <LeaveForm />
      </div>
    </QueryClientProvider>
  ),
} satisfies Meta<typeof LeaveForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
