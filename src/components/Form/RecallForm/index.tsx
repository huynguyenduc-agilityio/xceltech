import { useForm } from 'react-hook-form';

// Icons
import { PhoneIcon } from '@/icons';

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
  TextField,
} from '@/components';

// Types
import { LeaveRecallForm, StatusLeave, ToastStatus } from '@/types';

// Utils
import { formatDate, getDaysLeft } from '@/utils';

// Hooks
import { useToast, useUpdateLeaveRecallRequest } from '@/hooks';

// Constants
import { MESSAGES } from '@/constants';

export interface IRecallForm {
  initialValues?: Partial<LeaveRecallForm>;
  onClose: () => void;
}

const RecallForm = ({ initialValues, onClose }: IRecallForm) => {
  const {
    id = '',
    employeeName = '',
    department = '',
    startDate,
    endDate,
    remainingDate = getDaysLeft(String(initialValues?.endDate)) || 0,
    recallDate,
    reliefOfficerFirstName = '',
    reliefOfficerLastName = '',
  } = initialValues || {};
  const { toast } = useToast();

  const defaultValues: LeaveRecallForm = {
    id,
    employeeName,
    department,
    startDate,
    endDate,
    remainingDate,
    recallDate,
    reliefOfficer: `${initialValues?.reliefOfficerFirstName} ${initialValues?.reliefOfficerLastName}`,
    reliefOfficerFirstName,
    reliefOfficerLastName,
  };

  const { isLoading, handleUpdateRecallRequest } =
    useUpdateLeaveRecallRequest();

  const form = useForm<LeaveRecallForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = form;

  const onSubmit = async (data: LeaveRecallForm) => {
    try {
      const payload = {
        recallDate: formatDate(data.recallDate as Date),
        isRecalled: true,
        recallStatus: StatusLeave.Pending,
      };

      await handleUpdateRecallRequest({ leaveId: data.id, data: payload });

      toast({
        status: ToastStatus.Success,
        title: MESSAGES.COMMON.LEAVE_REQUEST_SUCCESS,
      });

      onClose();
    } catch (error) {
      toast({
        status: ToastStatus.Error,
        title: MESSAGES.COMMON.LEAVE_REQUEST_FAILED,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full px-10 pb-12 bg-white"
      >
        {/* Header  */}
        <div className="flex flex-col items-start gap-[26px]">
          <PhoneIcon />
          <h2 className="text-[25px] font-bold text-black-soft">
            Leave Recall
          </h2>
          <p className="text-base text-black-soft">
            Fill the required fields below to apply for annual leave.
          </p>
        </div>

        {/* Content  */}
        <div className="space-y-6 mt-[30px]">
          <FormField
            control={control}
            name="employeeName"
            render={({ field }) => (
              <TextField
                label="Employee Name"
                labelClassName="text-base"
                inputClassName="rounded-regular"
                placeholder="Enter Employee Name"
                disabled
                {...field}
              />
            )}
          />

          <FormField
            control={control}
            name="department"
            render={({ field }) => (
              <TextField
                label="Department"
                labelClassName="text-base"
                inputClassName="rounded-regular"
                placeholder="Enter Department"
                disabled
                {...field}
              />
            )}
          />

          <div className="flex items-center gap-[70px]">
            <FormField
              control={control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <Label className="flex flex-1 text-base">Start Date</Label>
                  <FormControl>
                    <DatePicker
                      isDisabled={true}
                      date={field.value as Date}
                      onSelect={field.onChange}
                      className="w-full"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <Label className="flex flex-1 text-base">End Date</Label>
                  <FormControl>
                    <DatePicker
                      isDisabled={true}
                      date={field.value as Date}
                      onSelect={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-[70px]">
            <FormField
              control={control}
              name="remainingDate"
              render={({ field }) => (
                <TextField
                  disabled
                  type="number"
                  label="Days Remaining"
                  labelClassName="text-base"
                  placeholder="Enter duration"
                  inputClassName="rounded-regular"
                  {...field}
                />
              )}
            />
            <FormField
              control={control}
              name="recallDate"
              render={({ field }) => (
                <FormItem>
                  <Label className="flex flex-1 text-base">
                    New Resumption Date
                  </Label>
                  <FormControl>
                    <DatePicker
                      disabledRange={(date) =>
                        date < new Date() || date > new Date(endDate as string)
                      }
                      date={field.value as Date}
                      onSelect={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="reliefOfficer"
            render={({ field }) => (
              <TextField
                disabled
                label="Relief Officer(s)"
                labelClassName="text-base"
                placeholder="Enter Relief Officer(s)"
                inputClassName="rounded-regular"
                {...field}
              />
            )}
          />
          <div className="flex gap-[30px] w-full h-[70px]">
            <Button
              type="submit"
              className="w-[364px] bg-green-primary"
              disabled={!isDirty || !isValid || isLoading}
              isLoading={isLoading}
            >
              Initiate Recall
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-[364px] text-red-primary border-red-deep"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default RecallForm;
