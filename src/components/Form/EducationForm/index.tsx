import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Constants
import { MESSAGES } from '@/constants';

// Types
import {
  EducationType,
  IEmployeeEducationInfo,
  MutationType,
  ToastStatus,
  EducationFormValues,
} from '@/types';

// Hooks
import { useEducationMutation, useToast } from '@/hooks';

// Utils
import { educationSchema, formatDate } from '@/utils';

// Components
import {
  Button,
  DatePicker,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Label,
  Textarea,
  TextField,
} from '@/components';

interface IEducationForm {
  mode: MutationType;
  section: EducationType;
  initialValues?: Partial<IEmployeeEducationInfo>;
  onBack?: () => void;
}

const EducationForm = ({
  initialValues = {},
  mode,
  section,
  onBack,
}: IEducationForm) => {
  const { toast } = useToast();
  const { handleEducationMutation, isEducationMutationLoading } =
    useEducationMutation({
      type: mode,
    });

  const {
    name = '',
    course = '',
    department = '',
    description = '',
    startDate,
    endDate,
    location = '',
  } = initialValues;

  const defaultValues: IEmployeeEducationInfo = {
    name,
    course,
    department,
    description,
    endDate,
    location,
    startDate,
  };

  const form = useForm<EducationFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(educationSchema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { isValid, isDirty, isSubmitting },
  } = form;

  const isCreate = mode === MutationType.Create;

  const onSubmit = async (data: IEmployeeEducationInfo) => {
    const payload = {
      ...data,
      type: section,
      startDate: formatDate(data.startDate || ''),
      endDate: formatDate(data.endDate || ''),
      ...(!isCreate && initialValues?.id ? { id: initialValues.id } : {}),
    };

    try {
      await handleEducationMutation(payload);

      toast({
        status: ToastStatus.Success,
        title: isCreate
          ? MESSAGES.COMMON.ADD_SUCCESS('Education')
          : MESSAGES.COMMON.UPDATE_SUCCESS('Education'),
      });
      onBack?.();

      reset(initialValues);
    } catch {
      toast({
        status: ToastStatus.Error,
        title: isCreate
          ? MESSAGES.COMMON.ADD_FAILED('Education')
          : MESSAGES.COMMON.UPDATE_FAILED('Education'),
      });

      reset(getValues());
    }
  };

  const disableSubmit = !isDirty || !isValid || isSubmitting;
  const startDateValue = useWatch({ control, name: 'startDate' }) as Date;
  const endDateValue = useWatch({ control, name: 'endDate' }) as Date;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full text-black-default space-y-10">
          <div className="space-y-8 mt-12">
            <div className="flex items-start gap-9">
              <FormField
                control={control}
                name="name"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    label="Name of Institution"
                    variant="primary"
                    className="space-y-5"
                    labelClassName="text-md"
                    inputClassName="h-[68px] px-12 rounded-[15px]"
                    placeholder="Enter your institution name"
                    {...field}
                    errorMessage={error?.message}
                  />
                )}
              />
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
                    placeholder="Enter your department"
                    {...field}
                    errorMessage={error?.message}
                  />
                )}
              />
            </div>
            <div className="flex items-start gap-9">
              <FormField
                control={control}
                name="course"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    label="Course"
                    variant="primary"
                    className="space-y-5"
                    labelClassName="text-md"
                    inputClassName="h-[68px] px-12 rounded-[15px]"
                    placeholder="Enter your course"
                    {...field}
                    errorMessage={error?.message}
                  />
                )}
              />
              <FormField
                control={control}
                name="location"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    label="Location"
                    variant="primary"
                    className="space-y-5"
                    labelClassName="text-md"
                    inputClassName="h-[68px] px-12 rounded-[15px]"
                    placeholder="Enter your location"
                    {...field}
                    errorMessage={error?.message}
                  />
                )}
              />
            </div>
            <div className="flex items-start gap-9">
              <FormField
                control={control}
                name="startDate"
                render={({ field: { value, onChange } }) => (
                  <FormItem className="space-y-5">
                    <Label className="flex flex-1 text-md">Start Date</Label>
                    <FormControl>
                      <DatePicker
                        date={value as Date}
                        disabledRange={(date) => date > endDateValue}
                        placeholder="Enter your start date"
                        onSelect={onChange}
                        className="px-11"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="endDate"
                render={({ field: { value, onChange } }) => (
                  <FormItem className="space-y-5">
                    <Label className="flex flex-1 text-md">End Date</Label>
                    <FormControl>
                      <DatePicker
                        date={value as Date}
                        disabledRange={(date) => date < startDateValue}
                        placeholder="Enter your end date"
                        onSelect={onChange}
                        className="px-11"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            key={name}
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-5">
                <Label className="text-md">Description</Label>
                <FormControl>
                  <Textarea
                    {...field}
                    className="h-[122px] px-9 rounded-[15px]"
                    placeholder="Enter your description"
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
              isLoading={isEducationMutationLoading}
              disabled={disableSubmit}
            >
              {isCreate ? 'Submit' : 'Update'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EducationForm;
