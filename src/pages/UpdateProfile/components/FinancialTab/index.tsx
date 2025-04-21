import { useCallback, useState } from 'react';
import { PlusIcon } from 'lucide-react';

// Constants
import { MESSAGES } from '@/constants';

// Types
import { IEmployeeFinancialInfo, MutationType, ToastStatus } from '@/types';

// Hooks
import {
  useConfirm,
  useDeleteFinancial,
  useGetFinancials,
  useToast,
} from '@/hooks';

// Components
import { Button, Fallback, FinancialForm, InfoCardWrapper } from '@/components';

type FormState = null | {
  mode: MutationType;
  data?: IEmployeeFinancialInfo;
};

const FinancialTab = () => {
  const { toast } = useToast();
  const confirm = useConfirm();
  const [formState, setFormState] = useState<FormState>(null);
  const { financials, isFinancialsLoading } = useGetFinancials();
  const { handleDeleteFinancial, isDeleteLoading } = useDeleteFinancial();

  const handleAdd = () => {
    setFormState({ mode: MutationType.Create });
  };

  const handleEdit = (data: IEmployeeFinancialInfo) => {
    setFormState({ mode: MutationType.Edit, data });
  };

  const handleDelete = useCallback(
    async (id?: string) => {
      try {
        await handleDeleteFinancial(id!);

        toast({
          status: ToastStatus.Success,
          title: MESSAGES.COMMON.DELETE_SUCCESS('Financial'),
        });
      } catch (error) {
        toast({
          status: ToastStatus.Error,
          title: MESSAGES.COMMON.DELETE_FAILED('Financial'),
        });
      }
    },
    [handleDeleteFinancial, toast],
  );

  const handleBack = () => setFormState(null);

  if (formState) {
    const { mode, data } = formState;
    const isUpdate = mode === MutationType.Edit;

    return (
      <div className="w-full px-8 py-16">
        <h2 className="text-lg font-bold mb-6">
          <Button
            variant="ghost"
            size="fit"
            className="cursor-pointer hover:text-secondary"
            onClick={handleBack}
          >
            Financial Details
          </Button>{' '}
          / {isUpdate ? 'Edit Financial' : 'View Financial Details'}
        </h2>
        <FinancialForm
          mode={mode}
          initialValues={isUpdate ? data : {}}
          onBack={handleBack}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full px-8 py-16">
      {(isFinancialsLoading || isDeleteLoading) && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60">
          <Fallback />
        </div>
      )}

      <div className="grid gap-9">
        <h3 className="text-lg font-bold ml-4">Financial Details</h3>
        <div className="grid gap-3 mt-6">
          {financials?.map((data) => {
            const { id, accountName, accountNo, bankName } = data;

            const onDelete = () =>
              confirm({
                title: `Delete Financial`,
                confirmMessage: `Are you sure you want to delete this ${bankName}?`,
                onConfirm: () => handleDelete(id),
              });

            return (
              <InfoCardWrapper
                key={id}
                onEdit={() => handleEdit(data)}
                onDelete={onDelete}
                titleContent={
                  <div className="space-y-2">
                    <p className="text-xl font-bold">
                      {accountNo} | {accountName}
                    </p>
                    <span data-testid="bank-info" className="text-xl">
                      <span className="font-bold">{bankName}</span> | Savings
                      Account
                    </span>
                  </div>
                }
              />
            );
          })}
          <Button
            title="add-financial-button"
            className="w-full h-[50px] bg-black-default/25 hover:opacity-60 transition-opacity"
            onClick={handleAdd}
          >
            <PlusIcon width={26} height={26} className="text-black-muted" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FinancialTab;
