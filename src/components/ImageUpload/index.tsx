import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { PlusIcon } from 'lucide-react';

import { Avatar, Button, Input, FormField, FormItem } from '../common';

export interface TImageUploadProps {
  imageUrl?: File | string;
  onImageChange: (file: File) => void;
}

const ImageUpload = ({ imageUrl = '', onImageChange }: TImageUploadProps) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>(
    typeof imageUrl === 'string' ? imageUrl : undefined,
  );

  const handleOpenImage = () => imageInputRef.current?.click();

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (preview?.startsWith('blob:')) {
          URL.revokeObjectURL(preview);
        }

        const previewURL = URL.createObjectURL(file);
        setPreview(previewURL);
        onImageChange(file);
      }
    },
    [onImageChange, preview],
  );

  useEffect(() => {
    if (typeof imageUrl === 'string') {
      setPreview(imageUrl);
    }
  }, [imageUrl]);

  useEffect(() => {
    return () => {
      if (preview?.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="flex flex-col items-start gap-4">
      <FormField
        name={'image'}
        render={() => (
          <FormItem>
            <div className="relative flex items-center justify-center w-[196px] h-[196px] rounded-full bg-gray-neutral group overflow-hidden">
              {preview ? (
                <Avatar
                  size={196}
                  src={preview}
                  alt="Uploaded image"
                  className="cursor-pointer"
                  onClick={handleOpenImage}
                />
              ) : (
                <Button
                  type="button"
                  className="w-full h-full"
                  variant="ghost"
                  size="icon"
                  onClick={handleOpenImage}
                >
                  <PlusIcon width={40} height={40} className="text-white" />
                </Button>
              )}
              {/* Overlay */}
              <div className="absolute inset-0 cursor-pointer pointer-events-none bg-black-default/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <PlusIcon width={40} height={40} className="text-white" />
              </div>

              <Input
                type="file"
                ref={imageInputRef}
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default memo(ImageUpload);
