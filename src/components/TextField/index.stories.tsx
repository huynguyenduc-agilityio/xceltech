import { useForm } from 'react-hook-form';
import { Meta, StoryObj } from '@storybook/react';

import { Form, FormField } from '../common';
import TextField from '.';

const defaultProps = {
  label: 'Email',
  placeholder: 'Please enter email',
  onChange: () => {},
};

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const form = useForm();
      return (
        <Form {...form}>
          <form className="flex flex-col mt-[34px] gap-2.5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => <Story {...field} />}
            />
          </form>
        </Form>
      );
    },
  ],
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: { ...defaultProps },
};

export const Secondary: Story = {
  args: { ...defaultProps, variant: 'secondary' },
};

export const WithError: Story = {
  args: {
    ...defaultProps,
    errorMessage: 'This field is required',
  },
};
