import { QueryFunctionContext } from '@tanstack/react-query';

// Constants
import { END_POINTS, FileType, leavesQueryKeys, MESSAGES } from '@/constants';

// Types
import {
  ErrorType,
  LeaveHistoryResponse,
  LeaveRecallRequest,
  LeaveRequestForm,
  StatusLeave,
} from '@/types';

// Services
import { HttpClient } from '.';

export const getLeaveHistory = async ({
  queryKey: [key],
}: QueryFunctionContext<
  ReturnType<(typeof leavesQueryKeys)['list']>
>): Promise<LeaveHistoryResponse> => {
  const { page, limit, filters } = key;

  const response = await HttpClient.get(END_POINTS.LEAVES, {
    params: { page, limit, ...filters },
  });

  return response.data;
};

export const getLeave = async ({
  queryKey: [{ id }],
}: QueryFunctionContext<ReturnType<(typeof leavesQueryKeys)['detail']>>) =>
  (await HttpClient.get(`${END_POINTS.LEAVES}${id}/`)).data;

export const addLeave = async (data: Partial<LeaveRequestForm>) =>
  (
    await HttpClient.post(`${END_POINTS.LEAVES}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  ).data;

export const editLeave = async (data: Partial<LeaveRequestForm>) =>
  (
    await HttpClient.put(`${END_POINTS.LEAVES}${data.id}/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  ).data;

export const deleteLeaveHistory = async (id: string) =>
  await HttpClient.delete(`${END_POINTS.LEAVES}${id}/`);

export const updateLeaveRequest = async ({
  leaveId,
  status,
}: {
  leaveId: string;
  status: StatusLeave;
}) => {
  try {
    return await HttpClient.put(`${END_POINTS.LEAVES}${leaveId}/status/`, {
      status,
    });
  } catch (error) {
    throw new Error(
      (error as ErrorType).detail || MESSAGES.COMMON.LEAVE_REQUEST_FAILED,
    );
  }
};

export const updateLeaveRecallRequest = async ({
  leaveId,
  data,
}: {
  leaveId: string;
  data: Partial<LeaveRecallRequest>;
}) => {
  try {
    return await HttpClient.patch(
      `${END_POINTS.LEAVES}${leaveId}/recall/`,
      data,
    );
  } catch (error) {
    throw new Error(
      (error as ErrorType).detail || MESSAGES.COMMON.LEAVE_REQUEST_FAILED,
    );
  }
};

export const exportLeaveFile = async ({ type }: { type: FileType }) => {
  try {
    return await HttpClient.get(`${END_POINTS.LEAVES}download/${type}/`, {
      responseType: 'blob',
    });
  } catch (error) {
    throw new Error(
      (error as ErrorType).detail || MESSAGES.COMMON.EXPORT_FAILED,
    );
  }
};

export const updateLeaveRecall = async ({
  recallId,
  recallStatus,
  recallReason,
}: {
  recallId: string;
  recallStatus: StatusLeave;
  recallReason: string;
}) =>
  (
    await HttpClient.patch(`${END_POINTS.LEAVES}${recallId}/recall/`, {
      recallStatus,
      recallReason,
    })
  ).data;
