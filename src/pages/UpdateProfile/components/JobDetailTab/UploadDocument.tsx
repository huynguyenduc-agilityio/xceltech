import { useForm } from 'react-hook-form';

// Types
import { UploadFileForm } from '@/types';

// Components
import {
  Form,
  FormItem,
  FormLabel,
  FormMessage,
  AdditionalFileUpload,
  Button,
  FormField,
} from '@/components';

interface UploadDocumentsProps {
  onBackJob: () => void;
}

const fileFields = [
  { name: 'offerLetter', label: 'Upload Offer Letter' },
  { name: 'birthCertificate', label: 'Upload Birth Certificate' },
  { name: 'guarantorsForm', label: 'Upload Guarantor’s Form' },
  { name: 'degreeCertificate', label: 'Upload Degree Certificate' },
];

const UploadDocuments = ({ onBackJob }: UploadDocumentsProps) => {
  const form = useForm<UploadFileForm>({
    defaultValues: Object.fromEntries(
      fileFields.map(({ name }) => [name, null]),
    ),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: UploadFileForm) => {
    console.log('Uploaded Documents:', data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <h2 className="text-lg font-bold mb-[50px]">
          <span
            className="cursor-pointer hover:text-secondary"
            onClick={onBackJob}
          >
            Job Details
          </span>{' '}
          / Upload Documents
        </h2>

        <div className="space-y-4">
          {fileFields.map(({ name, label }) => (
            <FormField
              key={name}
              control={control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-black-default font-bold mb-3">
                    {label}
                  </FormLabel>
                  <AdditionalFileUpload
                    name={field.name}
                    value={field.value}
                    errors={errors}
                    onFileChange={(file) => field.onChange(file)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <div className="mt-[176px] text-center">
          <Button type="submit" className="w-[347px] text-xl rounded-lg">
            Upload Documents
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UploadDocuments;
