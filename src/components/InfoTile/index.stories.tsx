import type { Meta, StoryObj } from '@storybook/react';

// Icons
import {
  BagIcon,
  BookIcon,
  DocumentIcon,
  MailIcon,
  MoneyIcon,
  UserGroupIcon,
  UserIcon,
} from '@/icons';

// Components
import InfoTile from '.';

const meta = {
  title: 'Components/InfoTile',
  component: InfoTile,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  render: (args) => (
    <div className="flex justify-center w-[1000px] p-9 bg-blue-light">
      <InfoTile {...args} />
    </div>
  ),
} satisfies Meta<typeof InfoTile>;

export default meta;

type Story = StoryObj<typeof InfoTile>;

export const Messages: Story = {
  args: {
    title: 'Messages',
    count: 4,
    icon: <MailIcon width={100} height={68} />,
    styled: 'bg-secondary text-black-default',
  },
};

export const Jobs: Story = {
  args: {
    title: 'Jobs',
    count: 1,
    icon: <BagIcon width={92} height={74} />,
    styled: 'bg-primary',
  },
};

export const Candidates: Story = {
  args: {
    title: 'Candidates',
    count: 3000,
    icon: <UserGroupIcon width={106} height={74} />,
    styled: 'bg-green-primary',
  },
};

export const Resumes: Story = {
  args: {
    title: 'Resumes',
    count: 200000,
    icon: <DocumentIcon width={57} height={75} />,
    styled: 'bg-black-muted',
  },
};

export const Employees: Story = {
  args: {
    title: 'Employees',
    count: 3000000,
    icon: <UserIcon width={83} height={83} />,
    styled: 'bg-secondary text-black-default',
  },
};

export const Leaves: Story = {
  args: {
    title: 'Leaves',
    count: 1234567890,
    icon: <BookIcon width={103} height={62} />,
    styled: 'bg-primary',
  },
};

export const Payrolls: Story = {
  args: {
    title: 'Payrolls',
    count: 7,
    icon: <MoneyIcon width={99} height={67} />,
    styled: 'bg-green-primary',
  },
};
