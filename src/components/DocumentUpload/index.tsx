import { useCallback } from 'react';

import { Button, Input, Label } from '../common';

export interface DocumentUploadProps {
  fileUrl?: File | null;
  onFileChange: (file: File) => void;
}

const DocumentUpload = ({ fileUrl, onFileChange }: DocumentUploadProps) => {
  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
        onFileChange(file);
      }
    },
    [onFileChange],
  );

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
          {fileUrl?.name}
        </span>
      </div>
    </div>
  );
};

export default DocumentUpload;
