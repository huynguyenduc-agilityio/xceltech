import type { Meta, StoryObj } from '@storybook/react';

// Components
import EducationForm from '.';
import { EducationType, MutationType } from '@/types';

const meta = {
  title: 'Components/EducationForm',
  component: EducationForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => (
    <div className="flex items-center justify-center w-screen py-20 bg-blue-light">
      <div className="bg-white w-[988px] rounded-[15px]">
        <div className="p-10">
          <EducationForm {...args} />
        </div>
      </div>
    </div>
  ),
} satisfies Meta<typeof EducationForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mode: MutationType.Create,
    section: EducationType.Academic,
  },
};
