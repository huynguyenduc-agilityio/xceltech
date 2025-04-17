import type { Meta, StoryObj } from '@storybook/react';

// Components
import DropdownExport from '.';

const meta = {
  title: 'Components/DropdownExport',
  component: DropdownExport,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownExport>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
