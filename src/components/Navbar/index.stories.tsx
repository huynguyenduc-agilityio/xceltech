import type { Meta, StoryObj } from '@storybook/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import Navbar from '.';

const queryClient = new QueryClient();

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  render: () => (
    <QueryClientProvider client={queryClient}>
      <Navbar />
    </QueryClientProvider>
  ),
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {},
};
