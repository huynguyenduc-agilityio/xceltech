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
import { useState } from 'react';

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
  const [open, setOpen] = useState<boolean>(false);

  const handleSelect = (selectedDate: Date | undefined) => {
    onSelect(selectedDate);
    setOpen(false);
  };

  return (
    <PopoverContainer
      isOpen={open}
      onOpenChange={setOpen}
      trigger={
        <Button
          type="button"
          aria-label="pick-a-date"
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
          initialFocus
          disabled={disabledRange}
          onSelect={handleSelect}
          {...props}
        />
      }
      contentClassName="w-auto p-0"
      triggerClassName="w-full"
    />
  );
};

export default DatePicker;
