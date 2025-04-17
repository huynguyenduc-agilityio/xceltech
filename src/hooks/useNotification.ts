import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Constants
import { notificationsQueryKeys } from '@/constants';

// Services
import {
  getDetailNotification,
  getNotification,
  updateNotification,
} from '@/services';

export const useGetNotifications = () => {
  const { data: notifications, isFetching: isNotificationLoading } = useQuery({
    queryKey: [...notificationsQueryKeys.lists()],
    queryFn: getNotification,
    refetchOnWindowFocus: true,
  });

  return { notifications, isNotificationLoading };
};

export const useGetNotification = (id?: string) => {
  const { data: notification, isFetching: isNotificationLoading } = useQuery({
    queryKey: [...notificationsQueryKeys.detail(id)] as const,
    queryFn: getDetailNotification,
    enabled: !!id,
  });

  return { notification, isNotificationLoading };
};

export const useUpdateNotification = () => {
  const queryClient = useQueryClient();

  const { isPending: isLoading, mutateAsync: handleUpdateNotification } =
    useMutation({
      mutationFn: updateNotification,
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: notificationsQueryKeys.list(),
        }),
    });

  return { isLoading, handleUpdateNotification };
};
