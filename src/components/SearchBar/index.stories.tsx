import type { Meta, StoryObj } from '@storybook/react';

// Components
import SearchBar from '.';

const meta = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  render: (args) => (
    <div className="flex justify-center w-[1000px] p-9 bg-blue-light">
      <SearchBar {...args} />
    </div>
  ),
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: (value: string) => console.log(value),
  },
};
