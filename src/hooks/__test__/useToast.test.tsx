import { act, renderHook } from '@testing-library/react';

// Constants
import { TOAST_REMOVE_DELAY } from '@/constants';

// Hooks
import { toast, useToast } from '../useToast';

// Types
import { ToastStatus } from '@/types';

jest.useFakeTimers();

describe('toast system', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('adds a toast and exposes it in useToast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: 'Test Toast', status: ToastStatus.Success });
    });

    expect(result.current.toasts.length).toBe(1);
    expect(result.current.toasts[0].title).toBe('Test Toast');
  });

  it('updates a toast correctly', () => {
    const { result } = renderHook(() => useToast());

    let toastRef: ReturnType<typeof toast>;

    act(() => {
      toastRef = toast({ title: 'Initial', status: ToastStatus.Success });
    });

    act(() => {
      toastRef.update({
        title: 'Updated Title',
        status: ToastStatus.Error,
        id: toastRef.id,
      });
    });

    expect(result.current.toasts[0].title).toBe('Updated Title');
    expect(result.current.toasts[0].status).toBe(ToastStatus.Error);
  });

  it('dismisses a toast and removes it after delay', () => {
    const { result } = renderHook(() => useToast());

    let toastRef: ReturnType<typeof toast>;

    act(() => {
      toastRef = toast({ title: 'Dismiss me', status: ToastStatus.Error });
    });

    expect(result.current.toasts.length).toBe(3);

    act(() => {
      toastRef.dismiss();
    });

    act(() => {
      jest.advanceTimersByTime(TOAST_REMOVE_DELAY);
    });

    expect(result.current.toasts.length).toBe(2);
  });

  it('dismiss method on useToast removes specific toast', () => {
    const { result } = renderHook(() => useToast());

    const toastRef = toast({ title: 'One', status: ToastStatus.Success });

    act(() => {
      result.current.dismiss(toastRef.id);
      jest.advanceTimersByTime(TOAST_REMOVE_DELAY);
    });

    expect(result.current.toasts).toHaveLength(2);
  });

  it('respects TOAST_LIMIT by slicing extra toasts', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      for (let i = 0; i < 10; i++) {
        toast({ title: `Toast ${i}`, status: ToastStatus.Error });
      }
    });

    expect(result.current.toasts.length).toBeLessThanOrEqual(5);
  });
});
