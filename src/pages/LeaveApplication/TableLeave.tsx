import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Constants
import { DEFAULT_CURRENT_PAGE, MESSAGES, USER_PAGE } from '@/constants';

// Types
import {
  FilterCriteria,
  LeaveFormEnum,
  LeaveHistoryResponse,
  LeaveType,
  StatusLeave,
  TDataSource,
  ToastStatus,
} from '@/types';

// Hooks
import {
  useConfirm,
  useDeleteUserLeave,
  useGetLeaves,
  usePagination,
  useToast,
} from '@/hooks';

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

const TableLeave = () => {
  const navigate = useNavigate();
  const confirm = useConfirm();
  const { toast } = useToast();
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
  const { handleDeleteUserLeave } = useDeleteUserLeave();

  const handleApplyFilters = (filters: FilterCriteria) => {
    setFilters(filters);
    handleChangePage(DEFAULT_CURRENT_PAGE);
  };

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await handleDeleteUserLeave(id);

        toast({
          status: ToastStatus.Success,
          title: MESSAGES.COMMON.DELETE_SUCCESS('Leave'),
        });
      } catch (error) {
        toast({
          status: ToastStatus.Error,
          title: MESSAGES.COMMON.DELETE_FAILED('Leave'),
        });
      }
    },
    [handleDeleteUserLeave, toast],
  );

  useEffect(() => {
    if (leaves) {
      setLeaveData(leaves);
    }
  }, [leaves]);

  const renderActionsDropdown = ({ id, status, type }: TDataSource) => {
    const isDisabled = status !== StatusLeave.Pending;
    const leaveType =
      type === LeaveType.Casual
        ? LeaveFormEnum.Compassionate
        : (type as string).toLowerCase();

    const onDelete = () =>
      confirm({
        title: `Delete leave`,
        confirmMessage: `Are you sure you want to delete this leave?`,
        onConfirm: () => handleDelete(id),
      });

    return (
      <ActionsDropdown
        items={[
          {
            key: 'edit',
            label: 'Edit',
            onClick: () => navigate(`${USER_PAGE.LEAVE}/${leaveType}/${id}`),
          },
          {
            key: 'delete',
            label: 'Delete',
            onClick: onDelete,
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
      title: 'Reason(s)',
      key: 'reason',
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
    <div className="mt-[97px]">
      <div className="flex justify-between px-5 py-6">
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
        dataSource={leaves?.results}
        isLoading={isLeavesLoading}
      />
      <Pagination
        currentPage={currentPage}
        limit={pageSize}
        totalRecords={leaves?.metaData.totalCount}
        isDisabledPrev={isDisablePrev}
        isDisabledNext={isDisableNext}
        onPageChange={handleChangePage}
        onChangeLimit={handleChangeLimit}
      />
    </div>
  );
};

export default TableLeave;
