import type { Meta, StoryObj } from '@storybook/react';

// Components
import Pagination from '.';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <div className="flex justify-center w-[1000px] p-9 bg-blue-light">
      <Pagination />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    totalRecords: 200,
    limit: 10,
    currentPage: 2,
  },
};
