import { useQuery } from '@tanstack/react-query';

import { getListJobs } from '@/services';
import { jobsQueryKeys } from '@/constants';
import { IEmployeeJobInfo } from '@/types';

export const useGetJobs = () => {
  const { data: jobs, isFetching: isJobsLoading } = useQuery({
    queryKey: jobsQueryKeys.list(),
    queryFn: getListJobs,
    select: (data: IEmployeeJobInfo[]) =>
      data
        .filter((item) => !!item.name)
        .map(({ id, name }) => ({
          id,
          value: id,
          label: name ?? '',
        })),
  });

  return { jobs, isJobsLoading };
};
