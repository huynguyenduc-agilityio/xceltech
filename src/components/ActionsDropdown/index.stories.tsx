import type { Meta, StoryObj } from '@storybook/react';

// Icons
import { CircleDownIcon } from '@/icons';

// Components
import ActionsDropdown from '.';
import { Button } from '../common';

const defaultProps = {
  items: [
    {
      key: 'approve',
      label: 'Approve',
      onClick: () => console.log('Approved'),
    },
    {
      key: 'decline',
      label: 'Decline',
      onClick: () => console.log('Declined'),
      disabled: true,
    },
    {
      key: 'view',
      label: 'View Details',
      onClick: () => console.log('View Details'),
    },
  ],
};

const meta = {
  title: 'Components/ActionsDropdown',
  component: ActionsDropdown,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  render: (args) => (
    <div className="flex justify-center w-[1000px] p-9 bg-blue-light">
      <ActionsDropdown {...args}>
        <Button className="w-[195px] h-14 shadow-md">
          Export
          <CircleDownIcon className="ml-4" />
        </Button>
      </ActionsDropdown>
    </div>
  ),
} satisfies Meta<typeof ActionsDropdown>;

export default meta;

type Story = StoryObj<typeof ActionsDropdown>;

export const Default: Story = {
  args: { ...defaultProps },
};
