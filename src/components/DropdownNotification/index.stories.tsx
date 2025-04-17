import type { Meta, StoryObj } from '@storybook/react';

// Components
import DropdownNotification from '.';

const meta = {
  title: 'Components/DropdownNotification',
  component: DropdownNotification,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownNotification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
