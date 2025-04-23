import type { Meta, StoryObj } from '@storybook/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import NextOfKinForm from '.';

const queryClient = new QueryClient();

const meta = {
  title: 'Components/NextOfKinForm',
  component: NextOfKinForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => (
    <QueryClientProvider client={queryClient}>
      <div className="flex items-center justify-center w-screen py-20 bg-blue-light">
        <div className="bg-white w-[988px] rounded-[15px]">
          <div className="p-10">
            <NextOfKinForm />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  ),
} satisfies Meta<typeof NextOfKinForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
