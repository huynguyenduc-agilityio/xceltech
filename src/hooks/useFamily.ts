import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Constants
import { familiesQueryKeys } from '@/constants';

// Types
import { MutationType } from '@/types';

// Services
import {
  addFamily,
  deleteFamily,
  editFamily,
  getListFamilies,
} from '@/services';

export const useGetFamilies = () => {
  const { data: families, isFetching: isFamiliesLoading } = useQuery({
    queryKey: familiesQueryKeys.list(),
    queryFn: getListFamilies,
  });

  return { families, isFamiliesLoading };
};

export const useFamilyMutation = ({ type }: { type: MutationType }) => {
  const queryClient = useQueryClient();

  const mutationFn = type === MutationType.Create ? addFamily : editFamily;

  const {
    mutateAsync: handleFamilyMutation,
    isPending: isFamilyMutationLoading,
  } = useMutation({
    mutationFn,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: familiesQueryKeys.list(),
      });

      if (response.id) {
        queryClient.setQueryData(
          familiesQueryKeys.detail(response.id),
          response,
        );
      }
    },
  });

  return { handleFamilyMutation, isFamilyMutationLoading };
};

export const useDeleteFamily = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: handleDeleteFamily, isPending: isDeleteLoading } =
    useMutation({
      mutationFn: (id: string) => deleteFamily(id),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: familiesQueryKeys.list(),
        }),
    });

  return { handleDeleteFamily, isDeleteLoading };
};
