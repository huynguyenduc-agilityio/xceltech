import { useNavigate } from 'react-router-dom';

// Utils
import { cn, formatNumberWithMetricPrefix } from '@/utils';

import { Button } from '../common';

export interface LeaveTileProps {
  count: number;
  title: string;
  path: string;
}

const LeaveTile = ({ count, title, path }: LeaveTileProps) => {
  const navigate = useNavigate();

  const formattedCount = formatNumberWithMetricPrefix(count);
  let fontSize = 'text-[70px]';

  if (formattedCount.length > 3) {
    fontSize = 'text-[50px]';
  } else if (formattedCount.length > 2) {
    fontSize = 'text-[60px]';
  }

  return (
    <div className="flex items-center gap-12 w-full h-[182px] px-5 py-6 rounded-[16px] bg-primary">
      <div className="flex items-center justify-center w-[135px] h-[135px] rounded-full bg-white">
        <span className={cn('text-primary', fontSize)}>{formattedCount}</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <span className="text-xl font-bold text-white">{title}</span>
        <Button
          size="sm"
          className="bg-secondary hover:bg-secondary/90 text-black-default px-[72px] py-2"
          onClick={() => navigate(path)}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default LeaveTile;
