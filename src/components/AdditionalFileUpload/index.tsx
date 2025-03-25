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

export interface AdditionalFileUploadProps {
  name: string;
  fileUrl?: string;
  onFileChange: (file: string) => void;
}

const AdditionalFileUpload = ({
  name,
  fileUrl = '',
}: AdditionalFileUploadProps) => {
  const [selectedFile] = useState<string | null>(fileUrl);

  const {
    control,
    setValue,
    formState: { errors },
  } = useForm<Record<string, File>>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
        setValue(name, file, { shouldValidate: true });

        //TODO: Hanlde Upload File
      }
    },
    [setValue],
  );

  return (
    <div className="flex-1 w-full">
      <FormField
        control={control}
        name={name}
        render={() => (
          <FormItem>
            <div className="relative flex items-center h-[68px]">
              <Input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf"
              />
              <div className="absolute inset-0 flex items-center px-6 w-full h-full bg-blue-light rounded-[15px] test-huy">
                <span className="mr-[291px] text-md truncate text-black-smoky-">
                  {selectedFile}
                </span>
              </div>
              <Button
                variant="secondary"
                className="absolute bottom-0 right-0 w-[291px] py-[12px] h-full rounded-[15px]"
              >
                <Label
                  htmlFor="file-upload"
                  className="text-lg text-bold cursor-pointer"
                >
                  Upload
                </Label>
              </Button>
            </div>
            {errors?.file && (
              <FormMessage className="">
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

export default AdditionalFileUpload;
