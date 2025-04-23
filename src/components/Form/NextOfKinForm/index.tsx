import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Types
import {
  IEmployeeNextOfKinInfo,
  ToastStatus,
  NextOfKinFormValues,
} from '@/types';

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
import { MESSAGES, RELATIONSHIP_OPTIONS } from '@/constants';

// Utils
import { nextOfKinSchema } from '@/utils/schemas/employee';

// Hooks
import { useToast, useUpdateInfoUser } from '@/hooks';

export interface INextOfKinForm {
  initialValues?: Partial<IEmployeeNextOfKinInfo>;
}

const NextOfKinForm = ({ initialValues }: INextOfKinForm) => {
  const { toast } = useToast();
  const { handleUpdateInfoUser, isUpdateInfoLoading } = useUpdateInfoUser();

  const {
    name = '',
    job = '',
    phone = '',
    residentialAddress = '',
    relationship = '',
  } = initialValues || {};
  const defaultValues: IEmployeeNextOfKinInfo = {
    name,
    job,
    phone,
    residentialAddress,
    relationship,
  };

  const form = useForm<NextOfKinFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(nextOfKinSchema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { isValid, isDirty, isSubmitting },
  } = form;

  const onSubmit = async (data: IEmployeeNextOfKinInfo) => {
    const payload = {
      kin: data,
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
      <form onSubmit={handleSubmit(onSubmit)}>
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
                      {...field}
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
        </div>
      </form>
    </Form>
  );
};

export default NextOfKinForm;
