import type { Meta, StoryObj } from '@storybook/react';

// Icons
import { MailIcon } from '@/icons';

// Components
import InfoTile from '@/components/InfoTile';
import { Carousel } from '.';

const infoTileProps = {
  title: 'Messages',
  count: 4,
  icon: <MailIcon width={100} height={68} />,
  styled: 'bg-secondary text-black-default',
};
const listContent = [
  {
    key: '1',
    content: <InfoTile {...infoTileProps} />,
  },
  {
    key: '2',
    content: <InfoTile {...infoTileProps} styled="bg-primary" count={30} />,
  },
  {
    key: '3',
    content: (
      <InfoTile {...infoTileProps} styled="bg-green-primary" count={2232111} />
    ),
  },
  {
    key: '4',
    content: (
      <InfoTile {...infoTileProps} styled="bg-black-muted" count={40231312} />
    ),
  },
  {
    key: '5',
    content: (
      <InfoTile
        {...infoTileProps}
        styled="bg-secondary text-black-default"
        count={30}
      />
    ),
  },
  {
    key: '6',
    content: <InfoTile {...infoTileProps} styled="bg-primary" count={3000} />,
  },
  {
    key: '7',
    content: (
      <InfoTile {...infoTileProps} styled="bg-green-primary" count={80} />
    ),
  },
];

const meta = {
  title: 'Components/Commons/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  render: (args) => (
    <div className="flex justify-center w-[1000px] p-9 bg-blue-light">
      <Carousel {...args} />
    </div>
  ),
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  args: { listContent: listContent },
};
