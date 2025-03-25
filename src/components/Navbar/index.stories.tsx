import type { Meta, StoryObj } from '@storybook/react';

// Components
import Navbar from '.';

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {},
};
