import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Types
import { IEmployeeEducationInfo } from '@/types';

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
import { ADDITIONAL_EDUCATION_FIELD, BASE_EDUCATION_FIELD } from '@/constants';

// Utils
import { EducationFormValues, educationSchema } from '@/utils/schemas/employee';

export interface IEducationForm {
  initialValues?: Partial<IEmployeeEducationInfo>;
  onBack?: () => void;
}

const EducationForm = ({ initialValues, onBack }: IEducationForm) => {
  const {
    name = '',
    course = '',
    department = '',
    description = '',
    endDate,
    location = '',
    startDate,
  } = initialValues || {};
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

  const { control, handleSubmit } = form;

  const onSubmit = (data: IEmployeeEducationInfo) => {
    console.log('Form Data:', data);
    onBack?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full text-black-default space-y-10">
          <div className="flex w-full items-start justify-between gap-9">
            <div className="flex flex-col w-full gap-8">
              {BASE_EDUCATION_FIELD.map(({ name, placeholder, label }) =>
                name !== 'startDate' ? (
                  <FormField
                    key={name}
                    control={control}
                    name={name}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        label={label}
                        variant="primary"
                        className="space-y-5"
                        labelClassName="text-md"
                        inputClassName="h-[68px] px-12 rounded-[15px]"
                        placeholder={placeholder}
                        {...field}
                        errorMessage={error?.message}
                      />
                    )}
                  />
                ) : (
                  <FormField
                    control={control}
                    name={name}
                    render={({ field: { value, onChange } }) => (
                      <FormItem className="space-y-5">
                        <Label className="flex flex-1 text-md">{label}</Label>
                        <FormControl>
                          <DatePicker
                            date={value}
                            onSelect={onChange}
                            className="px-11"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ),
              )}
            </div>
            <div className="flex flex-col w-full gap-8">
              {ADDITIONAL_EDUCATION_FIELD.map(({ name, placeholder, label }) =>
                name !== 'endDate' ? (
                  <FormField
                    key={name}
                    control={control}
                    name={name}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        label={label}
                        variant="primary"
                        className="space-y-5"
                        labelClassName="text-md"
                        inputClassName="h-[68px] px-12 rounded-[15px]"
                        placeholder={placeholder}
                        {...field}
                        errorMessage={error?.message}
                      />
                    )}
                  />
                ) : (
                  <FormField
                    control={control}
                    name={name}
                    render={({ field: { value, onChange } }) => (
                      <FormItem className="space-y-5">
                        <Label className="flex flex-1 text-md">{label}</Label>
                        <FormControl>
                          <DatePicker
                            date={value}
                            onSelect={onChange}
                            className="px-11"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ),
              )}
            </div>
          </div>
          <FormField
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
            <Button type="submit" className="w-[364px] bg-green-primary">
              Update
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EducationForm;
