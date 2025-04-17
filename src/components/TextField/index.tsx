import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useCallback,
} from 'react';
import { VariantProps } from 'class-variance-authority';

// Utils
import { cn, removeNonDigits } from '@/utils';

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
    onChange: (value: string | number) => void;
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
        if (rest.type === 'number') {
          const rawValue = removeNonDigits(e.target.value);

          onChange(rawValue);
        } else {
          onChange(e.target.value);
        }
      },
      [onChange, rest.type],
    );

    return (
      <div className="grid w-full gap-2">
        <FormItem
          className={cn(
            variant === 'primary' ? 'space-y-5' : 'space-y-3',
            className,
          )}
        >
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
        </FormItem>
        {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
      </div>
    );
  },
);

export default TextField;
