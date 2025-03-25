import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Select } from '.';

const option = [
  {
    value: 'sick',
    label: 'Sick',
  },
  {
    value: 'exam',
    label: 'Exam',
  },
];

const defaultProps = {
  option,
  placeholder: 'Select your relief officer ',
  className: 'bg-blue-light',
  onChange: () => {},
};

const meta = {
  title: 'Components/Commons/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  render: (args) => (
    <div className="flex justify-center w-[1000px] p-9">
      <Select {...args} />
    </div>
  ),
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: { ...defaultProps },
};
