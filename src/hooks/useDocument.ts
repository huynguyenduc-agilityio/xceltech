import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Constants
import { documentsQueryKeys } from '@/constants';

// Services
import { getDocuments, uploadDocument } from '@/services';

export const useGetDocuments = () => {
  const { data: documents, isFetching: isDocumentsLoading } = useQuery({
    queryKey: documentsQueryKeys.list(),
    queryFn: getDocuments,
  });

  return { documents, isDocumentsLoading };
};

export const useUploadDocument = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: handleUploadDocument,
    isPending: isUploadDocumentLoading,
  } = useMutation({
    mutationFn: uploadDocument,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: documentsQueryKeys.list(),
      }),
  });

  return { handleUploadDocument, isUploadDocumentLoading };
};
