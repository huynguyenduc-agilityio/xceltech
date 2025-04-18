import { QueryClient } from '@tanstack/react-query';
import axiosMockAdapter from 'axios-mock-adapter';

// Services
import {
  getLeaveHistory,
  getLeave,
  addLeave,
  editLeave,
  deleteLeaveHistory,
  updateLeaveRequest,
  updateLeaveRecallRequest,
  exportLeaveFile,
  updateLeaveRecall,
  HttpClient,
} from '@/services';

// Constants
import { END_POINTS, FileType, MESSAGES } from '@/constants';

// Types
import { StatusLeave } from '@/types';

describe('leaveService', () => {
  let mock: axiosMockAdapter;

  beforeEach(() => {
    mock = new axiosMockAdapter(HttpClient);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should get leave history successfully', async () => {
    const mockData = { results: [], count: 0 };
    mock.onGet(END_POINTS.LEAVES).reply(200, mockData);
    const signal = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };

    const result = await getLeaveHistory({
      signal: signal as unknown as AbortSignal,
      queryKey: [
        {
          page: 1,
          limit: 10,
          userId: '123',
          entity: 'list',
          scope: 'leaves',
        },
      ],
      client: {} as unknown as QueryClient,
      meta: {},
    });

    expect(result).toEqual(mockData);
  });

  it('should get leave detail by id', async () => {
    const mockLeave = { id: '123', name: 'Annual Leave' };
    mock.onGet(`${END_POINTS.LEAVES}123/`).reply(200, mockLeave);
    const signal = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };

    const result = await getLeave({
      signal: signal as unknown as AbortSignal,
      queryKey: [
        {
          id: '123',
          entity: 'detail',
          scope: 'leaves',
          userId: '123',
        },
      ],
      client: {} as unknown as QueryClient,
      meta: {},
    });

    expect(result).toEqual(mockLeave);
  });

  it('should add new leave', async () => {
    const mockLeave = { id: '321' };
    mock.onPost(END_POINTS.LEAVES).reply(201, mockLeave);

    const result = await addLeave({
      type: 'Annual Leave',
      startDate: '2023-05-01',
      endDate: '2023-05-31',
      reason: 'Vacation',
    });

    expect(result).toEqual(mockLeave);
  });

  it('should edit leave', async () => {
    const mockLeave = { id: '321', reason: 'Updated Leave' };
    mock.onPut(`${END_POINTS.LEAVES}321/`).reply(200, mockLeave);

    const result = await editLeave({ id: '321', reason: 'Updated Leave' });

    expect(result).toEqual(mockLeave);
  });

  it('should delete leave history', async () => {
    mock.onDelete(`${END_POINTS.LEAVES}123/`).reply(204);

    const result = await deleteLeaveHistory('123');

    expect(result.status).toBe(204);
  });

  it('should update leave request status', async () => {
    const mockResponse = { status: 'Approved' };
    mock.onPut(`${END_POINTS.LEAVES}456/status/`).reply(200, mockResponse);

    const result = await updateLeaveRequest({
      leaveId: '456',
      status: StatusLeave.Approved,
    });

    expect(result.data).toEqual(mockResponse);
  });

  it('should throw error when update leave request fails', async () => {
    mock
      .onPut(`${END_POINTS.LEAVES}456/status/`)
      .reply(400, { detail: MESSAGES.COMMON.LEAVE_REQUEST_FAILED });

    await expect(
      updateLeaveRequest({ leaveId: '456', status: StatusLeave.Rejected }),
    ).rejects.toThrow(MESSAGES.COMMON.LEAVE_REQUEST_FAILED);
  });

  it('should update leave recall request', async () => {
    const mockResponse = { isRecalled: true };
    mock.onPatch(`${END_POINTS.LEAVES}789/recall/`).reply(200, mockResponse);

    const result = await updateLeaveRecallRequest({
      leaveId: '789',
      data: { isRecalled: true },
    });

    expect(result.data).toEqual(mockResponse);
  });

  it('should throw error when update leave recall request fails', async () => {
    mock
      .onPatch(`${END_POINTS.LEAVES}789/recall/`)
      .reply(400, { detail: MESSAGES.COMMON.LEAVE_REQUEST_FAILED });

    await expect(
      updateLeaveRecallRequest({ leaveId: '789', data: { isRecalled: true } }),
    ).rejects.toThrow(MESSAGES.COMMON.LEAVE_REQUEST_FAILED);
  });

  it('should export leave file', async () => {
    const blob = new Blob(['test']);
    mock
      .onGet(`${END_POINTS.LEAVES}download/${FileType.Excel}/`)
      .reply(200, blob);

    const result = await exportLeaveFile({ type: FileType.Excel });

    expect(result.data).toEqual(blob);
  });

  it('should throw error when export leave file fails', async () => {
    mock
      .onGet(`${END_POINTS.LEAVES}download/${FileType.Excel}/`)
      .reply(400, { detail: MESSAGES.COMMON.EXPORT_FAILED });

    await expect(exportLeaveFile({ type: FileType.Excel })).rejects.toThrow(
      MESSAGES.COMMON.EXPORT_FAILED,
    );
  });

  it('should update leave recall', async () => {
    const mockResponse = { recallStatus: StatusLeave.Approved };
    mock
      .onPatch(`${END_POINTS.LEAVES}recall123/recall/`)
      .reply(200, mockResponse);

    const result = await updateLeaveRecall({
      recallId: 'recall123',
      recallStatus: StatusLeave.Approved,
      recallReason: 'Emergency',
    });

    expect(result).toEqual(mockResponse);
  });
});
