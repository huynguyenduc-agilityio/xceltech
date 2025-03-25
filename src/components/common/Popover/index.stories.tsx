import { Meta, StoryObj } from '@storybook/react';

import { Popover, PopoverTrigger, PopoverContent, PopoverContainer } from '..';
import { Button } from '..';
import { Input } from '..';
import { Label } from '..';
import { Filter } from 'lucide-react';

const meta = {
  title: 'Components/Commons/Popover',
  component: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="fit">
          <Filter />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="sm:max-w-[425px]">
        <div className="flex flex-col">
          <div className="items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" defaultValue="Pedro Duarte" />
          </div>
          <div className="items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" defaultValue="Username" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Container: Story = {
  args: {},
  render: () => (
    <PopoverContainer
      trigger={
        <Button variant="ghost" size="fit">
          <Filter />
        </Button>
      }
      content={
        <div className="flex flex-col">
          <div className="items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" defaultValue="Pedro Duarte" />
          </div>
          <div className="items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" defaultValue="Username" />
          </div>
        </div>
      }
    />
  ),
};
