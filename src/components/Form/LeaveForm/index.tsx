import { useForm } from 'react-hook-form';

// Icons
import { BookIcon } from '@/icons';

// Constants
import { LEAVE_TYPE_OPTIONS, RELIEF_OFFICER_OPTIONS } from '@/constants';

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

const LeaveForm = () => {
  const form = useForm();

  const { control, handleSubmit, reset } = form;

  const onSubmit = (data: unknown) => {
    console.log('Form Data:', data);
  };

  const handleFormReset = () => {
    reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-6xl mx-auto mt-[18px] px-[102px] py-[68px] bg-white"
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
            name="leaveType"
            render={({ field }) => (
              <FormItem>
                <Label>Leave Type</Label>
                <FormControl>
                  <Select
                    option={LEAVE_TYPE_OPTIONS}
                    placeholder="Select your leave type"
                    className="bg-blue-light px-5 py-4 rounded-regular"
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-[70px]">
            <FormField
              control={control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <Label className="flex flex-1">Start Date</Label>
                  <FormControl>
                    <DatePicker
                      date={field.value}
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
                  <Label className="flex flex-1">End Date</Label>
                  <FormControl>
                    <DatePicker date={field.value} onSelect={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-[70px]">
            <FormField
              control={control}
              name="duration"
              render={({ field }) => (
                <TextField
                  type="number"
                  label="Duration"
                  placeholder="Enter duration"
                  {...field}
                />
              )}
            />
            <FormField
              control={control}
              name="resumptionDate"
              render={({ field }) => (
                <FormItem>
                  <Label className="flex flex-1">Resumption Date</Label>
                  <FormControl>
                    <DatePicker date={field.value} onSelect={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <Label>Reason for leave</Label>
                <FormControl>
                  <Textarea {...field} placeholder="Enter your reason" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* TODO: Handle upload file  */}
          <div>
            <Label>Attach handover document (pdf, jpg, png, docx)</Label>
            <DocumentUpload onFileChange={() => {}} />
          </div>

          <FormField
            control={control}
            name="reliefOfficer"
            render={({ field }) => (
              <FormItem>
                <Label>Choose Relief Officer</Label>
                <FormControl>
                  <Select
                    option={RELIEF_OFFICER_OPTIONS}
                    placeholder="Select your relief officer"
                    className="bg-blue-light px-5 py-4 rounded-regular"
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-[30px] w-full h-[70px]">
            <Button type="submit" className="w-[364px] bg-green-primary">
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
