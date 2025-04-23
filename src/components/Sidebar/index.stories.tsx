import type { Meta, StoryObj } from '@storybook/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import Sidebar from '.';

const queryClient = new QueryClient();

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  render: (args) => (
    <QueryClientProvider client={queryClient}>
      <div className="flex justify-center p-9 bg-blue-light">
        <Sidebar {...args} />
      </div>
    </QueryClientProvider>
  ),
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    children: (
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
        pariatur consectetur veritatis voluptatum culpa accusamus ipsam
        doloremque eveniet, natus ea ratione. Facere, sapiente eaque! Fugiat
        quam beatae temporibus vitae incidunt!
      </p>
    ),
  },
};
