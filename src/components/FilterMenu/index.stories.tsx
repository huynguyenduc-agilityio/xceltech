import type { Meta, StoryObj } from '@storybook/react';

// Components
import FilterMenu from '.';

const defaultProps = {
  options: ['Name', 'Type'],
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
