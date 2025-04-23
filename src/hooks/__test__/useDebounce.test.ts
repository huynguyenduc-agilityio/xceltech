import { renderHook } from '@testing-library/react';

// Hooks
import { useDebounce } from '../useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('Work', () => {
    const mockFn = jest.fn();
    const { result } = renderHook(() => useDebounce(mockFn));

    result.current();
    expect(mockFn).not.toHaveBeenCalled();

    result.current();
    jest.advanceTimersByTime(600);
    expect(mockFn).toHaveBeenCalled();
  });
});
