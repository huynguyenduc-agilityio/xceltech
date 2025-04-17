import type { Meta, StoryObj } from '@storybook/react';

// Types
import { StatusLeave } from '@/types';

// Components
import Status from '.';

const meta = {
  title: 'Components/Status',
  component: Status,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Status>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Approved: Story = {
  args: {
    type: StatusLeave.Approved,
  },
};

export const Rejected: Story = {
  args: {
    type: StatusLeave.Rejected,
  },
};
