import { useState } from 'react';
import { format } from 'date-fns';

// Icons
import { CalendarIcon } from '@/icons';

// Utils
import { cn } from '@/utils';

// Components
import { Button } from '../Button';
import { PopoverContainer } from '../Popover';
import { Calendar } from '../Calendar';

const DatePicker = () => {
  const [date, setDate] = useState<Date>();

  return (
    <PopoverContainer
      trigger={
        <Button
          variant="ghost"
          className={cn(
            'w-[280px] h-[54px] justify-between px-5 py-4 text-lg bg-blue-light text-black-smoky',
          )}
        >
          {date ? (
            format(date, 'PPP')
          ) : (
            <span className="text-gray-soft">Pick a date</span>
          )}
          <CalendarIcon className="w-[23px] h-[27px]" />
        </Button>
      }
      content={
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      }
      contentClassName="w-auto p-0"
    />
  );
};

export default DatePicker;
