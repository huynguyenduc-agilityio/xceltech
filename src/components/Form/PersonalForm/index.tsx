import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

// Constants
import {
  DEPARTMENT_OPTIONS,
  JOB_CATEGORY_OPTIONS,
  JOB_TITLE_OPTIONS,
} from '@/constants';

// Types
import { IEmployeePersonalInfo } from '@/types';

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
  initialValues?: Partial<IEmployeePersonalInfo>;
}

const PersonalForm = ({ initialValues }: IPersonalForm) => {
  const {
    name = '',
    avatar = '',
    department = '',
    jobTitle = '',
    jobCategory = '',
  } = initialValues || {};
  const defaultValues: IEmployeePersonalInfo = {
    name,
    avatar,
    department,
    jobTitle,
    jobCategory,
  };

  const form = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues,
  });

  const { control, handleSubmit, setValue } = form;

  const onSubmit = (data: IEmployeePersonalInfo) => {
    console.log('Form Data:', data);
  };

  const handleFileChange = useCallback(
    (file: string) => {
      setValue('avatar', file, { shouldDirty: true });
    },
    [setValue],
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="flex justify-center">
          <ImageUpload imageUrl={avatar} onImageChange={handleFileChange} />
        </div>

        <div className="space-y-10 mt-[30px] rounded-[15px]">
          <FormField
            control={control}
            name="name"
            render={({ field, fieldState: { error } }) => (
              <TextField
                label="Employee Name"
                variant="primary"
                className="space-y-5"
                labelClassName="text-md"
                inputClassName="h-[68px] px-12 rounded-[15px]"
                placeholder="Enter your employee name"
                {...field}
                errorMessage={error?.message}
              />
            )}
          />
          <FormField
            control={control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <Label className="text-md">Department</Label>
                <FormControl>
                  <Select
                    option={DEPARTMENT_OPTIONS}
                    placeholder="Select your department"
                    className="bg-blue-light h-[68px] px-12 rounded-[15px]"
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <Label className="text-md">Job Title</Label>
                <FormControl>
                  <Select
                    option={JOB_TITLE_OPTIONS}
                    placeholder="Select your job title"
                    className="bg-blue-light h-[68px] px-12 rounded-[15px]"
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
                    onChange={field.onChange}
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

export default PersonalForm;
