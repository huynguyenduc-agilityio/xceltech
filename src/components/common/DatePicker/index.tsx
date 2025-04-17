import { format } from 'date-fns';
import { Matcher } from 'react-day-picker';

// Icons
import { CalendarIcon } from '@/icons';

// Utils
import { cn } from '@/utils';

// Components
import { Button } from '../Button';
import { PopoverContainer } from '../Popover';
import { Calendar } from '../Calendar';

export interface DatePickerProps {
  isDisabled?: boolean;
  disabledRange?: Matcher | Matcher[] | undefined;
  date: Date | undefined;
  isError?: boolean;
  placeholder?: string;
  className?: string;
  onSelect: (date: Date | undefined) => void;
}

const DatePicker = ({
  isDisabled = false,
  disabledRange,
  date,
  placeholder = 'Pick a date',
  isError,
  className,
  onSelect,
  ...props
}: DatePickerProps) => {
  return (
    <PopoverContainer
      trigger={
        <Button
          type="button"
          variant="ghost"
          className={cn(
            'w-full h-[54px] justify-between px-5 py-4 text-lg rounded-regular font-normal bg-blue-light text-black-smoky',
            isError && 'bg-red-100',
            className,
          )}
          disabled={isDisabled}
        >
          {date ? (
            format(date, 'PPP')
          ) : (
            <span className="text-gray-soft">{placeholder}</span>
          )}
          <CalendarIcon className="w-[23px] h-[27px]" />
        </Button>
      }
      content={
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          initialFocus
          disabled={disabledRange}
          {...props}
        />
      }
      contentClassName="w-auto p-0"
      triggerClassName="w-full"
    />
  );
};

export default DatePicker;
