import { Meta, StoryObj } from '@storybook/react';

// Components
import ImageUpload from '.';

const meta = {
  title: 'Components/ImageUpload',
  component: ImageUpload,
  parameters: {
    layout: 'centered',
  },
  render: (arg) => (
    <div className="flex justify-center w-[1000px] p-9 bg-white">
      <ImageUpload {...arg} />
    </div>
  ),
  tags: ['autodocs'],
} satisfies Meta<typeof ImageUpload>;

export default meta;

type Story = StoryObj<typeof ImageUpload>;

export const Default: Story = {
  args: {
    onImageChange: () => {},
  },
};
