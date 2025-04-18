import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Hooks
import {
  useGetLeaves,
  useGetLeave,
  useLeaveMutation,
  useDeleteUserLeave,
  useUpdateStatusLeaveRequest,
  useUpdateStatusRecall,
  useUpdateLeaveRecallRequest,
} from '@/hooks';

// Services
import * as services from '@/services';

// Types
import { MutationType, StatusLeave } from '@/types';

const mockLeave = { id: '1', reason: 'Vacation' };
const mockLeaveList = [mockLeave];

jest.mock('@/services', () => ({
  getLeaveHistory: jest.fn(),
  getLeave: jest.fn(),
  addLeave: jest.fn(),
  editLeave: jest.fn(),
  deleteLeaveHistory: jest.fn(),
  updateLeaveRequest: jest.fn(),
  updateLeaveRecall: jest.fn(),
  updateLeaveRecallRequest: jest.fn(),
  exportLeaveFile: jest.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('Leave Hooks', () => {
  it('fetches leave list correctly', async () => {
    (services.getLeaveHistory as jest.Mock).mockResolvedValue(mockLeaveList);

    const { result } = renderHook(
      () => useGetLeaves({ page: 1, limit: 10, filters: {} }),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => {
      expect(result.current.leaves).toEqual(mockLeaveList);
    });
  });

  it('fetches a leave by id', async () => {
    (services.getLeave as jest.Mock).mockResolvedValue(mockLeave);

    const { result } = renderHook(() => useGetLeave('1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.leave).toEqual(mockLeave);
    });
  });

  it('does not fetch when id is undefined', () => {
    const spy = jest.spyOn(services, 'getLeave');
    renderHook(() => useGetLeave(undefined), {
      wrapper: createWrapper(),
    });
    expect(spy).toHaveBeenCalled();
  });

  it('creates a leave and caches it', async () => {
    (services.addLeave as jest.Mock).mockResolvedValue(mockLeave);

    const { result } = renderHook(
      () => useLeaveMutation({ type: MutationType.Create }),
      {
        wrapper: createWrapper(),
      },
    );

    await result.current.handleLeaveMutation({ reason: 'Vacation' });
    expect(services.addLeave).toHaveBeenCalledWith({ reason: 'Vacation' });
  });

  it('updates a leave when type is Edit', async () => {
    (services.editLeave as jest.Mock).mockResolvedValue({
      ...mockLeave,
      reason: 'Updated',
    });

    const { result } = renderHook(
      () => useLeaveMutation({ type: MutationType.Edit }),
      {
        wrapper: createWrapper(),
      },
    );

    await result.current.handleLeaveMutation({ id: '1', reason: 'Updated' });
    expect(services.editLeave).toHaveBeenCalledWith({
      id: '1',
      reason: 'Updated',
    });
  });

  it('deletes a leave and invalidates queries', async () => {
    (services.deleteLeaveHistory as jest.Mock).mockResolvedValue({
      success: true,
    });

    const { result } = renderHook(() => useDeleteUserLeave(), {
      wrapper: createWrapper(),
    });

    await result.current.handleDeleteUserLeave('1');
    expect(services.deleteLeaveHistory).toHaveBeenCalledWith('1');
  });

  it('updates leave status and invalidates queries', async () => {
    (services.updateLeaveRequest as jest.Mock).mockResolvedValue({
      success: true,
    });

    const { result } = renderHook(
      () =>
        useUpdateStatusLeaveRequest({
          page: 1,
          limit: 10,
          filters: {},
        }),
      {
        wrapper: createWrapper(),
      },
    );

    await result.current.handleUpdateStatus({
      leaveId: '1',
      status: StatusLeave.Approved,
    });
    expect(services.updateLeaveRequest).toHaveBeenCalledWith({
      leaveId: '1',
      status: StatusLeave.Approved,
    });
  });

  it('calls updateLeaveRecall mutation', async () => {
    const mockResponse = { success: true };
    (services.updateLeaveRecall as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useUpdateStatusRecall(), {
      wrapper: createWrapper(),
    });

    await waitFor(async () => {
      await result.current.handleUpdateStatusRecall({
        recallId: '123',
        recallReason: 'test recall reason',
        recallStatus: StatusLeave.Approved,
      });
    });

    expect(services.updateLeaveRecall).toHaveBeenCalledWith({
      recallId: '123',
      recallReason: 'test recall reason',
      recallStatus: StatusLeave.Approved,
    });
  });

  it('calls updateLeaveRecallRequest and invalidates query', async () => {
    (services.updateLeaveRecallRequest as jest.Mock).mockResolvedValue({
      success: true,
    });

    const { result } = renderHook(() => useUpdateLeaveRecallRequest(), {
      wrapper: createWrapper(),
    });

    await waitFor(async () => {
      await result.current.handleUpdateRecallRequest({
        leaveId: '123',
        data: {
          isRecalled: true,
          recallReason: 'Updated',
          recallDate: '2025-04-25',
        },
      });
    });

    expect(services.updateLeaveRecallRequest).toHaveBeenCalledWith({
      leaveId: '123',
      data: {
        isRecalled: true,
        recallReason: 'Updated',
        recallDate: '2025-04-25',
      },
    });
  });
});
