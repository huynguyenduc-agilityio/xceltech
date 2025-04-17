import { useForm } from 'react-hook-form';

// Constants
import { MESSAGES } from '@/constants';

// Types
import { Documents, ToastStatus, UploadFileForm } from '@/types';

// Hooks
import { useToast, useUploadDocument } from '@/hooks';

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

const fileFields = [
  { name: 'documents[offerLetter]', label: 'Upload Offer Letter' },
  { name: 'documents[birthCertificate]', label: 'Upload Birth Certificate' },
  { name: 'documents[guarantorForm]', label: 'Upload Guarantor’s Form' },
  { name: 'documents[degreeCertificate]', label: 'Upload Degree Certificate' },
];

interface UploadDocumentsProps {
  files?: Documents[];
  onBackJob: () => void;
}

const UploadDocuments = ({ files = [], onBackJob }: UploadDocumentsProps) => {
  const { toast } = useToast();
  const { handleUploadDocument, isUploadDocumentLoading } = useUploadDocument();

  const defaultValues: UploadFileForm = Object.fromEntries(
    fileFields.map(({ name }) => {
      const matchedFile = files.find((f) => f.documentType === name);

      return [name, matchedFile?.documentFile ?? null];
    }),
  ) as UploadFileForm;

  const form = useForm<UploadFileForm>({
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = form;

  const onSubmit = async (data: UploadFileForm) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== null),
    ) as UploadFileForm;

    try {
      await handleUploadDocument(filteredData);

      toast({
        title: MESSAGES.COMMON.UPLOAD_SUCCESS('Document'),
        status: ToastStatus.Success,
      });

      if (isUploadDocumentLoading) {
        onBackJob();
      }
    } catch {
      toast({
        title: MESSAGES.COMMON.UPLOAD_FAILED('Document'),
        status: ToastStatus.Error,
      });
    }
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
          <Button
            type="submit"
            className="w-[347px] text-xl rounded-lg"
            isLoading={isUploadDocumentLoading}
            disabled={!isDirty || !isValid || isSubmitting}
          >
            Upload Documents
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UploadDocuments;
