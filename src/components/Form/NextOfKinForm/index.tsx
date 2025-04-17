import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Types
import { IEmployeeNextOfKinInfo } from '@/types';

// Components
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Label,
  Select,
  Textarea,
  TextField,
} from '@/components';

// Constants
import { RELATIONSHIP_OPTIONS } from '@/constants';

// Utils
import { NextOfKinFormValues, nextOfKinSchema } from '@/utils/schemas/employee';

export interface INextOfKinForm {
  initialValues?: Partial<IEmployeeNextOfKinInfo>;
}

const NextOfKinForm = ({ initialValues }: INextOfKinForm) => {
  const {
    name = '',
    job = '',
    phone = '',
    address = '',
    relationship = '',
  } = initialValues || {};
  const defaultValues: IEmployeeNextOfKinInfo = {
    name,
    job,
    phone,
    address,
    relationship,
  };

  const form = useForm<NextOfKinFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(nextOfKinSchema),
    defaultValues,
  });

  const { control, handleSubmit } = form;

  const onSubmit = (data: IEmployeeNextOfKinInfo) => {
    console.log('Form Data:', data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="w-full px-10 py-16 text-black-default space-y-10">
          <div className="flex items-start gap-14">
            <FormField
              control={control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="Next of kin name"
                  variant="primary"
                  className="space-y-5"
                  labelClassName="text-md"
                  inputClassName="h-[68px] px-12 rounded-[15px]"
                  placeholder="Enter your next of kin name"
                  {...field}
                  errorMessage={error?.message}
                />
              )}
            />
            <FormField
              control={control}
              name="job"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="Job / Occupation"
                  variant="primary"
                  className="space-y-5"
                  labelClassName="text-md"
                  inputClassName="h-[68px] px-12 rounded-[15px]"
                  placeholder="Enter your job / occupation"
                  {...field}
                  errorMessage={error?.message}
                />
              )}
            />
          </div>

          <div className="flex items-start gap-14">
            <FormField
              control={control}
              name="phone"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="Phone Number"
                  variant="primary"
                  className="space-y-5"
                  labelClassName="text-md"
                  inputClassName="h-[68px] px-12 rounded-[15px]"
                  placeholder="Enter your phone number"
                  {...field}
                  errorMessage={error?.message}
                />
              )}
            />
            <FormField
              control={control}
              name="relationship"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-md">Relationship</Label>
                  <FormControl>
                    <Select
                      option={RELATIONSHIP_OPTIONS}
                      placeholder="Select your relationship"
                      className="bg-blue-light h-[68px] px-12 rounded-[15px]"
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <Label className="text-md">Residential Address</Label>
                <FormControl>
                  <Textarea
                    {...field}
                    className="h-[122px] px-9 rounded-[15px]"
                    placeholder="Enter your address"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full h-[70px]">
            <Button type="submit" className="w-[364px] bg-green-primary">
              Update
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default NextOfKinForm;
