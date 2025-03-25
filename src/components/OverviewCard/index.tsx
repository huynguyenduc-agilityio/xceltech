import { ReactNode } from 'react';

// Icons
import { KebabIcon } from '@/icons';

export interface OverviewCardProps {
  title: string;
  children: ReactNode;
}

const OverviewCard = ({ title, children }: OverviewCardProps) => {
  return (
    <div className="h-[470px] p-10 rounded-regular bg-white">
      <div className="flex items-center justify-between mb-6">
        <span className="text-2xl font-bold">{title}</span>
        <button aria-label="More options">
          <KebabIcon />
        </button>
      </div>
      {children}
    </div>
  );
};

export default OverviewCard;
