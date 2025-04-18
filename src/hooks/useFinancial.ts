import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Constants
import { financialsQueryKeys } from '@/constants';

// Types
import { MutationType } from '@/types';

// Services
import {
  addFinancial,
  deleteFinancial,
  editFinancial,
  getListFinancials,
} from '@/services';

export const useGetFinancials = () => {
  const { data: financials, isFetching: isFinancialsLoading } = useQuery({
    queryKey: financialsQueryKeys.list(),
    queryFn: getListFinancials,
  });

  return { financials, isFinancialsLoading };
};

export const useFinancialMutation = ({ type }: { type: MutationType }) => {
  const queryClient = useQueryClient();

  const mutationFn =
    type === MutationType.Create ? addFinancial : editFinancial;

  const {
    mutateAsync: handleFinancialMutation,
    isPending: isFinancialMutationLoading,
  } = useMutation({
    mutationFn,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: financialsQueryKeys.list(),
      });

      if (response.id) {
        queryClient.setQueryData(
          financialsQueryKeys.detail(response.id),
          response,
        );
      }
    },
  });

  return { handleFinancialMutation, isFinancialMutationLoading };
};

export const useDeleteFinancial = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: handleDeleteFinancial, isPending: isDeleteLoading } =
    useMutation({
      mutationFn: (id: string) => deleteFinancial(id),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: financialsQueryKeys.list(),
        }),
    });

  return { handleDeleteFinancial, isDeleteLoading };
};
