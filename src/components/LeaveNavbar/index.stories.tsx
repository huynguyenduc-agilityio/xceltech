import type { Meta, StoryObj } from '@storybook/react';

// Components
import LeaveNavbar from '.';

const meta = {
  title: 'Components/LeaveNavbar',
  component: LeaveNavbar,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  render: () => (
    <div className="w-screen">
      <LeaveNavbar />
    </div>
  ),
} satisfies Meta<typeof LeaveNavbar>;

export default meta;

type Story = StoryObj<typeof LeaveNavbar>;

export const Default: Story = {
  args: {},
};
