import { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '.';

const meta = {
  title: 'Components/Commons/Checkbox',
  render: (args) => <Checkbox {...args}>{args.children}</Checkbox>,
  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
