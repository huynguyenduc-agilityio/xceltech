import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Constants
import { FileType, leavesQueryKeys } from '@/constants';

// Types
import { MutationType, TQueryKey } from '@/types';

// Services
import {
  addLeave,
  deleteLeaveHistory,
  updateLeaveRecall,
  editLeave,
  exportLeaveFile,
  getLeave,
  getLeaveHistory,
  updateLeaveRequest,
  updateLeaveRecallRequest,
} from '@/services';

interface UseLeaveMutationProps {
  type: MutationType;
}

export const useGetLeaves = ({ page, limit, filters }: TQueryKey) => {
  const { data: leaves, isFetching: isLeavesLoading } = useQuery({
    queryKey: leavesQueryKeys.list({ page, limit, filters }),
    queryFn: getLeaveHistory,
  });

  return { leaves, isLeavesLoading };
};

export const useGetLeave = (id?: string) => {
  const { data: leave, isFetching: isLeaveLoading } = useQuery({
    queryKey: [...leavesQueryKeys.detail(id)] as const,
    queryFn: getLeave,
    enabled: !!id,
  });

  return { leave, isLeaveLoading };
};

export const useLeaveMutation = ({ type }: UseLeaveMutationProps) => {
  const queryClient = useQueryClient();

  const mutationFn = type === MutationType.Create ? addLeave : editLeave;

  const {
    mutateAsync: handleLeaveMutation,
    isPending: isLeaveMutationLoading,
  } = useMutation({
    mutationFn,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: leavesQueryKeys.lists(),
      });

      if (response.id) {
        queryClient.setQueryData(leavesQueryKeys.detail(response.id), response);
      }
    },
  });

  return { handleLeaveMutation, isLeaveMutationLoading };
};

export const useDeleteUserLeave = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: handleDeleteUserLeave, isPending: isDeleteUserLoading } =
    useMutation({
      mutationFn: (id: string) => deleteLeaveHistory(id),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: leavesQueryKeys.lists(),
        }),
    });

  return { handleDeleteUserLeave, isDeleteUserLoading };
};

export const useUpdateStatusLeaveRequest = ({
  page,
  limit,
  filters,
}: TQueryKey) => {
  const queryClient = useQueryClient();
  const { isPending: isLoading, mutateAsync: handleUpdateStatus } = useMutation(
    {
      mutationFn: updateLeaveRequest,
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: leavesQueryKeys.list({ page, limit, filters }),
        }),
    },
  );

  return { isLoading, handleUpdateStatus };
};

export const useUpdateStatusRecall = () => {
  const { isPending: isUpdateLoading, mutateAsync: handleUpdateStatusRecall } =
    useMutation({
      mutationFn: updateLeaveRecall,
    });

  return { isUpdateLoading, handleUpdateStatusRecall };
};

export const useUpdateLeaveRecallRequest = () => {
  const queryClient = useQueryClient();
  const { isPending: isLoading, mutateAsync: handleUpdateRecallRequest } =
    useMutation({
      mutationFn: updateLeaveRecallRequest,
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: leavesQueryKeys.lists() }),
    });

  return { isLoading, handleUpdateRecallRequest };
};

export const useExportLeaveFile = () => {
  const { isPending: isLoading, mutateAsync: handleExportLeaveFile } =
    useMutation({
      mutationFn: exportLeaveFile,
      onSuccess: (res) => {
        const fileType = res.headers['content-type'].split('/')[1];
        const fileName = `leave-applications-${Date.now()}.${[FileType.Csv, FileType.Pdf].includes(fileType) ? fileType : 'xlsx'}`;
        const fileURL = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');

        link.href = fileURL;
        link.setAttribute('download', `${fileName}`);
        document.body.appendChild(link);
        link.click();

        link.onload = () => {
          URL.revokeObjectURL(fileURL);
          document.body.removeChild(link);
        };
      },
    });

  return { isLoading, handleExportLeaveFile };
};
