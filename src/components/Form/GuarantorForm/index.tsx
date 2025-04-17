import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Types
import { IEmployeeGuarantor } from '@/types';

// Components
import { Button, Form, FormField, TextField } from '@/components';

// Constants
import { BASE_GUARANTOR_FIELD } from '@/constants';

// Utils
import { GuarantorFormValues, guarantorSchema } from '@/utils/schemas/employee';

export interface IGuarantorForm {
  initialValues?: Partial<IEmployeeGuarantor>;
  onBack?: () => void;
}

const GuarantorForm = ({ initialValues, onBack }: IGuarantorForm) => {
  const { name = '', job = '', phone = '' } = initialValues || {};
  const defaultValues: IEmployeeGuarantor = {
    name,
    job,
    phone,
  };

  const form = useForm<GuarantorFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(guarantorSchema),
    defaultValues,
  });

  const { control, handleSubmit } = form;

  const onSubmit = (data: IEmployeeGuarantor) => {
    console.log('Form Data:', data);
    onBack?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="w-full text-black-default space-y-10">
          {BASE_GUARANTOR_FIELD.map(({ name, label, placeholder }) => (
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
          ))}

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

export default GuarantorForm;
