import { memo, useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

// Icons
import { UserIcon } from '@/icons';
import { PlusIcon } from 'lucide-react';

import {
  Avatar,
  Button,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from '../common';

export interface TImageUploadProps {
  imageUrl?: string;
  onImageChange: (image: string) => void;
}

const ImageUpload = ({ imageUrl = '' }: TImageUploadProps) => {
  const [selectedImageUrl] = useState<string | null>(imageUrl);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const {
    control,
    setValue,
    formState: { errors },
  } = useForm<{ image: File }>({ mode: 'onBlur', reValidateMode: 'onChange' });

  const handleOpenImage = () => imageInputRef.current?.click();

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const image = e.target.files?.[0];
      if (image) {
        setValue('image', image, { shouldValidate: true });

        //TODO: Handle Upload image
      }
    },
    [setValue],
  );

  return (
    <div className="flex flex-col items-start gap-4">
      <FormField
        control={control}
        name={'image'}
        render={() => (
          <FormItem>
            <div className="relative flex items-center justify-center w-[196px] h-[196px] rounded-full bg-gray-neutral group overflow-hidden">
              {selectedImageUrl ? (
                <Avatar
                  size={196}
                  src={selectedImageUrl}
                  alt="Uploaded image"
                  className="cursor-pointer"
                  onClick={handleOpenImage}
                />
              ) : (
                <Button
                  className="w-full h-full"
                  variant="ghost"
                  size="icon"
                  onClick={handleOpenImage}
                >
                  <UserIcon
                    width={80}
                    height={80}
                    className="text-white transition-all group-hover:opacity-50"
                  />
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

              {errors?.image && (
                <FormMessage>
                  <div className="flex flex-col gap-4 text-red-500 text-sm">
                    <p>{errors.image.message}</p>
                    <p>Please select again!!!</p>
                  </div>
                </FormMessage>
              )}
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default memo(ImageUpload);
