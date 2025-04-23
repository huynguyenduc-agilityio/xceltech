import type { Meta, StoryObj } from '@storybook/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import PersonalForm from '.';

const queryClient = new QueryClient();

const meta = {
  title: 'Components/PersonalForm',
  component: PersonalForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => (
    <QueryClientProvider client={queryClient}>
      <div className="flex items-center justify-center w-screen py-20 bg-blue-light">
        <div className="bg-white w-[988px] rounded-[15px]">
          <div className="p-10">
            <PersonalForm />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  ),
} satisfies Meta<typeof PersonalForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
