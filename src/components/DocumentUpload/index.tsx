import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  Button,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Label,
} from '../common';

export interface DocumentUploadProps {
  fileUrl?: string;
  onFileChange: (file: string) => void;
}

const DocumentUpload = ({ fileUrl = '' }: DocumentUploadProps) => {
  const [selectedFile] = useState<string | null>(fileUrl);

  const {
    control,
    setValue,
    formState: { errors },
  } = useForm<{ file: File }>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
        setValue('file', file, { shouldValidate: true });

        //TODO: Handle Upload File
      }
    },
    [setValue],
  );

  return (
    <div className="flex-1 w-full">
      <FormField
        control={control}
        name="file"
        render={() => (
          <FormItem>
            <div className="relative flex items-center h-[54px]">
              <Button
                asChild
                className="absolute inset z-10 bg-black-shadow hover:bg-black-shadow w-[254px] py-[12px] text-white h-full rounded"
              >
                <Label htmlFor="file-upload" className="cursor-pointer">
                  Choose File
                </Label>
              </Button>
              <Input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.png,.docx"
              />
              <div className="absolute flex items-center px-6 w-full h-full bg-blue-light rounded-regular test-huy">
                <span className="ml-[254px] text-md truncate text-black-smoky-">
                  {selectedFile}
                </span>
              </div>
            </div>
            {errors?.file && (
              <FormMessage>
                <div className="flex flex-col gap-4 text-red-500 text-sm">
                  <p>{errors.file.message}</p>
                  <p>Please select again!!!</p>
                </div>
              </FormMessage>
            )}
          </FormItem>
        )}
      />
    </div>
  );
};

export default DocumentUpload;
