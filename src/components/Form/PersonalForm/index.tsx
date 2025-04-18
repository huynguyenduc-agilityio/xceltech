import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Constants
import { JOB_CATEGORY_OPTIONS, MESSAGES } from '@/constants';

// Types
import { IInfoUser, ToastStatus, UpdateProfileFormValues } from '@/types';

// Hooks
import { useGetJobs, useToast, useUpdateInfoUser } from '@/hooks';

// Utils
import { updateProfileSchema } from '@/utils';

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
  ImageUpload,
  TextField,
} from '@/components';

export interface IPersonalForm {
  initialValues?: Partial<IInfoUser>;
  onBack?: () => void;
}

const PersonalForm = ({ initialValues, onBack }: IPersonalForm) => {
  const { toast } = useToast();
  const { jobs = [], isJobsLoading } = useGetJobs();
  const { handleUpdateInfoUser, isUpdateInfoLoading } = useUpdateInfoUser();

  const {
    firstName = '',
    lastName = '',
    avatar,
    job = { department: '', jobCategory: '', id: '' },
  } = initialValues || {};

  const defaultValues = {
    firstName,
    lastName,
    avatar,
    department: job?.department || '',
    jobCategory: job?.jobCategory || '',
    id: job?.id,
  };

  const form = useForm<UpdateProfileFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(updateProfileSchema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { isValid, isDirty, isSubmitting },
  } = form;

  const onSubmit = async (data: UpdateProfileFormValues) => {
    const selectedJob = jobs.find((job) => job.id === data.id);

    const payload: Partial<IInfoUser> = {
      firstName: data.firstName,
      lastName: data.lastName,
      job: {
        ...(selectedJob && { id: selectedJob.id }),
        department: data.department || '',
        jobCategory: data.jobCategory || '',
      },
      ...(data.avatar &&
        data.avatar instanceof File &&
        typeof data.avatar !== 'string' && { avatar: data.avatar }),
    };

    try {
      await handleUpdateInfoUser(payload);

      toast({
        title: MESSAGES.COMMON.UPDATE_SUCCESS('Profile'),
        status: ToastStatus.Success,
      });

      reset(initialValues);

      onBack?.();
    } catch {
      toast({
        title: MESSAGES.COMMON.UPDATE_FAILED('Profile'),
        status: ToastStatus.Error,
      });

      reset(getValues());
    }
  };

  const handleFileChange = useCallback(
    (file: File) => {
      setValue('avatar', file);
    },
    [setValue],
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center">
          <ImageUpload imageUrl={avatar} onImageChange={handleFileChange} />
        </div>

        <div className="space-y-10 mt-10 rounded-[15px]">
          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={control}
              name="firstName"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="First Name"
                  variant="primary"
                  className="space-y-5"
                  labelClassName="text-md"
                  inputClassName="h-[68px] px-12 rounded-[15px]"
                  placeholder="Enter your first name"
                  errorMessage={error?.message}
                  {...field}
                />
              )}
            />
            <FormField
              control={control}
              name="lastName"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="Last Name"
                  variant="primary"
                  className="space-y-5"
                  labelClassName="text-md"
                  inputClassName="h-[68px] px-12 rounded-[15px]"
                  placeholder="Enter your last name"
                  {...field}
                  errorMessage={error?.message}
                />
              )}
            />
          </div>
          <FormField
            control={control}
            name="department"
            render={({ field, fieldState: { error } }) => (
              <TextField
                label="Department"
                variant="primary"
                className="space-y-5"
                labelClassName="text-md"
                inputClassName="h-[68px] px-12 rounded-[15px]"
                placeholder="Enter your last name"
                {...field}
                errorMessage={error?.message}
              />
            )}
          />
          <FormField
            control={control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <Label className="text-md">Job Title</Label>
                <FormControl>
                  <Select
                    option={jobs}
                    placeholder="Select your job title"
                    className="bg-blue-light h-[68px] px-12 rounded-[15px]"
                    isDisable={isJobsLoading}
                    {...field}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="jobCategory"
            render={({ field }) => (
              <FormItem>
                <Label className="text-md">Job Category</Label>
                <FormControl>
                  <Select
                    option={JOB_CATEGORY_OPTIONS}
                    placeholder="Select your job category"
                    className="bg-blue-light h-[68px] px-12 rounded-[15px]"
                    {...field}
                    onChange={field.onChange}
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
              isLoading={isUpdateInfoLoading}
              disabled={!isDirty || !isValid || isSubmitting}
            >
              Update
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default PersonalForm;
