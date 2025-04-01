import { Meta, StoryObj } from '@storybook/react';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogContainer,
  Button,
} from '..';

const meta = {
  title: 'Components/Commons/Dialog',
  component: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-sm h-fit p-4">Create Leave</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Leave</DialogTitle>
          <DialogDescription>Do you want to create leave?</DialogDescription>
        </DialogHeader>
        <DialogFooter className="">
          <Button variant="outline" className="text-sm h-fit px-4 py-2">
            Cancel
          </Button>
          <Button className="text-sm h-fit px-4 py-2">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Container: Story = {
  args: {},
  render: () => (
    <DialogContainer
      trigger={
        <Button variant="outline" className="text-sm h-fit p-4">
          Update Leave
        </Button>
      }
      title="Update Leave"
      description="Do you want to update leave?"
      footer={
        <>
          <Button variant="outline" className="text-sm h-fit px-4 py-2">
            Cancel
          </Button>
          <Button className="text-sm h-fit px-4 py-2">Confirm</Button>
        </>
      }
    />
  ),
};
