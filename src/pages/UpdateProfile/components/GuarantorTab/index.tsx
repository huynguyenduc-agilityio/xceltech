import { useState } from 'react';
import { PlusIcon } from 'lucide-react';

// Types
import { IEmployeeGuarantor } from '@/types';

// Mocks
import { dummyGuarantors } from '@/__mocks__';

// Components
import { Button, GuarantorForm, InfoCardWrapper } from '@/components';

type FormState = null | {
  mode: 'add' | 'edit';
  data?: IEmployeeGuarantor;
};

const GuarantorTab = () => {
  const [formState, setFormState] = useState<FormState>(null);

  const handleAdd = () => {
    setFormState({ mode: 'add' });
  };

  const handleEdit = (data: IEmployeeGuarantor) => {
    setFormState({ mode: 'edit', data });
  };

  const handleBack = () => setFormState(null);

  if (formState) {
    const { mode, data } = formState;
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
          / {mode === 'edit' ? 'Edit Guarantor' : 'View Guarantor Details'}
        </h2>
        <GuarantorForm
          initialValues={mode === 'edit' ? data : {}}
          onBack={handleBack}
        />
      </div>
    );
  }

  return (
    <div className="w-full px-8 py-16 grid gap-9">
      <h3 className="text-lg font-bold ml-4">Guarantor Details</h3>
      <div className="grid gap-3 mt-6">
        {dummyGuarantors.map((guarantor) => {
          const { id, name, job, phone } = guarantor;

          return (
            <InfoCardWrapper
              key={id}
              onEdit={() => handleEdit(guarantor)}
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
  );
};

export default GuarantorTab;
