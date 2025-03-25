import { Meta, StoryObj } from '@storybook/react';

// Components
import { Progress } from '.';

const meta = {
  title: 'Components/Commons/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  render: (arg) => (
    <div className="flex justify-center w-[1000px] p-9 bg-white">
      <Progress {...arg} />
    </div>
  ),
  tags: ['autodocs'],
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: { value: 30 },
};

export const WithContent: Story = {
  args: {
    value: 30,
    indicatorContent: (
      <div className="flex items-center justify-between">
        <span className="font-lg">Annual Leave</span>
        <span className="font-lg">10 of 60 day(s)</span>
      </div>
    ),
  },
};

export const CustomStyle: Story = {
  args: { value: 30, indicatorClass: 'bg-secondary' },
};
