import type { Meta, StoryObj } from '@storybook/react';

// Components
import PersonalForm from '.';

const meta = {
  title: 'Components/PersonalForm',
  component: PersonalForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => (
    <div className="flex items-center justify-center w-screen py-20 bg-blue-light">
      <div className="bg-white w-[988px] rounded-[15px]">
        <div className="p-10">
          <PersonalForm />
        </div>
      </div>
    </div>
  ),
} satisfies Meta<typeof PersonalForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
