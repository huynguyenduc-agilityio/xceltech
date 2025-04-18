import { useCallback } from 'react';

// Constants
import { MESSAGES } from '@/constants';

// Types
import { Documents, ToastStatus } from '@/types';

// Hooks
import { useDownloadDocuments, useToast } from '@/hooks';

// Icons
import { PdfIcon } from '@/icons';

// Components
import { Button } from '@/components';

interface ViewDocumentsProps {
  files?: Documents[];
  onBackJob: () => void;
}

const ViewDocument = ({ files = [], onBackJob }: ViewDocumentsProps) => {
  const { toast } = useToast();
  const { handleDownloadDocuments, isLoading } = useDownloadDocuments();

  const handleClickExportFile = useCallback(async () => {
    try {
      await handleDownloadDocuments();

      toast({
        status: ToastStatus.Success,
        title: MESSAGES.COMMON.DOWNLOAD_SUCCESS,
      });
    } catch (error) {
      toast({
        status: ToastStatus.Error,
        title: MESSAGES.COMMON.DOWNLOAD_FAILED,
      });
    }
  }, [handleDownloadDocuments, toast]);

  return (
    <>
      <h2 className="text-lg font-bold mb-[50px]">
        <span
          className="cursor-pointer hover:text-secondary"
          onClick={onBackJob}
        >
          Job Details
        </span>{' '}
        / View Documents
      </h2>
      {files?.length ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-5 text-black-default">
            {files.map((doc) => (
              <a
                key={doc.documentFile}
                href={doc.documentFile}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center w-full justify-center p-7 bg-blue-light rounded-lg hover:brightness-95 transition"
              >
                <PdfIcon />
                <p className="text-base text-center mt-5 truncate w-full overflow-hidden text-ellipsis whitespace-nowrap">
                  {doc.documentFile.split('/').pop()}
                </p>
              </a>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Button
              size="md"
              className="w-[347px] py-4 bg-green-primary hover:bg-green-primary/90 rounded-lg"
              isLoading={isLoading}
              onClick={handleClickExportFile}
            >
              Download ALL (Zip)
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <span className="text-lg">Not found documents</span>
        </div>
      )}
    </>
  );
};

export default ViewDocument;
