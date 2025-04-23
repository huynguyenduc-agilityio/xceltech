import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import DropdownExport from '.';

const queryClient = new QueryClient();

const meta = {
  title: 'Components/DropdownExport',
  component: DropdownExport,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  render: () => (
    <>
      <QueryClientProvider client={queryClient}>
        <DropdownExport />
      </QueryClientProvider>
    </>
  ),
} satisfies Meta<typeof DropdownExport>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
