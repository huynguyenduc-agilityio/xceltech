import { useQuery } from '@tanstack/react-query';

// Constants
import { accountsQueryKeys } from '@/constants';

// Types
import { IInfoUser } from '@/types';

// Services
import { getAccounts } from '@/services';

export const useGetLeaveAccounts = (userId: string) => {
  const { data: leaveAccounts, isFetching: isLeaveAccountsLoading } = useQuery({
    queryKey: [...accountsQueryKeys.list()] as const,
    queryFn: getAccounts,
    select: (data) =>
      data
        ?.filter(({ id }: { id: string }) => id !== userId)
        .map(({ id, firstName, lastName }: IInfoUser) => ({
          value: id,
          label: `${firstName} ${lastName}`,
        })),
  });

  return { leaveAccounts, isLeaveAccountsLoading };
};
