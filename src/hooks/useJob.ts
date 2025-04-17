import { useQuery } from '@tanstack/react-query';

import { getListJobs } from '@/services';
import { jobsQueryKeys } from '@/constants';
import { IEmployeeJobInfo } from '@/types';

export const useGetJobs = () => {
  const { data: jobs, isFetching: isJobsLoading } = useQuery({
    queryKey: jobsQueryKeys.list(),
    queryFn: getListJobs,
    select: (data) =>
      data.map(({ id, name }: IEmployeeJobInfo & { id: string }) => ({
        id: id,
        value: name,
        label: name,
      })),
  });

  return { jobs, isJobsLoading };
};
