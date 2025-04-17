import { useEffect, useState } from 'react';

// Constants
import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL,
  MESSAGES,
} from '@/constants';

// Types
import {
  FilterCriteria,
  LeaveHistoryResponse,
  LeaveType,
  StatusLeave,
  TDataSource,
  ToastStatus,
} from '@/types';

// Icons
import { CircleDownIcon } from '@/icons';

// Components
import {
  ActionsDropdown,
  Button,
  DropdownExport,
  FilterMenu,
  Pagination,
  Status,
  Table,
} from '@/components';

// Hooks
import {
  toast,
  useGetLeaves,
  usePagination,
  useUpdateStatusLeaveRequest,
} from '@/hooks';

const TableHistory = () => {
  const [filters, setFilters] = useState<FilterCriteria>();
  const [leaveData, setLeaveData] = useState<LeaveHistoryResponse>();

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
    filters: { ...filters },
  });

  const { handleUpdateStatus } = useUpdateStatusLeaveRequest({
    page: currentPage,
    limit: pageSize,
    filters: { ...filters },
  });

  const handleApplyFilters = (filters: FilterCriteria) => {
    setFilters(filters);
    handleChangePage(DEFAULT_CURRENT_PAGE);
  };

  const handleActionsLeave = async (leaveId: string, status: StatusLeave) => {
    try {
      await handleUpdateStatus({ leaveId, status });

      toast({
        status: ToastStatus.Success,
        title: MESSAGES.COMMON.LEAVE_REQUEST_SUCCESS,
      });
    } catch (error) {
      toast({
        status: ToastStatus.Error,
        title: MESSAGES.COMMON.LEAVE_REQUEST_FAILED,
      });
    }
  };

  useEffect(() => {
    if (leaves) {
      setLeaveData(leaves);
    }
  }, [leaves]);

  const renderActionsDropdown = ({ id, status }: TDataSource) => {
    const isDisabled = status !== StatusLeave.Pending;

    return (
      <ActionsDropdown
        items={[
          {
            label: 'Approved',
            onClick: () => handleActionsLeave(id, StatusLeave.Approved),
          },
          {
            label: 'Rejected',
            onClick: () => handleActionsLeave(id, StatusLeave.Rejected),
          },
        ]}
      >
        <Button disabled={isDisabled} className="w-[195px] h-14 shadow-md">
          Action
          <CircleDownIcon className="ml-4" />
        </Button>
      </ActionsDropdown>
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
      title: 'Actions',
      key: 'action',
      renderBody: renderActionsDropdown,
    },
  ];
  return (
    <div>
      <div className="flex justify-between px-5 pt-0 py-6">
        <h2 className="text-xl font-bold">Leave History</h2>
        <div className="flex items-center gap-14">
          <FilterMenu
            options={{ type: Object.values(LeaveType) }}
            onApply={handleApplyFilters}
          />
          <DropdownExport />
        </div>
      </div>

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
    </div>
  );
};

export default TableHistory;
