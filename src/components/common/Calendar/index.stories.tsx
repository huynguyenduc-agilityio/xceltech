import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Calendar } from '.';

const meta = {
  title: 'Components/Commons/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {},
};
