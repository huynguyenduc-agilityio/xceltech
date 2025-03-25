import { Meta, StoryObj } from '@storybook/react';

import { Input } from '.';

const meta = {
  title: 'Components/Commons/Input',
  render: (args) => <Input placeholder="Enter..." {...args} />,
  tags: ['autodocs'],
  args: {
    variant: 'primary',
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const DefaultError: Story = {
  args: {
    isInvalid: true,
  },
};

export const SecondaryError: Story = {
  args: {
    variant: 'secondary',
    isInvalid: true,
  },
};
