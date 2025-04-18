import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Constants
import { documentsQueryKeys, MESSAGES } from '@/constants';

// Types
import { MutationType } from '@/types';

// Services
import {
  downloadAllDocuments,
  getDocuments,
  addDocument,
  editDocument,
} from '@/services';

// Utils
import { downloadBlobFile } from '@/utils';

export const useGetDocuments = () => {
  const { data: documents, isFetching: isDocumentsLoading } = useQuery({
    queryKey: documentsQueryKeys.list(),
    queryFn: getDocuments,
  });

  return { documents, isDocumentsLoading };
};

export const useDocumentMutation = ({ type }: { type: MutationType }) => {
  const queryClient = useQueryClient();

  const mutationFn = type === MutationType.Create ? addDocument : editDocument;

  const {
    mutateAsync: handleDocumentMutation,
    isPending: isDocumentMutationLoading,
  } = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: documentsQueryKeys.list(),
      });
    },
  });

  return { handleDocumentMutation, isDocumentMutationLoading };
};

export const useDownloadDocuments = () => {
  const { isPending: isLoading, mutateAsync: handleDownloadDocuments } =
    useMutation({
      mutationFn: downloadAllDocuments,
      onSuccess: (data) => {
        if (!data) {
          throw new Error(MESSAGES.COMMON.DOWNLOAD_FAILED);
        }

        downloadBlobFile(data, 'documents.zip');
      },
    });

  return { isLoading, handleDownloadDocuments };
};
