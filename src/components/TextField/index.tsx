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
    errorMessage?: string;
    inputClassName?: string;
    labelClassName?: string;
    onChange: (value: string) => void;
  };

const TextField = forwardRef<HTMLInputElement, TTextFieldProps>(
  (
    {
      label,
      variant = 'primary',
      errorMessage,
      className,
      inputClassName,
      labelClassName,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const handleChangeValue = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      },
      [onChange],
    );

    return (
      <FormItem className={className}>
        <Label
          id={`${label}-label`}
          variant={variant}
          size={variant}
          className={labelClassName}
        >
          {label}
        </Label>
        <FormControl>
          <Input
            ref={ref}
            aria-labelledby={`${label}-label`}
            variant={variant}
            className={inputClassName}
            onChange={handleChangeValue}
            {...rest}
            isInvalid={!!errorMessage}
          />
        </FormControl>
        {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
      </FormItem>
    );
  },
);

export default TextField;
