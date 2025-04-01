import type { Meta, StoryObj } from '@storybook/react';

// Components
import Table from '.';

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => (
    <div className="flex justify-center h-screen">
      <div className="w-[1000px]">
        <Table {...args} />
      </div>
    </div>
  ),
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: [
      {
        title: 'Name(s)',
        key: 'name',
      },
      {
        title: 'Duration(s)',
        key: 'duration',
      },
      {
        title: 'Start Date',
        key: 'startDate',
      },
      {
        title: 'End Date',
        key: 'endDate',
      },
      {
        title: 'Type',
        key: 'type',
      },
      {
        title: 'Reason(s)',
        key: 'reason',
      },
    ],
    dataSource: [
      {
        id: '1',
        name: 'John Caster',
        duration: 5,
        startDate: '22/04/2022',
        endDate: '28/04/2022',
        type: 'Sick',
        reason: 'Personal',
      },
      {
        id: '2',
        name: 'aman bey',
        duration: 7,
        startDate: '22/04/2022',
        endDate: '28/04/2022',
        type: 'Exam',
        reason: 'Examination',
      },
      {
        id: '3',
        name: 'feven Tesfaye',
        duration: 120,
        startDate: '22/04/2022',
        endDate: '28/04/2022',
        type: 'Maternity',
        reason: 'Child Care',
      },
    ],
  },
};
