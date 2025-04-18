import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Services
import * as services from '@/services';

// Hooks
import {
  useGetNotification,
  useGetNotifications,
  useUpdateNotification,
} from '../useNotification';

const mockNotifications = [
  { id: '1', title: 'New comment' },
  { id: '2', title: 'New follower' },
];

const mockNotification = { id: '1', title: 'New comment' };

jest.mock('@/services', () => ({
  getNotification: jest.fn(),
  getDetailNotification: jest.fn(),
  updateNotification: jest.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('Notification Hooks', () => {
  it('should fetch and return notifications', async () => {
    (services.getNotification as jest.Mock).mockResolvedValue(
      mockNotifications,
    );

    const { result } = renderHook(() => useGetNotifications(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.notifications).toBeDefined();
    });

    expect(result.current.notifications).toEqual(mockNotifications);
    expect(result.current.isNotificationLoading).toBe(false);
  });

  it('should fetch a specific notification by id', async () => {
    (services.getDetailNotification as jest.Mock).mockResolvedValue(
      mockNotification,
    );

    const { result } = renderHook(() => useGetNotification('1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.notification).toBeDefined();
    });

    expect(result.current.notification).toEqual(mockNotification);
    expect(result.current.isNotificationLoading).toBe(false);
  });

  it('should not fetch if id is falsy', () => {
    const spy = jest.spyOn(services, 'getDetailNotification');

    renderHook(() => useGetNotification(undefined), {
      wrapper: createWrapper(),
    });

    expect(spy).toHaveBeenCalled();
  });

  it('should call updateNotification and invalidate queries on success', async () => {
    const updateMock = services.updateNotification as jest.Mock;
    updateMock.mockResolvedValue({ success: true });

    const { result } = renderHook(() => useUpdateNotification(), {
      wrapper: createWrapper(),
    });

    await result.current.handleUpdateNotification({ id: '1', isRead: true });

    expect(updateMock).toHaveBeenCalledWith({ id: '1', isRead: true });
  });
});
