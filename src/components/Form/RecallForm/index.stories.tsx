import type { Meta, StoryObj } from '@storybook/react';

// Components
import RecallForm from '.';

const meta = {
  title: 'Components/RecallForm',
  component: RecallForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => (
    <div className="flex justify-center p-9 bg-blue-light">
      <RecallForm {...args} />
    </div>
  ),
} satisfies Meta<typeof RecallForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialValues: {
      id: '1234',
      department: 'IT Department',
      employeeName: 'John Doe',
      endDate: new Date(),
      reliefOfficer: 'John Doe',
      reliefOfficerFirstName: 'John',
      reliefOfficerLastName: 'Doe',
      remainingDate: 10,
      startDate: new Date(),
    },
    onClose: () => {},
  },
};
