import { format } from 'date-fns';

// Icons
import { CalendarIcon } from '@/icons';

// Utils
import { cn } from '@/utils';

// Components
import { Button } from '../Button';
import { PopoverContainer } from '../Popover';
import { Calendar } from '../Calendar';

export interface DatePickerProps {
  date: Date | undefined;
  placeholder?: string;
  className?: string;
  onSelect: (date: Date | undefined) => void;
}

const DatePicker = ({
  date,
  placeholder = 'Pick a date',
  className,
  onSelect,
}: DatePickerProps) => {
  return (
    <PopoverContainer
      trigger={
        <Button
          variant="ghost"
          className={cn(
            'w-full h-[54px] justify-between px-5 py-4 text-lg rounded-regular font-normal bg-blue-light text-black-smoky',
            className,
          )}
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
        />
      }
      contentClassName="w-auto p-0"
      triggerClassName="w-full"
    />
  );
};

export default DatePicker;
