import { renderHook } from '@testing-library/react';

// Hooks
import { useConfirm } from '@/hooks';

// Stores
import { useConfirmDialogStore } from '@/stores';

jest.mock('@/stores', () => ({
  useConfirmDialogStore: jest.fn(),
}));

describe('useConfirm', () => {
  it('should return confirm function from store', () => {
    const mockConfirm = jest.fn();
    (useConfirmDialogStore as unknown as jest.Mock).mockImplementation(
      (selector) => selector({ confirm: mockConfirm }),
    );

    const { result } = renderHook(() => useConfirm());

    expect(result.current).toBe(mockConfirm);
  });
});
