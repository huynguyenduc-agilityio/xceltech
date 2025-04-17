import { useState } from 'react';
import { PlusIcon } from 'lucide-react';

// Types
import { IEmployeeFamilyInfo } from '@/types';

// Mocks
import { dummyFamily } from '@/__mocks__';

// Components
import { Button, FamilyForm, InfoCardWrapper } from '@/components';

type FormState = null | {
  mode: 'add' | 'edit';
  data?: IEmployeeFamilyInfo;
};

const FamilyTab = () => {
  const [formState, setFormState] = useState<FormState>(null);

  const handleAdd = () => {
    setFormState({ mode: 'add' });
  };

  const handleEdit = (data: IEmployeeFamilyInfo) => {
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
            Family Details
          </Button>{' '}
          / {mode === 'edit' ? 'Edit Family' : 'View Family Details'}
        </h2>
        <FamilyForm
          initialValues={mode === 'edit' ? data : {}}
          onBack={handleBack}
        />
      </div>
    );
  }

  return (
    <div className="w-full px-8 py-16 grid gap-9">
      <h3 className="text-lg font-bold ml-4">Family Details</h3>
      <div className="grid gap-3 mt-6">
        {dummyFamily.map((data) => {
          const { id, fullName, address, relationship, phone } = data;

          return (
            <InfoCardWrapper
              key={id}
              onEdit={() => handleEdit(data)}
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
          className="w-full h-[50px] bg-black-default/25 hover:opacity-60 transition-opacity"
          onClick={handleAdd}
        >
          <PlusIcon width={26} height={26} className="text-black-muted" />
        </Button>
      </div>
    </div>
  );
};

export default FamilyTab;
