import type { Meta, StoryObj } from '@storybook/react';

// Components
import LeaveTile from '.';

const meta = {
  title: 'Components/LeaveTile',
  component: LeaveTile,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  render: (args) => (
    <div className="flex justify-center w-[1000px] p-9 bg-blue-light">
      <LeaveTile {...args} />
    </div>
  ),
} satisfies Meta<typeof LeaveTile>;

export default meta;

type Story = StoryObj<typeof LeaveTile>;

export const Default: Story = {
  args: {
    title: 'Annual Leave',
    count: 60,
  },
};

export const WithThousands: Story = {
  args: {
    title: 'Annual Leave',
    count: 60000,
  },
};

export const WithMillions: Story = {
  args: {
    title: 'Annual Leave',
    count: 6000000,
  },
};

export const WithBillions: Story = {
  args: {
    title: 'Annual Leave',
    count: 6000000000,
  },
};
