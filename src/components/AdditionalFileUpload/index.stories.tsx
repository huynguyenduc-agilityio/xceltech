import { Meta, StoryObj } from '@storybook/react';

// Components
import AdditionalFileUpload from '.';

const meta = {
  title: 'Components/AdditionalFileUpload',
  component: AdditionalFileUpload,
  parameters: {
    layout: 'centered',
  },
  render: (arg) => (
    <div className="flex justify-center w-[1000px] p-9 bg-white">
      <AdditionalFileUpload {...arg} />
    </div>
  ),
  tags: ['autodocs'],
} satisfies Meta<typeof AdditionalFileUpload>;

export default meta;

type Story = StoryObj<typeof AdditionalFileUpload>;

export const Default: Story = {
  args: {
    name: 'test',
    onFileChange: () => {},
  },
};
