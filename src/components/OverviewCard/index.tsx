import { ReactNode } from 'react';

// Icons
import { KebabIcon } from '@/icons';

export interface OverviewCardProps {
  title: string;
  children: ReactNode;
}

const OverviewCard = ({ title, children }: OverviewCardProps) => {
  return (
    <div className="h-full p-10 rounded-regular bg-white">
      <div className="flex items-center justify-between mb-6">
        <span className="text-2xl font-bold">{title}</span>
        <button
          aria-label="More options"
          disabled
          className="disabled:cursor-not-allowed"
        >
          <KebabIcon />
        </button>
      </div>
      {children}
    </div>
  );
};

export default OverviewCard;
