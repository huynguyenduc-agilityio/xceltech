import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FieldErrors } from 'react-hook-form';

// Types
import { UploadFileForm } from '@/types';

// Components
import { FormItem, FormMessage, Input, Button } from '@/components';

export interface AdditionalFileUploadProps {
  name: string;
  value?: File | string | null;
  errors?: FieldErrors<UploadFileForm>;
  onFileChange: (file: File | null) => void;
}

const AdditionalFileUpload = ({
  name,
  value,
  errors,
  onFileChange,
}: AdditionalFileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    onFileChange(file);
  };

  const handleOpenFile = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value);

      setFileUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }

    if (typeof value === 'string') {
      setFileUrl(value);
    }

    if (!value) {
      setFileUrl(null);
    }
  }, [value]);

  const fileName =
    typeof value === 'string'
      ? (value.split('/').pop() ?? '')
      : value instanceof File
        ? value.name
        : '';

  return (
    <FormItem>
      <div className="relative flex items-center h-[68px]">
        <Input
          ref={fileInputRef}
          id={`file-upload-${name}`}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf"
        />

        <div className="absolute inset-0 flex items-center px-6 w-full h-full bg-blue-light rounded-[15px]">
          <span className="mr-[291px] text-md truncate text-black-smoky-">
            {fileUrl ? (
              <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                {fileName}
              </a>
            ) : (
              ''
            )}
          </span>
        </div>

        <Button
          type="button"
          variant="secondary"
          className="absolute bottom-0 right-0 w-[291px] py-[12px] h-full rounded-[15px]"
          onClick={handleOpenFile}
        >
          Upload
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
  );
};

export default AdditionalFileUpload;
