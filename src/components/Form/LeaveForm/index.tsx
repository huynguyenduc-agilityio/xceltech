import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDays, differenceInCalendarDays } from 'date-fns';
import moment from 'moment';

// Icons
import { BookIcon } from '@/icons';

// Constants
import { LEAVE_TYPE_FORM, MESSAGES, USER_PAGE } from '@/constants';

// Types
import { LeaveRequestForm, MutationType, ToastStatus } from '@/types';

// Hooks
import { useToast, useLeaveMutation, useGetLeaveAccounts } from '@/hooks';

// Stores
import { useUser } from '@/stores';

// Utils
import {
  formatDate,
  LeaveRequestFormValues,
  leaveRequestSchema,
} from '@/utils';

// Components
import {
  Button,
  DatePicker,
  Form,
  FormControl,
  FormField,
  FormItem,
  Label,
  FormMessage,
  Select,
  Textarea,
  DocumentUpload,
  TextField,
} from '@/components';

interface ILeaveRequestValue extends LeaveRequestForm {
  startDate: Date;
  endDate: Date;
  resumptionDate: Date;
}

export interface ILeaveForm {
  initialValues?: Partial<ILeaveRequestValue>;
}

const LeaveForm = ({ initialValues }: ILeaveForm) => {
  const navigate = useNavigate();
  const authUser = useUser();
  const { toast } = useToast();
  const { id: userId = '' } = authUser?.user || {};
  const { param: leaveTypeParam = '', id: leaveIdParam } = useParams();
  const { leaveAccounts, isLeaveAccountsLoading } = useGetLeaveAccounts(userId);

  const { handleLeaveMutation, isLeaveMutationLoading } = useLeaveMutation({
    type: leaveIdParam ? MutationType.Edit : MutationType.Create,
  });

  const leaveType = `${LEAVE_TYPE_FORM[leaveTypeParam.toUpperCase()]} Leave`;

  const nextDate = moment().add(1, 'day').toDate();
  const dayAfterNext = moment().add(2, 'day').toDate();

  const {
    type = leaveType,
    startDate = nextDate,
    endDate = nextDate,
    durations = 1,
    documentPath,
    resumptionDate = dayAfterNext,
    reason = '',
    reliefOfficer = '',
  } = initialValues ?? {};

  const defaultValues: LeaveRequestFormValues = {
    type,
    startDate,
    endDate,
    durations,
    documentPath,
    resumptionDate,
    reason,
    reliefOfficer,
  };

  const form = useForm<LeaveRequestFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(leaveRequestSchema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = form;

  const startDateValue = useWatch({ control, name: 'startDate' });
  const endDateValue = useWatch({ control, name: 'endDate' });
  const durationsValue = Number(useWatch({ control, name: 'durations' }));

  useEffect(() => {
    const validateAndUpdate = async () => {
      const isValidStart = await form.trigger('startDate');
      const isValidEnd = await form.trigger('endDate');

      if (isValidStart && isValidEnd && startDateValue && endDateValue) {
        const diff = differenceInCalendarDays(endDateValue, startDateValue) + 1;

        if (diff > 0 && durationsValue !== diff) {
          setValue('durations', diff);
        }
      }
    };

    validateAndUpdate();
  }, [startDateValue, endDateValue]);

  useEffect(() => {
    if (startDateValue && durationsValue) {
      if (!errors.startDate) {
        const updatedEndDate = addDays(startDateValue, durationsValue - 1);
        setValue('endDate', updatedEndDate);
      }
    }
  }, [durationsValue, startDateValue, errors.startDate, setValue]);

  useEffect(() => {
    if (endDateValue) {
      const newResumptionDate = addDays(endDateValue, 1);

      setValue('resumptionDate', newResumptionDate);
    }
  }, [endDateValue, setValue]);

  const onSubmit = async (data: LeaveRequestForm) => {
    const transformData = {
      ...data,
      ...(leaveIdParam && { id: leaveIdParam }),
      employee: userId,
      type: LEAVE_TYPE_FORM[leaveTypeParam.toUpperCase()],
      startDate: formatDate(data.startDate),
      endDate: formatDate(data.endDate),
      resumptionDate: formatDate(data.resumptionDate),
    };

    try {
      await handleLeaveMutation(transformData);

      toast({
        status: ToastStatus.Success,
        title: leaveIdParam
          ? MESSAGES.COMMON.UPDATE_SUCCESS(leaveType)
          : MESSAGES.COMMON.ADD_SUCCESS(leaveType),
      });

      navigate(USER_PAGE.LEAVE);
    } catch {
      toast({
        status: ToastStatus.Error,
        title: leaveIdParam
          ? MESSAGES.COMMON.UPDATE_FAILED(leaveType)
          : MESSAGES.COMMON.ADD_FAILED(leaveType),
      });
    }
  };

  const handleFormReset = () => {
    reset();
  };

  const disableSubmit = !isDirty || !isValid || isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full px-[102px] py-[68px] bg-white"
      >
        {/* Header  */}
        <div className="flex flex-col items-center gap-[26px]">
          <div className="flex items-center gap-4">
            <BookIcon />
            <h2 className="text-3xl text-black-soft">Leave Application</h2>
          </div>
          <p className="text-xl text-black-soft">
            Fill the required fields below to apply for annual leave.
          </p>
        </div>

        {/* Content  */}
        <div className="space-y-6 mt-[30px]">
          <FormField
            control={control}
            name="type"
            render={({ field }) => (
              <TextField
                label="Leave Type"
                inputClassName="rounded-regular"
                disabled
                {...field}
              />
            )}
          />
          <div className="flex items-start gap-[70px]">
            <FormField
              control={control}
              name="startDate"
              render={({ field, fieldState: { error } }) => {
                const { ref, ...restField } = field;

                return (
                  <FormItem>
                    <Label className="flex flex-1 mb-3">Start Date</Label>
                    <FormControl>
                      <DatePicker
                        disabledRange={(date) => date < new Date()}
                        date={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          field.onBlur();
                        }}
                        isError={!!error}
                        {...restField}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={control}
              name="endDate"
              render={({ field, fieldState: { error } }) => {
                const { ref, ...restField } = field;

                return (
                  <FormItem>
                    <Label className="flex flex-1 mb-3">End Date</Label>
                    <FormControl>
                      <DatePicker
                        disabledRange={(date) =>
                          date < new Date(startDateValue)
                        }
                        date={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          field.onBlur();
                        }}
                        isError={!!error}
                        {...restField}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="flex items-start gap-[70px]">
            <FormField
              control={control}
              name="durations"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  type="number"
                  label="Duration"
                  placeholder="Enter duration"
                  inputClassName="rounded-regular"
                  min={1}
                  errorMessage={error?.message}
                  {...field}
                />
              )}
            />
            <FormField
              control={control}
              name="resumptionDate"
              render={({ field, fieldState: { error } }) => {
                const { ref, ...restField } = field;

                return (
                  <FormItem>
                    <Label className="flex flex-1 mb-3">Resumption Date</Label>
                    <FormControl>
                      <DatePicker
                        date={field.value}
                        disabledRange={(date) => date < new Date(endDateValue)}
                        onSelect={(date) => {
                          field.onChange(date);
                          field.onBlur();
                        }}
                        isError={!!error}
                        {...restField}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <FormField
            control={control}
            name="reason"
            render={({ field, fieldState: { error } }) => (
              <FormItem className="space-y-5">
                <Label>Reason for leave</Label>
                <FormControl>
                  <Textarea
                    placeholder="Enter your reason"
                    isInvalid={!!error}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="documentPath"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <Label>Attach handover document (pdf, jpg, png, docx)</Label>
                <DocumentUpload
                  value={field.value}
                  onFileChange={field.onChange}
                />
                <FormMessage>{error?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="reliefOfficer"
            render={({ field, fieldState: { error } }) => (
              <FormItem className="space-y-5">
                <Label>Choose Relief Officer</Label>
                <FormControl>
                  <Select
                    option={leaveAccounts || []}
                    placeholder="Select your relief officer"
                    className="bg-blue-light px-5 py-4 rounded-regular"
                    isError={!!error}
                    isDisable={isLeaveAccountsLoading}
                    {...field}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-[30px] w-full h-[70px]">
            <Button
              type="submit"
              className="w-[364px] bg-green-primary"
              isLoading={isLeaveMutationLoading}
              disabled={disableSubmit}
            >
              Submit
            </Button>
            <Button
              type="button"
              onClick={handleFormReset}
              variant="outline"
              className="w-[364px] text-red-primary border-red-deep"
            >
              Reset
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LeaveForm;
