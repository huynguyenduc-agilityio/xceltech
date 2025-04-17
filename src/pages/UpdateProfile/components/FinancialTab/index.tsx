import { useState } from 'react';
import { PlusIcon } from 'lucide-react';

// Types
import { IEmployeeFinancialInfo } from '@/types';

// Mocks
import { dummyFinancial } from '@/__mocks__';

// Components
import { Button, FinancialForm, InfoCardWrapper } from '@/components';

type FormState = null | {
  mode: 'add' | 'edit';
  data?: IEmployeeFinancialInfo;
};

const FinancialTab = () => {
  const [formState, setFormState] = useState<FormState>(null);

  const handleAdd = () => {
    setFormState({ mode: 'add' });
  };

  const handleEdit = (data: IEmployeeFinancialInfo) => {
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
            Financial Details
          </Button>{' '}
          / {mode === 'edit' ? 'Edit Financial' : 'View Financial Details'}
        </h2>
        <FinancialForm
          initialValues={mode === 'edit' ? data : {}}
          onBack={handleBack}
        />
      </div>
    );
  }

  return (
    <div className="w-full px-8 py-16 grid gap-9">
      <h3 className="text-lg font-bold ml-4">Financial Details</h3>
      <div className="grid gap-3 mt-6">
        {dummyFinancial.map((data) => {
          const { id, accountName, accountNumber, bankName } = data;

          return (
            <InfoCardWrapper
              key={id}
              onEdit={() => handleEdit(data)}
              titleContent={
                <div className="space-y-2">
                  <p className="text-xl font-bold">
                    {accountNumber} | {accountName}
                  </p>
                  <span className="text-xl">
                    <span className="font-bold">{bankName}</span> | Savings
                    Account
                  </span>
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

export default FinancialTab;
