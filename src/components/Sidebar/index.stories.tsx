import type { Meta, StoryObj } from '@storybook/react';

// Components
import Sidebar from '.';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    children: (
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
        pariatur consectetur veritatis voluptatum culpa accusamus ipsam
        doloremque eveniet, natus ea ratione. Facere, sapiente eaque! Fugiat
        quam beatae temporibus vitae incidunt!
      </p>
    ),
  },
};
