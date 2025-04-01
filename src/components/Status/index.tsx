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
    [StatusLeave.Approve]: 'bg-green-primary',
    [StatusLeave.Decline]: 'bg-red-deep',
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-1 px-2.5 py-1 rounded-full border text-white',
        statusClasses[type],
      )}
    >
      {type === StatusLeave.Approve && <Check size={18} />}
      {type === StatusLeave.Decline && <X size={18} />}
      <span className={cn('text-base font-bold capitalize')}>{type}</span>
    </div>
  );
};

export default Status;
