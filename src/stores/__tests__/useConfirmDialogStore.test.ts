import { renderHook, act } from '@testing-library/react';

// Stores
import { useConfirmDialogStore } from '@/stores';

describe('useConfirmDialogStore', () => {
  it('should have default initial state', () => {
    const { result } = renderHook(() => useConfirmDialogStore());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.title).toBe('');
    expect(result.current.confirmMessage).toBe('');
    expect(result.current.onConfirm).toBeUndefined();
    expect(result.current.onCancel).toBeUndefined();
  });

  it('should update state correctly when confirm is called', () => {
    const onConfirmMock = jest.fn();
    const onCancelMock = jest.fn();

    const { result } = renderHook(() => useConfirmDialogStore());

    act(() => {
      result.current.confirm({
        title: 'Delete Item',
        confirmMessage: 'Are you sure you want to delete this?',
        onConfirm: onConfirmMock,
        onCancel: onCancelMock,
      });
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.title).toBe('Delete Item');
    expect(result.current.confirmMessage).toBe(
      'Are you sure you want to delete this?',
    );
    expect(result.current.onConfirm).toBe(onConfirmMock);
    expect(result.current.onCancel).toBe(onCancelMock);
  });

  it('should close the dialog correctly', () => {
    const { result } = renderHook(() => useConfirmDialogStore());

    act(() => {
      result.current.confirm({
        title: 'Test',
        confirmMessage: 'Confirm?',
      });
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);
  });
});
