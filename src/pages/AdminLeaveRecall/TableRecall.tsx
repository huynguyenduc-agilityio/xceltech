import { useEffect, useState } from 'react';
import { EyeIcon } from 'lucide-react';

// Constants
import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL,
} from '@/constants';

// Components
import {
  Button,
  DialogContainer,
  Pagination,
  Status,
  Table,
} from '@/components';
import RecallForm from '@/components/Form/RecallForm';
import ReasonRecall from './ReasonRecall';

// Hooks
import { useGetLeaves, usePagination } from '@/hooks';

// Types
import { LeaveHistoryResponse, StatusLeave, TDataSource } from '@/types';

// Utils
import { cn } from '@/utils';

const TableRecall = () => {
  const [leaveData, setLeaveData] = useState<LeaveHistoryResponse>();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<TDataSource | null>(
    null,
  );

  const {
    currentPage,
    pageSize,
    handleChangeLimit,
    handleChangePage,
    isDisableNext,
    isDisablePrev,
  } = usePagination(leaveData?.metaData.totalCount);

  const { leaves, isLeavesLoading } = useGetLeaves({
    page: currentPage,
    limit: pageSize,
    filters: { isRecall: true },
  });

  useEffect(() => {
    if (leaves) {
      setLeaveData(leaves);
    }
  }, [leaves]);

  const handleOpenModal = (record: TDataSource) => {
    setSelectedRecord(record);
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setSelectedRecord(null);
  };

  const renderActionButton = (data: TDataSource) => {
    return (
      <Button
        title="Recall"
        className={cn(
          'w-[154px] h-14 shadow-md bg-red-primary rounded-md',
          data.recallReason && 'w-14 rounded-full bg-transparent',
        )}
        onClick={() => handleOpenModal(data)}
        disabled={Boolean(data.isRecalled) && !data.recallReason}
      >
        {data.recallReason ? (
          <EyeIcon className="text-red-primary" />
        ) : (
          'Recall'
        )}
      </Button>
    );
  };

  const renderColumns = [
    {
      title: 'Name(s)',
      key: 'employeeName',
    },
    {
      title: 'Duration(s)',
      key: 'durations',
    },
    {
      title: 'Start Date',
      key: 'startDate',
    },
    {
      title: 'End Date',
      key: 'endDate',
    },
    {
      title: 'Type',
      key: 'type',
    },
    {
      title: 'Status',
      key: 'status',
      renderBody: ({ status }: TDataSource) => (
        <div className="flex items-center justify-center">
          <Status type={status as StatusLeave} />
        </div>
      ),
    },
    {
      title: 'Recall Status',
      key: 'recallStatus',
      renderBody: ({ recallStatus }: TDataSource) => (
        <div className="flex items-center justify-center">
          <Status type={recallStatus as StatusLeave} />
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'action',
      renderBody: renderActionButton,
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-5">Ongoing Leave Applications</h2>

      <Table
        columns={renderColumns}
        dataSource={leaveData?.results}
        isLoading={isLeavesLoading}
      />

      <Pagination
        currentPage={currentPage || DEFAULT_CURRENT_PAGE}
        limit={pageSize || DEFAULT_PAGE_SIZE}
        totalRecords={leaveData?.metaData.totalCount || DEFAULT_TOTAL}
        onChangeLimit={handleChangeLimit}
        onPageChange={handleChangePage}
        isDisabledNext={isDisableNext}
        isDisabledPrev={isDisablePrev}
      />

      {selectedRecord && (
        <DialogContainer
          isOpen={isOpenModal}
          onClose={handleCloseModal}
          contentClassName="max-w-fit rounded-3xl"
        >
          {selectedRecord.recallReason ? (
            <ReasonRecall
              reason={String(selectedRecord.recallReason)}
              onClose={handleCloseModal}
            />
          ) : (
            <RecallForm
              initialValues={selectedRecord}
              onClose={handleCloseModal}
            />
          )}
        </DialogContainer>
      )}
    </div>
  );
};

export default TableRecall;
