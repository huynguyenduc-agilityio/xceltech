import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Constants
import { guarantorsQueryKeys } from '@/constants';

// Types
import { MutationType } from '@/types';

// Services
import {
  addGuarantor,
  deleteGuarantor,
  editGuarantor,
  getListGuarantors,
} from '@/services';

export const useGetGuarantors = () => {
  const { data: guarantors, isFetching: isGuarantorsLoading } = useQuery({
    queryKey: guarantorsQueryKeys.list(),
    queryFn: getListGuarantors,
  });

  return { guarantors, isGuarantorsLoading };
};

export const useGuarantorMutation = ({ type }: { type: MutationType }) => {
  const queryClient = useQueryClient();

  const mutationFn =
    type === MutationType.Create ? addGuarantor : editGuarantor;

  const {
    mutateAsync: handleGuarantorMutation,
    isPending: isGuarantorMutationLoading,
  } = useMutation({
    mutationFn,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: guarantorsQueryKeys.list(),
      });

      if (response.id) {
        queryClient.setQueryData(
          guarantorsQueryKeys.detail(response.id),
          response,
        );
      }
    },
  });

  return { handleGuarantorMutation, isGuarantorMutationLoading };
};

export const useDeleteGuarantor = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: handleDeleteGuarantor, isPending: isDeleteLoading } =
    useMutation({
      mutationFn: (id: string) => deleteGuarantor(id),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: guarantorsQueryKeys.list(),
        }),
    });

  return { handleDeleteGuarantor, isDeleteLoading };
};
