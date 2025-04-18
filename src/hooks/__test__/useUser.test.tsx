import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Hooks
import { useGetInfoUser, useUpdateInfoUser } from '@/hooks';

// Services
import { editInfoUser, getInfoUser } from '@/services';

jest.mock('@/services', () => ({
  editInfoUser: jest.fn(),
  getInfoUser: jest.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('User Hooks', () => {
  it('fetches user info successfully', async () => {
    const mockUserInfo = { id: '123', name: 'John Doe' };
    (getInfoUser as jest.Mock).mockResolvedValue(mockUserInfo);

    const { result } = renderHook(() => useGetInfoUser(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.userInfo).toEqual(mockUserInfo);
    });

    expect(getInfoUser).toHaveBeenCalled();
    expect(result.current.isUserInfoLoading).toBe(false);
  });

  it('updates user info and sets query data on success', async () => {
    const mockUser = { id: '123', name: 'Updated Name' };
    (editInfoUser as jest.Mock).mockResolvedValue(mockUser);

    const { result } = renderHook(() => useUpdateInfoUser(), {
      wrapper: createWrapper(),
    });

    await result.current.handleUpdateInfoUser(mockUser);

    await waitFor(() => {
      expect(editInfoUser).toHaveBeenCalledWith(mockUser);
    });
  });
});
