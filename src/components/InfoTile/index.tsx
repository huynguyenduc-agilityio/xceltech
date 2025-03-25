import { ReactNode } from 'react';

// Utils
import { cn, formatNumberWithMetricPrefix } from '@/utils';

export interface InfoTileProps {
  count: number;
  title: string;
  icon: ReactNode;
  styled?: string;
}

const InfoTile = ({ count, title, icon, styled }: InfoTileProps) => {
  return (
    <div
      className={cn(
        'flex items-center gap-8 w-[323px] text-white rounded-[14px] pt-9 pb-8 px-8',
        styled,
      )}
    >
      {icon}
      <div className="flex flex-col items-center">
        <span className="text-4xl font-bold leading-[100%]">
          {formatNumberWithMetricPrefix(count)}
        </span>
        <span className="text-lg font-bold">{title}</span>
      </div>
    </div>
  );
};

export default InfoTile;
