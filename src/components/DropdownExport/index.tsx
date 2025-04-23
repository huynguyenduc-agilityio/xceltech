import { useCallback } from 'react';

// Icons
import { CircleDownIcon } from '@/icons';

import { Button } from '../common';
import ActionsDropdown from '../ActionsDropdown';

// Hooks
import { useExportLeaveFile, useToast } from '@/hooks';

// Types
import { ErrorType, ToastStatus } from '@/types';

// Constants
import { FileType, MESSAGES } from '@/constants';

const DropdownExport = () => {
  const { handleExportLeaveFile, isLoading } = useExportLeaveFile();
  const { toast } = useToast();

  const handleClickExportFile = useCallback(
    async (type: FileType) => {
      try {
        await handleExportLeaveFile({ type });

        toast({
          status: ToastStatus.Success,
          title: MESSAGES.COMMON.EXPORT_SUCCESS,
        });
      } catch (error) {
        toast({
          status: ToastStatus.Error,
          title: (error as ErrorType).detail || MESSAGES.COMMON.EXPORT_FAILED,
        });
      }
    },
    [handleExportLeaveFile, toast],
  );

  return (
    <ActionsDropdown
      items={[
        {
          key: 'pdf',
          label: 'PDF',
          onClick: () => handleClickExportFile(FileType.Pdf),
        },
        {
          key: 'csv',
          label: 'CSV',
          onClick: () => handleClickExportFile(FileType.Csv),
        },
        {
          key: 'excel',
          label: 'Excel',
          onClick: () => handleClickExportFile(FileType.Excel),
        },
      ]}
      itemClassName="bg-white text-black-default border-b border-b-gray-200 hover:bg-gray-100"
    >
      <Button
        className="w-[195px] h-14 bg-green-primary hover:bg-green-primary/90 shadow-md"
        isLoading={isLoading}
      >
        Export
        <CircleDownIcon className="ml-4" />
      </Button>
    </ActionsDropdown>
  );
};

export default DropdownExport;
