import type { Meta, StoryObj } from '@storybook/react';

// Components
import FamilyForm from '.';

const meta = {
  title: 'Components/FamilyForm',
  component: FamilyForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => (
    <div className="flex items-center justify-center w-screen py-20 bg-blue-light">
      <div className="bg-white w-[988px] rounded-[15px]">
        <div className="p-10">
          <FamilyForm />
        </div>
      </div>
    </div>
  ),
} satisfies Meta<typeof FamilyForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
