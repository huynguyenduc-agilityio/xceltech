import { useCallback, useState } from 'react';
import { PlusIcon } from 'lucide-react';

// Constants
import { MESSAGES } from '@/constants';

// Types
import { IEmployeeFamilyInfo, MutationType, ToastStatus } from '@/types';

// Hooks
import { useConfirm, useDeleteFamily, useGetFamilies, useToast } from '@/hooks';

// Components
import { Button, Fallback, FamilyForm, InfoCardWrapper } from '@/components';

type FormState = null | {
  mode: MutationType;
  data?: IEmployeeFamilyInfo;
};

const FamilyTab = () => {
  const { toast } = useToast();
  const confirm = useConfirm();
  const [formState, setFormState] = useState<FormState>(null);
  const { families, isFamiliesLoading } = useGetFamilies();
  const { handleDeleteFamily, isDeleteLoading } = useDeleteFamily();

  const handleAdd = () => {
    setFormState({ mode: MutationType.Create });
  };

  const handleEdit = (data: IEmployeeFamilyInfo) => {
    setFormState({ mode: MutationType.Edit, data });
  };

  const handleDelete = useCallback(
    async (id?: string) => {
      try {
        await handleDeleteFamily(id!);

        toast({
          status: ToastStatus.Success,
          title: MESSAGES.COMMON.DELETE_SUCCESS('Family'),
        });
      } catch (error) {
        toast({
          status: ToastStatus.Error,
          title: MESSAGES.COMMON.DELETE_FAILED('Family'),
        });
      }
    },
    [handleDeleteFamily, toast],
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
            Family Details
          </Button>{' '}
          / {isUpdate ? 'Edit Family' : 'View Family Details'}
        </h2>
        <FamilyForm
          mode={mode}
          initialValues={isUpdate ? data : {}}
          onBack={handleBack}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[820px] overflow-auto px-8 py-16">
      {(isFamiliesLoading || isDeleteLoading) && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60">
          <Fallback />
        </div>
      )}

      <div className="grid gap-9">
        <h3 className="text-lg font-bold ml-4">Family Details</h3>
        <div className="grid gap-3 mt-6">
          {families?.map((data) => {
            const { id, fullName, address, relationship, phone } = data;

            const onDelete = () =>
              confirm({
                title: `Delete Family`,
                confirmMessage: `Are you sure you want to delete this ${fullName}?`,
                onConfirm: () => handleDelete(id),
              });

            return (
              <InfoCardWrapper
                key={id}
                onEdit={() => handleEdit(data)}
                onDelete={onDelete}
                titleContent={
                  <div className="grid gap-2">
                    <h4 className="font-bold text-lg">{fullName}</h4>
                    <p className="text-sm">
                      {relationship ? `Relationship: ${relationship}` : ''} |{' '}
                      {phone ? `Phone No: ${phone}` : ''}
                    </p>
                  </div>
                }
                description={
                  <p className="text-sm">
                    {address ? `Address: ${address}` : ''}
                  </p>
                }
              />
            );
          })}
          <Button
            title="add-family-button"
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

export default FamilyTab;
