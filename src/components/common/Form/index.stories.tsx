import { useForm } from 'react-hook-form';
import { Meta, StoryObj } from '@storybook/react';

import TextField from '@/components/TextField';

import { Form, FormField } from '.';

const FormComponent = () => {
  const form = useForm();

  return (
    <Form {...form}>
      <form className="flex flex-col mt-[34px] gap-2.5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => <TextField label="Email" {...field} />}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => <TextField label="Password" {...field} />}
        />
      </form>
    </Form>
  );
};

const meta = {
  title: 'Components/Commons/Form',
  component: FormComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FormComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
