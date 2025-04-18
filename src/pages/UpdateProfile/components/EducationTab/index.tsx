import { useState, useMemo, useCallback } from 'react';

// Constants
import { MESSAGES } from '@/constants';

// Types
import {
  IEmployeeEducationInfo,
  EducationType,
  MutationType,
  ToastStatus,
} from '@/types';

// Hooks
import { useDeleteEducation, useGetEducations, useToast } from '@/hooks';

// Components
import { Button, EducationForm, Fallback } from '@/components';

import EducationSection from './EducationSection';

type FormState = null | {
  section: EducationType;
  mode: MutationType;
  data?: IEmployeeEducationInfo;
};

const EducationTab = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState<FormState>(null);
  const { educations, isEducationsLoading } = useGetEducations();
  const { handleDeleteEducation, isDeleteLoading } = useDeleteEducation();

  const academicEducations = useMemo(
    () =>
      educations?.filter(
        (item: IEmployeeEducationInfo) => item.type === EducationType.Academic,
      ) ?? [],
    [educations],
  );

  const professionalEducations = useMemo(
    () =>
      educations?.filter(
        (item: IEmployeeEducationInfo) =>
          item.type === EducationType.Professional,
      ) ?? [],
    [educations],
  );

  const handleAdd = (section: EducationType) => {
    setFormState({ section, mode: MutationType.Create });
  };

  const handleEdit = (section: EducationType, data: IEmployeeEducationInfo) => {
    setFormState({ section, mode: MutationType.Edit, data });
  };

  const handleDelete = useCallback(
    async (id?: string) => {
      try {
        await handleDeleteEducation(id!);

        toast({
          status: ToastStatus.Success,
          title: MESSAGES.COMMON.DELETE_SUCCESS('Education'),
        });
      } catch (error) {
        toast({
          status: ToastStatus.Error,
          title: MESSAGES.COMMON.DELETE_FAILED('Education'),
        });
      }
    },
    [handleDeleteEducation, toast],
  );

  const handleBack = () => setFormState(null);

  if (formState) {
    const { section, mode, data } = formState;
    const titleDetail =
      section === EducationType.Academic
        ? 'Academic Details'
        : 'Professional Details';

    return (
      <div className="w-full px-8 py-16">
        <h2 className="text-lg font-bold mb-6">
          <Button
            variant="ghost"
            size="fit"
            className="cursor-pointer hover:text-secondary"
            onClick={handleBack}
          >
            {section === EducationType.Academic
              ? 'Academic Records'
              : 'Professional Qualifications'}
          </Button>{' '}
          / {titleDetail}
        </h2>
        <EducationForm
          mode={mode}
          section={section}
          initialValues={mode === MutationType.Edit ? data : {}}
          onBack={handleBack}
        />
      </div>
    );
  }

  const isLoading = isEducationsLoading || isDeleteLoading;

  return (
    <div className="relative w-full h-full px-8 py-16">
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60">
          <Fallback />
        </div>
      )}

      <div className="grid gap-9">
        <EducationSection
          title="Academic Records"
          section={EducationType.Academic}
          data={academicEducations}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <EducationSection
          title="Professional Qualifications"
          section={EducationType.Professional}
          data={professionalEducations}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default EducationTab;
