import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Types
import { IEmployeeFinancialInfo } from '@/types';

// Components
import { Button, Form, FormField, TextField } from '@/components';

// Utils
import { FinancialFormValues, financialSchema } from '@/utils/schemas/employee';

export interface IFinancialForm {
  initialValues?: Partial<IEmployeeFinancialInfo>;
  onBack?: () => void;
}

const FinancialForm = ({ initialValues, onBack }: IFinancialForm) => {
  const {
    accountName = '',
    bankName = '',
    accountNumber = 0,
  } = initialValues || {};
  const defaultValues: IEmployeeFinancialInfo = {
    bankName,
    accountNumber,
    accountName,
  };

  const form = useForm<FinancialFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(financialSchema),
    defaultValues,
  });

  const { control, handleSubmit } = form;

  const onSubmit = (data: IEmployeeFinancialInfo) => {
    console.log('Form Data:', data);
    onBack?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="h-[741px] flex flex-col justify-between">
          <div className="w-full  text-black-default space-y-10">
            <FormField
              control={control}
              name="bankName"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="Bank Name"
                  variant="primary"
                  className="space-y-5"
                  labelClassName="text-md"
                  inputClassName="h-[68px] px-12 rounded-[15px]"
                  placeholder="Enter your bank name"
                  {...field}
                  errorMessage={error?.message}
                />
              )}
            />
            <div className="flex items-start gap-16">
              <FormField
                control={control}
                name="accountNumber"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    type="number"
                    label="Account No"
                    variant="primary"
                    className="space-y-5"
                    labelClassName="text-md"
                    inputClassName="h-[68px] px-12 rounded-[15px]"
                    placeholder="Enter your account number"
                    {...field}
                    errorMessage={error?.message}
                  />
                )}
              />
              <FormField
                control={control}
                name="accountName"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    label="Account Name"
                    variant="primary"
                    className="space-y-5"
                    labelClassName="text-md"
                    inputClassName="h-[68px] px-12 rounded-[15px]"
                    placeholder="Enter your account name"
                    {...field}
                    errorMessage={error?.message}
                  />
                )}
              />
            </div>
          </div>

          <div className="w-full h-[70px] flex items-center justify-center">
            <Button
              type="submit"
              className="w-[587px] bg-green-primary rounded-lg"
            >
              Update Account Details
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default FinancialForm;
