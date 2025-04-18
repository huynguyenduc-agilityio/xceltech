import axiosMockAdapter from 'axios-mock-adapter';
import { QueryClient } from '@tanstack/react-query';

// Services
import {
  getDetailNotification,
  getNotification,
  HttpClient,
  updateNotification,
} from '@/services';

// Constants
import { END_POINTS } from '@/constants';

describe('notificationService', () => {
  let mock: axiosMockAdapter;

  beforeEach(() => {
    mock = new axiosMockAdapter(HttpClient);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should get notifications successfully', async () => {
    const mockResponse = [{ id: 1, message: 'New notification' }];

    mock.onGet(END_POINTS.NOTIFICATIONS).reply(200, mockResponse);

    const result = await getNotification();

    expect(result).toEqual(mockResponse);
  });

  it('should get notification details successfully', async () => {
    const mockResponse = { id: 1, message: 'Detailed notification' };
    const notificationId = '1';
    const signal = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };

    mock
      .onGet(`${END_POINTS.NOTIFICATIONS}${notificationId}/`)
      .reply(200, mockResponse);

    const result = await getDetailNotification({
      queryKey: [
        {
          id: notificationId,
          entity: 'detail',
          scope: 'notifications',
        },
      ],
      signal: signal as unknown as AbortSignal,
      meta: {},
      client: {} as unknown as QueryClient,
    });

    expect(result).toEqual(mockResponse);
  });

  it('should update notification successfully', async () => {
    const mockResponse = { id: '1', isRead: true };
    const notificationId = '1';
    const isRead = true;

    mock
      .onPatch(`${END_POINTS.NOTIFICATIONS}${notificationId}/`, { isRead })
      .reply(200, mockResponse);

    const result = await updateNotification({ id: notificationId, isRead });

    expect(result).toEqual(mockResponse);
  });

  it('should handle error when getting notifications', async () => {
    mock
      .onGet(END_POINTS.NOTIFICATIONS)
      .reply(500, { message: 'Internal Server Error' });

    await expect(getNotification()).rejects.toThrow(
      'Request failed with status code 500',
    );
  });

  it('should handle error when getting notification details', async () => {
    const notificationId = '1';

    mock
      .onGet(`${END_POINTS.NOTIFICATIONS}${notificationId}/`)
      .reply(500, { message: 'Internal Server Error' });

    const signal = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };

    await expect(
      getDetailNotification({
        queryKey: [
          {
            id: notificationId,
            entity: 'detail',
            scope: 'notifications',
          },
        ],
        signal: signal as unknown as AbortSignal,
        meta: {},
        client: {} as unknown as QueryClient,
      }),
    ).rejects.toThrow('Request failed with status code 500');
  });

  it('should handle error when updating notification', async () => {
    const notificationId = '1';
    const isRead = true;

    mock
      .onPatch(`${END_POINTS.NOTIFICATIONS}${notificationId}/`, { isRead })
      .reply(500, { message: 'Internal Server Error' });

    await expect(
      updateNotification({ id: notificationId, isRead }),
    ).rejects.toThrow('Request failed with status code 500');
  });
});
