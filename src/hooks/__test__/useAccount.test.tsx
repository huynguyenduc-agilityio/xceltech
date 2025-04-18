import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

//Services
import { getAccounts } from '@/services';

// Types
import { IInfoUser } from '@/types';

// Hooks
import { useGetLeaveAccounts } from '../useAccount';

const mockAccounts: IInfoUser[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    phone: '',
    email: '',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    phone: '',
    email: '',
  },
  {
    id: '3',
    firstName: 'Alex',
    lastName: 'Brown',
    phone: '',
    email: '',
  },
];

jest.mock('@/services', () => ({
  getAccounts: jest.fn(),
}));

describe('useGetLeaveAccounts', () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('should return filtered and mapped leave accounts', async () => {
    const userId = '2';
    (getAccounts as jest.Mock).mockResolvedValue(mockAccounts);

    const { result } = renderHook(() => useGetLeaveAccounts(userId), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.leaveAccounts).toBeDefined();
    });

    expect(result.current.leaveAccounts).toEqual([
      { value: '1', label: 'John Doe' },
      { value: '3', label: 'Alex Brown' },
    ]);
    expect(result.current.isLeaveAccountsLoading).toBe(false);
  });

  it('should return all accounts if userId is not in the list', async () => {
    const userId = '999';
    (getAccounts as jest.Mock).mockResolvedValue(mockAccounts);

    const { result } = renderHook(() => useGetLeaveAccounts(userId), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.leaveAccounts).toHaveLength(3);
    });
  });
});
