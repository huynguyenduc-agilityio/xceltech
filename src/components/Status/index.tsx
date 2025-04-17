// Icons
import { Check, X } from 'lucide-react';

// Types
import { StatusLeave } from '@/types';

// Utils
import { cn } from '@/utils';

export interface StatusProps {
  type?: StatusLeave;
}

const Status = ({ type = StatusLeave.Pending }: StatusProps) => {
  const statusClasses = {
    [StatusLeave.Pending]: 'bg-gray-500',
    [StatusLeave.Approved]: 'bg-green-primary',
    [StatusLeave.Rejected]: 'bg-red-deep',
  };

  return (
    <div
      className={cn(
        'flex items-center w-28 justify-center gap-1 px-2.5 py-1 rounded-full border text-white',
        statusClasses[type],
      )}
    >
      {type === StatusLeave.Approved && <Check size={18} />}
      {type === StatusLeave.Rejected && <X size={18} />}
      <span className={cn('text-base font-bold capitalize')}>{type}</span>
    </div>
  );
};

export default Status;
