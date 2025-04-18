import type { Meta, StoryObj } from '@storybook/react';

import { MutationType } from '@/types';

// Components
import GuarantorForm from '.';

const meta = {
  title: 'Components/GuarantorForm',
  component: GuarantorForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => (
    <div className="flex items-center justify-center w-screen py-20 bg-blue-light">
      <div className="bg-white w-[988px] rounded-[15px]">
        <div className="p-10">
          <GuarantorForm {...args} />
        </div>
      </div>
    </div>
  ),
} satisfies Meta<typeof GuarantorForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mode: MutationType.Create,
  },
};
