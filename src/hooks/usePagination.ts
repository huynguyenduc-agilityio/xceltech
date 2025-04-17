import { useCallback, useState } from 'react';

// Constants
import { DEFAULT_CURRENT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants';

export const usePagination = (totalCount = 0) => {
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_CURRENT_PAGE);

  const isDisablePrev = currentPage <= 1;
  const pageCount = Math.ceil(totalCount / pageSize);
  const isDisableNext = !pageCount || currentPage === pageCount;

  const handleChangePage = useCallback(
    (value: number | 'prev' | 'next') => {
      setCurrentPage((prevPage) => {
        if (value === 'prev') return Math.max(prevPage - 1, 1);
        if (value === 'next') return Math.min(prevPage + 1, pageCount);
        return value;
      });
    },
    [pageCount],
  );
  const handleChangeLimit = useCallback(
    (limit: number) => {
      setPageSize(limit);
      setCurrentPage(DEFAULT_CURRENT_PAGE);
    },
    [setCurrentPage, setPageSize],
  );

  return {
    isDisableNext,
    isDisablePrev,
    currentPage,
    pageSize,
    handleChangeLimit,
    handleChangePage,
  };
};
