import { Meta, StoryObj } from '@storybook/react';

// Components
import DocumentUpload from '.';

const meta = {
  title: 'Components/DocumentUpload',
  component: DocumentUpload,
  parameters: {
    layout: 'centered',
  },
  render: (arg) => (
    <div className="flex justify-center w-[1000px] p-9 bg-white">
      <DocumentUpload {...arg} />
    </div>
  ),
  tags: ['autodocs'],
} satisfies Meta<typeof DocumentUpload>;

export default meta;

type Story = StoryObj<typeof DocumentUpload>;

export const Default: Story = {
  args: {
    onFileChange: () => {},
  },
};
