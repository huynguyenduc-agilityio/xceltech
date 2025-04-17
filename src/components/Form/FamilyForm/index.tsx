import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Types
import { IEmployeeFamilyInfo } from '@/types';

// Components
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Label,
  Textarea,
  TextField,
} from '@/components';

// Utils
import { FamilyFormValues, familySchema } from '@/utils/schemas/employee';

export interface IFamilyForm {
  initialValues?: Partial<IEmployeeFamilyInfo>;
  onBack?: () => void;
}

const FamilyForm = ({ initialValues, onBack }: IFamilyForm) => {
  const {
    fullName = '',
    relationship = '',
    phone = '',
    address = '',
  } = initialValues || {};
  const defaultValues: IEmployeeFamilyInfo = {
    fullName,
    relationship,
    phone,
    address,
  };

  const form = useForm<FamilyFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(familySchema),
    defaultValues,
  });

  const { control, handleSubmit } = form;

  const onSubmit = (data: IEmployeeFamilyInfo) => {
    console.log('Form Data:', data);
    onBack?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="w-full text-black-default space-y-10">
          <FormField
            control={control}
            name="fullName"
            render={({ field, fieldState: { error } }) => (
              <TextField
                label="Full Name"
                variant="primary"
                labelClassName="text-md"
                inputClassName="h-[68px] px-12 rounded-[15px]"
                placeholder="Enter your full name"
                {...field}
                errorMessage={error?.message}
              />
            )}
          />
          <div className="flex items-start gap-11 justify-between">
            <FormField
              control={control}
              name="relationship"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="Relationship"
                  variant="primary"
                  className="space-y-5"
                  labelClassName="text-md"
                  inputClassName="h-[68px] px-12 rounded-[15px]"
                  placeholder="Enter your relationship"
                  {...field}
                  errorMessage={error?.message}
                />
              )}
            />
            <FormField
              control={control}
              name="phone"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="Phone No"
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
          </div>
          <FormField
            control={control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <Label className="text-md">Address</Label>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter your address"
                    className="px-11"
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

export default FamilyForm;
