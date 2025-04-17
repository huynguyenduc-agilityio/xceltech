import { QueryFunctionContext } from '@tanstack/react-query';

// Constants
import { END_POINTS, notificationsQueryKeys } from '@/constants';

// Services
import { HttpClient } from '.';

// Types
import { Notification } from '@/types';

const getNotification = async (): Promise<Notification[]> => {
  return (await HttpClient.get(END_POINTS.NOTIFICATIONS)).data;
};

export { getNotification };

export const getDetailNotification = async ({
  queryKey: [{ id }],
}: QueryFunctionContext<
  ReturnType<(typeof notificationsQueryKeys)['detail']>
>) => (await HttpClient.get(`${END_POINTS.NOTIFICATIONS}${id}/`)).data;

export const updateNotification = async ({
  id,
  isRead,
}: {
  id: string;
  isRead: boolean;
}) =>
  (
    await HttpClient.patch(`${END_POINTS.NOTIFICATIONS}${id}/`, {
      isRead,
    })
  ).data;
