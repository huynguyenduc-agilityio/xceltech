import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Constants
import { MESSAGES } from '@/constants';

// Types
import {
  FinancialFormValues,
  IEmployeeFinancialInfo,
  MutationType,
  ToastStatus,
} from '@/types';

//Hooks
import { useFinancialMutation, useToast } from '@/hooks';

// Components
import { Button, Form, FormField, TextField } from '@/components';

// Utils
import { financialSchema } from '@/utils';

export interface IFinancialForm {
  mode: MutationType;
  initialValues?: Partial<IEmployeeFinancialInfo>;
  onBack?: () => void;
}

const FinancialForm = ({
  initialValues = {},
  mode,
  onBack,
}: IFinancialForm) => {
  const { toast } = useToast();
  const { handleFinancialMutation, isFinancialMutationLoading } =
    useFinancialMutation({
      type: mode,
    });

  const { accountName = '', bankName = '', accountNo = 0 } = initialValues;
  const defaultValues: IEmployeeFinancialInfo = {
    bankName,
    accountNo,
    accountName,
  };

  const form = useForm<FinancialFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(financialSchema),
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

  const onSubmit = async (data: IEmployeeFinancialInfo) => {
    const payload = {
      ...data,
      ...(!isCreate && initialValues?.id ? { id: initialValues.id } : {}),
    };

    try {
      await handleFinancialMutation(
        payload as unknown as IEmployeeFinancialInfo,
      );

      toast({
        status: ToastStatus.Success,
        title: isCreate
          ? MESSAGES.COMMON.ADD_SUCCESS('Financial')
          : MESSAGES.COMMON.UPDATE_SUCCESS('Financial'),
      });
      onBack?.();

      reset(initialValues);
    } catch {
      toast({
        status: ToastStatus.Error,
        title: isCreate
          ? MESSAGES.COMMON.ADD_FAILED('Financial')
          : MESSAGES.COMMON.UPDATE_FAILED('Financial'),
      });

      reset(getValues());
    }
  };

  const disableSubmit = !isDirty || !isValid || isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                name="accountNo"
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
              isLoading={isFinancialMutationLoading}
              disabled={disableSubmit}
            >
              {isCreate ? 'Add Account Details' : 'Update Account Details'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default FinancialForm;
