import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Types
import {
  IEmployeeGuarantor,
  MutationType,
  ToastStatus,
  GuarantorFormValues,
} from '@/types';

// Components
import { Button, Form, FormField, TextField } from '@/components';

// Constants
import { BASE_GUARANTOR_FIELD, MESSAGES } from '@/constants';

// Utils
import { guarantorSchema } from '@/utils/schemas/employee';

// Hooks
import { useGuarantorMutation, useToast } from '@/hooks';

export interface IGuarantorForm {
  mode: MutationType;
  initialValues?: Partial<IEmployeeGuarantor>;
  onBack?: () => void;
}

const GuarantorForm = ({
  initialValues = {},
  mode,
  onBack,
}: IGuarantorForm) => {
  const { toast } = useToast();
  const { handleGuarantorMutation, isGuarantorMutationLoading } =
    useGuarantorMutation({
      type: mode,
    });

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

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { isValid, isDirty, isSubmitting },
  } = form;

  const isCreate = mode === MutationType.Create;

  const onSubmit = async (data: IEmployeeGuarantor) => {
    const payload = {
      ...data,
      ...(!isCreate && initialValues?.id ? { id: initialValues.id } : {}),
    };

    try {
      await handleGuarantorMutation(payload);

      toast({
        status: ToastStatus.Success,
        title: isCreate
          ? MESSAGES.COMMON.ADD_SUCCESS('Guarantor')
          : MESSAGES.COMMON.UPDATE_SUCCESS('Guarantor'),
      });
      onBack?.();

      reset(initialValues);
    } catch {
      toast({
        status: ToastStatus.Error,
        title: isCreate
          ? MESSAGES.COMMON.ADD_FAILED('Guarantor')
          : MESSAGES.COMMON.UPDATE_FAILED('Guarantor'),
      });

      reset(getValues());
    }
  };

  const disableSubmit = !isDirty || !isValid || isSubmitting;

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
            <Button
              type="submit"
              className="w-[364px] bg-green-primary"
              isLoading={isGuarantorMutationLoading}
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

export default GuarantorForm;
