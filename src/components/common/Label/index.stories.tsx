import { Meta, StoryObj } from '@storybook/react';
import { Label } from '.';
//meta
const meta = {
  title: 'Components/Commons/Label',
  render: (args) => <Label {...args}>{args.children}</Label>,
  tags: ['autodocs'],
  args: {
    variant: 'primary',
    children: 'Email',
  },
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
    },
    size: {
      options: ['primary', 'secondary'],
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'secondary',
  },
};
