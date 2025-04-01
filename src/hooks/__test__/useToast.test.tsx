import { renderHook, act } from '@testing-library/react';
import { useToast, toast } from '@/hooks/useToast';
import { ToastStatus } from '@/types';

describe('useToast hook', () => {
  it('should add a success toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({
        status: ToastStatus.Success,
        title: 'Success Toast',
      });
    });

    expect(result.current.toasts[0].title).toBe('Success Toast');
  });

  it('should add a error toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({
        status: ToastStatus.Error,
        title: 'Error Toast',
      });
    });

    expect(result.current.toasts[0].title).toBe('Error Toast');
  });
});
