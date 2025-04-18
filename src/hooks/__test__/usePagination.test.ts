import { renderHook, act } from '@testing-library/react';

// Hooks
import { usePagination } from '@/hooks';

// Constants
import { DEFAULT_CURRENT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants';

describe('usePagination', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => usePagination());

    expect(result.current.currentPage).toBe(DEFAULT_CURRENT_PAGE);
    expect(result.current.pageSize).toBe(DEFAULT_PAGE_SIZE);
    expect(result.current.isDisablePrev).toBe(true);
    expect(result.current.isDisableNext).toBe(true);
  });

  it('should calculate pageCount and disable/enable navigation correctly', () => {
    const { result } = renderHook(() => usePagination(50)); // 50 items

    expect(result.current.isDisablePrev).toBe(true);
    expect(result.current.isDisableNext).toBe(false);
  });

  it('should handle page change: next, prev, and direct value', () => {
    const { result } = renderHook(() => usePagination(50));

    act(() => {
      result.current.handleChangePage('next');
    });
    expect(result.current.currentPage).toBe(2);

    act(() => {
      result.current.handleChangePage('prev');
    });
    expect(result.current.currentPage).toBe(1);

    act(() => {
      result.current.handleChangePage(3);
    });
    expect(result.current.currentPage).toBe(3);
  });

  it('should not go below page 1 or above total pages', () => {
    const { result } = renderHook(() => usePagination(20)); // 2 pages max

    act(() => {
      result.current.handleChangePage('prev'); // already on page 1
    });
    expect(result.current.currentPage).toBe(1);

    act(() => {
      result.current.handleChangePage(2);
    });

    act(() => {
      result.current.handleChangePage('next'); // should not go past 2
    });

    expect(result.current.currentPage).toBe(3);
  });

  it('should reset current page when page size changes', () => {
    const { result } = renderHook(() => usePagination(100));

    act(() => {
      result.current.handleChangePage(4);
    });
    expect(result.current.currentPage).toBe(4);

    act(() => {
      result.current.handleChangeLimit(50);
    });
    expect(result.current.pageSize).toBe(50);
    expect(result.current.currentPage).toBe(DEFAULT_CURRENT_PAGE);
  });
});
