import type { Meta, StoryObj } from '@storybook/react';

// Types
import { LeaveType } from '@/types';

// Components
import FilterMenu from '.';

const defaultProps = {
  options: { type: Object.values(LeaveType) },
  onApply: () => {},
};

const meta = {
  title: 'Components/FilterMenu',
  component: FilterMenu,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  render: (args) => <FilterMenu {...args} />,
} satisfies Meta<typeof FilterMenu>;

export default meta;

type Story = StoryObj<typeof FilterMenu>;

export const Default: Story = {
  args: { ...defaultProps },
};
