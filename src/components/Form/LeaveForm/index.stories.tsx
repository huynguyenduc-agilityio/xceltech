import type { Meta, StoryObj } from '@storybook/react';

// Components
import LeaveForm from '.';

const meta = {
  title: 'Components/LeaveForm',
  component: LeaveForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => (
    <div className="flex justify-center p-9 bg-blue-light">
      <LeaveForm />
    </div>
  ),
} satisfies Meta<typeof LeaveForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
