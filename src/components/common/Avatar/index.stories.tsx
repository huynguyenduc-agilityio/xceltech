import { Meta, StoryObj } from '@storybook/react';

// Components
import { Avatar } from '.';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  render: (arg) => (
    <div className="flex justify-center w-[1000px] p-9 bg-white">
      <Avatar {...arg} />
    </div>
  ),
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: 'https://github.com/shadcn.png',
    size: 60,
  },
};
