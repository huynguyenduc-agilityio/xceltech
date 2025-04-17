import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Constants
import { usersQueryKeys } from '@/constants';

// Services
import { editInfoUser, getInfoUser } from '@/services';

export const useGetInfoUser = () => {
  const { data: userInfo, isFetching: isUserInfoLoading } = useQuery({
    queryKey: [...usersQueryKeys.details()] as const,
    queryFn: getInfoUser,
  });

  return { userInfo, isUserInfoLoading };
};

export const useUpdateInfoUser = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: handleUpdateInfoUser, isPending: isUpdateInfoLoading } =
    useMutation({
      mutationFn: editInfoUser,
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: usersQueryKeys.details() });

        if (response.id) {
          queryClient.setQueryData(
            usersQueryKeys.detail(response.id),
            response,
          );
        }
      },
    });

  return { handleUpdateInfoUser, isUpdateInfoLoading };
};
