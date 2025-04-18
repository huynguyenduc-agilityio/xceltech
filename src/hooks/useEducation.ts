import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Constants
import { educationsQueryKeys } from '@/constants';

// Types
import { MutationType } from '@/types';

// Services
import {
  addEducation,
  deleteEducation,
  editEducation,
  getListEducations,
} from '@/services';

export const useGetEducations = () => {
  const { data: educations, isFetching: isEducationsLoading } = useQuery({
    queryKey: educationsQueryKeys.list(),
    queryFn: getListEducations,
  });

  return { educations, isEducationsLoading };
};

export const useEducationMutation = ({ type }: { type: MutationType }) => {
  const queryClient = useQueryClient();

  const mutationFn =
    type === MutationType.Create ? addEducation : editEducation;

  const {
    mutateAsync: handleEducationMutation,
    isPending: isEducationMutationLoading,
  } = useMutation({
    mutationFn,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: educationsQueryKeys.list(),
      });

      if (response.id) {
        queryClient.setQueryData(
          educationsQueryKeys.detail(response.id),
          response,
        );
      }
    },
  });

  return { handleEducationMutation, isEducationMutationLoading };
};

export const useDeleteEducation = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: handleDeleteEducation, isPending: isDeleteLoading } =
    useMutation({
      mutationFn: (id: string) => deleteEducation(id),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: educationsQueryKeys.list(),
        }),
    });

  return { handleDeleteEducation, isDeleteLoading };
};
