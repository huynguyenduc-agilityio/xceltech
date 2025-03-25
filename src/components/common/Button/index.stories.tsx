import { Meta, StoryObj } from '@storybook/react';
import { Filter } from 'lucide-react';

import { Button } from '.';

const meta = {
  title: 'Components/Commons/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline', 'secondary', 'ghost'],
    },
  },
  parameters: {
    layout: 'centered',
  },
  render: (args) => <Button className="w-[200px]" {...args} />,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

// variants
export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Button Shadcn',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Button Shadcn',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button Shadcn',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Button Shadcn',
  },
};

export const Icon: Story = {
  args: {
    size: 'fit',
    variant: 'ghost',
    children: <Filter />,
    className: 'w-fit',
  },
};
