import { useState } from 'react';

// Types
import { IEmployeeEducationInfo } from '@/types';

// Mocks
import { dummyAcademicData, dummyProfessionalData } from '@/__mocks__';

// Components
import { Button, EducationForm } from '@/components';

import EducationSection from './EducationSection';

type FormState = null | {
  section: 'academic' | 'professional';
  mode: 'add' | 'edit';
  data?: IEmployeeEducationInfo;
};

const EducationTab = () => {
  const [formState, setFormState] = useState<FormState>(null);

  const handleAdd = (section: 'academic' | 'professional') => {
    setFormState({ section, mode: 'add' });
  };

  const handleEdit = (
    section: 'academic' | 'professional',
    data: IEmployeeEducationInfo,
  ) => {
    setFormState({ section, mode: 'edit', data });
  };

  const handleBack = () => setFormState(null);

  if (formState) {
    const { section, mode, data } = formState;
    const titleDetail =
      section === 'academic' ? 'Academic Details' : 'Professional Details';

    return (
      <div className="w-full px-8 py-16">
        <h2 className="text-lg font-bold mb-6">
          <Button
            variant="ghost"
            size="fit"
            className="cursor-pointer hover:text-secondary"
            onClick={handleBack}
          >
            {section === 'academic'
              ? 'Academic Records'
              : 'Professional Qualifications'}
          </Button>{' '}
          / {titleDetail}
        </h2>
        <EducationForm
          initialValues={mode === 'edit' ? data : {}}
          onBack={handleBack}
        />
      </div>
    );
  }

  return (
    <div className="w-full px-8 py-16 grid gap-9">
      <EducationSection
        title="Academic Records"
        section="academic"
        data={dummyAcademicData}
        onAdd={handleAdd}
        onEdit={handleEdit}
      />

      <EducationSection
        title="Professional Qualifications"
        section="professional"
        data={dummyProfessionalData}
        onAdd={handleAdd}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default EducationTab;
