import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useCallback,
} from 'react';
import { VariantProps } from 'class-variance-authority';

// Component
import {
  FormControl,
  FormItem,
  FormMessage,
  Input,
  inputVariants,
  Label,
} from '@/components/common';

type TTextFieldProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants> & {
    label: string;
    errorMessages?: string;
    onChange: (value: string) => void;
  };

const TextField = forwardRef<HTMLInputElement, TTextFieldProps>(
  (
    { label, variant = 'primary', errorMessages, onChange, className, ...rest },
    ref,
  ) => {
    const handleChangeValue = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      },
      [onChange],
    );

    return (
      <FormItem>
        <Label id={`${label}-label`} variant={variant} size={variant}>
          {label}
        </Label>
        <FormControl>
          <Input
            ref={ref}
            aria-labelledby={`${label}-label`}
            variant={variant}
            onChange={handleChangeValue}
            {...rest}
            isInvalid={!!errorMessages}
          />
        </FormControl>
        {errorMessages && (
          <FormMessage className="text-red-500 text-sm">
            {errorMessages}
          </FormMessage>
        )}
      </FormItem>
    );
  },
);

export default TextField;
