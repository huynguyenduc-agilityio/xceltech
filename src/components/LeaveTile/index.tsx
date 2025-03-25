import { cn, formatNumberWithMetricPrefix } from '@/utils';

export interface LeaveTileProps {
  count: number;
  title: string;
}

const LeaveTile = ({ count, title }: LeaveTileProps) => {
  const formattedCount = formatNumberWithMetricPrefix(count);
  let fontSize = 'text-[70px]';

  if (formattedCount.length > 3) {
    fontSize = 'text-[50px]';
  } else if (formattedCount.length > 2) {
    fontSize = 'text-[60px]';
  }

  return (
    <div
      className={
        'flex items-center gap-12 w-[445px] h-[182px] px-5 py-6 rounded-[16px] bg-primary'
      }
    >
      <div className="flex items-center justify-center w-[135px] h-[135px] rounded-full bg-white">
        <span className={cn('text-primary', fontSize)}>{formattedCount}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xl font-bold text-white">{title}</span>
        {/* TODO: Button  */}
      </div>
    </div>
  );
};

export default LeaveTile;
