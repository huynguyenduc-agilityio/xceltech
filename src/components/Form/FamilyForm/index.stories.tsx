import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MutationType } from '@/types';

// Components
import FamilyForm from '.';

const queryClient = new QueryClient();

const meta = {
  title: 'Components/FamilyForm',
  component: FamilyForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => (
    <QueryClientProvider client={queryClient}>
      <div className="flex items-center justify-center w-screen py-20 bg-blue-light">
        <div className="bg-white w-[988px] rounded-[15px]">
          <div className="p-10">
            <FamilyForm {...args} />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  ),
} satisfies Meta<typeof FamilyForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mode: MutationType.Create,
  },
};
