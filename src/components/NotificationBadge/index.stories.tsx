import type { Meta, StoryObj } from '@storybook/react';

// Icons
import { Bell } from 'lucide-react';

// Components
import NotificationBadge from '.';

const meta = {
  title: 'Components/NotificationBadge',
  component: NotificationBadge,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  render: (args) => (
    <div className="flex justify-center w-[1000px] p-9 bg-blue-light">
      <NotificationBadge {...args} />
    </div>
  ),
} satisfies Meta<typeof NotificationBadge>;

export default meta;

type Story = StoryObj<typeof NotificationBadge>;

export const Default: Story = {
  args: { count: 13 },
};

export const WithIcon: Story = {
  args: { icon: <Bell className="text-white w-6 h-6" />, count: 13 },
};
