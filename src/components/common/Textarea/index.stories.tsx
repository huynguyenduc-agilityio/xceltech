import { StoryObj, Meta } from '@storybook/react';

import { Textarea } from '.';

const meta = {
  title: 'Components/Commons/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  render: (args) => (
    <div className="flex justify-center w-[1000px] p-9 bg-white">
      <Textarea {...args} />
    </div>
  ),
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Write a short bio about you...',
  },
};
