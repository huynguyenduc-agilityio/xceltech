import type { Meta, StoryObj } from '@storybook/react';

// Components
import DatePicker from '.';

const meta = {
  title: 'Components/Commons/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {},
};
