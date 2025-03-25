import type { Meta, StoryObj } from '@storybook/react';

// Components
import OverviewCard from '.';

const meta = {
  title: 'Components/OverviewCard',
  component: OverviewCard,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  render: (args) => (
    <div className="flex justify-center w-[1000px] p-9 bg-blue-light">
      <OverviewCard {...args} />
    </div>
  ),
} satisfies Meta<typeof OverviewCard>;

export default meta;

type Story = StoryObj<typeof OverviewCard>;

export const Default: Story = {
  args: {
    title: 'Available Leave Days',
    children: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat sit,
        vero ducimus voluptatibus eveniet suscipit a exercitationem blanditiis
        nisi, dicta necessitatibus quis quae placeat consequatur? Labore quas
        error iure accusantium?
      </p>
    ),
  },
};
