import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Types
import { IEmployeeContactInfo, IInfoUser } from '@/types';

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
import { ContactFormValues, contactSchema } from '@/utils/schemas/employee';

export interface IContactForm {
  initialValues?: Partial<IInfoUser>;
}

const ContactForm = ({ initialValues }: IContactForm) => {
  const {
    phone = '',
    email = '',
    contact = { phoneNum2: '', cityOfResidence: '', residentialAddress: '' },
  } = initialValues || {};

  const defaultValues = {
    phone,
    email,
    phoneNum2: contact?.phoneNum2 || '',
    cityOfResidence: contact?.cityOfResidence || '',
    residentialAddress: contact?.residentialAddress || '',
  };

  const form = useForm<ContactFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  const { control, handleSubmit } = form;

  const onSubmit = (data: IEmployeeContactInfo) => {
    console.log('Form Data:', data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full px-10 py-16 text-black-default space-y-10"
      >
        <div className="flex items-start gap-14">
          <FormField
            control={control}
            name="phone"
            render={({ field, fieldState: { error } }) => (
              <TextField
                label="Phone Number 1"
                variant="primary"
                className="space-y-5"
                labelClassName="text-md"
                inputClassName="h-[68px] px-12 rounded-[15px]"
                placeholder="Enter your phone number 1"
                {...field}
                errorMessage={error?.message}
              />
            )}
          />
          <FormField
            control={control}
            name="phoneNum2"
            render={({ field, fieldState: { error } }) => (
              <TextField
                label="Phone Number 2"
                variant="primary"
                className="space-y-5"
                labelClassName="text-md"
                inputClassName="h-[68px] px-12 rounded-[15px]"
                placeholder="Enter your phone number 2"
                {...field}
                errorMessage={error?.message}
              />
            )}
          />
        </div>
        <FormField
          control={control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <TextField
              label="E-mail Address"
              variant="primary"
              className="space-y-5"
              labelClassName="text-md"
              inputClassName="h-[68px] px-12 rounded-[15px]"
              placeholder="Enter your email address"
              {...field}
              errorMessage={error?.message}
            />
          )}
        />
        <FormField
          control={control}
          name="cityOfResidence"
          render={({ field, fieldState: { error } }) => (
            <TextField
              label="City of residence"
              variant="primary"
              className="space-y-5"
              labelClassName="text-md"
              inputClassName="h-[68px] max-w-[431px] px-12 rounded-[15px]"
              placeholder="Enter your city of residence"
              {...field}
              errorMessage={error?.message}
            />
          )}
        />

        <FormField
          control={control}
          name="residentialAddress"
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
      </form>
    </Form>
  );
};

export default ContactForm;
