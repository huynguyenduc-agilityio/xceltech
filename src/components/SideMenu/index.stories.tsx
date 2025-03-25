import type { Meta, StoryObj } from '@storybook/react';

// Components
import SideMenu from '.';

const TAB_LIST = [
  {
    label: 'Personal Details',
    content: (
      <>
        1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
        facere, dolor, rerum iste eveniet voluptatibus soluta sint in delectus
        explicabo asperiores quo aut ad fugit recusandae temporibus. Nam,
        voluptate sed.
      </>
    ),
  },
  {
    label: 'Contact Details',
  },
  {
    label: 'Next of kin Details',
  },
  {
    label: 'Education Qualifications',
  },
  {
    label: 'Guarantor Details',
  },
  {
    label: 'Family Details',
  },
  {
    label: 'Job Details',
    content: (
      <>
        2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
        facere, dolor, rerum iste eveniet voluptatibus soluta sint in delectus
        explicabo asperiores quo aut ad fugit recusandae temporibus. Nam,
        voluptate sed.
      </>
    ),
  },
  {
    label: 'Financial Details',
  },
];

const defaultProps = {
  tabs: TAB_LIST,
};

const meta = {
  title: 'Components/SideMenu',
  component: SideMenu,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  render: (args) => (
    <div className=" w-full justify-center p-9 bg-blue-light">
      <SideMenu {...args} />
    </div>
  ),
} satisfies Meta<typeof SideMenu>;

export default meta;

type Story = StoryObj<typeof SideMenu>;

export const Default: Story = {
  args: defaultProps,
};
