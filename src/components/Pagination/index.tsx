import { memo } from 'react';
import isEqual from 'react-fast-compare';

// Icons
import { MoveLeft, MoveRight } from 'lucide-react';

// Constants
import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL,
  OPTION_LIMITS,
} from '@/constants';

// Utils
import { getRecordRange } from '@/utils';

// Components
import { Button, Select } from '../common';

interface PaginationProps {
  totalRecords?: number;
  limit?: number;
  currentPage?: number;
  isDisabledPrev?: boolean;
  isDisabledNext?: boolean;
  onPageChange?: (direction: number | 'prev' | 'next') => void;
  onChangeLimit?: (value: number) => void;
}

const Pagination = ({
  currentPage = DEFAULT_CURRENT_PAGE,
  limit = DEFAULT_PAGE_SIZE,
  totalRecords = DEFAULT_TOTAL,
  isDisabledPrev,
  isDisabledNext,
  onPageChange,
  onChangeLimit,
}: PaginationProps) => {
  const handleNextPage = () => onPageChange?.('next');

  const handlePrevPage = () => onPageChange?.('prev');

  const handleChangeLimit = (value: string) => {
    onChangeLimit?.(Number(value));
  };

  return (
    <div className="w-full flex justify-between mt-6">
      <div className="flex items-center">
        <p className="text-md">
          {getRecordRange(currentPage, limit, totalRecords)}
        </p>
      </div>
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-3 text-md">
          <p>Rows per page:</p>
          <Select
            defaultValue={String(limit)}
            option={OPTION_LIMITS}
            isDisable={!totalRecords}
            onChange={handleChangeLimit}
            className="bg-white border border-gray-dark rounded-md w-fit"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            title="prev-button"
            className="bg-primary rounded-md w-7 h-7 p-0"
            disabled={isDisabledPrev}
            onClick={handlePrevPage}
          >
            <MoveLeft className="text-white w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            title="next-button"
            className="bg-primary rounded-md w-7 h-7 p-0"
            disabled={isDisabledNext}
            onClick={handleNextPage}
          >
            <MoveRight className="text-white w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(Pagination, isEqual);
