import type { Meta, StoryObj } from '@storybook/react';

import Breadcrumb from '.';

const defaultProps = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Apply for Leave' },
];

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  render: (arg) => (
    <div className="flex justify-center w-[1000px] p-9 bg-blue-light">
      <Breadcrumb {...arg} />
    </div>
  ),
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: { items: defaultProps },
};
