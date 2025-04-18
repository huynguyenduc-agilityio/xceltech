import { useCallback, useState } from 'react';
import { PlusIcon } from 'lucide-react';

// Constants
import { MESSAGES } from '@/constants';

// Types
import { IEmployeeGuarantor, MutationType, ToastStatus } from '@/types';

// Hooks
import {
  useConfirm,
  useDeleteGuarantor,
  useGetGuarantors,
  useToast,
} from '@/hooks';

// Components
import { Button, Fallback, GuarantorForm, InfoCardWrapper } from '@/components';

type FormState = null | {
  mode: MutationType;
  data?: IEmployeeGuarantor;
};

const GuarantorTab = () => {
  const { toast } = useToast();
  const confirm = useConfirm();
  const [formState, setFormState] = useState<FormState>(null);
  const { guarantors, isGuarantorsLoading } = useGetGuarantors();
  const { handleDeleteGuarantor, isDeleteLoading } = useDeleteGuarantor();

  const handleAdd = () => {
    setFormState({ mode: MutationType.Create });
  };

  const handleEdit = (data: IEmployeeGuarantor) => {
    setFormState({ mode: MutationType.Edit, data });
  };

  const handleDelete = useCallback(
    async (id?: string) => {
      try {
        await handleDeleteGuarantor(id!);

        toast({
          status: ToastStatus.Success,
          title: MESSAGES.COMMON.DELETE_SUCCESS('Guarantor'),
        });
      } catch (error) {
        toast({
          status: ToastStatus.Error,
          title: MESSAGES.COMMON.DELETE_FAILED('Guarantor'),
        });
      }
    },
    [handleDeleteGuarantor, toast],
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
            Guarantor Details
          </Button>{' '}
          / {isUpdate ? 'Edit Guarantor' : 'View Guarantor Details'}
        </h2>
        <GuarantorForm
          mode={mode}
          initialValues={isUpdate ? data : {}}
          onBack={handleBack}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full px-8 py-16">
      {(isGuarantorsLoading || isDeleteLoading) && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60">
          <Fallback />
        </div>
      )}

      <div className="grid gap-9">
        <h3 className="text-lg font-bold ml-4">Guarantor Details</h3>
        <div className="grid gap-3 mt-6">
          {guarantors?.map((guarantor) => {
            const { id, name, job, phone } = guarantor;

            const onDelete = () =>
              confirm({
                title: `Delete Guarantor`,
                confirmMessage: `Are you sure you want to delete this ${name}?`,
                onConfirm: () => handleDelete(id),
              });

            return (
              <InfoCardWrapper
                key={id}
                onEdit={() => handleEdit(guarantor)}
                onDelete={onDelete}
                titleContent={
                  <div className="grid gap-2">
                    <h4 className="font-bold text-lg">{name}</h4>
                    <p className="text-sm">
                      {job} - {phone}
                    </p>
                  </div>
                }
              />
            );
          })}
          <Button
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

export default GuarantorTab;
