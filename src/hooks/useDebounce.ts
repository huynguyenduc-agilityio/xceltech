import { useCallback, useRef } from 'react';

export const useDebounce = <TParam = unknown>(
  callback: (...args: TParam[]) => void,
  delay = 600,
) => {
  const refTime = useRef<NodeJS.Timeout | null>(null);

  const debouncedFn = useCallback(
    (...args: TParam[]) => {
      if (refTime.current) clearTimeout(refTime.current);
      refTime.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debouncedFn;
};
