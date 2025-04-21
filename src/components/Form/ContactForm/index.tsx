import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Constants
import { MESSAGES } from '@/constants';

// Types
import { ToastStatus, IInfoUser, ContactFormValues } from '@/types';

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

// Hooks
import { useToast, useUpdateInfoUser } from '@/hooks';

// Utils
import { contactSchema } from '@/utils/schemas/employee';

export interface IContactForm {
  initialValues?: Partial<IInfoUser>;
}

const ContactForm = ({ initialValues }: IContactForm) => {
  const { toast } = useToast();
  const { handleUpdateInfoUser, isUpdateInfoLoading } = useUpdateInfoUser();

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

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { isValid, isDirty, isSubmitting },
  } = form;

  const onSubmit = async (data: ContactFormValues) => {
    const payload: Partial<IInfoUser> = {
      phone: data.phone,
      email: data.email,
      contact: {
        phoneNum2: data.phoneNum2,
        cityOfResidence: data.cityOfResidence,
        residentialAddress: data.residentialAddress,
      },
    };

    try {
      await handleUpdateInfoUser(payload);

      toast({
        status: ToastStatus.Success,
        title: MESSAGES.COMMON.UPDATE_SUCCESS('Contact'),
      });
    } catch {
      toast({
        status: ToastStatus.Error,
        title: MESSAGES.COMMON.UPDATE_FAILED('Contact'),
      });
    } finally {
      reset(getValues());
    }
  };

  const disableSubmit = !isDirty || !isValid || isSubmitting;

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
          <Button
            type="submit"
            className="w-[364px] bg-green-primary"
            disabled={disableSubmit}
            isLoading={isUpdateInfoLoading}
          >
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
