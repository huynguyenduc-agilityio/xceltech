import { useCallback, useEffect, useState } from 'react';

import { Button, Input, Label } from '../common';

export interface DocumentUploadProps {
  value?: File | string | null;
  onFileChange: (file: File) => void;
}

const DocumentUpload = ({ value, onFileChange }: DocumentUploadProps) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
        onFileChange(file);
      }
    },
    [onFileChange],
  );

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
      <div className="absolute flex items-center px-6 w-full h-full bg-blue-light rounded-regular">
        <span className="ml-[254px] text-md truncate text-black-smoky-">
          {fileUrl ? (
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              {fileName}
            </a>
          ) : (
            ''
          )}
        </span>
      </div>
    </div>
  );
};

export default DocumentUpload;
